

$(document).ready (function() {

  $( '#temp' ).text(thermostat.temp);

  $( '#up' ).click(function( event ) {
    thermostat.up();
    $( '#temp' ).text(thermostat.temp);
  });

  $( '#down' ).click(function( event ) {
    thermostat.down();
    $( '#temp' ).text(thermostat.temp);
  });


});
