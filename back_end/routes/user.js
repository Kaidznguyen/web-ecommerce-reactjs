const express = require("express");
const router = express.Router();
const db = require("../connection");
const bcrypt = require('bcryptjs');
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM user WHERE email = ?', [email], (error, results, fields) => {
        if (error) {
            console.error('Lỗi truy vấn: ' + error);
            res.status(500).send('Lỗi server');
            return;
        }
        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Lỗi so sánh mật khẩu: ' + err);
                    res.status(500).send('Lỗi server');
                    return;
                }
                if (isMatch) {
                    res.json({ message: 'Đăng nhập thành công!', user });
                } else {
                    res.status(401).json({ message: 'Sai mật khẩu!' });
                }
            });
        } else {
            res.status(404).json({ message: 'Người dùng không tồn tại!' });
        }
    });
});
// API endpoint: Lấy danh sách tất cả users
router.get("/getall", (req, res) => {
    var sql = `SELECT * FROM user;
    `;
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
// API endpoint: Đăng ký
router.post('/signup', (req, res) => {
    const { username,password,email, role } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Lỗi khi mã hóa mật khẩu: ' + err);
            res.status(500).send('Lỗi server');
            return;
        }
        const addUserQuery = 'INSERT INTO user (username, password,email,role) VALUES (?, ?, ?, ?)';
        db.query(addUserQuery, [username, hashedPassword,email, role], (error, results, fields) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error);
                res.status(500).send('Lỗi server');
                return;
            }
            res.json({ message: 'Đăng ký thành công!' });
        });
    });
});

// Ví dụ cho endpoint kiểm tra email tồn tại
router.post('/check-email', (req, res) => {
    const { email } = req.body;
    connection.query('SELECT * FROM user WHERE email = ?', [email], (error, results, fields) => {
        if (error) {
            console.error('Lỗi truy vấn: ' + error);
            res.status(500).send('Lỗi server');
            return;
        }
        if (results.length > 0) {
            res.json({ exists: true }); // Email tồn tại trong CSDL
        } else {
            res.json({ exists: false }); // Email không tồn tại trong CSDL
        }
    });
});
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
  
    const query = 'DELETE FROM user WHERE id_us = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu', error:error,id:id });
        } else {
            res.status(200).json({ message: 'Xóa thành công' });
        }
    });
  });
module.exports = router;