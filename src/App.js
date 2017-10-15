import { Dialog, Toast } from 'quasar';
import MapView from './components/MapView.vue';
import ToggleListItem from './components/ToggleListItem.vue';


// бургас,Лазур, Демокрация 73;бургас, Фердинандова 82;бургас,Център, Княз Александър Батенберг 26


export default {
  name: 'app',
  components: {
    'map-view': MapView,
    'toggle-list-item': ToggleListItem
  },
  store: ['features', 'app'],
  data() {
    return {
      address: '',
      geocoder: {},
    }
  },
  mounted() {
    this.$refs.layout.hideLeft();
    this.geocoder = this.app.widgets.geocode;
  },
  methods: {
    isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    clear() {
      Dialog.create({
        title: 'Изтриване',
        icon: 'done_all',
        message: 'Искате ли да изтриете всички адреси?',
        buttons: [
          {
            label: 'НЕ',
            handler() { }
          },
          {
            label: 'ДА',
            handler: () => {
              this.features = [];
              this.app.mapp.defaultLayer.getSource().clear();
            }
          }
        ]
      });
    },
    createMarker(data) {
      let ftr = new ol.Feature(),
        pnt = new ol.geom.Point([Number(data.longitude), Number(data.latitude)]);

      pnt.transform('EPSG:4326', this.app.mapp.projection);

      ftr.setGeometry(pnt);
      ftr.setProperties(data);
      ftr.setStyle(this.app.mapp.createStyle({
        circle: {
          fillColor: '#1589FF',
          strokeColor: '#FFFF00',
          radius: 10,
          strokeWidth: 5
        },
        text: {
          labelMask: "{streetName} {streetNumber}",
          font: "15px Calibri,sans-serif",
          offsetX: 20,
          offsetY: 0,
          textAlign: "start",
          textBaseline: "bottom",
          fillColor: "#FFFFFF",
          strokeColor: "#34282C",
          strokeWidth: 4,
          maxScale: 10000000
        }
      }));

      return ftr;
    },
    zoomTo(ftr) {
      this.app.mapp.zoomTo(ftr.position.getGeometry().getExtent());
    },
    flash(ftr) {
      this.app.mapp.flash(ftr.position.getGeometry());
    },
    geocodeAddresses() {
      this.features.forEach(feature => {
        if (feature.location) {
          feature.position = this.createMarker({
            streetName: feature.location.latitude,
            streetNumber: feature.location.longitude,
            latitude: feature.location.latitude,
            longitude: feature.location.longitude
          });
          this.app.mapp.defaultLayer.getSource().addFeature(feature.position);
        } else {
          this.geocoder.geocodeByAddress(feature.address, 'google')
            .then(result => {
              if (result[0].latitude && result[0].longitude) {
                feature.position = this.createMarker(result[0]);
                this.app.mapp.defaultLayer.getSource().addFeature(feature.position);
              }
            });
        }
      });
    },
    showAddressesDialog() {
      Dialog.create({
        title: 'Адреси',
        message: 'Въведете адрес или поредица от адреси разделени с ;. </br>Вместо адрес може да въведете географски координати във формат: latitude,longitude',
        form: {
          name: {
            type: 'textbox',
            label: '',
            model: ''
          }
        },
        buttons: [
          'Cancel',
          {
            label: 'Ok',
            handler: (data) => {
              this.address = data.name;
              this.address.split(';').forEach((a) => {
                let coords = a.split(','), lat, lon;
                let data = {
                  address: a,
                  position: {},
                  visited: false
                };
                // check if the user input contains coordinates data instead of an address:
                if (coords && coords.length == 2 && this.isNumeric(coords[0]) && this.isNumeric(coords[1])) {
                  lat = Number(coords[0]);
                  lon = Number(coords[1]);
                  data.location = {
                    latitude: lat,
                    longitude: lon
                  };
                }
                this.features.push(data);
              });
              this.geocodeAddresses();
            }
          }
        ]
      });
    }
  }
}