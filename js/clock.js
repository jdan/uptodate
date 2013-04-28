var draw_clock = function() {
  var can = document.getElementById('clock-canvas'),
      ctx = can.getContext('2d');

  var draw_frame = function() {
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#555555';
    ctx.fillStyle = "#FFFFFF";

    ctx.beginPath();
    ctx.arc(120, 120, 105, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#999999';

    /* draw ticks */
    var theta = 0;
    for (theta = 0; theta < 2 * Math.PI; theta += Math.PI / 6) {
      var x1 = 90 * Math.cos(theta) + 120,
          x2 = 97 * Math.cos(theta) + 120,
          y1 = 90 * Math.sin(theta) + 120,
          y2 = 97 * Math.sin(theta) + 120;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  var minutes = Math.random() * 10 + 15;
  var seconds = 0;
  var hours = Math.random() * 3 + 8 + minutes / 12;

  var tick = function() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      hours += 1 / 12;

      timefix({
        klass: 'utd-example',
        timestamp: function(el) {
            var ts = parseInt(el.getAttribute('data-time'));
            var d = new Date() - 0;
            /* speed up time 10x */
            var delta = d - ts;
            return delta * 10 + d;
        },
        formatter: time_ago_in_words
      });
    }

    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }

    if (hours >= 12) {
      hours = 0;
    }
  }

  var draw_hands = function() {
    ctx.clearRect(0, 0, 240, 240);
    draw_frame();

    var theta;

    /* hour hand */
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#333333';

    theta = (hours / 12) * (2 * Math.PI) - (Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(120, 120);
    ctx.lineTo(70 * Math.cos(theta) + 120, 70 * Math.sin(theta) + 120);
    ctx.stroke();

    /* minute hand */
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgb(0, 0, 0)';

    theta = (minutes / 60) * (2 * Math.PI) - (Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(120, 120);
    ctx.lineTo(90 * Math.cos(theta) + 120, 90 * Math.sin(theta) + 120);
    ctx.stroke();

    /* seconds */
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(230, 100, 100)';

    theta = (seconds / 60) * (2 * Math.PI) - (Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(120, 120);
    ctx.lineTo(93 * Math.cos(theta) + 120, 93 * Math.sin(theta) + 120);
    ctx.stroke();
  };

  setInterval(function() {
    tick();
    draw_hands();
  }, 100);

};