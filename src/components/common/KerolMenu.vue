<template>
  <div>{{ menuList }}</div>
</template>
<script>
export default {
  name: "kerol-menu",
  props: ["menuList"],
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
