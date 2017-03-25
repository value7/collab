module.exports = {
  arrToObj: function(array) {
    var res = {};
    for(var i = 0; i < array.length; i++) {
      res[array[i].id] = array[i];
    }
    return res;
  }
}
