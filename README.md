


# GLICHTXT.JS

### WTF?:
 
 Glichtxt.js is a jquery plug-in that replace the text content of a specified element with a js-canvas "glitched" animation.
 
 
### Features:
 
 Glichtxt.js is able to get the following CSS properties from the targeted elements : "font-family","font-size","background-color","color" and line-height". So the "gliched element" text will looks the same as defined in your CSS.

### Usage:
Load jquery first.
```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js"></script>
```
Then load glichtxt.js
```html
 <script type="text/javascript" src="js/glichtxt.min.js"></script>
```

Then just target some elements: 
```html
<script type="text/javascript">
$("p").glichtxt();
$(".a-class-to-glich").glichtxt();
$(".#an-id-to-glich").glichtxt();
</script>
```

### Parameters:

Glichtxt.js comes with few parameters that you can define and play with.

#### rotate
```javascript
$("p").glichtxt({
rotate:true,//false.
rotateforce:20 //max angle in degree.
});
```
Ennable the rotate feature and control the maximum possible angle.


#### scaling 
```javascript
$("p").glichtxt({
scaling:true,//false.
scaleforce:2 //max scale ratio. 2 = x2 , 3 = x3.
});
``` 

Ennable the scaling feature and controle the maximum possible size. 

#### glitchforce
 ```javascript
$("p").glichtxt({
glitchforce:5; 
});
``` 
Controls the max glitching seed, default is 3


#### heightoffset
 ```javascript
$("p").glichtxt({
heightoffset:5; 
});
``` 
Controls the Height displacement seed of the glitched text in pixels, default is 18.

#### blend
 ```javascript
$("p").glichtxt({
blend:20; 
});
``` 

Controls the globalCompositeOperation property of the glitched text .
Every properties are stored inside an array in this order : 

        "source-over", "source-in", "source-out", "source-atop",
        "destination-over", "destination-in", "destination-out", "destination-atop",
        "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken",
        "lighten", "color-dodge", "color-burn", "hard-light", "soft-light",
        "difference", "exclusion", "hue", "saturation", "color", "luminosity"

So blend:0  will output-> "source-over", blend:10-> "xor", and blend:25-> "luminosity".


### Limitations
As the plug-in replace text by an image if you insert some hyperlinks inside the targeted element, then they won't work.
Also the sizes of the canvas won't change on window.resize. 






