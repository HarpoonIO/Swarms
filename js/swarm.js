/**
 * Created by Thomas Hedegaard & Christopher Mortensen on 21/02/15.
 */

var Swarm = function () {

    var noOfBees = 20;
    var noOfIterations = 500;
    var inertia = 0.1;
    var rhoParticle = 0.1;
    var rhoGlobal = 0.8;
    var vMax = 0.01;
    var fuzzy = false;

    var know;
    var beeSwarm = [];
    var bestBee;
    var xStart, yStart, vxStart, vyStart, distance, maxDist;
    var maxDistIda, maxDistIdb;


    // init();
    // simulate();

    var init = function () {

        know = new knowledgeExchange(beeSwarm);
        for (var i = 0; i < noOfBees; i++) {

            xStart = landscape.xMin + (landscape.xMax - landscape.xMin) * Math.random();
            yStart = landscape.yMin + (landscape.yMax - landscape.yMin) * Math.random();
            vxStart = (Math.random() - 0.5) * vMax;
            vyStart = (Math.random() - 0.5) * vMax;
            beeSwarm.push(new Bee(i, xStart, yStart, know, vxStart, vyStart, vMax, inertia, rhoParticle, rhoGlobal, fuzzy));

        }

    };

    var simulate = function () {
        bestBee = know.findBestBee();
        console.log("The current best bee is: " + bestBee.getBeeNumber() + ", at: " + bestBee.getX() + "," + bestBee.getY() + ", z: " + bestBee.getZ());

        for (var i = 0; i < noOfIterations; i++) {

            // Go through all bees every iteration
            beeSwarm.forEach(function(currentBee){

                currentBee.fly();

            });

            // Print who's the best bee
            bestBee = know.findBestBee();
            console.log("The current best bee is: " + bestBee.getBeeNumber() + ", at: " + bestBee.getX() + "," + bestBee.getY() + ", z: " + bestBee.getZ());

        }
    };

    var findMaxDistance = function(){

        var x2x1, y2y1 = 0;
        maxDist, maxDistIda, maxDistIdb = 0;

        for (var i = 0; i < noOfBees; i++) {

            for (var j = 0; j < noOfBees; j++) {

                // We use the Pythagorean Theorem to find the distance! -> √(x2 - x1) + (y2 - y1)
                x2x1 = Math.pow(beeSwarm[i].getX() - beeSwarm[j].getX(),2);
                y2y1 = Math.pow(beeSwarm[i].getY() - beeSwarm[j].getY(),2);
                distance = Math.sqrt(x2x1 + y2y1);

                if(distance > maxDist){ // Then we check if the new value is the new "best"

                    maxDist = distance;
                    maxDistIda = i;
                    maxDistIdb = j;

                }

            }

        }

    };

    return {}
};




