(function(){
	function SignalDraw(div,config){
		CanvasDraw.call(this,div,config);
	}

	SignalDraw.prototype = Object.create(CanvasDraw.prototype);
	SignalDraw.prototype.constructor = "SignalDraw";
	SignalDraw.prototype.widthDefault = "310";
	SignalDraw.prototype.heightDefault = "200";
	SignalDraw.prototype.marginY = 0;
	SignalDraw.prototype.marginTopY = 0;
	SignalDraw.prototype.marginX = 0;
	SignalDraw.prototype.marginRX = 0;
	SignalDraw.prototype.cantCols = 10;
	SignalDraw.prototype.cantFils = 4;
	SignalDraw.prototype.signalColor = "red";

	SignalDraw.prototype.draw = function(color) {
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

	SignalDraw.prototype.grill = function(){
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
			this.context.fillText(((this.cantFils/2)-i)/2,this.marginX,this.marginY+i*this.pasoY);
		}

		this.context.textAlign = 'center';
		for(var i = 0; i <= this.cantCols; i++) {
			this.context.fillText(i,i*this.pasoX+this.marginX,this.height-(this.height/5));
		}
	};

	SignalDraw.prototype.drawResult = function(conf) {
		if(!conf) return;
		var tiempo = conf.tiempo || [];
//		var datos = conf.datos || [];
		var result = conf.result || [];
		this.context.beginPath();
		var ceroY = this.marginY+(this.pasoY*(this.cantFils/2)); 
		var disTopY = (this.cantFils/2)*this.pasoY*-1; 
//		for(var i = 0; i < datos.length; i++){
		for(var i = 0; i < result.length; i++){
			this.context.arc((tiempo[i])*this.pasoX+this.marginX,ceroY+(result[i]*disTopY),0,0,Math.PI*2);
		}
		this.context.strokeStyle = this.signalColor;
		this.context.stroke();
	};

	SignalDraw.prototype.drawFrequency = function(conf) {
		if(!conf) return;
//		var tiempo = conf.tiempo || [];
//		var datos = conf.datos || [];
//		var length = datos[0].length;
//		var ceroY = this.marginY+(this.pasoY*(this.cantFils/2)); 
//		var disTopY = (this.cantFils/2)*this.pasoY*-1; 
//		for(var j = 0; j < length; j++){
//			this.context.beginPath();
//			for(var i = 0; i < datos.length; i++){
//				this.context.arc((tiempo[i])*this.pasoX+this.marginX,ceroY+(datos[i][j]*disTopY),1,0,Math.PI*2);
//			}
//			var color = "#";
//			for(var i = 0; i < 6; i++ )
//				color += parseInt(Math.random()*10,10);
//			this.context.strokeStyle = color;
//			this.context.stroke();
//		}
	};

	window.SignalDraw = SignalDraw;
})();
