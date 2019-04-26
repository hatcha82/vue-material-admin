<template>
  <div>
    <v-btn-toggle v-model="$i18n.locale">
      <v-btn
        flat
        v-for="(lang, i) in langs"
        :key="`Lang${i}`"
        :value="lang.code"
      >
        <span> <flag :squared="squared" :iso="lang.flag"/></span>
        &nbsp;&nbsp;{{ lang.code }}
      </v-btn>
    </v-btn-toggle>
  </div>
</template>
<script>
export default {
  name: "locale-changer",
  data() {
    return {
      squared: false,
      langs: [
        { code: "en", flag: "us" },
        { code: "ko", flag: "kr" },

        { code: "zh", flag: "cn" }
      ]
    };
  }
};
</script>
