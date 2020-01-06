var dataSorting = {
  date_sort_asc: function(date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);

    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
  },

  date_sort_desc: function(date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);

    if (date1 > date2) return -1;
    if (date1 < date2) return 1;
    return 0;
  }
};

export default dataSorting;
