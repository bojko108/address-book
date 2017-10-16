export default {
    name: 'list-item',
    store: ['app'],
    props: ['feature'],
    methods: {
        changeFeature() {
            if (this.feature.visited) {
                this.app.mapp.defaultLayer.getSource().removeFeature(this.feature.position);
            } else {
                this.app.mapp.defaultLayer.getSource().addFeature(this.feature.position);
            }
        }
    }
}