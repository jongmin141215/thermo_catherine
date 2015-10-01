

$(document).ready (function() {

displayEnergyUsage();

  function displayEnergyUsage() {
    if(thermostat.energyRating() == 'low-usage') {
      $( '#degrees' ).css({ 'color': '#04B431'});
    } else if(thermostat.energyRating() == 'medium-usage') {
      $( '#degrees' ).css({ 'color': '#FFBF00'});
    }
      else {
      $( '#degrees' ).css({ 'color': 'red'});
    }
  }

  $( '#temp' ).text(thermostat.temp);

  $( '#up' ).click(function( event ) {
    powerSaveToggle();
    thermostat.up();
    $( '#temp' ).text(thermostat.temp);
    displayEnergyUsage();
  });

  $( '#down' ).click(function( event ) {
    powerSaveToggle();
    thermostat.down();
    $( '#temp' ).text(thermostat.temp);
    displayEnergyUsage();
  });

  function powerSaveToggle() {
    $( '#powersave' ).change(function() {
      if($(this).is(":checked")) {
        thermostat.powerSavingOn();
      } else {
        thermostat.powerSavingOff();
      }
    });
  }

  $( '#reset' ).click(function( event ) {
    thermostat.reset();
    $( '#temp' ).text(thermostat.temp);
  });

  var urlBeg = 'http://api.openweathermap.org/data/2.5/weather?q={';
  var cityName = 'london';
  var urlEnd = '}';
  var urlFull = urlBeg + cityName + urlEnd;
  $.ajax(urlFull, {
    success: function(data) {
    console.log(data);
    $('#weather').html( "In London: " + Math.round((data.main.temp - 273.15)) + "ºC, " + data.weather[0].description);
    // console.log(data.weather[0].description);
  }
});

  // $('#searchButton').click(function(form) {
  //   console.log('hi');
  //   console.log(form);
  //   cityResult(form);
  // })



});
