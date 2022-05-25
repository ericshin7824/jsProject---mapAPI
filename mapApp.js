'use stric';

let mylatlng = { lat: 34.052235, lng: -118.243683 };
let mapOptions = {
    center: mylatlng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
};

//create map
let map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
let directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
let directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

// function
function calcRoute() {
    // create request
    let request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.DRIVING, // able to change walking,bycycle and ...
        unitSystem: google.maps.UnitSystem.IMPERIAL,
    };

    // pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // get distance and time
            const output = document.querySelector('#output');
            output.innerHTML =
                "<div class='alert-info'> from: " +
                document.getElementById('from').value +
                '.<br />To:' +
                document.getElementById('to').value +
                ". <br /> Driving distance <i class='fas fa-road'></i>:" +
                result.routes[0].legs[0].distance.text +
                ".<br />Duration <i class='fas fa-alarm-clock'></i> :" +
                result.routes[0].legs[0].duration.text +
                '. </div>';

            directionsDisplay.setDirections(result);
        } else {
            // delete route from the map
            directionsDisplay.setDirections({ routes: [] });

            // center map in Los Angeles
            map.setCenter(mylatlng);

            // show error message
            output.innerHTML =
                "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance. </div>";
        }
    });
}

// create auto complete object for all inputs
let options = {
    type: ['(cities)'],
};
let input1 = document.getElementById('from');
let autocomplte1 = new google.maps.places.Autocomplete(input1, options);

let input2 = document.getElementById('to');
let autocomplte2 = new google.maps.places.Autocomplete(input2, options);
