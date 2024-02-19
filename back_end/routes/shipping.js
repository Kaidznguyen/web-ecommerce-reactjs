const express = require("express");
const router = express.Router();
const db = require("../connection");

//api lấy tất cả 
router.get("/getall", (req, res) => {
    var sql = `SELECT * FROM customer_shipping;
    ;
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