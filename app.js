const express = require('express');
const app = express();

let server = app.listen(8001, ()=> {
      var host = server.address().address;
      var port = server.address().port;
      
      console.log("Server is listening on port 8000. Ready to accept requests\n" + 
                  "Host Address: " + host + "\nPort: " + port);
});

app.use(express.static('views', {extensions:['html', 'htm'], index: 'home.html'}));
app.use(express.static('public'));


app.use((req, res, next)=>{
   res.status(404).sendFile(__dirname + "/views/404.html");
});