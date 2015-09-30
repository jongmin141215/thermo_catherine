describe( 'DOM', function () {
  beforeEach(function() {
    loadFixtures('index.html');
  });

  it("increments a counter", function(){
    var $temp = $('#temp');
    var $up = $('#up');
    $button.click();
    expect($counter.text()).toContainText("21");
  });
});
