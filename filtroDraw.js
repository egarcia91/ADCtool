(function(){
	function FiltroDraw(div,config){
		CanvasDraw.call(this,div,config);
	}

	FiltroDraw.prototype = Object.create(CanvasDraw.prototype);
	FiltroDraw.prototype.constructor = "FiltroDraw";
	FiltroDraw.prototype.widthDefault = "310";
	FiltroDraw.prototype.heightDefault = "200";
	FiltroDraw.prototype.marginY = 0;
	FiltroDraw.prototype.marginTopY = 0;
	FiltroDraw.prototype.marginX = 0;
	FiltroDraw.prototype.marginRX = 0;
	FiltroDraw.prototype.cantCols = 6;
	FiltroDraw.prototype.cantFils = 6;
	FiltroDraw.prototype.signalColor = "red";

	FiltroDraw.prototype.draw = function(color) {
		this.canvas = this.d.getElementsByTagName('canvas')[0];
		this.height = this.canvas.height;
		this.width = this.canvas.width;
		this.marginX = this.width/17;
		this.marginY = this.height/16;
		this.marginTopY = this.height/(3.6);
		this.marginRX = this.width/28;
		this.pasoX = (this.width-this.marginX-this.marginRX)/this.cantCols;
		this.pasoY = (this.height-this.marginY-this.marginTopY)/this.cantFils;
		this.context = this.canvas.getContext('2d');
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.context = this.canvas.getContext('2d');
		this.grill();
		this.signalColor = color;
	};

	FiltroDraw.prototype.grill = function(){
		this.context.beginPath();
		for(var i = 0; i <= this.cantCols; i++){
			this.context.moveTo(i*this.pasoX+this.marginX,this.marginY);
			this.context.lineTo(i*this.pasoX+this.marginX,this.height-this.marginTopY);
		}
		this.context.strokeStyle = "grey";
		this.context.stroke();

		this.context.beginPath();
		for(var i = 0; i <= this.cantFils; i++){
			this.context.moveTo(this.marginX,this.marginY+i*this.pasoY);
			this.context.lineTo(this.width-this.marginRX,this.marginY+i*this.pasoY);
		}
		this.context.strokeStyle = "grey";
		this.context.stroke();
		
		this.context.beginPath();
		this.context.font = "10px Arial";
		this.context.textAlign = 'end';
		for(var i = 0; i <= this.cantFils; i++) {
			this.context.fillText((20*(this.cantFils/2))+i*(-20),this.marginX,this.marginY+i*this.pasoY);
		}

		this.context.textAlign = 'center';
		for(var i = 0; i <= this.cantCols; i++) {
			this.context.fillText(this.niceLogW(i),i*this.pasoX+this.marginX,this.height-(this.height/5));
		}
	};

	FiltroDraw.prototype.niceLogW = function(i) {
		var log = Math.pow(10,i-1);
		if(i-1 > 8){
			log = log/1000000000+"G";
		} else if(i-1 > 5){
			log = log/1000000+"M";
		} else if(i-1 > 2){
			log = log/1000+"K";
		}
		return log;
	};

	FiltroDraw.prototype.searchMaxMin = function(dB) {
		var min = 1000;
		var max = -1000;
		for(var i = 0; dB[i] != undefined; i++){
			if(dB[i] < min)
				min = dB[i];
			if(dB[i] > max)
				max = dB[i];
		}
		return {
			max : max,
			min : min
		}
	};

	FiltroDraw.prototype.drawdB = function(conf) {
		if(!conf) return;
		var dB = conf.dB || [];
		var logW = conf.logW || [];
		this.context.beginPath();
		var ceroY = this.marginY+(this.pasoY*(this.cantFils/2)); 
		var disTopY = (this.cantFils/2)*this.pasoY*-1; 

		for(var j = 0; j < logW.length; j++){
			if(((Math.log10(logW[j])*this.pasoX)+this.pasoX) > this.cantCols*this.pasoX) break;
			if(Math.abs(this.pasoY*(dB[j]/20)) > ((this.cantFils/2)*this.pasoY)) continue;
			this.context.arc((Math.log10(logW[j])*this.pasoX)+(this.marginX+this.pasoX),ceroY+(this.pasoY*(dB[j]/20)*-1),0,0,Math.PI*2);
		}

		this.context.strokeStyle = this.signalColor;
		this.context.stroke();
	};



	window.FiltroDraw = FiltroDraw;
})();
