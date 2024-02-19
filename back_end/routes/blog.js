const express = require("express");
const router = express.Router();
const db = require("../connection");
const multer = require('multer');
const path = require('path');

// api lấy all sp
router.get("/getall", (req, res) => {
    var sql = "SELECT * FROM post";
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
// api tìm sp theo tên
router.get('/getByName/:name', (req, res) => {
    const Name = req.params.name;
    const query = `SELECT * FROM post where title like '${'%'+Name+'%'}'`;
  
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Lỗi máy chủ nội bộ', error:err});
            return;
        }
  
        if (results.length === 0) {
            res.status(404).json({ message: 'Không tìm thấy mô hình' });
            return;
        }
  
        res.status(200).json(results[0]);
    });
  });
  // api lấy sp theo id
router.get('/getById/:id', (req, res) => {
    const Id = req.params.id;
    const query = `SELECT * FROM post WHERE id = ${Id}`;
  
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Lỗi cục bộ' });
            return;
        }
  
        if (results.length === 0) {
            res.status(404).json({ message: 'Không tìm thấy mô hình' });
            return;
        }
  
        res.status(200).json(results[0]);
    });
  });
  // api xóa 1 sp
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
  
    const query = 'DELETE FROM post WHERE id = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu', error:error,id:id });
        } else {
            res.status(200).json({ message: 'Xóa thành công' });
        }
    });
  });
//api upload ảnh
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/'); // Đường dẫn lưu trữ file upload
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Lưu tên gốc của ảnh
  },
});
const upload = multer({ storage: storage });
// api thêm sản phẩm
router.post('/add', upload.single('img'), (req, res) => {
  try {
    const { title,description,content,post_category_id,author } = req.body;

    db.query('SELECT * FROM post WHERE title = ?', title, (selectErr, selectResult) => {
      if (selectErr) {
        console.error('Error checking existing product:', selectErr);
        return res.status(500).json({ error: 'Database error', message: selectErr.message });
      }

      if (selectResult.length > 0) {
        // Nếu sản phẩm đã tồn tại, trả về thông báo lỗi
        return res.status(400).json({ error: 'Product already exists', message: 'A product with the same name already exists' });
      }

      const img = req.file ? req.file.path.replace(/\\/g, '/') : '';


      const figure = {
        title: title,
        img: img,
        description: description,
        content:content,
        post_category_id: post_category_id, 
        author:author,
      };

      db.query('INSERT INTO post SET ?', figure, (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error adding product:', insertErr);
          return res.status(500).json({ error: 'Database error', message: insertErr.message });
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
// api sửa thông tin sản phẩm 
router.put('/update/:Id', upload.single('img'), (req, res) => {
  try {
      const Id = req.params.Id; // Lấy productId từ URL
      const { title,description,content,post_category_id,author } = req.body;

      // Kiểm tra xem sản phẩm có tồn tại không
      db.query('SELECT * FROM post WHERE id = ?', Id, (selectErr, selectResult) => {
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
              title: title || selectResult[0].title,
              img: img,
              description: description || selectResult[0].description,
              content: content || selectResult[0].content,
              post_category_id: post_category_id || selectResult[0].post_category_id,
              author: author || selectResult[0].author,
          };

          db.query('UPDATE post SET ? WHERE id = ?', [updatedProduct, Id], (updateErr, updateResult) => {
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



module.exports = router;