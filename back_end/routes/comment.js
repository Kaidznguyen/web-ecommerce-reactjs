const express = require("express");
const router = express.Router();
const db = require("../connection");
// api lấy tất
router.get("/getall", (req, res) => {
    var sql = `SELECT review_figure.*, figure.*
FROM review_figure
JOIN figure ON review_figure.figure_id = figure.id;
`;
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
// api thêm 1 sp
router.post('/addComment', (req, res, next) => {
  const { name_com, email, comment_mes,figure_id,parentID } = req.body;

  let sql = "INSERT INTO review_figure (name_com, email, comment_mes,figure_id,parentID) values (?,?,?,?,?)";

  db.query(sql, [name_com, email, comment_mes,figure_id,parentID], (error, results) => {
      if (error) {
          res.status(500).json({ error: error });
      } else {
          res.status(200).json({ message: 'Thêm Thành Công' });
      }
  });
});
// api lấy comment theo figuid
router.get('/getcommentbyFiguID/:id', (req, res) => {
  const Id = req.params.id;
  const query = `SELECT * FROM review_figure WHERE figure_id=${Id}`;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi cục bộ' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Không tìm thấy mô hình' });
      return;
    }

    // Trả về một mảng các dòng dữ liệu có figure_id bằng id
    res.status(200).json(results);
  });
});
// api xóa 1 sp
router.delete('/delete/:id', (req, res) => {
  const id_cate = req.params.id;

  const query = 'DELETE FROM review_figure WHERE id_comment = ?';
  db.query(query, [id_cate], (error, results) => {
      if (error) {
          res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu', error:error,id:id_cate });
      } else {
          res.status(200).json({ message: 'Xóa thành công' });
      }
  });
});
module.exports = router;