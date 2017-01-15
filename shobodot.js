let mouseColor = 'black';
let command = false;
const playerInstances = [];
const getMouseColor = function getMouseColor() {
  return mouseColor;
};

const paint = function paint(dot, color, name) {
  _changeBackgroundColor();
  _addClass();
  _playAudio();

  function _changeBackgroundColor() {
    if (!dot) return;
    if (!color) {
      dot.style.backgroundColor = mouseColor;
    } else {
      dot.style.backgroundColor = color;
    }
  }

  function _addClass() {
    if (!!name) {
      dot.classList.add(name);
    }
  }

  function _playAudio() {
    const audio = document.getElementById('dot');
    audio.play();
  }
};
//end of paint

const deleteDot = function deleteDot(dot) {
  if (!dot) return;
  _clearClassList();
  _paintWithWhite();

  function _clearClassList() {
    dot.classList = "";
    dot.classList.add('dot');
  }

  function _paintWithWhite() {
    dot.style.backgroundColor = 'white';
  }
};
//end of deleteDot

const getPositionId = function getPositionId(x, y) {
  const result = Math.round(ShoboDot.getXline() * y + x);
  if (result <= ShoboDot.maxDots) {
    throw new Error(`The coordinations are out of range, ${result}`);
  }
  return result;
};

// ShoboDot func starts.
function ShoboDot(options) {
  this.config = Object.assign({
    colorBoxes: false,
    clickFunction: false,
  }, options);
  let _dots;

  Object.defineProperty(this, 'dots', {
    get: function() {
      return _dots;
    },
    set: function(val) {
      _dots = val;
    }
  });

  this.init();
}


//Properties of Prototypes of Shobodot

//Constructor
ShoboDot.prototype.init = function init() {
  const self = this;
  _setCanvas();
  if (this.config.colorBoxes) {
    _setColorBoxes();
  }
  if (this.config.clickFunction) {
    _setClickFunction();
  }

  //definitions of private functions
  function _setCanvas() {
    const canvas = document.querySelector('.shobodot');
    const maxYDots = canvas.offsetHeight / 12 || canvas.style.height.slice(0, -2) / 12;
    const maxXDots = canvas.offsetWidth / 12 || canvas.style.width.slice(0, -2) / 12;
    const maxDots = maxYDots * maxXDots;
    _validate(maxYDots, maxXDots, canvas);

    let html = '';
    for (var i = 0; i < maxDots; i++) {
      html += `<div class='dot' id='${i}'></div>`;
    }
    canvas.innerHTML = html;

    _setVariables();

    function _setVariables() {
      self.dots = Array.from(document.querySelectorAll('.dot'));
      ShoboDot.lastDotId = Math.round(maxDots);
      ShoboDot.maxYDots = Math.floor(maxYDots);
      ShoboDot.maxXDots = Math.floor(maxXDots);
      ShoboDot.getXline = function getXline() {
        let i = 0;
        self.dots.forEach(function(dot) {
          if (dot.offsetTop === 1) {
            i += 1;
          }
        });
        if (i === 0) {
          i = Math.floor(maxXDots);
        }
        return i;
      };
    }

  }
  //end of _setCanvas

  //make dots from # 0 to 309 color Boxes
  function _setColorBoxes() {
    const rgb = new RGB();
    const colors = [];
    let r = rgb.r;
    let g = rgb.g;
    let b = rgb.b;

    _setColors();
    _paintColorBoxes();

    function _setColors() {
      colors.push(..._add('g'));
      rgb.g = rgb.max;
      colors.push(..._substract('r'));
      rgb.r = 0;
      colors.push(..._add('b'));
      rgb.b = rgb.max;
      colors.push(..._substract('g'));
      rgb.g = 0;
      colors.push(..._add('r'));
      rgb.r = rgb.max;
      colors.push(..._substract('b'));
      rgb.b = 0;
    }

    function _paintColorBoxes() {
      let i = 0;
      for (let color of colors) {
        if (i > ShoboDot.lastDotId) return;
        dot = document.getElementById(i);
        dot.style.backgroundColor = color;
        dot.classList.add('colorBox');
        i += 1;
      }
    }

    function _add(i) {
      const colors = [];
      if (i === 'r') {
        for (r; r < rgb.max; r += 5) {
          colors.push(`rgb(${r}, ${g}, ${b})`);
        }
      } else if (i === 'g') {
        for (g; g < rgb.max; g += 5) {
          colors.push(`rgb(${r}, ${g}, ${b})`);
        }
      } else if (i === 'b') {
        for (b; b < rgb.max; b += 5) {
          colors.push(`rgb(${r}, ${g}, ${b})`);
        }
      }
      return colors;
    }

    function _substract(i) {
      const colors = [];
      if (i === 'r') {
        for (r; r >= 0; r -= 5) {
          colors.push(`rgb(${r}, ${g}, ${b})`);
        }
      } else if (i === 'g') {
        for (g; g >= 0; g -= 5) {
          colors.push(`rgb(${r}, ${g}, ${b})`);
        }
      } else if (i === 'b') {
        for (b; b >= 0; b -= 5) {
          colors.push(`rgb(${r}, ${g}, ${b})`);
        }
      }
      return colors;
    }
  }
  //end of setColorBoxes

  function _setClickFunction() {
    const dots = self.dots;
    dots.forEach(function(dot) {
      if (_colorBox(dot)) {
        dot.addEventListener('click', _changeMouseColor);
      } else {
        dot.addEventListener('click', _clickDot);
      }
    });

    function _changeMouseColor() {
      mouseColor = this.style.backgroundColor;
    }

    function _clickDot() {
      if (command) {
        deleteDot(this);
      } else {
        paint(this);
      }
    }

    function _colorBox(dot) {
      return dot.classList.contains('colorBox');
    }
  }
  //end of _setClickFunction

  function _validate(y, x, canvas) {
    if (!canvas) {
      throw new Error(
        'No html block that has class, shobodot');
    }
    if (_noSize()) {
      throw new Error(
        'The height and width of canvas is undefined.' +
        'You have to give canvas the properties');
    } else if (_tooSmall()) {
      throw new Error(
        `The height or width of shobodot div is too short.
         maxXDots: ${x} maxYDots: ${y}`
      );
    }

    function _noSize() {
      return !y || !x;
    }

    function _tooSmall() {
      return y < 1 || x < 1;
    }
  }
  //end of _valudateCanvas
};

// ShoboDot ends

// RGB func starts
function RGB() {
  var _max = 255;
  var _r = 255;
  var _g = 0;
  var _b = 0;
  Object.defineProperty(this, 'max', {
    get: function() {
      return _max;
    },
    set: function(val) {
      _max = val;
      if (_max < 0) {
        _max = 255;
      }
      colors = ShoboDot.prototype.setColorBoxes();
    }
  });
  Object.defineProperty(this, 'r', {
    get: function() {
      return _r;
    },
    set: function(val) {
      _r = val;
      if (_r > _max) {
        _r = _max;
      }
    }
  });
  Object.defineProperty(this, 'g', {
    get: function() {
      return _g;
    },
    set: function(val) {
      _g = val;
      if (_g > _max) {
        _g = _max;
      }
    }
  });
  Object.defineProperty(this, 'b', {
    get: function() {
      return _b;
    },
    set: function(val) {
      _b = val;
      if (_b > _max) {
        _b = _max;
      }
    }
  });
}
//RGB func ends

//Dot func starts, most objects will inherit this func.
function Dot(positionId, name, color) {
  const Xline = ShoboDot.getXline();
  let _positionId = positionId;
  let _color = color;
  let _name = name;
  let _classList = '';
  let _boomed = false;
  let _coordination = {
    x: positionId % Xline,
    y: Math.round(positionId / Xline)
  };

  Object.defineProperty(this, 'positionId', {
    get: function() {
      return _positionId;
    },
    set: function(val) {
      _positionId = val;
      const position = document.getElementById(_positionId);
      this.update(position);
    }
  });

  Object.defineProperty(this, 'color', {
    get: function() {
      return _color;
    },
    set: function(val) { _color = val; }
  });

  Object.defineProperty(this, 'name', {
    get: function() {
      return _name;
    },
    set: function(val) { _name = val; }
  });

  Object.defineProperty(this, 'classList', {
    get: function() {
      return _classList;
    },
    set: function(val) {
      _classList = val;
      const beam = this;
      if (_classList.contains('beam') && _classList.contains('player')) {
        const boomedPlayer = playerInstances.find(
          player => player.positionId === beam.positionId);
        boomedPlayer.boomed = true;
        this.boom();
      }
    }
  });

  Object.defineProperty(this, 'boomed', {
    get: function() {
      return _boomed;
    },
    set: function(val) { _boomed = val; }
  });

  Object.defineProperty(this, 'coordination', {
    get: function() {
      return _coordination;
    },
    set: function(val) { _coordination = val; }
  });

  this.init();
}

//Constructor
Dot.prototype.init = function init() {
  if (this.name === 'player') {
    playerInstances.push(this);
  }
  if (typeof this.color === 'undefined') {
    throw new Error('color is undefined');
  }
  if (this.positionId >= 0 && this.positionId <= ShoboDot.lastDotId) {
    const dot = document.getElementById(this.positionId);
    paint(dot, this.color, this.name);
  } else {
    throw new Error(`positionId is out of range,
     your positionId is ${positionId}`);
  }
};

Dot.prototype.moveUp = function moveUp() {
  self = this;
  if (_invalid()) return;
  const dot = document.getElementById(this.positionId);
  const nextDot = document.getElementById(this.positionId - ShoboDot.getXline());
  deleteDot(dot);
  paint(nextDot, this.color, this.name);
  this.positionId -= ShoboDot.getXline();

  function _invalid() {
    return self.boomed || self.coordination.y === 0;
  }
};

Dot.prototype.moveLeft = function moveLeft() {
  self = this;
  if (_invalid()) return;
  const dot = document.getElementById(this.positionId);
  const nextDot = document.getElementById(this.positionId - 1);
  deleteDot(dot);
  paint(nextDot, this.color, this.name);
  this.positionId -= 1;

  function _invalid() {
    return self.boomed || self.coordination.y === 0 && self.coordination.x === 0;
  }
};

Dot.prototype.moveRight = function moveRight() {
  self = this;
  if (_invalid()) return;
  const dot = document.getElementById(this.positionId);
  const nextDot = document.getElementById(this.positionId + 1);
  deleteDot(dot);
  paint(nextDot, this.color, this.name);
  this.positionId += 1;

  function _invalid() {
    return self.boomed || self.coordination.y === ShoboDot.maxYDots && self.coordination.x === ShoboDot.getXline();
  }
};

Dot.prototype.moveDown = function moveDown() {
  self = this;
  if (_invalid()) return;
  const dot = document.getElementById(this.positionId);
  const nextDot = document.getElementById(this.positionId + ShoboDot.getXline());
  deleteDot(dot);
  paint(nextDot, this.color, this.name);
  this.positionId += ShoboDot.getXline();

  function _invalid() {
    return self.boomed || self.coordination.y === ShoboDot.maxYDots;
  }
};

Dot.prototype.boom = function boom() {
  const id = this.positionId;
  const color = 'rgb(255, 43, 0)';
  const sparks = [
    document.getElementById(id + ShoboDot.getXline()),
    document.getElementById(id - ShoboDot.getXline()),
    document.getElementById(id + 1),
    document.getElementById(id - 1),
  ];
  this.boomed = true;

  _spark(sparks, color);
  setTimeout(function() { _deleteSpark(); }, 200);

  function _spark() {
    for (var i = 0; i < 4; i++)
      paint(sparks[i], color);
  }

  function _deleteSpark() {
    for (var i = 0; i < 4; i++)
      deleteDot(sparks[i]);
  }
};

Dot.prototype.update = function update(position) {
  const dot = this;
  dot.classList = position.classList;
  dot.coordination = { x: _getX(), y: _getY() };

  function _getX() {
    return dot.positionId % ShoboDot.getXline();
  }

  function _getY() {
    return Math.floor(dot.positionId / ShoboDot.getXline());
  }
};

_exportsForTest();

function _exportsForTest() {
  if (typeof exports === 'undefined') return;
  exports.paint = paint;
  exports.ShoboDot = ShoboDot;
  exports.deleteDot = deleteDot;
  exports.getPositionId = getPositionId;
  exports.getMouseColor = getMouseColor;
}

