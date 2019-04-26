<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-text-field flat prepend-icon="search" label="Search">
          </v-text-field>
        </v-flex>
        <v-flex lg6 sm6 xs12>
          <router-link to="/dashboard" tag="div" style="cursor: pointer;">
            <mini-statistic
              icon="dashboard"
              :title="$t('PGM.WH1070090')"
              color="cyan darken-4"
              subTitle="Performance"
            >
            </mini-statistic>
          </router-link>
        </v-flex>
        <v-flex lg6 sm6 xs12>
          <mini-statistic
            icon="fas fa-route"
            :title="$t('LBL.TRACKING')"
            color="light-blue"
            subTitle="Sea/Air/Inland"
          >
          </mini-statistic>
        </v-flex>
        <!-- mini statistic  end -->
        <!-- acitivity widget -->
        <v-flex lg12 sm12 xs12>
          <v-widget :title="$t('PGM.DV1020')" contentBg="white">
            <tool-list :items="tools" slot="widget-content"></tool-list>
          </v-widget>
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <post-list-card :items="posts" title="News"></post-list-card>
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <post-list-card :items="posts" title="Article"></post-list-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import API from "@/api";
import MiniStatistic from "@/components/widgets/statistic/MiniStatistic";
import ToolList from "@/components/widgets/list/ToolList";
import PostListCard from "@/components/widgets/card/PostListCard";
import VWidget from "@/components/VWidget";
import Material from "vuetify/es5/util/colors";
export default {
  components: {
    VWidget,
    MiniStatistic,
    PostListCard,
    ToolList
  },
  data: () => ({
    color: Material,
    selectedTab: "tab-1",
    linearTrending: [
      {
        subheading: "Sales",
        headline: "2,55",
        caption: "increase",
        percent: 15,
        icon: {
          label: "trending_up",
          color: "success"
        },
        linear: {
          value: 15,
          color: "success"
        }
      },
      {
        subheading: "Revenue",
        headline: "6,553",
        caption: "increase",
        percent: 10,
        icon: {
          label: "trending_down",
          color: "error"
        },
        linear: {
          value: 15,
          color: "error"
        }
      },
      {
        subheading: "Orders",
        headline: "5,00",
        caption: "increase",
        percent: 50,
        icon: {
          label: "arrow_upward",
          color: "info"
        },
        linear: {
          value: 50,
          color: "info"
        }
      }
    ],
    trending: [
      {
        subheading: "Email",
        headline: "15+",
        caption: "email opens",
        percent: 15,
        icon: {
          label: "email",
          color: "info"
        },
        linear: {
          value: 15,
          color: "info"
        }
      },
      {
        subheading: "Tasks",
        headline: "90%",
        caption: "tasks completed.",
        percent: 90,
        icon: {
          label: "list",
          color: "primary"
        },
        linear: {
          value: 90,
          color: "success"
        }
      },
      {
        subheading: "Issues",
        headline: "100%",
        caption: "issues fixed.",
        percent: 100,
        icon: {
          label: "bug_report",
          color: "primary"
        },
        linear: {
          value: 100,
          color: "error"
        }
      }
    ],
    tools: [
      {
        link: "/tools/calculator",
        text: "CBM Calculator",
        desc: "M/T",
        color: "primary",
        icon: "fas fa-calculator"
      },
      { divider: true, inset: true },
      {
        link: "/tools/calculator",
        text: "Post Calculator",
        desc: "M/T",
        color: "primary",
        icon: "fas fa-calculator"
      }
    ]
  }),
  computed: {
    posts() {
      return API.getPost(3);
    },
    siteTrafficData() {
      return API.getMonthVisit;
    },
    locationData() {
      return API.getLocation;
    }
  }
};
</script>
