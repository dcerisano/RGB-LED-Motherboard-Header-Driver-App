/**
 * Provides access to BlinkStick devices
 *
 * @module blinkstick
 */

var isWin = /^win/.test(process.platform),
    usb;

if (isWin) {
	//v0.11.13 of Node.js introduced changes to the API which require 
	//a new version of precompiled HID.node for Windows platforms
	if (compareVersions(process.version, '0.11.13')) {
		usb = require('./platform/windows/HID_0.3.2-patched.node');
	} else {
		usb = require('./platform/windows/HID.node');
	}
} else {
    usb = require('usb');
}

var VENDOR_ID = 0x20a0,
    PRODUCT_ID = 0x41e5,

    COLOR_KEYWORDS = {
        "aqua": "#00ffff",
        "aliceblue": "#f0f8ff",
        "antiquewhite": "#faebd7",
        "black": "#000000",
        "blue": "#0000ff",
        "cyan": "#00ffff",
        "darkblue": "#00008b",
        "darkcyan": "#008b8b",
        "darkgreen": "#006400",
        "darkturquoise": "#00ced1",
        "deepskyblue": "#00bfff",
        "green": "#008000",
        "lime": "#00ff00",
        "mediumblue": "#0000cd",
        "mediumspringgreen": "#00fa9a",
        "navy": "#000080",
        "springgreen": "#00ff7f",
        "teal": "#008080",
        "midnightblue": "#191970",
        "dodgerblue": "#1e90ff",
        "lightseagreen": "#20b2aa",
        "forestgreen": "#228b22",
        "seagreen": "#2e8b57",
        "darkslategray": "#2f4f4f",
        "darkslategrey": "#2f4f4f",
        "limegreen": "#32cd32",
        "mediumseagreen": "#3cb371",
        "turquoise": "#40e0d0",
        "royalblue": "#4169e1",
        "steelblue": "#4682b4",
        "darkslateblue": "#483d8b",
        "mediumturquoise": "#48d1cc",
        "indigo": "#4b0082",
        "darkolivegreen": "#556b2f",
        "cadetblue": "#5f9ea0",
        "cornflowerblue": "#6495ed",
        "mediumaquamarine": "#66cdaa",
        "dimgray": "#696969",
        "dimgrey": "#696969",
        "slateblue": "#6a5acd",
        "olivedrab": "#6b8e23",
        "slategray": "#708090",
        "slategrey": "#708090",
        "lightslategray": "#778899",
        "lightslategrey": "#778899",
        "mediumslateblue": "#7b68ee",
        "lawngreen": "#7cfc00",
        "aquamarine": "#7fffd4",
        "chartreuse": "#7fff00",
        "gray": "#808080",
        "grey": "#808080",
        "maroon": "#800000",
        "olive": "#808000",
        "purple": "#800080",
        "lightskyblue": "#87cefa",
        "skyblue": "#87ceeb",
        "blueviolet": "#8a2be2",
        "darkmagenta": "#8b008b",
        "darkred": "#8b0000",
        "saddlebrown": "#8b4513",
        "darkseagreen": "#8fbc8f",
        "lightgreen": "#90ee90",
        "mediumpurple": "#9370db",
        "darkviolet": "#9400d3",
        "palegreen": "#98fb98",
        "darkorchid": "#9932cc",
        "yellowgreen": "#9acd32",
        "sienna": "#a0522d",
        "brown": "#a52a2a",
        "darkgray": "#a9a9a9",
        "darkgrey": "#a9a9a9",
        "greenyellow": "#adff2f",
        "lightblue": "#add8e6",
        "paleturquoise": "#afeeee",
        "lightsteelblue": "#b0c4de",
        "powderblue": "#b0e0e6",
        "firebrick": "#b22222",
        "darkgoldenrod": "#b8860b",
        "mediumorchid": "#ba55d3",
        "rosybrown": "#bc8f8f",
        "darkkhaki": "#bdb76b",
        "silver": "#c0c0c0",
        "mediumvioletred": "#c71585",
        "indianred": "#cd5c5c",
        "peru": "#cd853f",
        "chocolate": "#d2691e",
        "tan": "#d2b48c",
        "lightgray": "#d3d3d3",
        "lightgrey": "#d3d3d3",
        "thistle": "#d8bfd8",
        "goldenrod": "#daa520",
        "orchid": "#da70d6",
        "palevioletred": "#db7093",
        "crimson": "#dc143c",
        "gainsboro": "#dcdcdc",
        "plum": "#dda0dd",
        "burlywood": "#deb887",
        "lightcyan": "#e0ffff",
        "lavender": "#e6e6fa",
        "darksalmon": "#e9967a",
        "palegoldenrod": "#eee8aa",
        "violet": "#ee82ee",
        "azure": "#f0ffff",
        "honeydew": "#f0fff0",
        "khaki": "#f0e68c",
        "lightcoral": "#f08080",
        "sandybrown": "#f4a460",
        "beige": "#f5f5dc",
        "mintcream": "#f5fffa",
        "wheat": "#f5deb3",
        "whitesmoke": "#f5f5f5",
        "ghostwhite": "#f8f8ff",
        "lightgoldenrodyellow": "#fafad2",
        "linen": "#faf0e6",
        "salmon": "#fa8072",
        "oldlace": "#fdf5e6",
        "bisque": "#ffe4c4",
        "blanchedalmond": "#ffebcd",
        "coral": "#ff7f50",
        "cornsilk": "#fff8dc",
        "darkorange": "#ff8c00",
        "deeppink": "#ff1493",
        "floralwhite": "#fffaf0",
        "fuchsia": "#ff00ff",
        "gold": "#ffd700",
        "hotpink": "#ff69b4",
        "ivory": "#fffff0",
        "lavenderblush": "#fff0f5",
        "lemonchiffon": "#fffacd",
        "lightpink": "#ffb6c1",
        "lightsalmon": "#ffa07a",
        "lightyellow": "#ffffe0",
        "magenta": "#ff00ff",
        "mistyrose": "#ffe4e1",
        "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead",
        "orange": "#ffa500",
        "orangered": "#ff4500",
        "papayawhip": "#ffefd5",
        "peachpuff": "#ffdab9",
        "pink": "#ffc0cb",
        "red": "#ff0000",
        "seashell": "#fff5ee",
        "snow": "#fffafa",
        "tomato": "#ff6347",
        "white": "#ffffff",
        "yellow": "#ffff00",
        "warmwhite": "fdf5e6"	// Non-standard. Added to support CheerLights.
    };




/**
 * Initialize new BlinkStick device
 *
 * @class BlinkStick
 * @constructor
 * @param {Object} device The USB device as returned from "usb" package.
 * @param {String} [serialNumber] Serial number of the device. Used only in Windows.
 * @param {String} [manufacturer] Manufacturer of the device. Used only in Windows.
 * @param {String} [product] Product name of the device. Used only in Windows.
 */

function BlinkStick (device, serialNumber, manufacturer, product) {

    if (isWin) {
        if (device) {
            this.device = new usb.HID(device);
            this.serial = serialNumber;
            this.manufacturer = manufacturer;
            this.product = product;
        }
    } else {
        if (device) {
            device.open ();
            this.device = device;
        }
    }

    this.inverse = false;
    this.animationsEnabled = true;

    var self = this;

    this.getSerial(function (err, result) {
        if (typeof(err) === 'undefined')
        {
            self.requiresSoftwareColorPatch = self.getVersionMajor() == 1 &&
                self.getVersionMinor() >= 1 && self.getVersionMinor() <= 3;
        }
    });
}




/**
 * Returns the serial number of device.
 *
 * <pre>
 * BSnnnnnn-1.0
 * ||  |    | |- Software minor version
 * ||  |    |--- Software major version
 * ||  |-------- Denotes sequential number
 * ||----------- Denotes BlinkStick device
 * </pre>
 *
 * Software version defines the capabilities of the device
 *
 * Usage:
 *
 * @example
 *     getSerial(function(err, serial) {
 *         console.log(serial);
 *     });
 *
 * @method getSerial
 * @param {function} callback Callback to receive serial number
 */
BlinkStick.prototype.getSerial = function (callback) {
    if (isWin) {
        if (callback) callback(undefined, this.serial);
    } else {
        var self = this;
        this.device.getStringDescriptor(3, function(err, result) {
            self.serial = result;
            if (callback) callback(err, result);
        });
    }
};




/**
 * Close BlinkStick device and stop all animations
 *
 * @method close
 */
BlinkStick.prototype.close = function (callback) {
    this.stop();

    try {
        this.device.close();
    } catch (ex) {
        if (callback) callback(ex);
        return;
    }

    if (callback) callback();
};




/**
 * Stop all animations
 *
 * @method stop
 */
BlinkStick.prototype.stop = function () {
    this.animationsEnabled = false;
};




/**
 * Get the major version from serial number
 *
 * @method getVersionMajor
 * @return {Number} Major version number from serial
 */
BlinkStick.prototype.getVersionMajor = function () {
    return parseInt(this.serial.substring(this.serial.length - 3, this.serial.length - 2));
};




/**
 * Get the minor version from serial number
 *
 * @method getVersionMinor
 * @return {Number} Minor version number from serial
 */
BlinkStick.prototype.getVersionMinor = function () {
    return parseInt(this.serial.substring(this.serial.length - 1, this.serial.length));
};




/**
 * Get the manufacturer of the device
 *
 * Usage:
 *
 * @example
 *     getManufacturer(function(err, data) {
 *         console.log(data);
 *     });
 *
 * @method getManufacturer
 * @param {function} callback Callback to receive manufacturer name
 */
BlinkStick.prototype.getManufacturer = function (callback) {
    if (isWin) {
        if (callback) callback(undefined, this.manufacturer);
    } else {
        this.device.getStringDescriptor(1, function(err, result) {
            if (callback) callback(err, result);
        });
    }
};




/**
 * Get the description of the device
 *
 * Usage:
 *
 * @example
 *     getDescription(function(err, data) {
 *         console.log(data);
 *     });
 *
 * @method getDescription
 * @param {function} callback Callback to receive description
*/
BlinkStick.prototype.getDescription = function (callback) {
    if (isWin) {
        if (callback) callback(undefined, this.product);
    } else {
        this.device.getStringDescriptor(2, function(err, result) {
            if (callback) callback(err, result);
        });
    }
};




/**
 * Determines report ID and number of LEDs for the report
 *
 * @private
 * @method _determineReportId
 * @return {object} data.reportId and data.ledCount
*/
function _determineReportId(ledCount)
{
    var reportId = 9;
    var maxLeds = 64;

    if (ledCount < 8 * 3) {
        reportId = 6;
        maxLeds = 8;
    } else if (ledCount < 16 * 3) {
        reportId = 7;
        maxLeds = 16;
    } else if (ledCount < 32 * 3) {
        reportId = 8;
        maxLeds = 32;
    }

    return { 'reportId': reportId, 'maxLeds': maxLeds };
}




/**
 * Set the color of LEDs
 *
 * @example
 *     //Available overloads
 *     setColor(red, green, blue, [options], [callback]); // use [0..255] ranges for intensity
 *
 *     setColor(color, [options], [callback]); // use '#rrggbb' format
 *
 *     setColor(color_name, [options], [callback]); // use 'random', 'red', 'green', 'yellow' and other CSS supported names
 *
 * @method setColor
 * @param {Number|String} red Red color intensity 0 is off, 255 is full red intensity OR string CSS color keyword OR hex color, eg "#BADA55".
 * @param {Number} [green] Green color intensity 0 is off, 255 is full green intensity.
 * @param {Number} [blue] Blue color intensity 0 is off, 255 is full blue intensity.
 * @param {Object}   [options] additional options {"channel": 0, "index": 0}. Channel is represented as 0=R, 1=G, 2=B
 * @param {Function} [callback] Callback, called when complete.
 */
BlinkStick.prototype.setColor = function (red, green, blue, options, callback) {
    var params = this.interpretParameters(red, green, blue, options, callback);

    if (typeof(params) === 'undefined')
    {
        return;
    }

    var self = this;

    var sendColorInternal = function (r, g, b, callback) {
        try {
            if (params.options.channel === 0 && params.options.index === 0) {
                self.setFeatureReport(1, [1, r, g, b], callback);
            } else {
                self.setFeatureReport(5, [5, params.options.channel, params.options.index, r, g, b], callback);
            }
        } catch (ex) {
            if (callback) callback(ex);
        }
    };

    if (this.requiresSoftwareColorPatch) {
        this.getColor(function (err, cr, cg, cb) {
            if (typeof(err) !== 'undefined') {
                if (params.callback) params.callback(err);
                return;
            }

            if (params.red == cg && params.green == cr && params.blue == cb) {
                if (cr > 0) {
                    cr = cr - 1;
                } else if (cg > 0) {
                    cg = cg - 1;
                }

                sendColorInternal(cr, cg, cb, function (err) {
                    if (typeof(err) !== 'undefined') {
                        if (params.callback) params.callback(err);
                        return;
                    }

                    sendColorInternal(params.red, params.green, params.blue, function (err) {
                        if (typeof(err) !== 'undefined') {
                            if (params.callback) params.callback(err);
                            return;
                        } else {
                            if (params.callback) params.callback();
                        }
                    });
                });
            } else {
                sendColorInternal(params.red, params.green, params.blue, function (err) {
                    if (typeof(err) !== 'undefined') {
                        if (params.callback) params.callback(err);
                        return;
                    } else {
                        if (params.callback) params.callback();
                    }
                });
            }
        });
    } else {
        sendColorInternal(params.red, params.green, params.blue, params.callback);
    }
};




/**
 * Set inverse mode for IKEA DIODER in conjunction with BlinkStick v1.0
 *
 * @method setInverse
 * @param {Boolean} inverse Set true for inverse mode and false otherwise
 */
BlinkStick.prototype.setInverse = function (inverse) {
    this.inverse = inverse;
};




/**
 * Get inverse mode setting for IKEA DIODER in conjunction with BlinkStick v1.0
 *
 * @method getInverse
 * @return {Boolean} true for enabled inverse mode and false otherwise
 */
BlinkStick.prototype.getInverse = function (inverse) {
    return this.inverse;
};




/**
 * Set mode for BlinkStick Pro
 *
 * - 0 = Normal
 * - 1 = Inverse
 * - 2 = WS2812
 *
 * You can read more about BlinkStick modes by following this link:
 *
 * http://www.blinkstick.com/help/tutorials/blinkstick-pro-modes
 *
 * @method setMode
 * @param {Number} mode Set the desired mode for BlinkStick Pro
 */
BlinkStick.prototype.setMode = function (mode, callback) {
    this.setFeatureReport(0x0004, [4, mode], callback);
};




/**
 * Get mode for BlinkStick Pro
 *
 * - 0 = Normal
 * - 1 = Inverse
 * - 2 = WS2812
 *
 * You can read more about BlinkStick modes by following this link:
 *
 * http://www.blinkstick.com/help/tutorials/blinkstick-pro-modes
 *
 * Usage:
 *
 * @example
 *     getMode(function(err, data) {
 *         console.log(data);
 *     });
 *
 * @method getMode
 * @param {callback} callback receive mode with callback
 */
BlinkStick.prototype.getMode = function (callback) {
    try
    {
        this.getFeatureReport(4, 33, function (err, buffer) {
            if (callback) callback(err, buffer[1]);
        });
    }
    catch (err)
    {
        if (callback) callback(err, 0);
    }
};




/**
 * Get the current color visible on BlinkStick
 *
 * Function supports the following overloads:
 *
 * @example
 *     //Available overloads
 *     getColor(callback); //index defaults to 0
 *
 *     getColor(index, callback);
 *
 * @example
 *     getColor(0, function(err, r, g, b) {
 *         console.log(r, g, b);
 *     });
 *
 * @method getColor
 * @param {Number=0} index The index of the LED 
 * @param {Function} callback Callback to which to pass the color values.
 * @return {Number, Number, Number} Callback returns three numbers: R, G and B [0..255].
 */
BlinkStick.prototype.getColor = function (index, callback) {
    if (typeof(index) == 'function') {
        callback = index;
        index = 0;
    }

    if (index === 0) {
        this.getFeatureReport(0x0001, 33, function (err, buffer) {
            if (callback) {
                if (typeof(err) === 'undefined') {
                    if (buffer) {
                        callback(err, buffer[1], buffer[2], buffer[3]);
                    } else {
                        callback(err, 0, 0, 0);
                    }
                } else {
                    callback(err);
                }
            }
        });
    } else {
        this.getColors(index, function(err, buffer) {
            if (callback) {
                if (typeof(err) === 'undefined') {
                    callback(err, buffer[index * 3 + 1], buffer[index * 3], buffer[index * 3 + 2]);
                } else {
                    callback(err);
                }
            }
        });
    }
};




/**
 * Get the current color frame on BlinkStick Pro
 *
 * Usage:
 *
 * @example
 *     getColors(8, function(err, data) {
 *         console.log(data);
 *     });
 *
 * @method getColors
 * @param {Number} count How many LEDs should return
 * @param {Function} callback Callback to which to pass the color values.
 * @return {Array} Callback returns an array of LED data in the following format: [g0, r0, b0, g1, r1, b1...]
 */
BlinkStick.prototype.getColors = function (count, callback) {
    params = _determineReportId(count * 3);

    this.getFeatureReport(params.reportId, params.maxLeds * 3 + 2, function (err, buffer) {
        if (callback) {
            if (typeof(buffer) !== 'undefined') {
                buffer = buffer.slice(2, buffer.length -1);
            }

            callback(err, buffer);
        }
    });
};




/**
 * Set the color frame on BlinkStick Pro
 *
 * @example
 *     var data = [255, 0, 0, 0, 255, 0];
 *
 *     setColors(0, data, function(err) {
 *     });
 *
 * @method setColors
 * @param {Number} channel Channel is represented as 0=R, 1=G, 2=B
 * @param {Array} data LED data in the following format: [g0, r0, b0, g1, r1, b1...]
 * @param {Function} callback Callback when the operation completes
 */
BlinkStick.prototype.setColors = function (channel, data, callback) {
    params = _determineReportId(data.length);

    var i = 0;

    report = [params.reportId, channel];

    data.forEach(function(item) {
        if (i < params.maxLeds * 3) {
            report.push(item);
            i += 1;
        }
    });

    for (var j = i; j < params.maxLeds * 3; j++) {
        report.push(0);
    }

    this.setFeatureReport(params.reportId, report, callback);
};




/**
 * Converts decimal number to hex with zero padding
 *
 * @private
 * @method decimalToHex
 * @param {Number} d Decimal number to convert
 * @param {Number} padding How many zeros to use for padding
 * @return {String} Decimal number converted to hex string
*/
function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}

/**
 * Get the current color as hex string.
 *
 * Function supports the following overloads:
 *
 * @example
 *     //Available overloads
 *     getColorString(callback); //index defaults to 0
 *
 *     getColorString(index, callback);
 *
 * @example
 *     getColorString(0, function(err, color) {
 *         console.log(color);
 *     });
 *
 *     getColorString(function(err, color) {
 *         console.log(color);
 *     });
 *
 * @method getColorString
 * @param {Number} index The index of the LED to retrieve data
 * @param {Function} callback Callback to which to pass the color string.
 * @return {String} Hex string, eg "#BADA55".
 */
BlinkStick.prototype.getColorString = function (index, callback) {
    if (typeof(index) == 'function') {
        callback = index;
        index = 0;
    }

    this.getColor(index, function (err, r, g, b) {
        if (callback) {
            if (typeof(err) === 'undefined') {
                callback(err, '#' + decimalToHex(r, 2) + decimalToHex(g, 2) + decimalToHex(b, 2) );
            } else { 
                callback(err);
            }
        }
    });
};




/**
 * Get an infoblock from a device.
 *
 * @private
 * @static
 * @method getInfoBlock
 * @param {BlinkStick} device Device from which to get the value.
 * @param {Number} location Address to seek the data.
 * @param {Function} callback Callback to which to pass the value.
 */
function getInfoBlock (device, location, callback) {
    getFeatureReport(location, 33, function (err, buffer) {
        if (typeof(err) !== 'undefined')
        {
            callback(err);
            return;
        }

        var result = '',
        i, l;

        for (i = 1, l = buffer.length; i < l; i++) {
            if (i === 0) break;
            result += String.fromCharCode(buffer[i]);
        }

        callback(err, result);
    });
}




/**
 * Get default value from options
 *
 * @private
 * @static
 * @method opt
 * @param {Object} options Option object to operate on
 * @param {String} name The name of the parameter
 * @param {Object} defaultValue Default value if name is not found in option object
 */
function opt(options, name, defaultValue){
    return options && options[name]!==undefined ? options[name] : defaultValue;
}

/**
 * Sets an infoblock on a device.
 *
 * @private
 * @static
 * @method setInfoBlock
 * @param {BlinkStick} device Device on which to set the value.
 * @param {Number} location Address to seek the data.
 * @param {String} data The value to push to the device. Should be <= 32 chars.
 * @param {Function} callback Callback to which to pass the value.
 */
function setInfoBlock (device, location, data, callback) {
    var i,
    l = Math.min(data.length, 33),
    buffer = new Buffer(33);

    buffer[0] = 0;
    for (i = 0; i < l; i++) buffer[i + 1] = data.charCodeAt(i);
    for (i = l; i < 33; i++) buffer[i + 1] = 0;

    setFeatureReport(location, buffer, callback);
}




/**
 * Get the infoblock1 of the device.
 * This is a 32 byte array that can contain any data. It's supposed to
 * hold the "Name" of the device making it easier to identify rather than
 * a serial number.
 *
 * Usage:
 *
 * @example
 *     getInfoBlock1(function(err, data) {
 *         console.log(data);
 *     });
 *
 * @method getInfoBlock1
 * @param {Function} callback Callback to which to pass the value.
 */
BlinkStick.prototype.getInfoBlock1 = function (callback) {
    getInfoBlock(this.device, 0x0002, callback);
};




/**
 * Get the infoblock2 of the device.
 * This is a 32 byte array that can contain any data.
 *
 * Usage:
 *
 * @example
 *     getInfoBlock2(function(err, data) {
 *         console.log(data);
 *     });
 *
 * @method getInfoBlock2
 * @param {Function} callback Callback to which to pass the value.
 */
BlinkStick.prototype.getInfoBlock2 = function (callback) {
    getInfoBlock(this.device, 0x0003, callback);
};




/**
 * Sets the infoblock1 with specified string.
 * It fills the rest of bytes with zeros.
 *
 * Usage:
 *
 * @example
 *     setInfoBlock1("abcdefg", function(err) {
 *     });
 *
 * @method setInfoBlock1
 * @param {String} data Data value for InfoBlock
 * @param {Function} callback Callback when the operation completes
 */
BlinkStick.prototype.setInfoBlock1 = function (data, callback) {
    setInfoBlock(this.device, 0x0002, data, callback);
};




/**
 * Sets the infoblock2 with specified string.
 * It fills the rest of bytes with zeros.
 *
 * Usage:
 *
 * @example
 *     setInfoBlock2("abcdefg", function(err) {
 *     });
 *
 * @method setInfoBlock2
 * @param {String} data Data value for InfoBlock
 * @param {Function} callback Callback when the operation completes
 */
BlinkStick.prototype.setInfoBlock2 = function (data, callback) {
    setInfoBlock(this.device, 0x0003, data, callback);
};




/**
 * Sets the LED to a random color.
 *
 * @method setRandomColor
 */
BlinkStick.prototype.setRandomColor = function () {
    var args = [],
    i;

    for (i = 0; i < 3; i++) args.push(Math.floor(Math.random() * 256));
    this.setColor.apply(this, args);
};




/**
 * Turns the LED off.
 *
 * @method turnOff
 */
BlinkStick.prototype.turnOff = function () {
    this.setColor();
};




/**
 * Generate random integer number within a range.
 *
 * @private
 * @static
 * @method randomIntInc
 * @param {Number} low the low value of the number
 * @param {Number} high the high value of the number
 * @return {Number} Random number in the range of [low..high] inclusive of low and high
 */
function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}




/**
 * Automatically interpret parameters supplied for functions to generate
 * overrides.
 *
 * @private
 * @method interpretParameters
 * @param {Number|String} red Red color intensity 0 is off, 255 is full red intensity OR string CSS color keyword OR hex color, eg "#BADA55".
 * @param {Number} [green] Green color intensity 0 is off, 255 is full green intensity.
 * @param {Number} [blue] Blue color intensity 0 is off, 255 is full blue intensity.
 * @param {Object}   [options] additional options
 * @param {Function} [callback] Callback, called when complete.
 * @return {Object} Conains sanitized RGB value, options and callback if they have been assigned
 */
BlinkStick.prototype.interpretParameters = function (red, green, blue, options, callback) {
    var hex;

    if (typeof red == 'string') {
        if (typeof green == 'object') {
            options = green;
            callback = blue;
        } else {
            callback = green;
        }

        if (red == 'random') {
            red = randomIntInc(0, 255);
            green = randomIntInc(0, 255);
            blue = randomIntInc(0, 255);
        } else if  (red.match(/^\#[A-Za-z0-9]{6}$/)) {
            hex = red;
        } else if (!(hex = COLOR_KEYWORDS[red])) {
            if (callback)
                callback(new ReferenceError('Invalid CSS color keyword'));
            return;
        }
    } else if (typeof(options) == 'function') {
        callback = options;
    }


    if (hex) {
        red = parseInt(hex.substr(1, 2), 16);
        green = parseInt(hex.substr(3, 2), 16);
        blue = parseInt(hex.substr(5, 2), 16);

    } else {
        red = red || 0;
        green = green || 0;
        blue = blue || 0;
    }

    if (options === undefined) {
        options = {};
    }
    options.channel = opt(options, 'channel', 0);
    options.index = opt(options, 'index', 0);

    red = Math.max(Math.min(red, 255), 0);
    green = Math.max(Math.min(green, 255), 0);
    blue = Math.max(Math.min(blue, 255), 0);

    if (this.inverse)
    {
        red = 255 - red;
        green = 255 - green;
        blue = 255 - blue;
    }

    return {'red': red, 'green': green, 'blue': blue, 'options': options, 'callback': callback};
};




/**
 * Blinks specified RGB color.
 *
 * Function supports the following overloads:
 *
 * @example
 *     //Available overloads
 *     blink(red, green, blue, [options], [callback]); // use [0..255] ranges for intensity
 *
 *     blink(color, [options], [callback]); // use '#rrggbb' format
 *
 *     blink(color_name, [options], [callback]); // use 'random', 'red', 'green', 'yellow' and other CSS supported names
 *
 * Options can contain the following parameters for object:
 *
 * - channel=0: Channel is represented as 0=R, 1=G, 2=B
 * - index=0: The index of the LED
 * - repeats=1: How many times to blink
 * - delay=1: Delay between on/off cycles in milliseconds
 *
 * @method blink
 * @param {Number|String} red Red color intensity 0 is off, 255 is full red intensity OR string CSS color keyword OR hex color, eg "#BADA55".
 * @param {Number}   [green] Green color intensity 0 is off, 255 is full green intensity.
 * @param {Number}   [blue] Blue color intensity 0 is off, 255 is full blue intensity.
 * @param {Object}   [options] additional options {"channel": 0, "index": 0, "repeats": 1, "delay": 500}
 * @param {Function} [callback] Callback when the operation completes
 */
BlinkStick.prototype.blink = function (red, green, blue, options, callback) {
    var params = this.interpretParameters(red, green, blue, options, callback);

    if (typeof(params) === 'undefined')
    {
        return;
    }

    var repeats = opt(params.options, 'repeats', 1);
    var delay = opt(params.options, 'delay', 500);

    var self = this;

    var blinker = function (count) {
        self.setColor(params.red, params.green, params.blue, params.options, function (err) {
            if (typeof(err) !== 'undefined') {
                if (params.callback) params.callback(err);
            } else {
                if (!self.animationsEnabled) return;

                setTimeout(function() {
                    if (!self.animationsEnabled) return;

                    self.setColor(0, 0, 0, params.options, function (err) {
                        if (typeof(err) !== 'undefined') {
                            if (params.callback) params.callback(err);
                        } else {
                            if (!self.animationsEnabled) return;

                            setTimeout(function() {
                                if (!self.animationsEnabled) return;

                                if (count == repeats - 1) {
                                    if (params.callback) params.callback();
                                } else {
                                    blinker(count + 1);
                                }
                            }, delay);
                        }
                    });

                }, delay);
            }
        });
    };

    blinker(0);
};




/**
 * Morphs to specified RGB color from current color.
 *
 * Function supports the following overloads:
 *
 * @example
 *     //Available overloads
 *     morph(red, green, blue, [options], [callback]); // use [0..255] ranges for intensity
 *
 *     morph(color, [options], [callback]); // use '#rrggbb' format
 *
 *     morph(color_name, [options], [callback]); // use 'random', 'red', 'green', 'yellow' and other CSS supported names
 *
 * Options can contain the following parameters for object:
 *
 * - channel=0: Channel is represented as 0=R, 1=G, 2=B
 * - index=0: The index of the LED
 * - duration=1000: How long should the morph animation last in milliseconds
 * - steps=50: How many steps for color changes
 *
 * @method morph
 * @param {Number|String} red Red color intensity 0 is off, 255 is full red intensity OR string CSS color keyword OR hex color, eg "#BADA55".
 * @param {Number} [green] Green color intensity 0 is off, 255 is full green intensity.
 * @param {Number} [blue] Blue color intensity 0 is off, 255 is full blue intensity.
 * @param {Object}   [options] additional options {"channel": 0, "index": 0, "duration": 1000, "steps": 50}
 * @param {Function} [callback] Callback when the operation completes
 */
BlinkStick.prototype.morph = function (red, green, blue, options, callback) {
    var params = this.interpretParameters(red, green, blue, options, callback);

    if (typeof(params) === 'undefined')
    {
        return;
    }

    var duration = opt(params.options, 'duration', 1000);
    var steps = opt(params.options, 'steps', 50);

    var self = this;

    this.getColor(params.options.index, function(err, cr, cg, cb) {
        if (typeof(err) !== 'undefined') {
            if (params.callback) params.callback(err);
        } else {
            var morpher = function (count) {
                if (!self.animationsEnabled) return;

                var nextRed = parseInt(cr + (params.red - cr) / steps * count),
                    nextGreen = parseInt(cg + (params.green - cg) / steps * count),
                    nextBlue = parseInt(cb + (params.blue - cb) / steps * count);

                self.setColor(nextRed, nextGreen, nextBlue, params.options, function (err) {
                    if (typeof(err) !== 'undefined') {
                        if (params.callback) params.callback(err);
                    } else{
                        if (!self.animationsEnabled) return;

                        setTimeout(function() {
                            if (!self.animationsEnabled) return;

                            if (count >= steps) {
                                if (params.callback) params.callback();
                            } else {
                                morpher(count + 1);
                            }
                        }, parseInt(duration/steps));
                    }
                });

            };

            morpher(1);
        }
    });
};


/**
 * Pulses specified RGB color.
 *
 * Function supports the following overloads:
 *
 * @example
 *     //Available overloads
 *     pulse(red, green, blue, [options], [callback]); // use [0..255] ranges for intensity
 *
 *     pulse(color, [options], [callback]); // use '#rrggbb' format
 *
 *     pulse(color_name, [options], [callback]); // use 'random', 'red', 'green', 'yellow' and other CSS supported names
 *
 * Options can contain the following parameters for object:
 *
 * - channel=0: Channel is represented as 0=R, 1=G, 2=B
 * - index=0: The index of the LED
 * - duration=1000: How long should the pulse animation last in milliseconds
 * - steps=50: How many steps for color changes
 *
 * @method pulse
 * @param {Number|String} red Red color intensity 0 is off, 255 is full red intensity OR string CSS color keyword OR hex color, eg "#BADA55".
 * @param {Number} [green] Green color intensity 0 is off, 255 is full green intensity.
 * @param {Number} [blue] Blue color intensity 0 is off, 255 is full blue intensity.
 * @param {Object}   [options] additional options {"channel": 0, "index": 0, "duration": 1000, "steps": 50}
 * @param {Function} [callback] Callback when the operation completes
 */
BlinkStick.prototype.pulse = function (red, green, blue, options, callback) {
    var params = this.interpretParameters(red, green, blue, options, callback);

    if (typeof(params) === 'undefined')
    {
        return;
    }

    var self = this;

    self.morph(params.red, params.green, params.blue, params.options, function(err) {
        if (!self.animationsEnabled) return;

        if (typeof(err) !== 'undefined') {
            if (params.callback) params.callback(err);
        } else {
            self.morph(0, 0, 0, params.options, params.callback);
        }
    });
};




/**
* Find BlinkSticks using a filter.
*
* @method findBlinkSticks
* @param {Function} [filter] Filter function.
* @return {Array} BlickStick objects.
*/
function findBlinkSticks (filter) {
    if (filter === undefined) filter = function () { return true; };

    var result = [], device, i, devices;

    if (isWin) {
        devices = usb.devices();

        for (i in devices) {
            device = devices[i];

            if (device.vendorId === VENDOR_ID &&
                device.productId === PRODUCT_ID &&
                    filter(device))
                {
                    result.push(new BlinkStick(device.path, device.serialNumber, device.manufacturer, device.product));
                }
        }

    } else {
        devices = usb.getDeviceList();

        for (i in devices) {
            device = devices[i];
            if (device.deviceDescriptor.idVendor === VENDOR_ID &&
                device.deviceDescriptor.idProduct === PRODUCT_ID &&
                    filter(device))
                result.push(new BlinkStick(device));
        }
    }

    return result;
}




/**
* Set feature report to the device.
*
* @method setFeatureReport
* @param {Number} reportId Report ID to receive
* @param {Array} data Data to send to the device
* @param {Function} callback Function called when report sent
*/
BlinkStick.prototype.setFeatureReport = function (reportId, data, callback) {
    var retries = 0;
    var error;
    var self = this;

    var retryTransfer = function () {
        retries = retries + 1;

        if (retries > 5) {
            if (callback) callback(error);
            return;
        }

        try {
            if (isWin) {
                self.device.sendFeatureReport(data);
                if (callback) { callback(); }
            } else {
                self.device.controlTransfer(0x20, 0x9, reportId, 0, new Buffer(data), function (err) {
                    if (typeof(err) === 'undefined') {
                        if (callback) callback();
                    } else {
                        if (typeof(error) === 'undefined') {
                            //Store only the first error
                            error = err;
                        }

                        retryTransfer();
                    }
                });
            }
        } catch (ex) {
            if (typeof(error) === 'undefined') {
                //Store only the first error
                error = ex;
            }

            retryTransfer();
        }
    };

    retryTransfer();
};




/**
* Get feature report from the device.
*
* @method getFeatureReport
* @param {Number} reportId Report ID to receive
* @param {Number} length Expected length of the report
* @param {Function} callback Function called when report received
*/
BlinkStick.prototype.getFeatureReport = function (reportId, length, callback) {
    var retries = 0;
    var error;
    var self = this;

    var retryTransfer = function () {
        retries = retries + 1;

        if (retries > 5) {
            if (callback) callback(error);
            return;
        }

        try {
            if (isWin) {
                var buffer = self.device.getFeatureReport(reportId, length);
                if (callback) callback(undefined, buffer);
            } else {
                self.device.controlTransfer(0x80 | 0x20, 0x1, reportId, 0, length, function (err, data) {
                    if (typeof(err) === 'undefined') {
                        if (callback) callback(err, data);
                    } else {
                        if (typeof(error) === 'undefined') {
                            //Store only the first error
                            error = err;
                        }

                        retryTransfer();
                    }
                });
            }
        } catch (ex) {
            if (typeof(error) === 'undefined') {
                //Store only the first error
                error = ex;
            }

            retryTransfer();
        }
    };

    retryTransfer();
};

/**
Publicly available functions to find BlinkSticks on the computer.

@class module
@static
**/
module.exports = {

    /**
     * Find first attached BlinkStick.
     *
     * @example
     *     var blinkstick = require('blinkstick');
     *     var led = blinkstick.findFirst();
     *
     * @static
     * @method findFirst
     * @return {BlinkStick|undefined} The first BlinkStick, if found.
     */
    findFirst: function () {
        if (isWin) {
            var devices = findBlinkSticks();

            return devices.length > 0 ? devices[0] : null;
        } else {
            var device = usb.findByIds(VENDOR_ID, PRODUCT_ID);
            if (device) return new BlinkStick(device);
        }
    },




    /**
     * Find all attached BlinkStick devices.
     *
     * @example
     *     var blinkstick = require('blinkstick');
     *     var leds = blinkstick.findAll();
     *
     * @static
     * @method findAll
     * @return {Array} BlinkSticks.
     */
    findAll: function () {
        return findBlinkSticks();
    },




    /**
     * Returns the serial numbers of all attached BlinkStick devices.
     *
     * @static
     * @method findAllSerials
     * @param {Function} callback Callback when all serials have been collected
     * @return {Array} Serial numbers.
     */
    findAllSerials: function (callback) {
        var result = [];

        var devices = findBlinkSticks();
        var i = 0;

        var finder = function() {

            if (i == devices.length) {
                if (callback) callback(result);
            } else {
                devices[i].getSerial(function (err, serial) {
                    result.push(serial);
                    i += 1;
                    finder();
                });
            }
        };

        finder();
    },




    /**
     * Find BlinkStick device based on serial number.
     *
     * @static
     * @method findBySerial
     * @param {Number} serial Serial number.
     * @param {Function} callback Callback when BlinkStick has been found
     */
    findBySerial: function (serial, callback) {
        var result = [];

        var devices = findBlinkSticks();
        var i = 0;

        var finder = function() {

            if (i == devices.length) {
                if (callback) callback();
            } else {
                devices[i].getSerial(function (err, serialNumber) {
                    if (serialNumber == serial) {
                        if (callback) callback(devices[i]);
                    } else {
                        i += 1;
                        finder();
                    }
                });
            }
        };

        finder();
    }

};

// Taken from http://java.com/js/deployJava.js:
// return true if 'installed' (considered as a JRE version string) is
// greater than or equal to 'required' (again, a JRE version string).
function compareVersions(installed, required) {

	var a = installed.split('.');
	var b = required.split('.');

	for (var i = 0; i < a.length; ++i) {
		a[i] = Number(a[i]);
	}
	for (var i = 0; i < b.length; ++i) {
		b[i] = Number(b[i]);
	}
	if (a.length == 2) {
		a[2] = 0;
	}

	if (a[0] > b[0]) return true;
	if (a[0] < b[0]) return false;

	if (a[1] > b[1]) return true;
	if (a[1] < b[1]) return false;

	if (a[2] > b[2]) return true;
	if (a[2] < b[2]) return false;

	return true;
}
