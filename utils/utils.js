var utils = {
  handleBarsDataReady:function(result) {
    var totalImages = result.length;
    const NUMOFCARA = 3; // really 4 just b/c array is at zero
    var countNextCar = 3;
    imageResult = [];
    var temp = [];
    for(var iter = 0; iter < totalImages; iter++) {
      var img = result[iter].url;
      temp.push(img)
        if((iter === countNextCar) || (iter === totalImages-1)) {
          imageResult.push(temp);
          temp = [];
      }
    }
    return imageResult
  }


}

module.exports = utils;
