const express = require("express");
const router = express.Router();
const db = require("../connection");

// API lấy 10 figure bán gần đây nhất sử dụng stored procedure
router.get("/unique-figures", (req, res) => {
    var sql = `
    SELECT
    f.*
  FROM
    figure f
  WHERE
    NOT EXISTS (
      SELECT 1
      FROM order_detail od
      WHERE od.figure_id = f.id
    )
  LIMIT 10;
  `;
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
  router.get("/alldetail", (req, res) => {
    var sql = `
    SELECT
    *
  FROM
    order_detail
  `;
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });


// // API lấy 10 figure bán gần đây nhất sử dụng stored procedure
// router.get("/unique-figures", async (req, res) => {
//     try {
//         // Gọi stored procedure
//         const [rows] = await db.query('CALL GetUniqueFigures2()');

//         // Kiểm tra nếu có bản ghi trả về
//         if (rows && rows.length > 0) {
//             // Trả về kết quả
//             res.json({ status: true, data: rows[0] });
//         } else {
//             res.json({ status: false, message: 'Không có dữ liệu' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ status: false, error: 'Internal Server Error' });
//     }
// });

module.exports = router;
