<template>
  <div class="__root">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions({
      login: "auth/onLogin",
    }),
  },
  mounted() {
    const payload = {
      email: "phonght@smartosc.com",
      password: "smart",
    };
    this.login(payload);
  },
};
</script>

<style lang="scss">
@import "./assets/style.scss";
</style>
