const jsdom = require('mocha-jsdom');
const should = require('chai').should();
const html = "<div class='shobodot' style='height:100px;width:100px;'></div><audio id='dot' src='sounds/dot.wav'></audio>";
const ShoboDot = require('../shobodot.min.js').ShoboDot;
const paint = require('../shobodot.min.js').paint;
const deleteDot = require('../shobodot.min.js').deleteDot;
const getPositionId = require('../shobodot.min.js').getPositionId;
const getMouseColor = require('../shobodot.min.js').getMouseColor;

describe('ShoboDot', function() {
  this.timeout(15000);
  jsdom();
  describe('ShoboDot', function() {
    describe('new', function() {
      it('set canvas', function() {
        _setHTML();
        const shobodot = new ShoboDot();
        const dots = document.querySelectorAll('.dot');
        dots.should.have.lengthOf(70);
      });

      describe('clickFunction', function() {
        it('click dot', function() {
          const shobodot = new ShoboDot({ clickFunction: true });
          const dot = _getDot('1');
          dot.click();
          dot.style.backgroundColor.should.equal('black');
        });



        it('click colorBox', function() {
          const shobodot = new ShoboDot({ clickFunction: true, colorBoxes: true });
          const dot = _getDot('0');
          dot.click();
          getMouseColor().should.equal('rgb(255, 0, 0)');
        });
      });

      describe('setColorBoxes function', function() {
        it('make color boxes', function() {
          const shobodot = new ShoboDot({ colorBoxes: true });
          const dot = _getDot('1');
          dot.classList.contains('colorBox').should.equal(true);
        });
      });
    });
    //end of new

    describe('properties', function() {
      describe('dots', function() {
        it('return dots correctly', function() {
          const shobodot = new ShoboDot();
          shobodot.dots.should.have.lengthOf(ShoboDot.lastDotId + 1);
        });
      });
    });
  });
  //end of ShoboDot

  describe('paint function', function() {
    it('paint dot', function() {
      const dot = _getDot('1');

      paint(dot, 'black', 'player');
      dot.style.backgroundColor.should.equal('black');
    });

    it('add class', function() {
      const dot = _getDot('1');

      paint(dot, 'black', 'player');
      dot.classList.contains('player').should.equal(true);
    });
  });

  describe('delete function', function() {
    it("remove all classes except 'dot'", function() {
      const dot = _getDot('1');

      paint(dot, 'black', 'player');
      deleteDot(dot);
      dot.classList.contains('dot').should.equal(true);
      dot.classList.should.have.lengthOf(1);
    });

    it('make backgroundColor white', function() {
      const dot = _getDot(1);

      paint(dot, 'black', 'player');
      deleteDot(dot);
      dot.style.backgroundColor.should.equal('white');
    });

  });

  describe('getPositionId function', function() {
    it('return correct id', function() {
      const shobodot = new ShoboDot();
      getPositionId(0, 0).should.equal(0);
      getPositionId(5, 5).should.equal(45);
    });
  });

});

function _setHTML() {
  document.body.innerHTML = html;
}

function _getDot(id) {
  return document.getElementById(id);
}

