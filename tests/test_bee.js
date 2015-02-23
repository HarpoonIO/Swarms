describe('The making of a single bee', function () {

    var bee;
    var beeId = 42;
    // Mocks
    var knowMock = { // TODO: Make this a spy
        findBestBee: function () {
            console.log("Called from mock");
            return 0;
        }
    };

    beforeEach(function () {
        bee = new Bee(beeId, 1, 1, knowMock, 0.1, 0.1, 0.7, 0.1, 0.01, 0.01, false);
    });

    it("should be defined!", function () {
        expect(bee).toBeDefined();
    });

    it("Should have the correct ID", function () {
        expect(bee.getBeeNumber()).toEqual(beeId);
    });

    it("Should return the correct z value", function(){

        var testX = bee.getX();
        var testY = bee.getY();
        var testZ = landscape.getZ(testX, testY);

        var beeZ = bee.getZ();

        expect(beeZ).toEqual(testZ);

    });

});
