const express = require("express");
const router = express.Router();
const db = require("../connection");
const multer = require('multer');
const path = require('path');

// api lấy all sp
router.get("/getall", (req, res) => {
    var sql = "SELECT * FROM figure where status = 1";
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
    const query = `SELECT * FROM figure where name like '${'%'+Name+'%'}' or price like '${'%'+Name+'%'}'`;
  
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
    const query = `SELECT f.*, fc.*, b.*
    FROM figure f
    JOIN figure_category fc ON f.figure_category_id = fc.id_cate
    JOIN brand b ON f.brand_id = b.id_brand
    WHERE f.id = ${Id}`;
  
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
  
    const query = 'DELETE FROM figure WHERE id = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu', error:error,id:id });
        } else {
            res.status(200).json({ message: 'Xóa thành công' });
        }
    });
  });
  // api lấy sản phẩm theo min max
  router.get('/getByPriceRange/:minPrice/:maxPrice', (req, res) => {
    const minPrice = req.params.minPrice;
    const maxPrice = req.params.maxPrice;
    
    const query = `SELECT * FROM figure WHERE promotionprice BETWEEN ? AND ?`;
  
    db.query(query, [minPrice, maxPrice], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
            return;
        }
  
        if (results.length === 0) {
            res.status(404).json({ message: 'Không tìm thấy mô hình trong khoảng giá này' });
            return;
        }
  
        res.status(200).json(results);
    });
});

// api thêm sản phẩm
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Đường dẫn lưu trữ file upload
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Lưu tên gốc của ảnh
    },
});
const upload = multer({ storage: storage });

router.post('/add', upload.single('img'), (req, res) => {
    try {
      const { name, description, price, promotionprice, quantity,figure_category_id,brand_id,warranty } = req.body;
  
      db.query('SELECT * FROM figure WHERE name = ?', name, (selectErr, selectResult) => {
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
          name: name,
          img: img,
          description: description,
          price: price,
          promotionprice: promotionprice, 
          quantity: quantity,
          figure_category_id: figure_category_id,
          brand_id: brand_id,
          warranty: warranty,
        };
  
        db.query('INSERT INTO figure SET ?', figure, (insertErr, insertResult) => {
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
      const { name, description, price, promotionprice, quantity,figure_category_id,brand_id,warranty } = req.body;

      // Kiểm tra xem sản phẩm có tồn tại không
      db.query('SELECT * FROM figure WHERE id = ?', Id, (selectErr, selectResult) => {
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
              name: name || selectResult[0].name,
              img: img,
              description: description || selectResult[0].description,
              price: price || selectResult[0].price,
              promotionprice: promotionprice || selectResult[0].promotionprice,
              quantity: quantity || selectResult[0].quantity,
              price: price || selectResult[0].price,
              figure_category_id: figure_category_id || selectResult[0].figure_category_id,
              brand_id: brand_id || selectResult[0].brand_id,
              warranty: warranty || selectResult[0].warranty
          };

          db.query('UPDATE figure SET ? WHERE id = ?', [updatedProduct, Id], (updateErr, updateResult) => {
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
// api lấy ra 8 sản phẩm mới nhất
router.get('/getLatestFigures', (req, res) => {
    const query = `
        SELECT *
        FROM figure where status = 1
        ORDER BY created_at DESC
        LIMIT 9 
    `;

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'Không tìm thấy figure mới nào' });
            return;
        }

        res.status(200).json(results);
    });
});

// api lấy ra 8 sản phẩm nổi bật(có thể)
router.get('/getHotFigures', (req, res) => {
    const query = `
        SELECT *
        FROM figure
        ORDER BY price DESC
        LIMIT 8
    `;

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'Không tìm thấy figure mới nào' });
            return;
        }

        res.status(200).json(results);
    });
});

// api lấy ra 8 sản phẩm có giá giảm
router.get('/getpromotionFigures', (req, res) => {
  const query = `
  SELECT *
  FROM figure
  ORDER BY promotionprice DESC
  LIMIT 8;
  `;

  db.query(query, (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
          return;
      }

      if (results.length === 0) {
          res.status(404).json({ message: 'Không tìm thấy figure mới nào' });
          return;
      }

      res.status(200).json(results);
  });
});
// api comment vào 1 sp
router.post('/comment', (req, res, next) => {
  const { name_com, comment_mes, figure_id } = req.body;

  let sql = "INSERT INTO comment_figure (name_com,comment_mes, figure_id) values (?,?,?)";

  db.query(sql, [name_com, comment_mes,figure_id], (error, results) => {
      if (error) {
          res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu',error:error });
      } else {
          res.status(200).json({ message: 'Thêm Thành Công' });
      }
  });
});
module.exports = router;