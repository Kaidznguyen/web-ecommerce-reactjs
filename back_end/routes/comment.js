const express = require("express");
const router = express.Router();
const db = require("../connection");
// api lấy tất
router.get("/getall", (req, res) => {
    var sql = "SELECT * FROM comment_figure;";
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
// api lấy comment theo figure_id
  router.get('/get/:id', (req, res) => {
    const Id = req.params.id;
    const query = `SELECT * FROM comment_figure WHERE figure_id = ?`;
  
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
module.exports = router;