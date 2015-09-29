function Thermostat() {
  this.temp = 20;
  this.MIN_TEMP = 10;
  this.maxTemp = 25;
  this.powerSavingMode = true;
}

Thermostat.prototype.up = function() {
  if (this.temp < this.maxTemp) {
    this.temp += 1;
  } else {
    throw ("Cannot exceed the maximum tempreture");
  }
};

Thermostat.prototype.down = function() {
    if (this.temp > this.MIN_TEMP) {
      this.temp -= 1;
    } else {
      throw ("Minimum temperature reached");
    }
  };

Thermostat.prototype.powerSavingOff = function() {
  this.maxTemp = 32;
  this.powerSavingMode = false;
};

Thermostat.prototype.powerSavingOn = function() {
  this.maxTemp = 25;
  this.powerSavingMode = true;
};

// Thermostat.prototype.turnOnPowerSavingMode = function() {
//   this.powerSavingMode = true;
// };
