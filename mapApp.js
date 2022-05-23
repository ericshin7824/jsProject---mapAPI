function initMap() {
    let options = {
        center: { lat: 34.052235, lng: -118.243683 },
        zoom: 8,
    };

    map = new google.maps.Map(document.getElementById('map'), options);
}
