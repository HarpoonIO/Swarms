/**
 * Created by Thomas Hedegaard & Christopher Mortensen on 21/02/15.
 */

var Swarm = function () {

    var noOfBees = 20;
    var noOfIterations = 500;
    var currentIteration = 0;
    var inertia = 0.1;
    var rhoParticle = 0.1;
    var rhoGlobal = 0.8;
    var vMax = 0.01;
    var fuzzy = true;

    var know;
    var beeSwarm = [];
    var bestBee;
    var xStart, yStart, vxStart, vyStart, distance, maxDist;
    var maxDistIda, maxDistIdb;


    // init();
    // simulate();
    var iterationsLeftToUpdate = 0;

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
        currentIteration++;
        if(currentIteration < 500){
        bestBee = know.findBestBee();
        console.log("The current best bee is: " + bestBee.getBeeNumber() + ", at coordinates: " + bestBee.getX() + "," + bestBee.getY() + ", z: " + bestBee.getZ());

        //for (var i = 0; i < noOfIterations; i++) {
            console.log("------------------------------------ PRINTING nr: " + currentIteration + " ------------------------------------");
            // Go through all bees every iteration
            beeSwarm.forEach(function (currentBee) {

                currentBee.fly();
                console.log("BeeNumber: " + currentBee.getBeeNumber() + ", (" + currentBee.getX() + "," + currentBee.getY() + ")");

            });
            console.log("----------------------------------------------------------------------------------------------");
            // Print who's the best bee
            bestBee = know.findBestBee();
            console.log("The current best bee is: " + bestBee.getBeeNumber() + ", at: " + bestBee.getX() + "," + bestBee.getY() + ", z: " + bestBee.getZ());
        }
        if(currentIteration == 500){
            printStats();
        }
        //}
    };

    var findMaxDistance = function () {

        var x2x1, y2y1 = 0;
        maxDist = 0;
        maxDistIda = 0;
        maxDistIdb = 0;
        distance = 0;

        for (var i = 0; i < noOfBees; i++) {

            for (var j = 0; j < noOfBees; j++) {

                // We use the Pythagorean Theorem to find the distance! -> √(x2 - x1) + (y2 - y1)
                x2x1 = Math.pow(beeSwarm[i].getX() - beeSwarm[j].getX(), 2);
                y2y1 = Math.pow(beeSwarm[i].getY() - beeSwarm[j].getY(), 2);
                distance = Math.sqrt(x2x1 + y2y1);

                if (distance > maxDist) {

                    maxDist = distance;
                    maxDistIda = i;
                    maxDistIdb = j;

                }

            }

        }

    };

    var startSwarm = function(_noOfIterations){

        if(_noOfIterations){
            noOfIterations = _noOfIterations;
            console.log("Number of iterations: " + noOfIterations);
        }

        init();
        simulate();
        printStats();

    };

    var printStats = function(){
        findMaxDistance();

        console.log("--------------------Checking zone---------------------");
        console.log("Called from the swarm!");
        console.log("Number of bees: " + noOfBees);
        console.log("Number of iterations: " + noOfIterations);
        console.log("------------------------------------------------------");
        console.log("The biggest distance is: " + maxDist);
    };

    var getSwarm = function(){
        return beeSwarm;
    };

    var update = function(){
        if(iterationsLeftToUpdate > 0){
            iterationsLeftToUpdate--;
        }
        if(iterationsLeftToUpdate == 0){
            simulate();
            iterationsLeftToUpdate += 2;
        }

    };

    var draw = function () {
        // canvas length = 800
        // canvas width = 800
        // canvas center = 400,400
        // -2 < x > 2 & -2 < y > 2 is like
        // -400 < x > 400 & -400 < y > 400
        // 400 / 2 = 200 --> the factor is 200
        beeSwarm.forEach(function(currentBee){
            if(currentBee.getBeeNumber() == bestBee.getBeeNumber()){
                ctx.fillStyle = "#FF0000";
            } else{
                ctx.fillStyle = "#FFFF00";
            }
            ctx.shadowColor = '#000000';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.beginPath();
            ctx.arc(currentBee.getX()*200,currentBee.getY()*200,5,0,2*Math.PI);
            ctx.fill();
            ctx.stroke();


            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.beginPath();
            ctx.arc(currentBee.getX()*200,currentBee.getY()*200,10,0,2*Math.PI);
            ctx.fill();
            ctx.stroke();
        });
    };

    return {
        startSwarm: startSwarm,
        init: init,
        simulate: simulate,
        getSwarm: getSwarm,
        update: update,
        draw: draw
    }

};




