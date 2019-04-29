<template>
  <v-autocomplete
    autocomplete
    :label="label"
    :loading="isLoading"
    cache-items
    chips
    :items="itemList"
    item-text="CODE_NM"
    item-value="CODE_CD"
    :search-input.sync="search"
    v-model="select"
  ></v-autocomplete>
  <!-- <v-autocomplete ></v-autocomplete> -->
</template>

<script>
import { VAutocomplete } from "vuetify/lib";
import Util from "@/util";
export default {
  extends: VAutocomplete,
  data() {
    return {
      isLoading: false,
      search: null,
      itemList: [],
      select: null
    };
  },
  props: {
    label: { type: String },
    QID: { type: String }
  },
  watch: {
    select(newVal) {
      this.$emit("update:select", newVal);
    },
    async search(val) {
      if (!val) return;
      if (val.length < 3) return;
      if (this.isLoading) return;

      try {
        this.isLoading = true;
        var param = { KEYWORD: val };
        param.QID = this.QID;
        var result = await Util.getAutoCompleteResult(param);

        this.itemList = result;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style></style>
