describe("Thermostat", function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it("should start at 20 degrees", function() {
    expect(thermostat.temp).toBe(20);
  });

  it(
    "should increase the temperature by one degree when the up button is pushed",
    function() {
      thermostat.up();
      expect(thermostat.temp).toBe(21);
    });

  it(
    "should decrease the temperature by one degree when the down button is pushed",
    function() {
      thermostat.down();
      expect(thermostat.temp).toBe(19);
    });

  it("has a minimum temperature of 10 degrees", function() {
    expect(thermostat.MIN_TEMP).toBe(10);
  });

  it("cannot go below the minimum temperature", function() {
    thermostat.temp = 10;
    expect(function(){thermostat.down();}).toThrow("Minimum temperature reached");
  });

  it("has a power saving mode which is on by default", function() {
    expect(thermostat.powerSavingMode).toBe(true);
  });

  it("power saving mode can be turned off", function() {
    thermostat.powerSavingOff();
    expect(thermostat.powerSavingMode).toBe(false);
  });

  it("power saving mode can be turned on", function() {
    thermostat.powerSavingOn();
    expect(thermostat.powerSavingMode).toBe(true);
  });

  it("has a maximum temperature of 25 degrees in power saving mode", function() {
    thermostat.powerSavingOn();
    expect(thermostat.maxTemp).toBe(25);
  });

  it("has a maximum temperature of 32 degrees when power saving mode if off", function() {
    thermostat.powerSavingOff();
    expect(thermostat.maxTemp).toBe(32);
  });

  it("temperature cannot exceed maximum of 25 degrees in power saving mode", function() {
    thermostat.powerSavingOn();
    thermostat.temp = 25;
    expect(function(){thermostat.up();}).toThrow("Cannot exceed the maximum tempreture");
  });

  it("temperature cannot exceed maximum of 32 degrees when power saving mode is off", function() {
    thermostat.powerSavingOff();
    thermostat.temp = 32;
    expect(function(){thermostat.up();}).toThrow("Cannot exceed the maximum tempreture");
  });

  it("tempreture can be reset to 20 degrees by hitting the reset button", function() {
    thermostat.reset();
    expect(thermostat.temp).toBe(20);
  });
});

describe("reflects energy usage with a rating", function() {
    var thermostat;

    beforeEach(function() {
      thermostat = new Thermostat();
    });

    it("less than 18 degrees is considered low usage", function() {
      thermostat.temp = 17;
      expect(thermostat.energyRating()).toBe("low-usage");
    });
    it("less than 25 degrees is considered medium usage", function() {
      thermostat.temp = 24;
      expect(thermostat.energyRating()).toBe("medium-usage");
    });
    it("25 and over is considered high usage", function() {
      thermostat.temp = 31;
      expect(thermostat.energyRating()).toBe("high-usage");
    });
});
