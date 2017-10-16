<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout ref="layout" view="HHH Lpr lFf" :left-breakpoint="3000">

      <q-btn color="primary" style="top:.5em;z-index:999;margin:0 auto;display:block;" icon="featured_play_list" title="управление на адресите" @click="$refs.layout.toggleLeft()">Адреси</q-btn>
      
      <div slot="left" ref="leftDrawer">
        <q-toolbar slot="header" color="primary">
          <q-toolbar-title>
            Списък с адреси
          </q-toolbar-title>
        </q-toolbar>
        
        <div class="row group flex justify-center">
          <q-btn color="secondary" title="добавяне на адрес" @click="showAddressesDialog()">добавяне</q-btn>
          <q-btn color="deep-orange" title="премахване на всички адреси" @click="clear()">изчистване</q-btn>
        </div>

        <q-list v-if="features.length > 0" highlight>
          <div v-for="feature in features" @click="zoomTo(feature);flash(feature);">
            <list-item :feature="feature"></list-item>
          </div>
        </q-list>
      </div>

      <map-view></map-view>

    </q-layout>
  </div>
</template>

<script src="./App.js"></script>

<style>
html,
body {
  background-color: transparent !important;
  overflow: auto !important;
  font-family: 'Roboto';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
