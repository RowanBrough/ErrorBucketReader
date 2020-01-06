<template lang="pug">
  
    v-data-table.elevation-1(
      :headers="headers",
      :items="dataSource",
      item-key="transactionid",
      :single-expand="true",
      :expanded.sync="expanded",
      show-expand,
      :sort-by="['receivedatetime']",
      :sort-desc="[true]")
      //- v-model="selected",
      //- show-select,
      //- :single-select="false",
      
      template(v-slot:item.receivedatetime="{ item }")
        span.text-no-wrap.overline {{ item.receivedatetime | moment("DD-MM-YYYY hh:mm:ss") }}
      
      template(v-slot:item.transactionid="{ item }")
        span.overline {{ item.transactionid }}

      template(v-slot:item.errordescription="{ item }")
        span.overline {{ item.errordescription }}

      template(v-slot:expanded-item="{headers, item}")
        td.pa-3(:colspan="headers.length")
          span.overline {{ item.errormessage }}

</template>

<script>
import headers from "../assets/errorBucketDataTableHeaders.json";
export default {
  props: ["dataSource"],
  data() {
    return {
      expanded: [],
      // selected: [],
      headers: headers
    };
  },
  created() {
    this.isLoading = true;
  },
  mounted() {
    this.$nextTick(function() {
      this.isLoading = false;
    });
  }
};
</script>
