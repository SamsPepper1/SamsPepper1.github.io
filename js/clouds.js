window.onload = function() {
  block_size_x = 10;
  block_size_y = 10;
  var seed = Math.random();
  var pn = new Perlin(seed);
  var canvas = document.getElementById('clouds');
  var context = canvas.getContext("2d");
  var offset = 0;
  var a = [];
  setInterval(function() {
    context.fillStyle = '#000000'
    context.fillRect(0, 0, canvas.width, canvas.height);
    a = make_frame(canvas, pn, offset);
    draw_frame(context, a)
    offset += 1;
  }, 100)
}

function make_frame(canvas, pn, offset) {
  a = []
  for (var i = 0; i <= canvas.height / block_size_y; i ++) {
    a[i] = [];
    for (var ii = 0; ii <= canvas.width / block_size_x; ii ++) {
      var rgb = Math.max(parseInt(pn.noise((i + offset/20)/20, (ii + offset/50)/20,offset/100) * 255) - 128, 0);
      var hexColor = rgbToHex(rgb,rgb,rgb);
      a[i][ii] = hexColor;
    }
  }
  return a;
}

function draw_frame ( context, a) {
  for (var i = 0; i < a.length; i++) {
    for (ii = 0; ii < a[0].length; ii++) {
      if (a[i][ii] != "#000000") {
        context.fillStyle = a[i][ii];
        context.fillRect( (ii * block_size_x), i * block_size_y,((ii+1) * block_size_x), (i+1) * block_size_y);
      }
    }
  }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
