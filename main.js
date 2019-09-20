//MAP

var mymap = L.map('map', {
    center: [41.888634, -87.628091],
    zoom: 8,
    zoomControl: false,
});
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWNhcmRuaWNvbGFzOTEiLCJhIjoiY2swcnl3Ymt4MDFpMTNkcDVrdzRvMmQ5MyJ9.Jmw2gfO6CTF4yjmOkGm49w', {
    maxZoom: 20,
    attribution: 'Données &copy; Contributeurs <a href="http://openstreetmap.org">OpenStreetMap</a> + ' +
        '<a href="http://mapbox.com">Mapbox</a> | ' +
        '<a href="https://creativecommons.org/licenses/by/2.0/">CC-BY</a> ' +
        'Guillaume Rouan 2016',
    id: 'mapbox.streets'
}).addTo(mymap);
L.marker([41.888634, -87.628091]).addTo(mymap); 


//LISTE RESTAUS

const listOfRestaurant = document.querySelector('#liste');
const userClick = document.querySelector('#userSend');
const userInput = document.querySelector('#userInput');
console.log(listOfRestaurant);

const getResto = (city) => {
    const URL = `https://opentable.herokuapp.com/api/restaurants?city=${city}`;
    fetch(URL)
        .then(response => response.json())
        .then((data) => {
            console.log(data.restaurants);
            liste.innerHTML = '';
            data.restaurants.forEach(element => {
                listOfRestaurant.insertAdjacentHTML('beforeend', `                   
                    <li>
                        <div class="card mb-3 shadow-sm p-3 mb-5 bg-white rounded carte" style="max-width: 540px;">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${element.image_url}" class="card-img" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title"><a href="#">${element.name}</a></h5>
                                        <ul>
                                            <li>Price range : ${element.price}</li>
                                            <li>Phone : ${element.phone}</li>
                                            <li><a href="${element.reserve_url}" target="blank"><button>Réserver</button></a></li>
                                        </ul>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                `)
            });
        })
        .catch((error) => {
            console.log(error.message);
        });
    const URLVille = `https://nominatim.openstreetmap.org/q=${city}&format=json`;
    fetch(URLVille)
        .then(response => response.json())
        .then((data) => {
            console.log(data.lat, data.lng);
            liste.innerHTML = '';
            data.restaurants.forEach(element => {
                console.log(element.lat, element.lng);
            });
        })
        .catch((error) => {
            console.log(error.message);
        })
}
getResto("chicago");

userClick.addEventListener('click', (event) => {
    event.preventDefault();
    getResto(userInput.value);
});


