<template>
  <div>
    <TrackingList :items="trackingList" />
  </div>
</template>

<script>
import TrackingList from "@/views/app/Tracking/TrackingList";

import Util from "@/util";

export default {
  components: {
    TrackingList
  },
  data() {
    return {
      trackingList: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      var param = {
        QID: "vs.vs02.ct.VS_CARGOTRACKING_L001_0001S",
        S_DATE_TYPE: "ORD",
        S_FROM_DATE: "2019-03-01",
        S_TO_DATE: "2019-05-07",
        _PROGRAM_ID: "VS1020020"
      };
      var result = await Util.getPostData(param);
      console.log(result);
      this.trackingList = result;
    }
  }
  //
};
</script>

<style></style>
