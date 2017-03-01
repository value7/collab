// Convert Javascript date to Pg YYYY MM DD HH MI SS
module.exports = {
  pgFormatDate: function(date) {
    /* Via http://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date */
    function zeroPad(d) {
      return ("0" + d).slice(-2)
    }

    var parsed = new Date(date)

    return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate()), zeroPad(parsed.getHours()), zeroPad(parsed.getMinutes()), zeroPad(parsed.getSeconds())].join(" ");
  },
  arrToObj: function(rows) {
    var res = {};
    for(var i = 0; i < rows.length; i++) {
      res[rows[i].id] = {};
      var keys = Object.keys(rows[i]);
      for(var j = 0; j < keys.length; j++) {
        res[rows[i].id][keys[j]] = rows[i][keys[j]];
      }
    }
    return res;
  }
}
