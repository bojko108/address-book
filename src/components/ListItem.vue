<template>
    <!-- <div id="toggle-list-item" class="item">
                    <div class="item-content has-secondary">
                        {{feature.position.get('streetName') + feature.position.get('streetNumber')}}
                    </div>
                    <div class="item-secondary">
                        <label>
                            <q-checkbox v-model="feature.visited" @input="changeFeature()"></q-checkbox>
                            посетен
                        </label>
                    </div>
                </div> -->
    <q-item>
        <q-card>
            <q-card-title>
                {{feature.get('address')}}
            </q-card-title>
            <q-card-separator />
            <q-card-main>
                {{feature.getId()}}
            </q-card-main>
        </q-card>
    </q-item>
</template>

<script src="./ListItem.js"></script>

<style>

</style>

