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
              <v-widget :title="$t('PGM.TP1010010') + ' ' + $t('LBL.SETTING')">
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
              <v-widget :title="$t('PGM.TP1010010') + ' ' + $t('LBL.FILTER')">
                <div slot="widget-content">
                  <v-container fluid>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <KerolAutoComplete
                          QID="code.selectCompanyCode"
                          :label="$t('LBL.CUSTOMER')"
                          item-text="CODE_NM"
                          item-value="CODE_CD"
                          :select.sync="model.basic.CUSTOMER_CD"
                        >
                        </KerolAutoComplete>
                      </v-flex>
                      <v-flex xs6>
                        <v-subheader>{{ $t("LBL.BIZ_BOUND") }}</v-subheader>
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
                        <v-subheader>{{ $t("LBL.SERVICE") }}</v-subheader>
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
              <v-widget :title="$t('LBL.TRACKING') + ' ' + $t('LBL.FILTER')">
                <div slot="widget-content">
                  <v-container fluid>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <KerolAutoComplete
                          QID="code.selectSearchLocCode"
                          :label="$t('LBL.ORIGIN')"
                          item-text="CODE_NM"
                          item-value="CODE_CD"
                          :select.sync="model.tracking.ORIGIN"
                          multiple
                        >
                        </KerolAutoComplete>
                      </v-flex>
                      <v-flex xs12>
                        <KerolAutoComplete
                          QID="code.selectSearchLocCode"
                          :label="$t('LBL.DEST')"
                          item-text="CODE_NM"
                          item-value="CODE_CD"
                          :select.sync="model.tracking.DESTNATION"
                        >
                        </KerolAutoComplete>
                      </v-flex>
                      <v-flex xs12>
                        <v-subheader>{{ $t("LBL.PERIOD") }}</v-subheader>
                      </v-flex>
                      <v-flex xs12>
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
                      <v-flex xs12>
                        <KerolAutoComplete
                          QID="code.selectCompanyCode"
                          :label="$t('LBL.SHIPPER')"
                          item-text="CODE_NM"
                          item-value="CODE_CD"
                          :select.sync="model.tracking.SHIPPER"
                        >
                        </KerolAutoComplete>
                      </v-flex>
                      <v-flex xs12>
                        <KerolAutoComplete
                          QID="code.selectCompanyCode"
                          :label="$t('LBL.CONSIGNEE')"
                          item-text="CODE_NM"
                          item-value="CODE_CD"
                          :select.sync="model.tracking.CONSIGNEE_CD"
                        >
                        </KerolAutoComplete>
                      </v-flex>
                      <v-flex xs12>
                        <KerolAutoComplete
                          QID="code.selectCompanyCode"
                          :label="$t('LBL.CARRIER') + '/' + $t('LBL.AIR_LINER')"
                          item-text="CODE_NM"
                          item-value="CODE_CD"
                          :select.sync="model.tracking.CARRIER_CD"
                        >
                        </KerolAutoComplete>
                      </v-flex>
                      <v-flex xs12>
                        <KerolAutoComplete
                          QID="code.selectCompanyCode"
                          :label="$t('LBL.AGENT')"
                          item-text="CODE_NM"
                          item-value="CODE_CD"
                          :select.sync="model.tracking.AGENT_CD"
                        >
                        </KerolAutoComplete>
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
          ORIGIN: "",
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
