$(function(){
  var peerReviewCanvas = $('#peer-review')[0];
  var peerReviewCtx = peerReviewCanvas.getContext('2d');
  var pointDistributionCanvas = $('#point-dist')[0];
  var pointDistributionCtx = pointDistributionCanvas.getContext('2d');
  var colors = [
    'yellow',
    'purple',
    'silver',
    'green',
    'orange',
    'blue',
    'red',
    'cyan',
    'fuschia',
    'pink'
  ]

  //Draw peer review chart
  peerReviewCtx.fillText("Peer Review", 90, 10);
  for(var i = 0; i < 11; i++) {
    peerReviewCtx.fillText(10 - i, 5, 30 + i*20);
    peerReviewCtx.moveTo(20, 30 + i*20);
    peerReviewCtx.lineTo(110, 30 + i*20);
  }
  peerReviewCtx.stroke();

  // Draw peer review bars
  $.ajax({
    url: '/peerReview.json',
    dataType: 'json',
    success: function(data) {
      var categories = Object.keys(data);

      // Draw bars
      categories.forEach(function(category, i) {
        var value = data[category];
        var x = 30 + (15 * i);
        var y = 30 + (10 - value) * 20;
        var height = value * 20;
        peerReviewCtx.fillStyle = colors[i];
        peerReviewCtx.fillRect(x, y, 5, height);
        peerReviewCtx.fillRect(120, 80 + 20 * i, 10, 10);
        peerReviewCtx.strokeText(category, 135, 88 + 20 * i);
      });
    }
  });

  // Draw point distribution chart
  $.ajax({
    url: 'pointDistribution.json',
    dataType: 'json',
    success: function(data) {
      var people = Object.keys(data);
      var total = Object.values(data).reduce(function(acc, value) { return acc + value }, 0);
      var start = 0;
      people.forEach(function(person, i) {
        var percent = data[person] / total;
        var end = start + percent * 2 * Math.PI;
        pointDistributionCtx.arc(100, 100, 80, start, end);
        start = end;
        pointDistributionCtx.beginPath();
        pointDistributionCtx.fillStyle = colors[i];
        pointDistributionCtx.fill();
      });
    }
  });
});
