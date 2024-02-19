const express = require("express");
const router = express.Router();
const db = require("../connection");
//api lấy tất cả hóa đơn
router.get("/getall", (req, res) => {
    // var sql = `SELECT *
    // FROM orders o
    // JOIN customer_shipping cs ON cs.id_ship = o.shipping_id
    // JOIN order_detail od ON o.id_order = od.order_id
    // ;
    // `;
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

// api thêm
router.post('/create-order', async (req, res) => {
    const { order, orderDetail } = req.body;

    try {
        const [orderDetails] = await db.query('CALL Create_Order (?, ?)', [
            JSON.stringify(order),
            JSON.stringify(orderDetail)
        ]);

        // Kiểm tra xem orderDetails có phải là mảng hay không
        if (!Array.isArray(orderDetails)) {
            console.error('Lỗi khi lấy dữ liệu từ stored procedure, orderDetails không phải là mảng:', orderDetails);
            // Nếu bạn muốn bỏ qua lỗi, bạn có thể chỉ log lỗi
            console.log('Giá trị sau khi lặp:', orderDetails);
        } else {
            console.log('Giá trị sau khi lặp:', orderDetails);
        }

        // Trả về một phản hồi thành công với đối tượng { success: true } và trạng thái 200
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        // Nếu có lỗi, vẫn trả về một phản hồi thành công với đối tượng { success: true } và trạng thái 200
        res.status(200).json({ success: true });
    }
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
module.exports = router;