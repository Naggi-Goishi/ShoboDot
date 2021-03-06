const COLORS = {
  "aliceblue": "#f0f8ff",
  "antiquewhite": "#faebd7",
  "aqua": "#00ffff",
  "aquamarine": "#7fffd4",
  "azure": "#f0ffff",
  "beige": "#f5f5dc",
  "bisque": "#ffe4c4",
  "black": "#000000",
  "blanchedalmond": "#ffebcd",
  "blue": "#0000ff",
  "blueviolet": "#8a2be2",
  "brown": "#a52a2a",
  "burlywood": "#deb887",
  "cadetblue": "#5f9ea0",
  "chartreuse": "#7fff00",
  "chocolate": "#d2691e",
  "coral": "#ff7f50",
  "cornflowerblue": "#6495ed",
  "cornsilk": "#fff8dc",
  "crimson": "#dc143c",
  "cyan": "#00ffff",
  "darkblue": "#00008b",
  "darkcyan": "#008b8b",
  "darkgoldenrod": "#b8860b",
  "darkgray": "#a9a9a9",
  "darkgreen": "#006400",
  "darkkhaki": "#bdb76b",
  "darkmagenta": "#8b008b",
  "darkolivegreen": "#556b2f",
  "darkorange": "#ff8c00",
  "darkorchid": "#9932cc",
  "darkred": "#8b0000",
  "darksalmon": "#e9967a",
  "darkseagreen": "#8fbc8f",
  "darkslateblue": "#483d8b",
  "darkslategray": "#2f4f4f",
  "darkturquoise": "#00ced1",
  "darkviolet": "#9400d3",
  "deeppink": "#ff1493",
  "deepskyblue": "#00bfff",
  "dimgray": "#696969",
  "dodgerblue": "#1e90ff",
  "firebrick": "#b22222",
  "floralwhite": "#fffaf0",
  "forestgreen": "#228b22",
  "fuchsia": "#ff00ff",
  "gainsboro": "#dcdcdc",
  "ghostwhite": "#f8f8ff",
  "gold": "#ffd700",
  "goldenrod": "#daa520",
  "gray": "#808080",
  "green": "#008000",
  "greenyellow": "#adff2f",
  "honeydew": "#f0fff0",
  "hotpink": "#ff69b4",
  "indianred ": "#cd5c5c",
  "indigo": "#4b0082",
  "ivory": "#fffff0",
  "khaki": "#f0e68c",
  "lavender": "#e6e6fa",
  "lavenderblush": "#fff0f5",
  "lawngreen": "#7cfc00",
  "lemonchiffon": "#fffacd",
  "lightblue": "#add8e6",
  "lightcoral": "#f08080",
  "lightcyan": "#e0ffff",
  "lightgoldenrodyellow": "#fafad2",
  "lightgrey": "#d3d3d3",
  "lightgreen": "#90ee90",
  "lightpink": "#ffb6c1",
  "lightsalmon": "#ffa07a",
  "lightseagreen": "#20b2aa",
  "lightskyblue": "#87cefa",
  "lightslategray": "#778899",
  "lightsteelblue": "#b0c4de",
  "lightyellow": "#ffffe0",
  "lime": "#00ff00",
  "limegreen": "#32cd32",
  "linen": "#faf0e6",
  "magenta": "#ff00ff",
  "maroon": "#800000",
  "mediumaquamarine": "#66cdaa",
  "mediumblue": "#0000cd",
  "mediumorchid": "#ba55d3",
  "mediumpurple": "#9370d8",
  "mediumseagreen": "#3cb371",
  "mediumslateblue": "#7b68ee",
  "mediumspringgreen": "#00fa9a",
  "mediumturquoise": "#48d1cc",
  "mediumvioletred": "#c71585",
  "midnightblue": "#191970",
  "mintcream": "#f5fffa",
  "mistyrose": "#ffe4e1",
  "moccasin": "#ffe4b5",
  "navajowhite": "#ffdead",
  "navy": "#000080",
  "oldlace": "#fdf5e6",
  "olive": "#808000",
  "olivedrab": "#6b8e23",
  "orange": "#ffa500",
  "orangered": "#ff4500",
  "orchid": "#da70d6",
  "palegoldenrod": "#eee8aa",
  "palegreen": "#98fb98",
  "paleturquoise": "#afeeee",
  "palevioletred": "#d87093",
  "papayawhip": "#ffefd5",
  "peachpuff": "#ffdab9",
  "peru": "#cd853f",
  "pink": "#ffc0cb",
  "plum": "#dda0dd",
  "powderblue": "#b0e0e6",
  "purple": "#800080",
  "rebeccapurple": "#663399",
  "red": "#ff0000",
  "rosybrown": "#bc8f8f",
  "royalblue": "#4169e1",
  "saddlebrown": "#8b4513",
  "salmon": "#fa8072",
  "sandybrown": "#f4a460",
  "seagreen": "#2e8b57",
  "seashell": "#fff5ee",
  "sienna": "#a0522d",
  "silver": "#c0c0c0",
  "skyblue": "#87ceeb",
  "slateblue": "#6a5acd",
  "slategray": "#708090",
  "snow": "#fffafa",
  "springgreen": "#00ff7f",
  "steelblue": "#4682b4",
  "tan": "#d2b48c",
  "teal": "#008080",
  "thistle": "#d8bfd8",
  "tomato": "#ff6347",
  "turquoise": "#40e0d0",
  "violet": "#ee82ee",
  "wheat": "#f5deb3",
  "white": "#ffffff",
  "whitesmoke": "#f5f5f5",
  "yellow": "#ffff00",
  "yellowgreen": "#9acd32"
};

let mouseColor = COLORS.black;
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
    dot.style.backgroundColor = COLORS.white;
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

  function _setColorBoxes() {
    let i = 0;
    const colorValues = Object.keys(COLORS).map(function(key) {
      return COLORS[key];
    });
    for (let color of colorValues) {
      if (i > ShoboDot.lastDotId) return;
      dot = document.getElementById(i);
      dot.style.backgroundColor = color;
      dot.classList.add('colorBox');
      i += 1;
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

Dot.prototype.paint = function paint() {
  paint(document.getElementBy(this.positionId), this.color, this.name);
};

Dot.prototype.deleteDot = function deleteDot() {
  deleteDot(document.getElementBy(this.positionId), this.color, this.name);
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
  const color = 'DodgerBlue';
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

Dot.prototype.lineR = function lineR(num, name) {
  const color = this.style.backgroundColor;
  const nextDots = getNextDots();

  if (typeof name === 'undefined'){
    nextDots.forEach(dot => paint(dot, color));
  } else {
    nextDots.forEach(dot => paint(dot, color, name));
  }

  function getNextDots(){
    for (let i=1; i<=num; i++){
      nextDots.push(document.getElementById(this.positionId + i));
    }
  }
};

_exportsForTest();

function _exportsForTest() {
  if (typeof exports === 'undefined') return;
  exports.paint = paint;
  exports.ShoboDot = ShoboDot;
  exports.Dot = Dot;
  exports.deleteDot = deleteDot;
  exports.getPositionId = getPositionId;
  exports.getMouseColor = getMouseColor;
}

