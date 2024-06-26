const express = require("express");
const router = express.Router();
const db = require("../connection");
const nodemailer = require("nodemailer");

router.post('/create-order', async (req, res) => {
  try {
    const { shippingInfo, orderDetail } = req.body;
    console.log(orderDetail);
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
    // Gửi email thông báo đặt hàng thành công sau khi đã cập nhật quantity
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kainguyen107@gmail.com',
        pass: 'viwiwzilxbtsdtwb',
      },
    });
    const mailOptions = {
      from: 'kainguyen107@gmail.com',
      to: shippingInfo.email,
      subject: 'Đặt hàng thành công',
      html: `
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #007bff;">Đặt hàng thành công</h1>
      <p>Xin chào ${shippingInfo.name},</p>
      <p>Cảm ơn bạn đã đặt hàng từ cửa hàng chúng tôi.</p>
      <p>Dưới đây là thông tin về các sản phẩm bạn đã mua:</p>
      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr align="center">
            <th style="border: 1px solid #ddd; padding: 8px;">Tên sản phẩm</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Giá</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Số lượng</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Tổng giá</th>
          </tr>
        </thead>
        <tbody>
          ${orderDetail.map(item => `
            <tr align="center">
              <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">
                ${item.promotionprice !== 0 ? item.promotionprice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.amount}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">
                ${(item.totalprice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p>Chúng tôi sẽ sớm xác nhận và giao hàng cho bạn. Đơn của bạn sẽ đến trong vòng 1 tuần và muộn nhất trong 1 tháng.</p>
      <p>Hy vọng bạn có trải nghiệm tốt với mô hình và dịch vụ bên mình <3 !! Nếu có bất cứ điều gì thắc mặc hãy nhắn tin qua fanpage cho chúng mình hoặc bạn có thể mail cho shop qua địa chỉ: Shopmohinh@gmail.com</p>
    </div>
  `
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });


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
    ORDER BY orders.id_order desc
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
  db.query(query, [status, Id], (error, results) => {
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