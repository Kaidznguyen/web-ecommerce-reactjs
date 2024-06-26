const express = require("express");
const router = express.Router();
const db = require("../connection");


// api lấy all danh mục loại
router.get("/getall", (req, res) => {
  var sql = "SELECT * FROM figure_category where status = 1";
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});
// api lấy all admin sp
router.get("/getalladmin", (req, res) => {
  var sql = 
  `SELECT * FROM figure_category`;
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
  const { name_cate, description_cate,status } = req.body;

  let sql = "INSERT INTO figure_category (name_cate,description_cate,status) values (?,?,?)";

  db.query(sql, [name_cate, description_cate,status], (error, results) => {
      if (error) {
          res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
          res.status(200).json({ message: 'Thêm Thành Công' });
      }
  });
});
// api lấy sp theo id
router.get('/getById/:id', (req, res) => {
  const categoryId = req.params.id;
  const query = `SELECT * FROM figure_category WHERE id_cate = ${categoryId}`;

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
  const { name_cate, description_cate,status } = req.body;

  const query = 'UPDATE figure_category SET name_cate=?, description_cate=?, status=? WHERE id_cate=?';
  db.query(query, [name_cate, description_cate,status, categoryId], (error, results) => {
      if (error) {
          res.status(500).json({ error: err });
      } else {
          res.status(200).json({ message: 'Danh Mục đã được cập nhật thành công' });
      }
  });
});
// api xóa
router.delete('/delete/:id', (req, res) => {
  const id_cate = req.params.id;

  // Kiểm tra xem có mô hình nào trong bảng figure có figure_category_id trùng với id_cate không
  const queryCheck = 'SELECT * FROM figure WHERE figure_category_id = ?';
  db.query(queryCheck, [id_cate], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu', error: error, id: id_cate });
    } else {
      if (results.length > 0) {
        // Nếu có mô hình trùng, không cho phép xóa và trả về thông báo lỗi
        res.status(400).json({ error: 'Không thể xóa vì có mô hình đang liên kết với danh mục này' });
      } else {
        // Nếu không có mô hình nào trùng, tiến hành xóa danh mục
        const queryDelete = 'DELETE FROM figure_category WHERE id_cate = ?';
        db.query(queryDelete, [id_cate], (error, results) => {
          if (error) {
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu', error: error, id: id_cate });
          } else {
            res.status(200).json({ message: 'Xóa thành công' });
          }
        });
      }
    }
  });
});



// api lấy sp theo id danh mục
router.get('/getByidcate/:id', (req, res) => {
  const idcate = req.params.id;
  const query = `
    SELECT *
    FROM figure_category fc
    JOIN figure f ON fc.id_cate = f.figure_category_id
    join brand b on b.id_brand = f.brand_id
    WHERE fc.id_cate = ? and f.status = 1`;

  db.query(query, [idcate], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Không tìm thấy sản phẩm nào theo danh mục!' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Không tìm thấy danh mục hoặc không có sản phẩm trong danh mục này' });
      return;
    }

    res.status(200).json(results);
  });
});
// api tìm danh mục theo tên
router.get('/getByName/:name', (req, res) => {
  const categoryName = req.params.name;
  const query = `SELECT * FROM figure_category where name_Cate like '${'%'+categoryName+'%'}'`;

  db.query(query, (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
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