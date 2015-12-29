(function ($) {

  $.fn.glichtxt = function (params) {
///Input parameters
    params = $.extend({
      rotate: false,
      rotateforce: 2,
      scaling: true,
      scaleforce: 3,
      heightoffset: 18,
      glitchforce:10,
      blend: 8

    }, params);

    this.each(function () {
      ///For each element define our variables
      var gPO = [
        "source-over", "source-in", "source-out", "source-atop",                     // This is the globalCompositeOperation array 
        "destination-over", "destination-in", "destination-out", "destination-atop", //
        "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken",         //
        "lighten", "color-dodge", "color-burn", "hard-light", "soft-light",
        "difference", "exclusion", "hue", "saturation", "color", "luminosity"
      ];
      var $t = $(this); // Get the element 
      var size = $t.css('font-size').replace(/[^-\d\.]/g, ''); // Get the element font size as a string
      var paddingtop = $t.css("padding-top").replace("px", "");//Get the element padding-top property 
      var paddingleft = $t.css("padding-left").replace("px", "");//Get the element padding-left property 
      var getdivcolor = $t.css("background-color");
      var fontfamily = $t.css("font-family");//Get the element bg-color property 
      var txtcolor = $t.css("color");//Get the element txt color property 
 
      var lineHeight = parseInt($t.css('line-height'), 10);//Get the element lineheigh property as integer
      var txtdata = $t.text(), //Get the element Text data
        newText = ''; // an empty string 
      var canvas1 = document.createElement('canvas'); // output
      var ctx1 = canvas1.getContext("2d");
      var canvas2 = document.createElement('canvas');// printed Text 
      var ctx2 = canvas2.getContext("2d");
      var canvas3 = document.createElement('canvas');// glitched Text
      var ctx3 = canvas3.getContext("2d");
      var H = $t.height() + parseInt(size) + lineHeight; // Get the element height and add some secure padding in order to avoid bottom canvas text to be out of canvas when wrapping
      var W = $t.width(); // get the element width
      var maxWidth = W; // setting up the max with
      canvas2.width = W; //setting up canvas with an height
      canvas2.height = H;



      var x = parseInt(paddingleft);//setting up padding inside wraptext function
      var y = parseInt(size);
      ctx2.font = size + "px " + fontfamily; // pushing font size and font familly to canvas2  

      wrapText(ctx2, txtdata, x, y, maxWidth, lineHeight); // printing text in canvas2 

      

      drawcanvas(); //trigger animation

      $t.text(newText);// emptying the element
      $t.append(canvas1);// insert output inside element

      function wrapText(context, text, x, y, maxWidth, lineHeight) { // this function is adapted from : http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
        context.fillStyle = getdivcolor;
        context.fillRect(0, 0, canvas2.width, canvas2.height);
        var words = text.split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillStyle = txtcolor;
            context.textAlign = "left";
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;

          } else {
            line = testLine;
          }
        }

        context.fillStyle = txtcolor;
        context.fillText(line, x, y);

      };

      function drawcanvas() {
        canvas1.height = canvas2.height; //setting up all canvas sizes 
        canvas1.width = canvas2.width;
        canvas3.height = canvas2.height;
        canvas3.width = canvas2.width;
        ctx1.drawImage(canvas2, 0, 0); // printing text into output
        latglitch(); // trigger the glitch effect
        ctx1.globalCompositeOperation = gPO[params.blend]; // blending glitch effect 
        if (params.scaling) { //scale effect
          ctx1.setTransform(randInt(0, params.scaleforce), 0, 0, randInt(0, params.scaleforce), 0, 0);
        }
        if (params.rotate) { //rotate effect
          ctx1.translate(canvas1.width / 2, canvas1.width / 2);
          ctx1.rotate(randInt(params.rotateforce, params.rotateforce) * Math.PI / 180);
          ctx1.translate(-canvas1.width / 2, -canvas1.width / 2);
        }
        ctx1.drawImage(canvas3, randInt(0, params.heightoffset), randInt(-params.heightoffset, params.heightoffset));//print the glitched text over 
        window.requestAnimationFrame(drawcanvas); // redo!
      }

      function latglitch() {//glitch effect
        var latseed = randInt(-params.glichforce, params.glichforce);
        for (var i = 0; i < latseed; i++) {
          var x = Math.random() * W;
          var y = Math.random() * H;
          var SW = W - x;
          var SH = randInt(5, H / 3);
          ctx3.drawImage(canvas2, 0, y, SW, SH, x, y,SW, SH);
          ctx3.drawImage(canvas2, SW, y, x, SH, 0, y, x,SH);
        }

      }

      function randInt(a, b) { //return some random value between 2 INT
        return Math.random() * (b - a) + a;
      }

    });

    return this;
  };

})(jQuery);
