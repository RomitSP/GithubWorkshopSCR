const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

let server = app.listen(8001, () => {
   const host = server.address().address;
   const port = server.address().port;

   console.log("Server is listening on port 8000. Ready to accept requests\n" +
      "Host Address: " + host + "\nPort: " + port);
});

app.use(express.static('views', { extensions: ['html', 'htm'], index: 'home.html' }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let sqlCon = mysql.createPool({
   connectionLimit: 10,
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'travelexperts'
});

// Render with EJS
// Images are place holder to render with each of the 4 vacation packages
let images = ['Amsterdam.jpg', 'HotelView.jpg', 'Rialto.jpg', 'rome.jfif', 'Faraglioni.jpg'];
app.get('/vPackagesForm', (req, res) => {
   let sql = "SELECT `PkgName`, `PkgStartDate`, `PkgEndDate`, `PkgDesc`, " +
      "`PkgBasePrice` FROM `packages` ";

   sqlCon.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Connected!');

      sqlCon.query(sql, (err, packages) => {
         if (err) throw err;
         let index = 0;
         res.render('vPackagesForm', { packages, images, index });
         connection.release();
      });
   });
});


// Render with EJS
app.get('/contact', (req, res) => {

   let sql = "SELECT `AgtFirstName`, `AgtLastName`, `AgtBusPhone`, `AgtEmail`," +
      " `AgtPosition`, `AgencyId` FROM `agents`";

   sqlCon.getConnection((err, connection) => {
      if (err) throw err;

      sqlCon.query(sql, (err, agents) => {
         if (err) throw err;
         res.render('contact', { agents });
         connection.release();
      });
   });
});

app.post('/register', (req, res) => {
   console.log("post");
   let data = [req.body.first_name, req.body.last_name, req.body.address,
   req.body.city, req.body.province, req.body.pCode,
   req.body.countrySelect, req.body.phone, req.body.email, req.body.password];

   let sql = "INSERT INTO `customers`(`CustFirstName`, `CustLastName`," +
      " `CustAddress`, `CustCity`, `CustProv`, `CustPostal`, `CustCountry`, " +
      "`CustBusPhone`, `CustEmail`, `password`) VALUES" +
      "(?,?,?,?,?,?,?,?,?,?);";

   sqlCon.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Connected!');

      sqlCon.query(sql, data, (err, result, fields) => {
         if (err) throw err;
         console.log(result);
         connection.release();
      });
   });

   res.redirect('thanks');
});

app.post("/vPackages_form", (req, res) => {
   let data = [req.body.dateLeaving, req.body.dateReturning, req.body.leavingFrom, req.body.vacaPackage];

   sqlCon.getConnection((err, connection) => {
      if (err) throw err;

      let sql = "INSERT INTO `orders`(`dateLeaving`, `dateReturning`,"
         + " `leavingFrom`, `packageChosen`) "
         + "VALUES (?,?,?,?)";
      sqlCon.query(sql, data, (err, result, fields) => {
         if (err) throw err;
         console.log(result);
         connection.release();
      });
   });

   res.redirect('thanks');
});


app.use((req, res, next) => {
   res.status(404).sendFile(__dirname + "/views/404.html");
});