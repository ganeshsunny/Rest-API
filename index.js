const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const dotenv=require('dotenv').config();
const bodyParser=require("body-parser");
const sqlString=require("sqlstring");
const app=express();
const port=5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.get('/',(req,res)=>{
    con.query("select * from customers",(err,resultobj)=>{
        if(err)
        console.log('Error in the query');
        else
        console.log(resultobj);
    })
})
("iam sry",(err,obj)=>{})
app.get('/select',(req,res)=>{
  con.query("select * from products",(err,resultobj)=>{
      if(err)
      console.log('Error in the query');
      else
      console.log(resultobj);
      res.json(resultobj);
  })
})
app.post("/update",(req,res)=>{
  console.log("running");
  console.log(req.body);
  console.log(req.body.value);
  console.log(req.body.valueOne);
  var sstring=sqlString.format('update '+req.body.table+' set '+req.body.column+'=? where '+req.body.columnOne+'=?',[req.body.value,req.body.valueOne]);
  console.log(sstring);
  //res.end(sstring);
  
  con.query(sstring,(err,resultobj)=>{
    if(err)
    res.json(err);
    else
    res.json(resultobj);
  })
})
app.post("/insertCustomers",(req,res)=>{
  var sstring=sqlString.format('insert into customers values(?,?,?,?,?,?,?,?,?,?,?)',[req.body.val1,req.body.val2,req.body.val3,req.body.val4,req.body.val5,req.body.val6,req.body.val7,req.body.val8,req.body.val9,req.body.val10,req.body.val11]);

  con.query(sstring,(err,resultobj)=>{
    if(err)
    res.json(err);
    else
    res.json(resultobj);
  })
})
app.post("/insertProducts",(req,res)=>{
  var sstring=sqlString.format('insert into products values(?,?,?,?,?,?,?,?,?,?)',[req.body.val1,req.body.val2,req.body.val3,req.body.val4,req.body.val5,req.body.val6,req.body.val7,req.body.val8,req.body.val9,req.body.val10]);

  con.query(sstring,(err,resultobj)=>{
    if(err)
    res.json(err);
    else
    res.json(resultobj);
  })
})
app.post("/getOrders",(req,res)=>{
  var sstring=sqlString.format('select o.orderID,c.CustomerID,c.ContactName,o.OrderDate,o.ShippedDate from Orders o join Customers c on o.CustomerID=c.CustomerID where c.CustomerID=?',[req.body.custID]);

  con.query(sstring,(err,resultobj)=>{
    if(err)
    res.json(err);
    else
    res.json(resultobj);
  })
})
app.listen(process.env.API_PORT, ()=>{
  console.log(`server is running on port:${port}`);
});
