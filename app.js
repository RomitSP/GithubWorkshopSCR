const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const ejs = require('ejs');

	 var data=[];


let server = app.listen(8001, () => {
   var host = server.address().address;
   var port = server.address().port;

   console.log("Server is listening on port 8000. Ready to accept requests\n" +
      "Host Address: " + host + "\nPort: " + port);
});

app.use(express.static('views', { extensions: [ 'html', 'htm', 'ejs' ], index: 'home.html'}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

/*let sqlCon = mysql.createPool({
   connectionLimit: 10,
   host: 'localhost',
   user: 'root',
   password: 'password',
   database: 'travelexperts'
});*/

app.get('/vPackages_form', (req, res) => {
   let sql = "SELECT `PkgName`, `PkgStartDate`, `PkgEndDate`, `PkgDesc`, " +
             "`PkgBasePrice` FROM `packages` ";

   sqlCon.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Connected!');

      sqlCon.query(sql, (err, vPackages) => {
         if(err) throw err;
         let index = 0;
         res.render('vPackages_form', { vPackages, images, index });
         connection.release();
      });
   });
});
app.post("/vPackages_form", (req, res)=>{
	data[0] = req.body.dateLeaving;
	data[1] = req.body.dateReturning;
	data[2] = req.body.leavingFrom;
	data[3] = req.body.vacaPackage;

	console.log(req.body.dateLeaving);


	sqlCon.getConnection((err, connection)=>{
		if (err) throw err;
		
		var sql = "INSERT INTO `orders`(`DateLeaving`, `DateReturning`,"
			+ " `LeavingFrom`, `PackageChosen`) "
			+ "VALUES (?,?,?,?)";
		sqlCon.query(sql, data, (err, result, fields)=>{
			if (err) throw err;
			console.log(result);
			connection.release();
		});
	});	
});	

// Render with EJS
// Images are place holder to render with each of the 4 vacation packages
let images = ['Amsterdam.jpg', 'HotelView.jpg', 'Rialto.jpg', 'rome.jfif', 'Faraglioni.jpg'];


// Render with EJS
app.get('/contact', (req, res) => {

   let sql = "SELECT `AgtFirstName`, `AgtLastName`, `AgtBusPhone`, `AgtEmail`," + 
             " `AgtPosition`, `AgencyId` FROM `agents`";

   sqlCon.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Connected!');

      sqlCon.query(sql, (err, agents) => {
         if(err) throw err;
         res.render('contact', { agents });
         connection.release();
      });
   });
});

app.post('/register', (req, res) => {   
   let data = [req.body.fname, req.body.lname, req.body.addr,
   req.body.city, req.body.prov, req.body.pCode,
   req.body.country, req.body.hPhone, req.body.bPhone,
   req.body.email, 1];

   let sql = "INSERT INTO `customers`(`CustFirstName`, `CustLastName`," +
         " `CustAddress`, `CustCity`, `CustProv`, `CustPostal`, `CustCountry`, " +
         "`CustHomePhone`, `CustBusPhone`, `CustEmail`, `AgentId`) VALUES" +
         "(?,?,?,?,?,?,?,?,?,?,?);";

   sqlCon.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Connected!');

      sqlCon.query(sql, data, (err, result, fields) => {
         if (err) throw err;
         connection.release();
      });
   });

   res.redirect('thanks');
});



app.use((req, res, next)=>{
   res.status(404).sendFile(__dirname + "/views/404.html"); 
});