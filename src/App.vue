<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-drawer
          v-if="this.$route.path !== '/'"
          class="app--drawer"
        ></app-drawer>
        <app-toolbar
          v-if="this.$route.path !== '/'"
          class="app--toolbar"
        ></app-toolbar>
        <v-content>
          <!-- Page Header -->
          <page-header v-if="$route.meta.breadcrumb"></page-header>
          <div class="page-wrapper">
            <router-view></router-view>
          </div>
          <!-- App Footer -->
          <v-footer
            v-if="this.$route.path !== '/'"
            height="auto"
            class="white pa-3 app--footer"
          >
            <span class="caption"
              >isocked.com Design &copy; {{ new Date().getFullYear() }}</span
            >
            <v-spacer></v-spacer>
            <span class="caption mr-1"> {{ $t("message.hello") }}</span>
            <v-icon color="pink" small>favorite</v-icon>
          </v-footer>
        </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
        <!-- theme setting -->
        <!-- <v-btn
          v-if="this.$route.path !== '/'"
          small
          fab
          dark
          falt
          fixed
          top="top"
          right="right"
          class="setting-fab"
          color="red"
          @click="openThemeSettings"
        >
          <v-icon>settings</v-icon>
        </v-btn> -->
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
        >
          <theme-settings></theme-settings>
          <KerolSettings ref="kerolSettings"></KerolSettings>
        </v-navigation-drawer>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullpath"></router-view>
        </keep-alive>
      </transition>
    </template>
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import AppFab from "@/components/AppFab";
import PageHeader from "@/components/PageHeader";
import ThemeSettings from "@/components/ThemeSettings";
import KerolSettings from "@/components/common/KerolSettings";
import AppEvents from "./event";
export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings,
    KerolSettings
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: "",
      color: ""
    }
  }),

  computed: {
    hide() {
      return this.$route.path === "/login" || this.$route.path === "/register";
    }
  },

  created() {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },
  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0);
      this.rightDrawer = !this.rightDrawer;
    }
  }
};
</script>

<style lang="stylus" scoped>
.setting-fab
  top:50%!important;
  right:0;
  border-radius:0
.page-wrapper
  min-height:calc(100vh - 64px - 50px - 81px );
</style>
