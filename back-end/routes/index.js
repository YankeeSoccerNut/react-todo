var express = require('express');
var router = express.Router();
let mysql = require('mysql');
let config = require('../config/config');
let connection = mysql.createConnection(config);
connection.connect();

/* GET home page. */
router.get('/getStudents', function(req, res, next) {
  const selectQuery = `SELECT * FROM students;`;

  let dbPromise = new Promise(function(resolve, reject) {
    connection.query(selectQuery, (error, results)=>{
      if(error){
        console.log(error);
        reject();
      } else {
        console.log(results);
        resolve(results);
      }
    })
  });

  dbPromise.then((results) => {
    res.json(results);
  })
  .catch((err) => {
    console.log(err);
    res.json({name: "ERRORS"});
  });
});

router.post('/addStudent',(req, res)=>{
  console.log('hit /addStudent route in BE');
  const studentName = req.body.studentName;
  let insertQuery = `INSERT INTO students (name) VALUES (?);`;
  console.log(insertQuery);
  let dbPromise = new Promise(function(resolve, reject) {
    connection.query(insertQuery, [studentName],(error, results)=>{
      if(error){
        console.log(error);
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });

  dbPromise.then((results) => {
    const selectQuery = `SELECT * from students;`;
    let dbPromiseTwo = new Promise(function(resolve, reject) {
      connection.query(selectQuery, (error, results)=>{
      if(error){
        reject(error);
      } else {
        resolve(results);
      }
    });

    dbPromiseTwo.then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
      res.json({name: "ERRORS"});
    });
  });
});
});

router.get('/getTasks', function(req, res, next) {
  const selectQuery = `SELECT * FROM tasks;`;

  let dbPromise = new Promise(function(resolve, reject) {
    connection.query(selectQuery, (error, results)=>{
      if(error){
        console.log(error);
        reject();
      } else {
        console.log(results);
        resolve(results);
      }
    })
  });

  dbPromise.then((results) => {
    res.json(results);
  })
  .catch((err) => {
    console.log(err);
    res.json({});
  });
});

router.post('/addTask',(req, res)=>{
  console.log('hit /addTask route in BE');

  const taskName = req.body.taskName;
  const taskDate = req.body.taskDate;

  const insertQuery = `INSERT INTO tasks (taskName, taskDate) VALUES (?,?);`;

  let dbPromise = new Promise(function(resolve, reject) {
    connection.query(insertQuery, [taskName, taskDate],(error)=>{
      if(error){
        console.log(error);
        reject(error);
      } else {
        resolve({msg:"SUCCESS"});
      }
    });
  });

  dbPromise.then((promiseResponse) => {
    const selectQuery = `SELECT * FROM tasks;`;
    connection.query(selectQuery, (error,results)=>{
      if(error){
        throw(error)
      } else {
        res.json(results);
      }
    })
  .catch((error) => {
    console.log(error);
    })
  });

});

module.exports = router;
