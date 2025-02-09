var express = require('express');
var router = express.Router();


// INSERT NEW REQUEST ORDER
router.post('/new/request_order', (req,res,next)=> {
    const sql = 'INSERT INTO `request_orders`(`work_type`, `ref_no`, `recovery_model`, `recovery_serial`, `used_serial`, `category`,`tel_no`, `status`,`transacted_date`) VALUES (?,?,?,?,?,?,?, 0, ?)'
    const db = require('../app');
    const {work_type, ref_no, recovery_model, recovery_serial, used_serial, category,tel_no, transacted_date} = req.body
    db.query(sql, [work_type, ref_no, recovery_model, recovery_serial, used_serial, category, tel_no, transacted_date], (err, data)=> {
        if(err){
            res.status(400).send(err.message)
            console.log(err.message)
        }
        else{
            res.status(200).json(data)
        }
    })
})

// get request order list 
router.get('/list/request_order', (req,res,next)=> {
    const sql = 'SELECT * FROM `request_orders` ORDER BY transacted_date DESC'
    const db = require('../app');
    db.query(sql, (err,data)=> {
        if(err){
            res.status(400).send(err.message);
            console.log(err.message)
        }
        else{
            res.status(200).json(data);
        }
    })
})

// update status
router.put('/update/request_order/:id', (req,res,next)=> {
    const sql = 'UPDATE request_orders SET status=?, transacted_date=? WHERE id=?'
    const id = req.params.id;
    const {status, transacted_date} = req.body;
    const db = require('../app');
    db.query(sql, [status,transacted_date,id], (err,data)=> {
        if(err){
            res.status(400).send(err.message);
            console.log(err.message, id, status)
        }
        else{
            res.status(200).json(data);
        }
    })
})

module.exports = router;