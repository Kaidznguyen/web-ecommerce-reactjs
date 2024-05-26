const express = require("express");
const router = express.Router();
const db = require("../connection");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const secretKey = uuidv4();
router.post('/login', (req, res) => {
    const { email, password, rememberMe } = req.body;
    // Kiểm tra xem email và password có được cung cấp hay không
    if (!email || !password) {
        return res.status(400).json({ message: 'Email và mật khẩu là bắt buộc' });
    }
    // Truy vấn database để kiểm tra thông tin đăng nhập
    db.query('SELECT * FROM user WHERE email = ?', [email], async (error, results, fields) => {
        if (error) {
            console.error('Lỗi truy vấn: ' + error);
            return res.status(500).send('Lỗi server');
        }
        // Kiểm tra xem email có tồn tại trong database hay không
        if (results.length === 0) {
            return res.status(401).json({ message: 'Email không tồn tại' });
        }
        const user = results[0];
        // Kiểm tra tính đúng đắn của mật khẩu
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mật khẩu không chính xác' });
        }
        // Kiểm tra status của tài khoản
        if (user.status !== 1) {
            return res.status(401).json({ message: 'Tài khoản đã bị khóa' });
        }
        // Thiết lập thời gian hết hạn cho token
        let expiresIn;
        if (rememberMe) {
            expiresIn = '7d'; // Nếu nhớ mật khẩu, token sẽ hết hạn sau 7 ngày
        } else {
            expiresIn = '1h'; // Nếu không nhớ, token sẽ hết hạn sau 1 giờ
        }
        // Tạo dữ liệu cho token
        const tokenData = {
            userId: user.id_us,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
        };
        // Tạo token bằng cách sử dụng dữ liệu và secret key, với thời gian hết hạn được thiết lập
        const token = jwt.sign(tokenData, secretKey, { expiresIn });
        // Gửi token về phía máy khách và gửi mã trạng thái 200
        if (token) {
            return res.status(200).json({ token });
        } else {
            // Trả về mã trạng thái 500 nếu không thể tạo token
            return res.status(500).send('Lỗi server');
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
router.post('/signup', (req, res) => {
    const { username, password_hash, email, role, status, name } = req.body;

    // Kiểm tra giá trị của status
    if (status !== 0 && status !== 1) {
        return res.status(400).send('Trường status chỉ chấp nhận giá trị 0 hoặc 1');
    }

    // Kiểm tra email đã tồn tại hay chưa
    db.query('SELECT * FROM user WHERE email = ?', [email], (error, results, fields) => {
        if (error) {
            console.error('Lỗi truy vấn: ' + error);
            return res.status(500).send('Lỗi server');
        }

        if (results.length > 0) {
            return res.status(400).send('Email đã tồn tại');
        }

        // Mã hóa mật khẩu
        bcrypt.hash(password_hash, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Lỗi khi mã hóa mật khẩu: ' + err);
                return res.status(500).send('Lỗi server');
            }

            const addUserQuery = 'INSERT INTO user (username, password_hash, email, role, status,name) VALUES (?, ?, ?, ?, ?,?)';
            db.query(addUserQuery, [username, hashedPassword, email, role, status, name], (error, results, fields) => {
                if (error) {
                    console.error('Lỗi truy vấn: ' + error);
                    return res.status(500).send('Lỗi server');
                }
                res.json({ message: 'Đăng ký thành công!' });
            });
        });
    });
});
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM user WHERE id_us = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu', error: error, id: id });
        } else {
            res.status(200).json({ message: 'Xóa thành công' });
        }
    });
});
router.put('/update/:userId', (req, res) => {
    const userId = req.params.userId;
    const { username, password_hash, email, role, status, name } = req.body;

    // Kiểm tra giá trị của status
    if (status !== 0 && status !== 1) {
        return res.status(400).send('Trường status chỉ chấp nhận giá trị 0 hoặc 1');
    }

    // Mã hóa mật khẩu (nếu mật khẩu được cung cấp)
    let hashedPassword = password_hash;
    if (password_hash) {
        bcrypt.hash(password_hash, 10, (err, hash) => {
            if (err) {
                console.error('Lỗi khi mã hóa mật khẩu: ' + err);
                return res.status(500).send('Lỗi server');
            }
            hashedPassword = hash;
            const updateUserQuery = 'UPDATE user SET username = ?, password_hash = ?, email = ?, role = ?, status = ?, name = ? WHERE id_us = ?';
            db.query(updateUserQuery, [username, hashedPassword, email, role, status, name, userId], (error, results, fields) => {
                if (error) {
                    console.error('Lỗi truy vấn: ' + error);
                    return res.status(500).send('Lỗi server');
                }
                res.json({ message: 'Cập nhật người dùng thành công!' });
            });
        });
    } else {
        const updateUserQuery = 'UPDATE user SET username = ?, password_hash = ?, email = ?, role = ?, status = ?, name = ? WHERE id_us = ?';
        db.query(updateUserQuery, [username, hashedPassword, email, role, status, name, userId], (error, results, fields) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error);
                return res.status(500).send('Lỗi server');
            }
            res.json({ message: 'Cập nhật người dùng thành công!' });
        });
    }
});

module.exports = router;