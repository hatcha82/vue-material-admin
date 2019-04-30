<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Filter"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      hide-headers
      :headers="headers"
      :items="items"
      :search="search"
      item-key="ORDER_SID"
    >
      <template v-slot:items="props">
        <div class="">
          <v-layout xs12 wrap class="pt-3">
            <v-flex xs12>
              <p class="pl-2 pr-2 caption">
                <v-chip small>
                  <v-avatar class="warning  white--text">O</v-avatar>
                  {{ props.item.ORDER_NO }}
                </v-chip>
                <v-chip small>
                  <v-avatar class="accent  white--text">B</v-avatar>
                  {{ props.item.BL_NO }}
                </v-chip>
                <v-chip small v-if="props.item.MANIFEST_TYPE">
                  <v-avatar class="error  white--text">{{
                    props.item.ORG_MANIFEST_TYPE
                  }}</v-avatar>
                  {{ props.item.MANIFEST_TYPE }}</v-chip
                >
              </p>
            </v-flex>
            <router-link
              class=""
              :to="{
                //path: `/TrackingDetail/${props.item.ORDER_SID}`,
                name: 'TrackingDetail',
                params: props.item
              }"
              tag="div"
              style="cursor: pointer;"
            >
              <v-flex xs12 caption>
                <v-layout wrap xs12>
                  <v-flex xs3>
                    <div class="pl-3 pr-3">
                      <v-icon
                        color="primary"
                        v-if="props.item.SERVICE_GRP_CD === 'SEA'"
                        >fas fa-ship</v-icon
                      >
                      <v-icon
                        color="info"
                        v-if="props.item.SERVICE_GRP_CD === 'AIR'"
                        >fas fa-plane</v-icon
                      >
                    </div>
                  </v-flex>
                  <v-flex xs3>
                    {{ props.item.POL_CD }}<br />
                    {{ props.item.ETA_DATE }}
                  </v-flex>
                  <v-flex mr-3 xs1>
                    <v-icon size="17">fas fa-chevron-right</v-icon>
                  </v-flex>
                  <v-flex xs3>
                    {{ props.item.POD_CD }}<br />
                    {{ props.item.ETD_DATE }}
                  </v-flex>
                  <v-flex xs12 pl-3 pr-3>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12>
                    <table class="mt-2">
                      <tr>
                        <th style="text-align:left">Shipper</th>
                      </tr>
                      <tr>
                        <td>{{ props.item.SHIPPER_CD }}</td>
                      </tr>
                    </table>

                    <table>
                      <tr>
                        <th style="text-align:left">Consignee</th>
                      </tr>
                      <tr>
                        <td>{{ props.item.CONSIGNEE_CD }}</td>
                      </tr>
                    </table>
                  </v-flex>
                  <v-flex xs12 pl-3 pr-3>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12>
                    <p class="pl-3 pr-2 text-sm-right" style="text-align:right">
                      <br />
                      Container Count : <v-icon small>fas fa-box</v-icon>
                      {{ props.item.CNT_CNTR }}<br />
                      {{ props.item.CNTR_NO }}
                    </p>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs12>
                <p class="pl-2 pr-2 caption">
                  <v-chip small v-if="props.item.CARGO_TRACING_STATUS">
                    <v-avatar class="success  white--text">S</v-avatar>
                    {{ props.item.CARGO_TRACING_STATUS }}</v-chip
                  >
                </p>
              </v-flex>
            </router-link>
          </v-layout>
          <v-divider></v-divider>
        </div>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    items: { type: [Array, Object] },
    title: { type: String }
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "No", value: "BL_NO" },
        { text: "so", value: "ORDER_NO" },
        { text: "No", value: "ETA_DATE" },
        { text: "so", value: "ETD_DATE" },
        { text: "No", value: "POD_CD" },
        { text: "so", value: "POL_CD" },
        { text: "so", value: "MANIFEST_TYPE" }
      ]
    };
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
table.v-table tbody td:first-child,
table.v-table tbody th:first-child {
  padding: 0;
  padding-left: 24px;
}
</style>
