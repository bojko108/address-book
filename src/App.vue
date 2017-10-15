<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout ref="layout" view="hHh Lpr lFf" :left-breakpoint=3000>
      <!-- <q-toolbar slot="header" color="primary">
        <q-toolbar-title>
          Address Book
        </q-toolbar-title>
        <q-btn flat icon="featured_play_list" title="управление на адресите" @click="$refs.layout.toggleLeft()">Адреси</q-btn>
      </q-toolbar>

      <div slot="left" ref="leftDrawer">
        <div class="toolbar light">
          <q-toolbar-title :padding="1">
            Списък с адреси
          </q-toolbar-title>
        </div>

        <div class="row group flex justify-center">
          <button class="positive" title="добавяне на адрес" @click="showAddressesDialog()">
            добавяне
          </button>
          <button class="negative" title="премахване на всички адреси" @click="clear()">
            изчистване
          </button>
        </div>

        <div class="list">
          <div v-for="feature in features" @click="zoomTo(feature);flash(feature);">
            <toggle-list-item :feature="feature"></toggle-list-item>
          </div>
        </div>
      </div> -->

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
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#q-app {
  width: 100%;
  height: 100%;
}
</style>
