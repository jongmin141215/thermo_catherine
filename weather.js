(function () {
  var URL, Weather, http, isModule;

  isModule = typeof module !== "undefined" && module.exports;

  if (isModule) {
    require('sugar');
    http = require("http");
    URL = require('url');
  }

  Weather = (function() {

    function Weather() {}

    Weather.VERSION = "0.0.2";

    Weather.kelvinToFahrenheit = function(value) {
      return (this.kelvinToCelsius(value) * 1.8) + 32;
    };

    Weather.kelvinToCelsius = function(value) {
      return value - 273.15;
    };

    Weather.getCurrent = function(city, callback) {
      var _this = this;
      return this._getJSON("http://openweathermap.org/data/2.1/find/city?q=" + (encodeURIComponent(city)) + "&cnt=1", function(data) {
        return callback(new Weather.Current(data));
      });
    };

    Weather.getForecast = function(city, callback) {
      var _this = this;
      return this._getJSON("http://openweathermap.org/data/2.1/forecast/city?q=" + (encodeURIComponent(city)) + "&cnt=1", function(data) {
        return callback(new Weather.Forecast(data));
      });
    };

    Weather._getJSON = function(url, callback) {
      if (isModule) {
        return http.get(URL.parse(url), function(response) {
          return callback(response.body);
        });
      } else {
        return $.ajax({
          url: url,
          dataType: "jsonp",
          success: callback
        });
      }
    };

    return Weather;

  })();

  Weather.Forecast = (function() {

    function Forecast(data) {
      this.data = data;
    }

    Forecast.prototype.startAt = function() {
      return new Date(this.data.list.min('dt').dt * 1000);
    };

    Forecast.prototype.endAt = function() {
      return new Date(this.data.list.max('dt').dt * 1000);
    };

    Forecast.prototype.day = function(date) {
      return new Weather.Forecast(this._filter(date));
    };

    Forecast.prototype.low = function() {
      var output;
      if (!(this.data.list.length > 0)) {
        return void 0;
      }
      output = this.data.list.min(function(item) {
        return item.main.temp_min;
      });
      return output.main.temp_min;
    };

    Forecast.prototype.high = function() {
      var output;
      if (!(this.data.list.length > 0)) {
        return void 0;
      }
      output = this.data.list.max(function(item) {
        return item.main.temp_max;
      });
      return output.main.temp_max;
    };

    Forecast.prototype._filter = function(date) {
      var beginningOfDay, clone, endOfDay;
      if (date instanceof Date) {
        date = date.getTime();
      }
      clone = Object.clone(this.data);
      beginningOfDay = Date.create(date).beginningOfDay();
      endOfDay = Date.create(date).endOfDay();
      clone.list = clone.list.findAll(function(range) {
        var dateTimestamp;
        dateTimestamp = range.dt * 1000;
        if (dateTimestamp >= beginningOfDay.getTime() && dateTimestamp <= endOfDay.getTime()) {
          return range;
        }
      });
      return clone;
    };

    return Forecast;

  })();

  Weather.Current = (function() {

    function Current(data) {
      this.data = data;
    }

    Current.prototype.temperature = function() {
      var temperature;
      return temperature = this.data.list[0].main.temp;
    };

    Current.prototype.conditions = function() {
      return this.data.list[0].weather[0].description;
    };

    return Current;

  })();

  if (isModule) {
    module.exports = Weather;
  } else {
    window.Weather = Weather;
  }

}).call(this);
