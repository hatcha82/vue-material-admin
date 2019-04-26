<template>
  <div id="media" class="media">
    <v-toolbar class="elevation-0 transparent media-toolbar">
      <locale-changer />
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="view">
        <v-btn flat value="list">
          <v-icon color="primary">view_headline</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <v-divider></v-divider>
    <div class="layout row media-layout">
      <div class="media-content flex transparent">
        <vue-perfect-scrollbar class="media-content--warp">
          <table>
            <tr v-for="(value, key) in $t('LBL')" v-bind:key="key">
              <th class="text-xs-left">{{ key }}</th>
              <td>{{ value }}</td>
            </tr>
          </table>
        </vue-perfect-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import Bytes from "bytes";
import { getFileMenu, getFile } from "@/api/file";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import LocaleChanger from "@/components/common/LocaleChanger";

export default {
  components: {
    VuePerfectScrollbar,
    LocaleChanger
  },
  props: {
    type: {
      type: String,
      default: "image"
    }
  },
  data: () => ({
    languges: [],
    size: "lg",
    view: "grid",
    selectedFile: {
      path: "/static/icon/empty_file.svg"
    },
    imageMime: ["image/jpeg", "image/png", "image/svg+xml"],

    folders: [
      {
        name: "bg",
        lastModified: "2018-03-03"
      },
      {
        name: "cards",
        lastModified: "2018-03-03"
      },
      {
        name: "avatar",
        lastModified: "2018-03-03"
      }
    ]
  }),
  computed: {
    mediaMenu() {
      return getFileMenu;
    },
    files() {
      return getFile();
    }
  },

  methods: {
    getLanguges() {
      var lang = this.$t("LBL");
      console.log(lang);
    },
    isImage(file) {
      return this.imageMime.includes(file.fileType);
    },
    mimeIcons(file) {
      return this.imageMime.includes(file.fileType)
        ? "image"
        : "insert_drive_file";
    },
    showDetail(file) {
      this.selectedFile = file;
    },
    fileSize(number) {
      return Bytes.format(number);
    },
    formateDate(string) {
      return string ? new Date(string).toLocaleDateString() : "";
    },
    computeFileImage(file) {
      return this.isImage(file) ? file.path : "/static/icon/file_empty.svg";
    }
  }
};
</script>
<style lang="stylus" scoped>
.media
  &-cotent--wrap

  &-menu
    min-width: 260px
    border-right: 1px solid #eee
    min-height: calc(100vh - 50px - 64px);
  &-detail
    min-width:300px
    border-left:1px solid #eee
</style>
