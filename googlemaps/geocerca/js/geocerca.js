// Removes the markers from the map, but keeps them in the array.
let geocerca = []
let markers = []
let poligonos = []
let map;
let marca
// Sets the map on all markers in the array.
function setMapOnAllPoligon(map) {
  for (let i = 0; i < poligonos.length; i++) {
    poligonos[i].setMap(map);
  }
}
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearPoligonos() {
  setMapOnAllPoligon(null);
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

  function initMap() {
    try{
      // Create the map.
      
      var btnEliminarCoordenadas = document.getElementById('btnEliminarCoordenadas');
      btnEliminarCoordenadas.addEventListener('click',()=>{
        clearMarkers();
        clearPoligonos();
        geocerca = []
        markers = [];
        poligonos = [];
      });

      var btnObtenerCoordenadas = document.getElementById('btnObtenerCoordenadas');
      btnObtenerCoordenadas.addEventListener('click',()=>{
        console.log(JSON.stringify(geocerca));
      });

      //localStorage.setItem("geocerca",JSON.stringify([]))
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: 37.09, lng: -95.712 },
        mapTypeId: 'satellite',
      });
      //mapTypeId: "terrain",
      
      //llenando marcación para mover
      var coord1 = document.getElementById('coord1');
      var coord2 = document.getElementById('coord2');
      
      marca = new google.maps.Marker({
        position:  { lat: 37.09, lng: -95.712 },
        map,
        title: "Click to zoom",
      });
      coord1.value = 37.09;
      coord2.value = -95.712;
      coord1.addEventListener('change',(event)=>{
        const posicion = marca.getPosition();
        var variable = new google.maps.LatLng(event.target.value, posicion.lng());
        //marca.setPosition(variable);
        marca.setMap(null);
        marca = new google.maps.Marker({
          position:  variable,
          map,
          title: "Click to zoom",
        }); 
      });
      coord2.addEventListener('change',(event)=>{
        const posicion = marca.getPosition();
        var variable = new google.maps.LatLng(posicion.lat(),event.target.value);
        //marca.setPosition(variable);
        marca.setMap(null);
        marca = new google.maps.Marker({
          position:  variable,
          map,
          title: "Click to zoom",
        }); 
      });

      map.addListener("click", (e) => {
        //geocerca =JSON.parse(localStorage.getItem("geocerca"))
        console.log('detectado click')
        console.log(JSON.stringify(e.latLng));
        
        const marker = new google.maps.Marker({
          position: e.latLng,
          map,
          title: "Click to zoom",
        });
        markers.push(marker);
        geocerca.push({
            lat:e.latLng.lat(),
            lng:e.latLng.lng()
        }); 
        clearPoligonos();
        const bermudaTriangle = new google.maps.Polygon({
          paths: geocerca,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });
        bermudaTriangle.setMap(map);
        poligonos.push(bermudaTriangle);
        //localStorage.setItem("geocerca",JSON.stringify(geocerca));
      });
    
    
    }catch(error){
      console.log(error)
    }

  }