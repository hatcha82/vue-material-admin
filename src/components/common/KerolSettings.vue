<template>
  <div id="page-dialogs">
    <v-dialog
      v-model="fullscreen.dialog"
      fullscreen
      transition="dialog-bottom-transition"
      :overlay="false"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="fullscreen.dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t("PGM.CM2020") }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container grid-list-xl fluid>
          <v-layout row wrap>
            <v-flex lg6 xs12>
              <v-widget title="Basic Setting">
                <div slot="widget-content">
                  <v-container fluid>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-subheader> {{ $t("LBL.LANGUAGE") }}</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <locale-changer />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>
              </v-widget>
            </v-flex>
            <v-flex lg6 xs12>
              <v-widget title="Basic Filters">
                <div slot="widget-content">
                  <v-container fluid>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-subheader>Customer</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <KerolAutoComplete
                          QID="code.selectCompanyCode"
                          label="Company(Code, Name)"
                          autocomplete
                          cache-items
                          chips
                          item-text="CODE_NM"
                          item-value="CODE_CD"
                          :select.sync="model.basic.CUSTOMER_CD"
                        >
                        </KerolAutoComplete>
                      </v-flex>
                      <v-flex xs6>
                        <v-subheader>Business</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <v-radio-group
                          v-model="model.basic.BUSINESS_CD"
                          :mandatory="false"
                        >
                          <v-radio
                            v-for="code in model.codeGroup.BIZ_TYPE"
                            :key="code.CODE_CD"
                            :label="code.CODE_NM"
                            :value="code.CODE_CD"
                          ></v-radio>
                        </v-radio-group>
                      </v-flex>
                      <v-flex xs6>
                        <v-subheader>Service</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <v-checkbox
                          label="Sea"
                          v-model="model.basic.SERVICE_CD"
                          color="indigo"
                          value="SEA"
                          hide-details
                        ></v-checkbox>
                        <v-checkbox
                          label="Air"
                          v-model="model.basic.SERVICE_CD"
                          color="indigo darken-3"
                          value="AIR"
                          hide-details
                        ></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>
              </v-widget>
            </v-flex>
            <v-flex lg6 xs12>
              <v-widget title="Tracking Filters">
                <div slot="widget-content">
                  <v-container fluid>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-subheader>Origin</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <v-autocomplete
                          label="Select"
                          :items="items"
                          chips
                          tags
                          v-model="model.tracking.ORIGIN"
                          multi-line
                          item-text="country"
                          item-value="abbr"
                          return-object
                        >
                          <template slot="selection" slot-scope="data">
                            <v-chip
                              @input="data.parent.selectItem(data.item.abbr)"
                              class="chip--select-multi"
                              :selected="data.selected"
                              :key="JSON.stringify(data.item.abbr)"
                            >
                              <v-avatar class="accent">{{
                                data.item.abbr.slice(0, 1).toUpperCase()
                              }}</v-avatar>
                              {{ data.item.country }}
                            </v-chip>
                          </template>
                        </v-autocomplete>
                      </v-flex>
                      <v-flex xs6>
                        <v-subheader>Destination</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <v-autocomplete
                          label="Async items"
                          autocomplete
                          :loading="loading"
                          multiple
                          cache-items
                          chips
                          required
                          :items="items"
                          item-text="country"
                          item-value="country"
                          :rules="[
                            () =>
                              select.length > 0 ||
                              'You must choose at least one'
                          ]"
                          :search-input.sync="search"
                          v-model="select"
                        ></v-autocomplete>
                      </v-flex>
                      <v-flex xs6>
                        <v-subheader>Period</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <v-layout row wrap>
                          <v-flex xs11 sm5>
                            <v-dialog
                              ref="dialogFrom"
                              persistent
                              v-model="basic.dialogFrom"
                              lazy
                              full-width
                              width="290px"
                              :return-value.sync="model.basic.FROM_DATE"
                            >
                              <v-text-field
                                slot="activator"
                                label="From"
                                v-model="model.basic.FROM_DATE"
                                prepend-icon="event"
                                readonly
                              ></v-text-field>
                              <v-date-picker
                                v-model="model.basic.FROM_DATE"
                                scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  flat
                                  color="primary"
                                  @click="basic.dialogFrom = false"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  flat
                                  color="primary"
                                  @click="
                                    $refs.dialogFrom.save(model.basic.FROM_DATE)
                                  "
                                  >OK</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
                          </v-flex>
                          <v-spacer></v-spacer>
                          <v-flex xs11 sm5>
                            <v-dialog
                              ref="dialogTo"
                              persistent
                              v-model="basic.dialogTo"
                              lazy
                              full-width
                              width="290px"
                              :return-value.sync="model.basic.FROM_TO"
                            >
                              <v-text-field
                                slot="activator"
                                label="To"
                                v-model="model.basic.FROM_TO"
                                prepend-icon="event"
                                readonly
                              ></v-text-field>
                              <v-date-picker
                                v-model="model.basic.FROM_TO"
                                scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  flat
                                  color="primary"
                                  @click="basic.dialogTo = false"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  flat
                                  color="primary"
                                  @click="
                                    $refs.dialogTo.save(model.basic.FROM_TO)
                                  "
                                  >OK</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6>
                        <v-subheader>Shipper</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <v-autocomplete
                          label="Async items"
                          autocomplete
                          :loading="loading"
                          multiple
                          cache-items
                          chips
                          required
                          :items="items"
                          item-text="country"
                          item-value="country"
                          :rules="[
                            () =>
                              select.length > 0 ||
                              'You must choose at least one'
                          ]"
                          :search-input.sync="search"
                          v-model="select"
                        ></v-autocomplete>
                      </v-flex>

                      <v-flex xs6>
                        <v-subheader>Consignee</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <v-autocomplete
                          label="Async items"
                          autocomplete
                          :loading="loading"
                          multiple
                          cache-items
                          chips
                          required
                          :items="items"
                          item-text="country"
                          item-value="country"
                          :rules="[
                            () =>
                              select.length > 0 ||
                              'You must choose at least one'
                          ]"
                          :search-input.sync="search"
                          v-model="select"
                        ></v-autocomplete>
                      </v-flex>
                      <v-flex xs6>
                        <v-subheader>Carrier</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <v-autocomplete
                          label="Async items"
                          autocomplete
                          :loading="loading"
                          multiple
                          cache-items
                          chips
                          required
                          :items="items"
                          item-text="country"
                          item-value="country"
                          :rules="[
                            () =>
                              select.length > 0 ||
                              'You must choose at least one'
                          ]"
                          :search-input.sync="search"
                          v-model="select"
                        ></v-autocomplete>
                      </v-flex>
                      <v-flex xs6>
                        <v-subheader>Agent</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <v-autocomplete
                          label="Async items"
                          autocomplete
                          :loading="loading"
                          multiple
                          cache-items
                          chips
                          required
                          :items="items"
                          item-text="country"
                          item-value="country"
                          :rules="[
                            () =>
                              select.length > 0 ||
                              'You must choose at least one'
                          ]"
                          :search-input.sync="search"
                          v-model="select"
                        ></v-autocomplete>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>
              </v-widget>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VWidget from "@/components/VWidget";
import LocaleChanger from "@/components/common/LocaleChanger";
import KerolAutoComplete from "@/components/common/KerolAutoComplete";
import Util from "@/util";
export default {
  components: { VWidget, LocaleChanger, KerolAutoComplete },
  data() {
    return {
      e7: null,
      search: null,
      searchCustomer: null,
      select: [],
      loading: false,
      items: [],
      autoComplete: {
        customerList: []
      },
      model: {
        codeGroup: {},

        basic: {
          CUSTOMER_CD: null,
          BUSINESS_CD: "EX",
          SERVICE_CD: ["SEA"]
        },
        tracking: {
          ORIGIN: [],
          DESTNATION: "",
          FROM_DATE: null,
          TO_DATE: null,
          SHIPPER_CD: "",
          CONSIGNEE_CD: "",
          CARRIER_CD: "",
          AGENT_CD: ""
        }
      },
      basic: {
        dialog: false,
        dialogFrom: false,
        dialogTo: false
      },
      fullscreen: {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
      },
      scrollable: {
        name: "",
        dialog: false
      }
    };
  },
  watch: {
    async searchCustomer(val) {
      if (!val) return;
      if (val.length < 3) return;
      if (this.loading) return;

      try {
        this.loading = true;
        var param = { KEYWORD: val };
        param.QID = "code.selectCompanyCode";
        var result = await Util.getAutoCompleteResult(param);

        this.autoComplete.customerList = result;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {},
  created: async function() {
    var param = {
      GROUP_CD_LIST: [{ GROUP_CD: "BIZ_TYPE" }]
    };
    var result = await Util.getGroupCode(param);
    this.model.codeGroup = result;
  },
  methods: {
    handler(value) {
      alert(value);
    },
    openSettings: async function() {
      this.fullscreen.dialog = true;
    }
  }
};
</script>
