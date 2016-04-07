var context, graphic;
var graphicPosX=0;
var graphicPosY=0;

$(document).ready(function() {
    document.addEventListener("deviceready", init, false);
    //init();
    
    //window.lockOrientation('portrait-primary');
    
    var c = document.getElementById("canvas");
    context = c.getContext("2d");
    //console.log(context);
    
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    
    graphicPosX = window.innerWidth/2 - 25;
    graphicPosY = window.innerHeight/2 - 25;
    
    graphic = new Image();
    graphic.src = "img/vespa.png";
    graphic.width = 50;
    graphic.height = 50;
    
    graphic.onload = function() {
        context.drawImage(graphic, graphicPosX, graphicPosY); // source, x position, y position
    }
    
});


function init () {
    
    
    var options = { frequency: 40 }; 
    
    var watchID;
    
    $("#startAcceleration").on("click", function() {
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    });
    
    function onSuccess(acceleration) {
        $("#result").html('Acceleration X: ' + acceleration.x + '<br/>' +
          'Acceleration Y: ' + acceleration.y + '<br/>' +
          'Acceleration Z: ' + acceleration.z + '<br/>');
        context.canvas.width = context.canvas.width; 
        graphicPosX -= acceleration.x;
        graphicPosY += acceleration.y;
        context.drawImage(graphic, graphicPosX, graphicPosY);
        
    }

    function onError() {
        alert('onError!');
    }

     

   $("#stopAcceleration").on("click", function() {
    navigator.accelerometer.clearWatch(watchID);
   });
}