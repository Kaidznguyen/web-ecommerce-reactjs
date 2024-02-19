const express = require("express");
const router = express.Router();
const db = require("../connection");


// api lấy all sp
router.get("/getall", (req, res) => {
  var sql = "SELECT * FROM post_category";
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});
// api thêm 1 sp
router.post('/add', (req, res, next) => {
  const { name_cate, description_cate } = req.body;

  let sql = "INSERT INTO post_category (name_cate,description_cate) values (?,?)";

  db.query(sql, [name_cate, description_cate], (error, results) => {
      if (error) {
          res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu',error:error });
      } else {
          res.status(200).json({ message: 'Thêm Thành Công' });
      }
  });
});
// api lấy sp theo id
router.get('/getById/:id', (req, res) => {
  const categoryId = req.params.id;
  const query = `SELECT * FROM post_category WHERE id_cate = ${categoryId}`;

  db.query(query, (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Lỗi cục bộ' });
          return;
      }

      if (results.length === 0) {
          res.status(404).json({ message: 'Không tìm thấy danh mục' });
          return;
      }

      res.status(200).json(results[0]);
  });
});

// api sửa sp
router.put('/update/:id', (req, res) => {
  const categoryId = req.params.id;
  const { name_cate, description_cate } = req.body;

  const query = 'UPDATE post_category SET name_cate=?, description_cate=? WHERE id_cate=?';
  db.query(query, [name_cate, description_cate, categoryId], (error, results) => {
      if (error) {
          res.status(500).json({ error: err });
      } else {
          res.status(200).json({ message: 'Danh Mục đã được cập nhật thành công' });
      }
  });
});
// api xóa 1 sp
router.delete('/delete/:id', (req, res) => {
  const id_cate = req.params.id;

  const query = 'DELETE FROM post_category WHERE id_cate = ?';
  db.query(query, [id_cate], (error, results) => {
      if (error) {
          res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu', error:error,id:id_cate });
      } else {
          res.status(200).json({ message: 'Xóa thành công' });
      }
  });
});
// api lấy sp theo id danh mục
router.get('/getByidcate/:id', (req, res) => {
  const idcate = req.params.id;
  const query = `
    SELECT *
    FROM post_category
    JOIN post p ON post_category.id_cate = p.post_category_id
    WHERE post_category.id_cate = ?`;

  db.query(query, [idcate], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Không tìm thấy sản phẩm nào theo danh mục!', error:err });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Không tìm thấy danh mục hoặc không có sản phẩm trong danh mục này' });
      return;
    }

    res.status(200).json(results);
  });
});
//api tìm danh mục theo tên
router.get('/getByName/:name', (req, res) => {
  const categoryName = req.params.name;
  const query = `SELECT * FROM post_category where name_cate like '${'%'+categoryName+'%'}'`;

  db.query(query, (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Lỗi máy chủ nội bộ', error:err });
          return;
      }

      if (results.length === 0) {
          res.status(404).json({ message: 'Không tìm thấy danh mục' });
          return;
      }

      res.status(200).json(results[0]);
  });
});
  

module.exports = router;