import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import StadiaMaps from 'ol/source/StadiaMaps.js';
import MousePosition from 'ol/control/MousePosition.js';
import { createStringXY } from 'ol/coordinate';

//add style modules

import {Style, Icon, Stroke, Fill} from 'ol/style';

//add geojson modules
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorSource} from 'ol/source'

//do init after dom loads
document.addEventListener("DOMContentLoaded", init);

function init() {

  //maps
  let basemap1 = new TileLayer({
    source: new OSM()
  });
  let basemap2 = new TileLayer({
    source: new OSM({
      "url": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
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
    ],
    view: new View({
      //center: [-7100000, 5600000],
      center: fromLonLat([-64.1, 45]),
      zoom: 14
    })
  });

  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    //className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
  });

  map.addControl(mousePositionControl);

  //call addwindsor layers function ato add geojson symbolized files
  addWindsorLayers(map)

}

let roadStyle = new Style({
  stroke: new Stroke({
    color: 'red',
    width: 5,
    lineDash: [40, 25]
  })
});
let munStyle = new Style({
  stroke: new Stroke({
    color: 'green',
    width: 5,
  }),
  fill: new Fill({
    color: 'yellow'
  })
});
let restStyle = new Style({
  image: new Icon({
    src: 'download.png',
    scale: 0.1
  })
});


function addWindsorLayers(map){



  //define restaurant geojson layer
  let restFile = './geojsons/restaurants.geojson'
  let restLyr = new VectorLayer({
  source: new VectorSource({
    url: restFile,
    format: new GeoJSON()
  }),
  style: restStyle
});

//define restaurant geojson layer
let munFile = './geojsons/municipal.geojson'
let munLyr = new VectorLayer({
source: new VectorSource({
  url: munFile,
  format: new GeoJSON()
  }),
  style: munStyle
});

//define restaurant geojson layer
let roadsFile = './geojsons/roads.geojson'
let roadsLyr = new VectorLayer({
source: new VectorSource({
  url: roadsFile,
  format: new GeoJSON()
}),
style: roadStyle
});

  //add layer to map
  // Add layers to map
  map.addLayer(restLyr);
  map.addLayer(munLyr);
  map.addLayer(roadsLyr);

}