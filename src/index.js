import L from '../node_modules/leaflet/dist/leaflet'

const map = L.map('map').setView([55.5172, 28.7770], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
    id: 'map',
}).addTo(map);
L.marker([55.5172, 28.7770]).addTo(map);