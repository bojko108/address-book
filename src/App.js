import { Dialog, Toast } from 'quasar';
import MapView from './components/MapView.vue';
import ListItem from './components/ListItem.vue';

export default {
  name: 'app',
  components: {
    'map-view': MapView,
    'list-item': ListItem
  },
  store: ['app'],
  computed: {
    features() { return (this.mainLayer ? this.mainLayer.getSource().getFeatures() : []); }
  },
  data() {
    return {
      index: 1, // for feature id's
      //address: '',
      address: 'бургас,Лазур, Демокрация 73;бургас, Фердинандова 82;бургас,Център, Княз Александър Батенберг 26',
      geocoder: {},
      mainLayer: false
    }
  },
  mounted() {
    this.$refs.layout.hideLeft();
    this.geocoder = this.app.widgets.geocode;
    this.mainLayer = this.app.mapp.getLayerBy('locations');
  },
  methods: {
    showAddressesDialog() {
      Dialog.create({
        title: 'Адреси',
        message: 'Въведете адрес или поредица от адреси разделени с ;. </br>Вместо адрес може да въведете географски координати във формат: latitude,longitude',
        form: {
          name: {
            type: 'text',
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
                  address: a
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
                this.geocodeAddress(data);
              });
            }
          }
        ]
      });
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
              this.mainLayer.getSource().clear();
            }
          }
        ]
      });
    },
    geocodeAddress(data) {
      let feature;
      if (data.location) {
        feature = this.createMarker({
          address: data.address,
          latitude: data.location.latitude,
          longitude: data.location.longitude
        });
        if (feature) this.mainLayer.getSource().addFeature(feature);
      } else {
        this.geocoder.geocodeByAddress(data.address, 'google')
          .then(result => {
            if (result.length > 0 && result[0].latitude && result[0].longitude) {
              feature = this.createMarker(result[0]);
              if (feature) this.mainLayer.getSource().addFeature(feature);
            }
          });
      }

    },
    createMarker(data) {
      let pnt = new ol.geom.Point([Number(data.longitude), Number(data.latitude)]);
      pnt.transform('EPSG:4326', this.app.mapp.projection);

      data.visited = false;

      let ftr = new ol.Feature();

      ftr.setId(this.index);
      this.index++;

      ftr.setGeometry(pnt);
      ftr.setProperties(data);

      return ftr;
    },
    zoomTo(ftr) {
      this.app.mapp.zoomTo(ftr.getGeometry().getExtent());
    },
    flash(ftr) {
      this.app.mapp.flash(ftr.getGeometry());
    },
    isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
  }
}