<template>
  <v-autocomplete
    autocomplete
    :label="label"
    :loading="isLoading"
    cache-items
    chips
    :multiple="multiple"
    :items="itemList"
    item-text="CODE_TEXT"
    :item-value="itemValue"
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
    QID: { type: String },
    multiple: { type: Boolean, default: false },
    itemValue: { type: String, default: "CODE_CD" },
    itemText: { type: String, default: "CODE_NM" }
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

        var codeCd = this.itemValue;
        var codeNm = this.itemText;

        result = this._.map(result, function(obj) {
          obj.CODE_TEXT = `[${obj[codeCd]}] ${obj[codeNm]}`;
          return obj;
        });
        console.log(result);
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
