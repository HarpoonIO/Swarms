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

    //var foo;

    beforeEach(function () {

        //foo = jasmine.createSpyObj('knowledgeExchange', ['findBestBee']); // name, [functions]

        bee = new Bee(beeId, 1, 1, knowMock, 0.1, 0.1, 0.7, 0.1, 0.01, 0.01, false);

    });

    it("should be defined!", function () {
        expect(bee).toBeDefined();
    });

    it("Should have the correct ID", function () {
        expect(bee.getBeeNumber()).toEqual(beeId);
    });

    it("Should call the fly function", function(){










    });

});
