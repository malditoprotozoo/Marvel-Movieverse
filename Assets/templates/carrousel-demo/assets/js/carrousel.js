$(document).ready(function() {

  var blackPanther = estrenos[0].blackPanther;
  var avengersInfinity = estrenos[0].avengersInfinity;
  var antmanWasp = estrenos[0].antmanWasp;
  var newMutants = estrenos[0].newMutants;
  var deadpool2 = estrenos[0].deadpool2;
  var darkPhoenix = estrenos[0].darkPhoenix;


  $('#img1').append(
    '<img class="imgCarrousel" src=" ' + blackPanther + ' "/>'
  );

  $('#img2').append(
    '<img class="imgCarrousel" src="' + avengersInfinity + '"/>'
  );

  $('#img3').append(
    '<img class="imgCarrousel" src="' + antmanWasp + '"/>'
  );

  $('#img4').append(
    '<img class="imgCarrousel" src="' + newMutants + '"/>'
  );

  $('#img5').append(
    '<img class="imgCarrousel" src="' + deadpool2 + '"/>'
  );

  $('#img6').append(
    '<img class="imgCarrousel" src="' + darkPhoenix + '"/>'
  );

});
