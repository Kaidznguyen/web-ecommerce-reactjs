const express = require("express");
const router = express.Router();
const db = require("../connection");
const multer = require('multer');
const path = require('path');

// api lấy all sp
router.get("/getall", (req, res) => {
  var sql = "SELECT * FROM brand where status = 1";
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});
// api lấy all sp
router.get("/getalladmin", (req, res) => {
  var sql = "SELECT * FROM brand";
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});
// api lấy ảnh
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/'); // Đường dẫn lưu trữ file upload
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Lưu tên gốc của ảnh
  },
});
const upload = multer({ storage: storage });
// api thêm 1 sp
router.post('/add', upload.single('img_brand'), (req, res) => {
  try {
    const { name_brand, description_brand,status } = req.body;

    db.query('SELECT * FROM brand WHERE name_brand = ?', name_brand, (selectErr, selectResult) => {
      if (selectErr) {
        console.error('Error checking existing product:', selectErr);
        return res.status(500).json({ error: 'Database error', message: selectErr.message });
      }

      if (selectResult.length > 0) {
        // Nếu sản phẩm đã tồn tại, trả về thông báo lỗi
        return res.status(400).json({ error: 'Product already exists', message: 'A product with the same name already exists' });
      }

      const img = req.file ? req.file.path.replace(/\\/g, '/') : '';


      const brand = {
        name_brand: name_brand,
        img_brand: img,
        description_brand: description_brand,
        status: status,
      };

      db.query('INSERT INTO brand SET ?', brand, (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error adding product:', insertErr);
          return res.status(500).json({ error: 'Database error', message: insertErr });
        }
        console.log('Product added successfully:', insertResult);
        return res.status(200).json({ message: 'Product added successfully', product: insertResult });
      });
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Server error', err:err});
  }
});
// api sửa sp
router.put('/update/:Id', upload.single('img_brand'), (req, res) => {
  try {
      const Id = req.params.Id; // Lấy productId từ URL
      const { name_brand, description_brand,status  } = req.body;

      // Kiểm tra xem sản phẩm có tồn tại không
      db.query('SELECT * FROM brand WHERE id_brand = ?', Id, (selectErr, selectResult) => {
          if (selectErr) {
              console.error('Error checking existing product:', selectErr);
              return res.status(500).json({ error: 'Database error', message: selectErr.message });
          }

          if (selectResult.length === 0) {
              // Nếu sản phẩm không tồn tại, trả về thông báo lỗi
              return res.status(404).json({ error: 'Product not found', message: 'Product with the given ID not found' });
          }

          const img = req.file ? req.file.path.replace(/\\/g, '/') : selectResult[0].img; // Nếu không có file mới, sử dụng lại ảnh cũ

          const updatedProduct = {
              name_brand: name_brand || selectResult[0].name_brand,
              img_brand: img,
              description_brand: description_brand || selectResult[0].description_brand,
              status: status || selectResult[0].status,
          };

          db.query('UPDATE brand SET ? WHERE id_brand = ?', [updatedProduct, Id], (updateErr, updateResult) => {
              if (updateErr) {
                  console.error('Error updating product:', updateErr);
                  return res.status(500).json({ error: 'Database error', message: updateErr.message });
              }
              console.log('Product updated successfully:', updateResult);
              return res.status(200).json({ message: 'Product updated successfully', product: updateResult });
          });
      });
  } catch (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Server error', message: err.message });
  }
});
// api lấy sp theo id
router.get('/getById/:id', (req, res) => {
  const categoryId = req.params.id;
  const query = `SELECT * FROM brand WHERE id_brand = ${categoryId}`;

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


// api xóa 1 sp
router.delete('/delete/:id', (req, res) => {
  const id_cate = req.params.id;

  // Kiểm tra xem có mô hình nào trong bảng figure có figure_category_id trùng với id_cate không
  const queryCheck = 'SELECT * FROM figure WHERE brand_id = ?';
  db.query(queryCheck, [id_cate], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu', error: error, id: id_cate });
    } else {
      if (results.length > 0) {
        // Nếu có mô hình trùng, không cho phép xóa và trả về thông báo lỗi
        res.status(400).json({ error: 'Không thể xóa vì có mô hình đang liên kết với danh mục này' });
      } else {
        // Nếu không có mô hình nào trùng, tiến hành xóa danh mục
        const queryDelete = 'DELETE FROM brand WHERE id_brand = ?';
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
FROM brand b
JOIN figure f  ON b.id_brand = f.brand_id
join figure_category fc on fc.id_cate = f.figure_category_id
WHERE b.id_brand = ? and f.status = 1`;

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
  const query = `SELECT * FROM brand where name_cate like '${'%'+categoryName+'%'}'`;

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