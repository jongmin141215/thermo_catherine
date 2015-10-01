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
    throw ("Cannot exceed the maximum temperature");
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

Thermostat.prototype.reset = function() {
  this.temp = 20;
};

Thermostat.prototype.energyRating = function() {
  if (this.temp < 18) {
    return "low-usage";
  }
  else if (this.temp < 25) {
    return "medium-usage";
  }
  else {
    return "high-usage";
  }
};

Thermostat.prototype.powerSaveToggle = function() {

};

var thermostat = new Thermostat();
