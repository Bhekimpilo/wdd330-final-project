let map;

export function displayMap(coord) {
    if (map != null) {
        map.remove();
    }
    map = L.map('map').setView([coord.latitude, coord.longitude], 5);
    
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
    }).addTo(map);
    
    L.marker([coord.latitude, coord.longitude]).addTo(map)
        .openPopup();
}

