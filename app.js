const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

let server = app.listen(8001, () => {
   var host = server.address().address;
   var port = server.address().port;

   console.log("Server is listening on port 8000. Ready to accept requests\n" +
      "Host Address: " + host + "\nPort: " + port);
});

app.use(express.static('views', { extensions: ['html', 'htm'], index: 'home.html' }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let sqlCon = mysql.createPool({
   connectionLimit: 10,
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'travelexperts'
});

app.post('/register', (req, res) => {
   console.log(req.body);
   
   let data = [req.body.fname, req.body.lname, req.body.addr,
   req.body.city, req.body.prov, req.body.pCode,
   req.body.country, req.body.hPhone, req.body.bPhone,
   req.body.email, 1];

   sqlCon.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Connected!');

      let sql = "INSERT INTO `customers`(`CustFirstName`, `CustLastName`," +
         " `CustAddress`, `CustCity`, `CustProv`, `CustPostal`, `CustCountry`, " +
         "`CustHomePhone`, `CustBusPhone`, `CustEmail`, `AgentId`) VALUES" +
         "(?,?,?,?,?,?,?,?,?,?,?);";

      sqlCon.query(sql, data, (err, result, fields) => {
         if (err) throw err;
         console.log("Result: " + JSON.stringify(result, undefined, 2));

         connection.release();
      });
   });

   res.redirect('thanks');
});


app.use((req, res, next)=>{
   res.status(404).sendFile(__dirname + "/views/404.html"); 
});