<template>
  <v-card>
    <v-card dark flat>
      <v-container fill-height>
        <v-layout align-center>
          <strong class="display-4 font-weight-regular mr-4">8</strong>
          <v-layout column justify-end>
            <div class="headline font-weight-light">Monday</div>
            <div class="text-uppercase font-weight-light">February 2015</div>
          </v-layout>
        </v-layout>
      </v-container>
    </v-card>
    <v-card-text class="py-0">
      <v-timeline align-top dense>
        <v-timeline-item
          color="pink"
          v-for="code in codeGroup.TRK_CODE"
          :key="code.CODE_CD"
        >
          <template v-slot:icon>
            <v-avatar>
              <img
                v-if="tracking[`${code.CODE_CD}_L`]"
                :src="
                  `http://localhost:8080/resources/images/cargotracking/IMG_${
                    code.CODE_CD
                  }_A.png`
                "
              />
              <img
                v-if="!tracking[`${code.CODE_CD}_L`]"
                :src="
                  `http://localhost:8080/resources/images/cargotracking/IMG_${
                    code.CODE_CD
                  }_B.png`
                "
              />
            </v-avatar>
          </template>
          <v-layout pt-3>
            <v-flex xs4>
              <strong>{{ code.CODE_NM }}</strong>
            </v-flex>
            <v-flex>
              <strong v-if="tracking[`${code.CODE_CD}_L`]">{{
                tracking[`${code.CODE_CD}_L`]
              }}</strong>

              <div class="caption">
                Plan : {{ tracking[`${code.CODE_CD}_E`] }}<Br /> Actual :{{
                  tracking[`${code.CODE_CD}_A`]
                }}
              </div>
            </v-flex>
          </v-layout>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
import Util from "@/util";

export default {
  props: {
    items: { type: [Array, Object] },
    title: { type: String }
  },
  data() {
    return {
      codeGroup: {},
      statusCodeList: [10, 20, 30, 40, 90, 10],
      requestParams: null,
      tracking: null
    };
  },
  async created() {
    this.requestParams = this.$route.params;
    var param = {
      GROUP_CD_LIST: [{ GROUP_CD: "TRK_CODE" }]
    };
    var result = await Util.getGroupCode(param);
    this.codeGroup = result;

    var SERVICE_GRP_CD = this.requestParams.SERVICE_GRP_CD;
    var BOUND_CD = this.requestParams.ORG_MANIFEST_TYPE;
    BOUND_CD = BOUND_CD === "I" ? "IN" : "OUT";

    var TRK_CODE = this.codeGroup.TRK_CODE;

    TRK_CODE = this._.filter(TRK_CODE, function(obj) {
      if (obj.REF1_CHAR == SERVICE_GRP_CD) {
        console.log(SERVICE_GRP_CD, obj.REF1_CHAR == SERVICE_GRP_CD);
        if (obj.REF2_CHAR === BOUND_CD || obj.REF2_CHAR === "ALL") {
          if (BOUND_CD == "IN" && obj.REF1_CD !== "AGT") return false;
          if (BOUND_CD == "OUT" && obj.REF2_CD !== "AGT") return false;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }

      // }
    });
    this.codeGroup.TRK_CODE = TRK_CODE;
    this.getData();
  },
  methods: {
    async getData() {
      var param = this.requestParams;

      if (param == null) {
        return;
      }

      if (this.requestParams.SERVICE_GRP_CD === "SEA") {
        param.QID = "vs.vs02.ct.VS_CARGOTRACKING_L001_0002S_SEA";
      } else if (this.requestParams.SERVICE_GRP_CD === "AIR") {
        param.QID = "vs.vs02.ct.VS_CARGOTRACKING_L001_0002S_AIR";
      } else {
        return;
      }
      var result = await Util.getPostData(param);
      this.tracking = result.length == 1 ? result[0] : null;
    },
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
