/**
 * Created by ThomasHedegaard & Christopher on 21/02/15.
 */


var landscape = (function(){
    var xMax = 2;
    var xMin = -2;
    var yMax = 2;
    var yMin = -2;

    var getZ = function(x, y){
        return x * Math.exp(-x * x - y * y)
    };

    return {
        xMax: xMax,
        xMin: xMin,
        yMax: yMax,
        yMin: yMin,
        getZ: getZ
    };
})();
