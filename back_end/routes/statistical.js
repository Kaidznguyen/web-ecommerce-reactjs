const express = require("express");
const router = express.Router();
const db = require("../connection");

// API lấy 10 figure bán gần đây nhất sử dụng stored procedure
router.get("/unique-figures", (req, res) => {
  var sql = `
    SELECT f.*
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY figure_id ORDER BY updated_at DESC) AS rn
    FROM order_detail
) od
JOIN figure f ON od.figure_id = f.id
WHERE od.rn = 1
ORDER BY od.updated_at DESC
LIMIT 10;

  `;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});
router.get("/alldetail", (req, res) => {
  var sql = `
    SELECT
    *
  FROM
    order_detail
  `;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});
router.get("/many_views", (req, res) => {
  var sql = `
    SELECT id,name,views,img
FROM figure 
ORDER BY views DESC
LIMIT 7;

  `;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});
router.get("/bestseller", (req, res) => {
  var sql = `
    SELECT f.id,f.name, f.img, SUM(od.totalquantity) AS total_sold, f.promotionprice, f.price
    FROM order_detail od
    JOIN figure f ON od.figure_id = f.id
    GROUP BY od.figure_id, f.name, f.img, f.promotionprice, f.price
    ORDER BY total_sold DESC
    LIMIT 7;

  `;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.send({ status: true, data: result });
    }
  });
  router.get("/potential_customers", (req, res) => {
    var sql = `
      SELECT cs.id_ship,cs.name, cs.phone, cs.address, SUM(od.totalprice) AS total_spent
      FROM customer_shipping cs
      JOIN orders o ON cs.id_ship = o.shipping_id
      JOIN order_detail od ON o.id_order = od.order_id
      GROUP BY cs.id_ship, cs.name, cs.email, cs.phone, cs.address, cs.note, cs.payment
      ORDER BY total_spent DESC
      LIMIT 7;
    `;
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
  router.get("/cus_cancels", (req, res) => {
    var sql = `
    SELECT cs.id_ship, cs.name, cs.phone, cs.address, SUM(od.totalprice) AS total_spent
    FROM customer_shipping cs
    JOIN orders o ON cs.id_ship = o.shipping_id
    JOIN order_detail od ON o.id_order = od.order_id
    WHERE o.status = 'cancelled'
    GROUP BY cs.id_ship, cs.name, cs.phone, cs.address
    ORDER BY total_spent DESC
    LIMIT 7;
  `;
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
  router.get("/outStock", (req, res) => {
    var sql = `
    SELECT id, name, img, price, promotionprice, quantity
FROM figure
WHERE quantity <= 10
ORDER BY quantity ASC;

  `;
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
  router.get("/overstock", (req, res) => {
    var sql = `
    SELECT id, name, img, price, promotionprice, quantity
FROM figure
WHERE quantity >= 100
ORDER BY quantity ASC;

  `;
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
  router.get("/monthly_revenue", (req, res) => {
    var sql = `

    SELECT 
    DATE_FORMAT(o.created_at, '%Y-%m') AS month,
    SUM(od.totalprice) AS revenue
FROM 
    orders o
JOIN 
    order_detail od ON o.id_order = od.order_id
JOIN 
    customer_shipping cs ON o.shipping_id = cs.id_ship
WHERE 
    (cs.payment = 'MoMo') OR 
    (cs.payment = 'COD' AND o.status = 'delivered')
GROUP BY 
    DATE_FORMAT(o.created_at, '%Y-%m')
ORDER BY 
    month;

  `;
    db.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
})
module.exports = router;
