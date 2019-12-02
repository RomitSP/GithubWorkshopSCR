let images = ['Amsterdam.jpg', 'HotelView.jpg', 'Rialto.jpg', 'rome.jfif', 'Faraglioni.jpg'];

let desc = ['View of the canals of Amsterdam at night', 'Sight from a hotel in Positano, Italy',
            'Gondola ride through the Rialto bridge in Venice, Italy', 'Colesseum in Rome, Italy',
            'Faraglioni Rocks in Capri, Italy'];

let desSites = ['https://www.europeanbestdestinations.com/destinations/amsterdam/',
                'https://www.europeanbestdestinations.com/destinations/positano/',
                'https://www.europeanbestdestinations.com/destinations/venice/',
                'https://www.europeanbestdestinations.com/destinations/rome/',
                'https://www.capri.com/'];
let makeImg = "";

for(i=0; i < images.length; i++) {
   makeImg += "<img src='./media/" + images[i] +"' id='" + i + "'" +
              "alt='" + desc[i] + "' " +
              "onmouseover='description(this.id);' " +
              "onmouseout='description(\"default\");' " +
              "onclick='destinationWindow(this.id)'/>" 
}

$(document).ready(function() {
   $('#vacaSites').html(makeImg);
})

let description = (id) => {
   if(id=="default") {
      $('#vacaSitesDesc').html('Check out these amazing destinations!');
   }
   else {
      $('#vacaSitesDesc').html(desc[id]);
   }
}

let destinationWindow = (id) => {
   var dWin = open(desSites[id], images[id], "height=350, width=400");
   setTimeout(function() {dWin.close()}, 4000);
}