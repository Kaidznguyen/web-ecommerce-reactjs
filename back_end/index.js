const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const brandRouter = require('./routes/brand');
const categoryRouter = require('./routes/category');
const figureRouter = require('./routes/figure');
const blogcateRouter = require('./routes/blog-cate');
const blogRouter = require('./routes/blog');
const orderRouter = require('./routes/order');
const uploadRouter = require('./routes/upload');
const shippingRouter = require('./routes/shipping');
const commentRouter = require('./routes/comment')
const userRouter = require('./routes/user');
const statisticalRouter = require('./routes/statistical');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/brand', brandRouter);
app.use('/category', categoryRouter);
app.use('/figure', figureRouter);
app.use('/blog-cate', blogcateRouter);
app.use('/blog', blogRouter);
app.use('/order', orderRouter);
app.use('/upload', uploadRouter);
app.use('/uploads',express.static('./uploads'));
app.use('/shipping',shippingRouter);
app.use('/comment',commentRouter)
app.use('/user',userRouter)
app.use('/statistical', statisticalRouter)
// // Rest of your app configuration...


module.exports = app;