const express = require("express");
const router = express.Router();
const db = require("../connection");
router.post('/create-order', async (req, res) => {
  try {
    const { shippingInfo, orderDetail } = req.body;

    // Kiểm tra dữ liệu gửi lên từ client
    if (!shippingInfo || !orderDetail || !Array.isArray(orderDetail) || orderDetail.length === 0) {
      console.error('Dữ liệu đơn hàng không hợp lệ:', shippingInfo, orderDetail);
      return res.status(400).json({ success: false, message: 'Dữ liệu đơn hàng không hợp lệ.' });
    }

    // Thêm thông tin giao hàng vào bảng customer_shipping
    const shippingResult = await new Promise((resolve, reject) => {
      const sql = `INSERT INTO dshop.customer_shipping (name, email, phone, address, note, payment) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
      db.query(sql, [shippingInfo.name, shippingInfo.email, shippingInfo.phone, shippingInfo.address, shippingInfo.note, shippingInfo.payment], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (!shippingResult || shippingResult.affectedRows === 0) {
      return res.status(500).json({ success: false, message: 'Không thể tạo thông tin vận chuyển mới.' });
    }

    const shippingID = shippingResult.insertId;

    // Thêm thông tin đơn hàng vào bảng orders
    const orderResult = await new Promise((resolve, reject) => {
      const sql = `INSERT INTO dshop.orders (shipping_id, status) VALUES (?, 'pending')`;
      db.query(sql, [shippingID], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (!orderResult || orderResult.affectedRows === 0) {
      return res.status(500).json({ success: false, message: 'Không thể tạo đơn hàng mới.' });
    }

    const orderID = orderResult.insertId;

    // Thêm thông tin chi tiết đơn hàng vào bảng order_detail và cập nhật quantity trong bảng figure
    for (const item of orderDetail) {
      await new Promise((resolve, reject) => {
        const sql = `INSERT INTO dshop.order_detail (order_id, figure_id, totalquantity, totalprice) VALUES (?, ?, ?, ?)`;
        db.query(sql, [orderID, item.figure_id, item.totalquantity, item.totalprice], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      // Cập nhật quantity trong bảng figure
      await new Promise((resolve, reject) => {
        const updateSql = `UPDATE dshop.figure SET quantity = quantity - ? WHERE id = ?`;
        db.query(updateSql, [item.totalquantity, item.figure_id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    }

    res.status(200).json({ success: true, message: 'Đã tạo đơn hàng thành công.', shipping_id: shippingID, order_id: orderID });
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại sau.' });
  }
});

//api lấy tất cả hóa đơn
router.get("/getall", (req, res) => {
    var sql = `SELECT *
    FROM orders
    JOIN customer_shipping ON customer_shipping.id_ship = orders.shipping_id
    ORDER BY orders.id_order asc
    `;
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
router.get('/get/:id', (req, res) => {
  const Id = req.params.id;
  const query = `SELECT f.*, order_detail.totalquantity, order_detail.totalprice
                 FROM order_detail
                 JOIN figure AS f ON f.id = order_detail.figure_id
                 WHERE order_detail.order_id = ?`;

  db.query(query, [Id], (err, results) => {
      if (err) {
          res.status(500).json({ error: err });
          return;
      }

      if (results.length === 0) {
          res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
          return;
      }

      res.status(200).json(results);
  });
});
// api lấy dữ liệu khách hàng
router.get('/getCusById/:id', (req, res) => {
  const Id = req.params.id;
  const query = `SELECT *
  FROM orders
  JOIN customer_shipping ON customer_shipping.id_ship = orders.shipping_id
  WHERE orders.id_order =  ${Id}`;

  db.query(query, (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Lỗi cục bộ' });
          return;
      }

      if (results.length === 0) {
          res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
          return;
      }

      res.status(200).json(results[0]);
  });
});

// api cập nhật đơn hàng
router.put('/update/:id', (req, res) => {
    const Id = req.params.id;
    const { status } = req.body;
  
    const query = 'UPDATE orders SET status=? WHERE id_order=?';
    db.query(query, [status,Id], (error, results) => {
        if (error) {
            res.status(500).json({ error: error });
        } else {
            res.status(200).json({ message: 'Danh Mục đã được cập nhật thành công' });
        }
    });
  });
//   tính doanh thu của các đơn hàng có trạng thái là delivered
router.get("/get_total_price_delivered", (req, res) => {
    var sql = `SELECT 
    SUM(od.totalprice) AS total_price_delivered
FROM 
    orders AS o
JOIN 
    order_detail AS od ON o.id_order = od.order_id
JOIN
    customer_shipping AS cs ON o.shipping_id = cs.id_ship
WHERE 
    (cs.payment = 'MoMo') or
    (o.status = 'delivered' AND cs.payment = 'COD');
    `;
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
// tính các hóa đơn đã thu được đến nay
router.get("/get_paid_invoices", (req, res) => {
  var sql = `
  SELECT 
      o.id_order
  FROM 
      orders AS o
  JOIN 
      order_detail AS od ON o.id_order = od.order_id
  JOIN
      customer_shipping AS cs ON o.shipping_id = cs.id_ship
  WHERE 
      (cs.payment = 'MoMo') OR (o.status = 'delivered' AND cs.payment = 'COD')
  GROUP BY
      o.id_order;
  `;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});
module.exports = router;