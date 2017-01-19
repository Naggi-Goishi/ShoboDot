const jsdom = require('mocha-jsdom');
const should = require('chai').should();
const html = "<div class='shobodot' style='height:100px;width:100px;'></div><audio id='dot' src='sounds/dot.wav'></audio>";
const ShoboDot = require('../shobodot.min.js').ShoboDot;
const Dot = require('../shobodot.min.js').Dot;
const paint = require('../shobodot.min.js').paint;
const deleteDot = require('../shobodot.min.js').deleteDot;
const getPositionId = require('../shobodot.min.js').getPositionId;
const getMouseColor = require('../shobodot.min.js').getMouseColor;
const Xline = 8;
const Yline = 8;

describe('ShoboDot', function() {
  this.timeout(15000);
  jsdom();
  describe('ShoboDot Object', function() {
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
          dot.style.backgroundColor.should.equal('rgb(0, 0, 0)');
        });
        it('click colorBox', function() {
          const shobodot = new ShoboDot({ clickFunction: true, colorBoxes: true });
          const dot = _getDot('0');
          dot.click();
          getMouseColor().should.equal('rgb(240, 248, 255)');
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
      dot.style.backgroundColor.should.equal('rgb(255, 255, 255)');
    });

  });

  describe('getPositionId function', function() {
    it('return correct id', function() {
      const shobodot = new ShoboDot();
      getPositionId(0, 0).should.equal(0);
      getPositionId(5, 5).should.equal(45);
    });
  });
  // end of describing ShoboDot Object.

  describe('Dot Object', function() {
    describe('move', function() {
      describe('up', function() {
        it("update it's positionId", function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          const nextId = positionId - Xline;
          const nextDot = document.getElementById(nextId);
          dot.moveUp();
          dot.positionId.should.equal(nextId);
        });

        it('move class name up', function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          const nextId = positionId - Xline;
          const nextDot = document.getElementById(nextId);
          dot.moveUp();
          nextDot.classList.contains('player').should.equal(true);
        });

        it('delete backgroundColor of current dot', function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          dot.moveUp();
          const backgroundColor = document.getElementById(positionId).style.backgroundColor;

          backgroundColor.should.equal('rgb(255, 255, 255)');
        });

        it('paint backgroundColor of next dot', function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          const nextId = positionId - Xline;
          const nextDot = document.getElementById(nextId);
          dot.moveUp();

          nextDot.style.backgroundColor.should.equal('rgb(240, 248, 255)');
        });
      });
      // end of up

      describe('down', function() {
        it("update it's positionId", function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          const nextId = positionId + Xline;
          const nextDot = document.getElementById(nextId);
          dot.moveDown();
          dot.positionId.should.equal(nextId);
        });

        it('move class name up', function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          const nextId = positionId + Xline;
          const nextDot = document.getElementById(nextId);
          dot.moveDown();
          nextDot.classList.contains('player').should.equal(true);
        });

        it('delete backgroundColor of current dot', function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          dot.moveDown();
          const backgroundColor = document.getElementById(positionId).style.backgroundColor;

          backgroundColor.should.equal('rgb(255, 255, 255)');
        });

        it('paint backgroundColor of next dot', function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          const nextId = positionId + Xline;
          const nextDot = document.getElementById(nextId);
          dot.moveDown();

          nextDot.style.backgroundColor.should.equal('rgb(240, 248, 255)');
        });
      });
      // end of down

      describe('left', function() {
        it("update it's positionId", function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          const nextId = positionId - 1;
          const nextDot = document.getElementById(nextId);
          dot.moveLeft();
          dot.positionId.should.equal(nextId);
        });

        it('move class name up', function() {
          const positionId = 12;
          const dot = new Dot(12, 'player', '#f0f8ff');
          const nextId = positionId - 1;
          const nextDot = document.getElementById(nextId);
          dot.moveLeft();
          nextDot.classList.contains('player').should.equal(true);
        });

        it('delete backgroundColor of current dot', function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          dot.moveLeft();
          const backgroundColor = document.getElementById(positionId).style.backgroundColor;

          backgroundColor.should.equal('rgb(255, 255, 255)');
        });

        it('paint backgroundColor of next dot', function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          const nextId = positionId - 1;
          const nextDot = document.getElementById(nextId);
          dot.moveLeft();

          nextDot.style.backgroundColor.should.equal('rgb(240, 248, 255)');
        });
      });
      // end of left

      describe('right', function() {
        it("update it's positionId", function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          const nextId = positionId + 1;
          const nextDot = document.getElementById(nextId);
          dot.moveRight();
          dot.positionId.should.equal(nextId);
        });

        it('move class name up', function() {
          const positionId = 12;
          const dot = new Dot(12, 'player', '#f0f8ff');
          const nextId = positionId + 1;
          const nextDot = document.getElementById(nextId);
          dot.moveRight();
          nextDot.classList.contains('player').should.equal(true);
        });

        it('delete backgroundColor of current dot', function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          dot.moveRight();
          const backgroundColor = document.getElementById(positionId).style.backgroundColor;

          backgroundColor.should.equal('rgb(255, 255, 255)');
        });

        it('paint backgroundColor of next dot', function() {
          const positionId = 12;
          const dot = new Dot(positionId, 'player', '#f0f8ff');
          const nextId = positionId + 1;
          const nextDot = document.getElementById(nextId);
          dot.moveRight();

          nextDot.style.backgroundColor.should.equal('rgb(240, 248, 255)');
        });
      });
      // end of right
    });
    // end of move
  });
  // end of Dot Object

});

function _setHTML() {
  document.body.innerHTML = html;
}

function _getDot(id) {
  return document.getElementById(id);
}

