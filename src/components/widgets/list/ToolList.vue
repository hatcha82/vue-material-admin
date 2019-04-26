<template>
  <v-card class="elevation-0">
    <v-toolbar card dense color="transparent" v-if="title">
      <v-toolbar-title
        ><span>{{ title }}</span></v-toolbar-title
      >
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line class="pa-0">
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header">{{
            item.header
          }}</v-subheader>
          <v-divider v-else-if="item.divider" :key="index"></v-divider>
          <v-list-tile avatar v-else :key="item.title" @click="handleClick">
            <v-list-tile-avatar :color="item.color">
              <v-icon dark>{{ item.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-sub-title v-html="item.text"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action class="caption">
              {{ item.desc }}
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
      <v-divider></v-divider>
      <v-btn block flat class="ma-0">All</v-btn>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
//import notes from "@/api/notification";
export default {
  props: ["items", "title"],

  methods: {
    handleClick: e => {
      console.log(e);
    }
  }
};
</script>
