<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    src="http://kerolplay.com/resources/img/common/kerol_logo.png"
                    alt="Kerol"
                    width="122"
                    height="45"
                  />
                  <h3 class="flex my-4 primary--text">
                    Integrated Logistics Platform
                  </h3>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="model.id"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="model.pw"
                    v-on:keyup.enter="login"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <!-- <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn> -->
                <v-spacer></v-spacer>
                <locale-changer />
                <v-btn block color="primary" @click="login" :loading="loading"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// eslint-disable-next-line
import Util from "@/util";
import LocaleChanger from "@/components/common/LocaleChanger";
export default {
  components: {
    LocaleChanger
  },
  data: () => ({
    loading: false,
    model: {
      id: "devfskl",
      pw: "7788"
    }
  }),
  mounted() {
    console.log(this.$el.textContent); // can use $el
    this.$i18n.locale = Util.getBrowserLang().toLowerCase();
  },
  methods: {
    async login() {
      this.loading = true;
      var param = {
        approachType: "INSIDE",
        userId: this.model.id,
        userPassword: this.model.pw,
        LANG_TYPE_CD: Util.getBrowserLang()
      };
      try {
        var result = await this.$http.post(`/checkAccount.json`, param);
        if (result.data.RESULT_CD === "VALID_ACCOUNT") {
          result = await this.$http.post(`/j_kerol_session_check.json`, param);

          this.userInfo = result.data.USER_INFO;
          param = result.data.USER_INFO;
          param.QID = "menu.selectAllMenuList";
          param._S_PDA_YN = "N";
          var menu = await this.$http.post(
            `/BmCommon/selectListByQid.json`,
            this.userInfo
          );
          console.log(menu);
          sessionStorage.setItem(
            "USER_BASE_INFO_MAP",
            JSON.stringify(result.data.USER_INFO)
          );
          Util.setCookie("_S_USER_ID", this.userInfo._S_USER_ID, 1);
          this.$i18n.locale = this.userInfo._S_LANG_TYPE_CD.toLowerCase();
          this.$store.dispatch("setToken", this.userInfo._S_USER_ID);
          this.$store.dispatch("setUser", result.data.USER_INFO);

          this.$router.push("/main");
        } else {
          window.getApp.$emit("APP_LOGIN_FAILED", result.data.RESULT_MSG);
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
