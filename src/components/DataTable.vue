<template lang="pug">
  v-simple-table
    thead
      tr
        th Transaction Id
        th Error
        th Date
        th Error Details
    tbody
      tr(v-for="item in this.dataSource")
        td {{ item.transactionid }}
        td {{ item.errordescription }}
        td {{ item.receivedatetime | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
        td {{ item.errormessage }}
</template>

<script>
export default {
  props: ["dataSource"]
};
</script>
