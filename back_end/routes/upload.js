const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Directory where files will be saved
    },
    filename: function(req, file, cb) {
        // Save the file with the original name
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// POST endpoint to handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Không có tập tin nào được tải lên.');
        }

        // File was uploaded successfully, send a success response
        return res.status(200).send('Tải file thành công!');
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message || 'Đã xảy ra lỗi trong quá trình tải tệp lên.');
    }
});
module.exports = router;