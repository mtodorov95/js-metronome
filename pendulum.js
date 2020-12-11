class Pendulum{

    constructor(canvas){
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.t = 0;
        this.timeInterval = 0;
        this.startTime = 0;
        this.lastTime = 0;
        this.frame = 0;
        this.period = 2000;
        this.animating = false;
    }

    requestAnimationFrame(){
        window.requestAnimationFrame = function(callback){
            return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
        };
    }

     getContext(){
        return this.context;
      };
      
      getCanvas (){
        return this.canvas;
      };
      
      clear (){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      };
      
      setStage (func){
        this.stage = func;
      };
      
      isAnimating (){
        return this.animating;
      };
      
      getFrame (){
        return this.frame;
      };
      
      start (){
        this.animating = true;
        var date = new Date();
        this.startTime = date.getTime();
        this.lastTime = this.startTime;
        
        if (this.stage !== undefined){
          this.stage();
        }
        
        this.animationLoop();
      };
      
      stop (){
        this.animating = false;
      };
      
      getTimeInterval (){
        return this.timeInterval;
      };
      
      getTime (){
        return this.t;
      };
      
      getFps (){
        return this.timeInterval > 0 ? 1000 / this.timeInterval : 0;
      };
      
      animationLoop (){
        var that = this;
        
        this.frame++;
        var date = new Date();
        var thisTime = date.getTime();
        this.timeInterval = thisTime - this.lastTime;
        this.t += this.timeInterval;
        this.lastTime = thisTime;
        
        if (this.stage !== undefined){
          this.stage();
        }
        
        if (this.animating){
            window.requestAnimationFrame(() => that.animationLoop())
        }
      }

      setPeriod (bpm){
        this.period = (60 / bpm)*2000;
        console.log(this.period);
      }

      startStop (){
        var context = this.getContext();
        var canvas = this.getCanvas();
        
        var amplitude = Math.PI / 4;
        var theta = 0;
        var pendulumLength = 250;
        var pendulumWidth = 5;
        var rotationPointX = canvas.width / 2;
        var rotationPointY = 20;
        
        this.setStage(function(){
         theta = (amplitude * Math.sin((2 * Math.PI * this.getTime()) / this.period)) + Math.PI / 2;
          
          this.clear();
          
          context.beginPath();
          context.arc(rotationPointX, rotationPointY, 15, 0, 2 * Math.PI, false);
          context.fillStyle = "black";
          context.fill();
          
          context.beginPath();
          var endPointX = rotationPointX + (pendulumLength * Math.cos(theta));
          var endPointY = rotationPointY + (pendulumLength * Math.sin(theta));
          context.beginPath();
          context.moveTo(rotationPointX, rotationPointY);
          context.lineTo(endPointX, endPointY);
          context.lineWidth = pendulumWidth;
          context.lineCap = "round";
          context.strokeStyle = "#555";
          context.stroke();
    
          context.beginPath();
          context.arc(endPointX, endPointY, 40, 0, 2 * Math.PI, false);
          var grd = context.createLinearGradient(endPointX - 50, endPointY - 50, endPointX + 50, endPointY + 50);
          grd.addColorStop(0, "#444");
          grd.addColorStop(0.5, "white");
          grd.addColorStop(1, "#444");
          context.fillStyle = grd;
          context.fill();
        });
        if(this.animating){
            this.stop();
        } else {
            this.start();
        }
      }
}