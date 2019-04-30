<template>
  <div>
    <v-widget title="Tracking List" class="mt-3">
      <div slot="widget-content">
        <template v-for="item in items">
          <div :key="item.ORDER_SID" class="mb-2">
            <v-layout xs12 wrap>
              <v-flex xs12>
                <p class="pl-2 pr-2">
                  <v-chip small>
                    <v-avatar class="warning  white--text">O</v-avatar>
                    {{ item.ORDER_NO }}
                  </v-chip>
                  <v-chip small>
                    <v-avatar class="accent  white--text">B</v-avatar>
                    {{ item.BL_NO }}
                  </v-chip>
                  <v-chip small v-if="item.CARGO_TRACING_STATUS">
                    <v-avatar class="success  white--text">S</v-avatar>
                    {{ item.CARGO_TRACING_STATUS }}</v-chip
                  >
                </p>
              </v-flex>
              <v-flex xs12 caption mb-3>
                <table>
                  <tr>
                    <td>
                      <div class="pl-3 pr-3">
                        <v-icon
                          color="primary"
                          v-if="item.SERVICE_GRP_CD === 'SEA'"
                          >fas fa-ship</v-icon
                        >
                        <v-icon
                          color="info"
                          v-if="item.SERVICE_GRP_CD === 'AIR'"
                          >fas fa-plane</v-icon
                        >
                      </div>
                    </td>
                    <td>
                      {{ item.POL_CD }}<br />
                      {{ item.ETA_DATE }}
                    </td>
                    <td>
                      <div class="pl-3 pr-3">
                        <v-icon size="17">fas fa-chevron-right</v-icon>
                      </div>
                    </td>
                    <td>
                      {{ item.POD_CD }}<br />
                      {{ item.ETD_DATE }}
                    </td>
                  </tr>
                </table>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </div>
        </template>
      </div>
    </v-widget>
  </div>
</template>

<script>
import VWidget from "@/components/VWidget";
export default {
  components: { VWidget },
  props: {
    items: { type: [Array, Object] },
    title: { type: String }
  },
  data() {
    return {};
  },
  methods: {
    handleThumb() {
      // implement your own method here
    },
    handleComment() {
      // implement your own method here
    },
    handleFavorite() {
      // implement your own method here
    }
  }
};
</script>

<style scoped>
.ft-200 {
  font-weight: 200;
}
.post--item:hover {
  background: #f6f6f6;
}
.post--item a {
  text-decoration: none;
}
.flex-list.vertical {
  flex-direction: column;
}
.flex-list li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}
.flex-list li:last-child {
  border: none;
}

.flexbox-centering {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-scale:hover {
  transform: scale(1.05);
  transition: 0.7s;
}
</style>
