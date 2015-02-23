/**
 * Created by thomashed & christophermortensen on 21/02/15.
 */

var knowledgeExchange = function (beeSwarm) {
    var beeSwarm = beeSwarm;
    var bestBee;

    var findBestBee = function(){
        bestBee = beeSwarm[0];
        for(var i = 0; i < beeSwarm.length; i++){
            if(beeSwarm[i].getZ() > bestBee.getZ()){
                bestBee = beeSwarm[i];
            }
        }
        return bestBee;
    };

    return {
        findBestBee: findBestBee
    }
};