import config from '../Config.json';

export default {
    name: 'map-view',
    store: ['app'],
    mounted() {
        this.app = new UGisApp(config);
        this.app.createMap();
        this.app.createWidgets();
    }
}