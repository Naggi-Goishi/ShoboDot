let mouseColor = 'black';
let command = false;

const inherits = function inherits(childCtor, parentCtor) {
    Object.setPrototypeOf(childCtor.prototype, parentCtor.prototype);
};

const isUndefined = function isUndefined(arg) {
    return typeof arg === 'undefined';
};

const paint = function paint(dot, color, name) {
    const audio = document.getElementById('dot');
    audio.play();
    if (isUndefined(color))
        dot.style.backgroundColor = mouseColor;
    else if (dot === null)
        return;
    else
        dot.style.backgroundColor = color;
    if (isUndefined(name)) return;
    dot.classList.add(name);
};

const deleteDot = function deleteDot(dot) {
    if (dot === null) return;
    dot.classList = "";
    dot.classList.add('dot');
    dot.style.backgroundColor = 'rgb(255,255,255)';
};

function getPositionId(x, y) {
    return Math.round(ShoboDot.getXline() * y + x);
}

// ShoboDot func starts.
function ShoboDot(options) {
    this.config = Object.assign({
        colorBoxes: false,
        clickFunction: false,
    }, options);

    this.init();

    Object.defineProperty(this, 'dots', {
        get: function() {
            return document.querySelectorAll('.dot');
        },
        set: function() {
            throw new Error("can't change 'dots'");
        }
    });
}

//Property of ShoboDot itself
ShoboDot.getXline = function getXline() {
    const dots = document.querySelectorAll('.dot');
    let i = 0;
    dots.forEach(function(box) {
        if (box.offsetTop == 1)
            i += 1;
    });
    return i;
};

//Properties of Prototypes of Shobodot

//Constructor
ShoboDot.prototype.init = function init() {
        _setCanvas();
        if (this.config.colorBoxes)
            _setColorBoxes();
        if (this.config.clickFunction)
            _setClickFunction();

        function _setCanvas() {
            const canvas = document.querySelector('.shobodot');
            const maxHeight = canvas.offsetHeight / 12;
            const maxWidth = canvas.offsetWidth / 12;
            const maxDots = maxHeight * maxWidth;

            if (maxHeight < 1 || maxWidth < 1) {
                throw new Error(
                    `your height or width of shobodot div is too short.
         maxWidth: ${maxWidth} maxHeight: ${maxHeight}`
                );
            }

            ShoboDot.lastDotId = maxDots;
            let html = '';
            for (var i = 0; i < maxDots; i++) {
                html += `<div class='dot' id='${i}'></div>`;
            }
            canvas.innerHTML = html;

        }

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
                } else {
                    throw new Error('ERROR: invalid "i"');
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
                } else {
                    throw new Error('ERROR: invalid "i"');
                }
                return colors;
            }
        }

        function _setClickFunction() {
            const dots = document.querySelectorAll('.dot');
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
            if (_max < 0)
                _max = 255;
            colors = ShoboDot.prototype.setColorBoxes();
        }
    });
    Object.defineProperty(this, 'r', {
        get: function() {
            return _r;
        },
        set: function(val) {
            _r = val;
            if (_r > _max)
                _r = _max;
        }
    });
    Object.defineProperty(this, 'g', {
        get: function() {
            return _g;
        },
        set: function(val) {
            _g = val;
            if (_g > _max)
                _g = _max;
        }
    });
    Object.defineProperty(this, 'b', {
        get: function() {
            return _b;
        },
        set: function(val) {
            _b = val;
            if (_b > _max)
                _b = _max;
        }
    });
}
//RGB func ends

//Dot func starts, most objects will inherit this func.
function Dot(positionId, name) {
    this.init(positionId, name);
    let _positionId = positionId;
    let _color = 'rgb(0, 0, 0)';
    let _name = name;
    let _classList;

    Object.defineProperty(this, 'positionId', {
        get: function() {
            return _positionId;
        },
        set: function(val) {
            _positionId = val;
            const position = document.getElementById(_positionId);
            this.classList = position.classList;
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
            if (_classList.contains('beam') && _classList.contains('player'))
                this.boom();
        }
    });
}

//Constructor
Dot.prototype.init = function init(positionId, name) {
    if (positionId >= 0 && positionId <= ShoboDot.lastDotId) {
        const dot = document.getElementById(positionId);
        paint(dot, this.color, name);
    } else {
        throw new Error(`positionId is out of range,
     your positionId is ${positionId}`);
    }
};

Dot.prototype.moveUp = function moveUp() {
    const dot = document.getElementById(this.positionId);
    const nextDot = document.getElementById(this.positionId - ShoboDot.getXline());
    deleteDot(dot);
    if (this.positionId > ShoboDot.getXline()) {
        paint(nextDot, this.color, this.name);
        this.positionId -= ShoboDot.getXline();
    }
};

Dot.prototype.moveLeft = function moveLeft() {
    const dot = document.getElementById(this.positionId);
    const nextDot = document.getElementById(this.positionId - 1);
    deleteDot(dot);
    paint(nextDot, this.color, this.name);
    this.positionId -= 1;
};

Dot.prototype.moveRight = function moveRight() {
    const dot = document.getElementById(this.positionId);
    const nextDot = document.getElementById(this.positionId + 1);
    deleteDot(dot);
    paint(nextDot, this.color, this.name);
    this.positionId += 1;
};

Dot.prototype.moveDown = function moveDown() {
    const dot = document.getElementById(this.positionId);
    const nextDot = document.getElementById(this.positionId + ShoboDot.getXline());
    deleteDot(dot);
    paint(nextDot, this.color, this.name);
    this.positionId += ShoboDot.getXline();
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

    _spark(sparks, color);
    setTimeout(function() { _deleteSpark();}, 200);

    function _spark() {
        for (var i = 0; i < 4; i++)
            paint(sparks[i], color);
    }

    function _deleteSpark() {
        for (var i = 0; i < 4; i++)
            deleteDot(sparks[i]);
    }
};
