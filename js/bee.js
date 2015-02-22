/**
 * Created by thomashed & christophermortensen on 21/02/15.
 */
var Bee = function(_beeNumber , _x, _y, _know, _vx, _vy, _vmax, _intertia, _rhoParticle, _rhoGlobal, _fuzzy){
    // Attributes
    var beeNumber = _beeNumber;
    var beeId;
    var x, y, xParticleMax, yParticleMax, zParticleMax, xGlobalMax, yGlobalMax,
        vx, vy, v, vmax, inertia, rhoParticle, rhoGlobal;
    var fuzzy;
    var bestBee;
    var know;

    beeId = beeNumber;
    know = _know;
    x = _x;
    y = _y;
    vx = _vx;
    vy = _vy;
    vmax = _vmax;
    inertia = _intertia;
    rhoParticle = _rhoParticle;
    rhoGlobal = _rhoGlobal;
    fuzzy = _fuzzy;
    xParticleMax = x;
    yParticleMax = y;

    var getZ = function(){
        return landscape.getZ(x, y);
    };

    zParticleMax = getZ(); // hmmmm...

    var getX = function(){
        return x;
    };

    var getY = function(){
        return y;
    };

    var getBeeNumber = function(){
        return beeNumber;
    };

    var fly = function(){
        bestBee = know.findBestBee();
        xGlobalMax = bestBee.getX();
        yGlobalMax = bestBee.getY();
        // update velocity
        vx = inertia * vx + rhoParticle * (xParticleMax - x) + rhoGlobal * (xGlobalMax - x);
        vy = inertia * vy + rhoParticle * (yParticleMax - y) + rhoGlobal * (yGlobalMax - y);

        if(fuzzy){
            vx = vx * Math.random();
            vy = vy * Math.random();
        }
        v = Math.sqrt(vx * vx + vy * vy);

        if(v > vmax){
            vx = vx * vmax / v;
            vy = vy * vmax / v;
        }

        // move bee
        x += vx;
        y += vy;

        // boundary control
        if(x > landscape.xMax) x = landscape.xMax;
        if(x < landscape.xMin) x = landscape.xMin;
        if(y > landscape.yMax) y = landscape.yMax;
        if(y < landscape.yMin) y = landscape.yMin;

        // review personal best
        if(getZ() > zParticleMax){
            xParticleMax = x;
            yParticleMax = y;
            zParticleMax = getZ();
        }
    };

    return {
        getX: getX,
        getY: getY,
        getZ: getZ,
        getBeeNumber: getBeeNumber,
        fly: fly
    }


};

