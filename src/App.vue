<template lang="pug">
  v-app
    v-container
      v-layout
        v-row
          v-col

            v-card
              v-card-actions
                v-list-item
                  v-list-item-avatar(size="70")
                    v-img(src="https://uploads.codesandbox.io/uploads/user/2dd7d100-5529-4c11-8868-0ea59c9c79bc/KKc_-dsicon.png")

                  v-list-item-content
                    v-list-item-title.headline.text-left Denmark Error Bucket Reader


            v-tabs(v-model="selectedTab").elevation-1

              v-tabs-slider
              
              v-tab(v-for="dataType in dataTypes", :key="dataType ") {{ dataType }}
              
              v-spacer
              
              v-text-field(
                v-model="search",
                append-icon="mdi-magnify",
                label="Search",
                single-line,
                hide-details)

            extendableDataTable(:dataSource="errorBucketData")

</template>

<script>
import errorBucketSample from "./assets/errorBucketSample.json";
import dataSorting from "./assets/dataSorting.js";
import dataTable from "./components/DataTable.vue";
import extendableDataTable from "./components/ExtendableDataTable.vue";

export default {
  name: "App",
  components: {
    dataTable,
    extendableDataTable
  },
  data() {
    return {
      errorBucketData: null,
      dataTypes: ["bingo", "casino", "all"],
      selectedTab: 0,
      search: ""
    };
  },
  watch: {
    selectedTab() {
      this.populateErrorBucketData();
    },
    search() {
      this.populateErrorBucketData();
    }
  },
  methods: {
    populateErrorBucketData() {
      let dataList = this.getErrorBucketData();
      dataList = this.removeMicrogamingString(dataList);
      dataList = this.filterErrorBucket(dataList, this.selectedTab);
      dataList = this.filterDataBySearch(dataList, this.search);
      this.errorBucketData = dataList;
    },
    getErrorBucketData() {
      let dataList = null;

      this.axios.interceptors.request.use(request => {
        console.log("Interceptor Request", request);
        return request;
      });
      this.axios.interceptors.response.use(response => {
        console.log("Interceptor Response:", response);
        return response;
      });

      let url =
        "https://bss2jq3kbk.execute-api.eu-west-1.amazonaws.com/prod_0_9/SAFE/errors/Microgaming";
      url = "https://localhost:44394/ErrorBucket";
      let apiKey = "0H4u8m05yN7s81vIlIzJfaI6NwBfdTh96pIwGVYt";
      let proxyIp = "41.223.120.233";
      proxyIp = "10.1.26.41";
      let proxyPort = "8080";

      this.axios({
        method: "get",
        url: url,
        responseType: "json",
        headers: {
          "x-api-key": apiKey,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept"
        },
        proxy: {
          host: proxyIp,
          port: proxyPort
        }
      })
        .then(function(response) {
          console.log("Axios Response: ", response);
        })
        .catch(function(error) {
          console.error("Axios Error: ", error);
        })
        .finally(function() {
          // always executed
        });

      if (errorBucketSample && errorBucketSample.results) {
        dataList = errorBucketSample.results;
      }
      return dataList;
    },
    removeMicrogamingString(dataList) {
      for (var i = 0; i < dataList.length; i++) {
        let toReplace = dataList[i].transactionid.toLowerCase();
        dataList[i].transactionid = toReplace.replace("microgaming_", "");
      }
      return dataList;
    },
    filterErrorBucket(dataList, filterBy) {
      switch (filterBy) {
        case 0:
          return dataList.filter(item => {
            return item.transactionid.match("bingo");
          });
        case 1:
          return dataList.filter(item => {
            return item.transactionid.match("casino");
          });
        default:
          return dataList;
      }
    },
    filterDataBySearch(dataList, searchText) {
      dataList = dataList.filter(item => {
        return (
          item.transactionid.match(searchText) ||
          item.errormessage.match(searchText) ||
          item.errordescription.match(searchText) ||
          item.errorid.match(searchText) ||
          item.errornumber.match(searchText)
        );
      });

      if (this.$moment.isDate(searchText)) {
        let date = this.$moment(searchText).tz();
        dataList = dataList.filter(item => {
          return (
            item.receivedatetime.match(date) ||
            this.extractDateTimeFromTransactionId(item.transactionid).match(
              date
            )
          );
        });
      }
      return dataList;
    },
    extractDateTimeFromTransactionId(transactionId) {
      let arr = transactionId.split("-");
      console.log("transactionId: ", arr);
      if (arr && arr.length === 3) {
        let date = this.$moment(arr[1]);
        if (date.isValid()) {
          return date;
        }
      }
      return "";
    }
  },
  created() {
    this.populateErrorBucketData();
  },
  mounted() {
    this.$nextTick(function() {});
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .v-input {
    margin: 0 10px 10px 0;
    padding: 10px;
  }
}
</style>