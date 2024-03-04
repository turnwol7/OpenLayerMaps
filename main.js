import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import StadiaMaps from 'ol/source/StadiaMaps.js';

let basemap1 = new TileLayer({
  source: new OSM()
});
let basemap2 = new TileLayer({
  source: new OSM({
  "url" : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
  })
});

//stadia map
let basemap3 = new TileLayer({
  source: new StadiaMaps({
    layer: "stamen_toner_labels"
  })
});

const map = new Map({
  target: 'mainMap',
  layers: [basemap2, basemap3
    // new TileLayer({
    //   source: new OSM()
    // })
  ],
  view: new View({
    //center: [-7100000, 5600000],
    center: fromLonLat([-64, 45]),
    zoom: 10
  })
});