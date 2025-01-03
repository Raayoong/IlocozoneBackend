var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/view/inventory/:category', (req, res, next) => {
  const db = require('../app')
  const category = req.params.category
  const sql = "SELECT * FROM inventory WHERE category=? and qty=1"
  const sqlAll = "SELECT * FROM inventory WHERE qty=1"
  db.query(category==='ALL' ? sqlAll:sql, category,(err, data)=> {
    res.status(200).json(data);
  })
});

// add to inventory
router.post('/insert/inventory', (req,res)=> {
  const date = new Date();
  const dateToday = date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear()
  const db = require('../app');
  const {category, brand, model, qty, serial, date_transacted} = req.body;
  const sql = "INSERT INTO `inventory`(`category`, `brand`, `model`, `qty`, `serial`, `date_transacted`) VALUES (?,?,?,?,?,?)"

  db.query(sql,[category, brand, model, qty, serial, date_transacted],(err, data)=> {
    if(err){
      res.status(400).send(err.message);
      console.log(err.message)
    }
    else{
      res.status(200).json(data);
    }
  })

})


// delete single inventory
router.delete('/delete/inventory/:id', (req, res)=> {
  const db = require('../app');
  const id = req.params.id
  const sql = `DELETE FROM inventory WHERE id=?`

  db.query(sql, id, (err, data)=> {
    if(err){
      res.status(400).send(err);
    }
    else{
      res.status(200).json(data);
    }
  })
})

// update stock 
router.put('/update/inventory/:usedSerial', (req,res,next)=> {
  const usedSerial = req.params.usedSerial
  const sql = `UPDATE inventory INNER JOIN request_orders ON inventory.serial = request_orders.used_serial SET qty=0 WHERE request_orders.used_serial=?`
  const db = require('../app');
  db.query(sql,usedSerial, (err,data)=> {
      if(err){
          res.status(400).send(err.message)
          console.log(err.message)
      }
      else{
          res.status(200).json(data);
      }
  })
})

// get brand and model
router.get(`/inventory/filter/:category`, (req, res)=> {
  const category = req.params.category
  const sql = `SELECT DISTINCT brand, model from inventory WHERE category=${category}`
  const db = require('../app');

  db.query(sql, category, (err,data)=> {
    if(err){
      res.status(400).send(err.message);
      console.log(err.message)
    }
    else{
      res.status(200).json(data)
    }
    
  })
})

// count stock
router.get('/view/count/ONU/inventory')
module.exports = router;
