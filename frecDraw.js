(function(){
	function FrecDraw(div,config){
		CanvasDraw.call(this,div,config);

//		if(typeof(this.thisMove) == 'function' && ! this._onMoveRegistered){
//			this.d.addEventListener('mousemove', this._onMove(), false);
//			this._onMoveRegistered = true;
//		}
	}

	FrecDraw.prototype = Object.create(CanvasDraw.prototype);
	FrecDraw.prototype.constructor = "FrecDraw";
	FrecDraw.prototype.widthDefault = "810";
	FrecDraw.prototype.heightDefault = "239";
	FrecDraw.prototype.marginY = 0;
	FrecDraw.prototype.marginTopY = 0;
	FrecDraw.prototype.marginX = 0;
	FrecDraw.prototype.marginRX = 0;
	FrecDraw.prototype.cantCols = 20;
	FrecDraw.prototype.cantFils = 4;
	FrecDraw.prototype.barsColor = "red";
//	FrecDraw.prototype._onMoveRegistered = false;

//	FrecDraw.prototype.thisMove = function(event,t,that){
//		var ceroX = Math.ceil(this.width/17);
//		var pasoX = this.width/21;
//		var posY = event.clientY-this.d.offsetTop+window.pageYOffset;
//		var posX = event.clientX-this.d.offsetLeft+window.pageXOffset;
//		var maxY = Math.ceil(this.height/16+4*(this.height/6));
//		var minY = Math.ceil(this.height/16);
//		var perY = (1-((posY-minY)/(maxY-minY))).toFixed(2);
//		for(var i = 0; i <= 19; i++){
//			var minX = i*pasoX+ceroX;
//			var maxX = (i+1)*pasoX+ceroX;
//			if(posX < maxX && posX > i*pasoX+ceroX ){
//				var perX = ((posX-minX)/(maxX-minX)).toFixed(2);
//				if(posY < maxY && posY > minY ){
//					this.emit("clickCanvas",i,perY,perX);
//				}
//			}
//		}
//		return true;
//	};
//
//	FrecDraw.prototype._onMove: function(){
//			var widget = this;
//			return function(event){
//				for(var t = event.target; t && t != this; t = t.parentNode){
//					if(widget.thisMove(event, t, this))
//						break;
//				}
//			};
//		}

	FrecDraw.prototype.draw = function(color) {
		this.canvas = this.d.getElementsByTagName('canvas')[0];
		this.height = this.canvas.height;
		this.width = this.canvas.width;
		this.marginX = this.width/17;
		this.marginY = this.height/7;
		this.marginTopY = this.height/6;
		this.marginRX = this.width/28;
		this.pasoX = (this.width-this.marginX-this.marginRX)/this.cantCols;
		this.pasoY = (this.height-this.marginY-this.marginTopY)/this.cantFils;
		this.context = this.canvas.getContext('2d');
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.context = this.canvas.getContext('2d');
		this.grill();
		this.grillFase();
		this.barsColor = color;
	};

	FrecDraw.prototype.thisClick = function(event,t,that){
		var posY = event.clientY-this.d.offsetTop+window.pageYOffset;
		var posX = event.clientX-this.d.offsetLeft+window.pageXOffset;
		var maxY = Math.ceil(this.marginY+this.cantFils*this.pasoY);
		var minY = Math.ceil(this.marginY);
		var perY = (1-((posY-minY)/(maxY-minY))).toFixed(2);

		for(var i = 0; i < this.cantCols; i++){
			var minX = i*this.pasoX+this.marginX;
			var maxX = (i+1)*this.pasoX+this.marginX;
			if(posX < maxX && posX > i*this.pasoX+this.marginX ){
				var perX = ((posX-minX)/(maxX-minX)).toFixed(2);
				if(posY < maxY && posY > minY ){
					this.emit("clickCanvas",i,perY,perX);
				} else if(posY < minY) {
					var centroX = i*this.pasoX+this.marginX+(this.pasoX/2);
					var centroY = this.marginY-(this.pasoX/2)-3;
					var radio = (this.pasoX/3);
					var disCenter = Math.sqrt((posX-centroX)*(posX-centroX)+(posY-centroY)*(posY-centroY));
					if(disCenter < radio){
						var angulo = 0;
						if((posX-centroX) < 0 ){
							angulo = ((Math.atan(((posY-centroY)*-1)/(posX-centroX))+Math.PI)/Math.PI);
						} else {
							angulo = (Math.atan(((posY-centroY)*-1)/(posX-centroX))/Math.PI);
						}
						this.emit("clickCirculoCanvas",i,angulo);
					}
				}
			}
		}
		return true;
	};

	FrecDraw.prototype.grillFase = function(){
		for(var i = 0; i < this.cantCols; i++){
			this.context.beginPath();
			this.context.arc(i*this.pasoX+this.marginX+(this.pasoX/2), this.marginY-(this.pasoX/2)-3, (this.pasoX/3), 0, 2 * Math.PI, false);
			this.context.strokeStyle = "grey";
			this.context.stroke();
		}
	};

	FrecDraw.prototype.drawResultFase = function(conf) {
		if(!conf) return;
		var frec = conf.frec || [];
		var fase = conf.fase || [];
		var phi = conf.phi || [];
		var end = (frec.length < this.cantCols)? frec.length : this.cantCols;

		for(var i = 0; i < end; i++){
			if(fase[i] == undefined) continue;
			var angulo = (-1*fase[i])*Math.PI;
			if(phi[i] != undefined) angulo = (-1*phi[i])*Math.PI;
			this.context.beginPath();
			this.context.arc(i*this.pasoX+this.marginX+(this.pasoX/2), this.marginY-(this.pasoX/2)-3, (this.pasoX/3), angulo, angulo, false);
			this.context.stroke();
			this.context.lineTo(i*this.pasoX+this.marginX+(this.pasoX/2),this.marginY-(this.pasoX/2)-3);
			this.context.strokeStyle = this.barsColor;
			this.context.stroke();
		}
	};

	FrecDraw.prototype.grill = function(){
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
			this.context.fillText(1-(i/this.cantFils),this.marginX,this.marginY+i*this.pasoY);
		}

		for(var i = 1; i <= this.cantCols; i++) {
			this.context.fillText("f"+i,i*this.pasoX+this.marginX,this.height-(this.height/5));
		}
	};

	FrecDraw.prototype.drawResult = function(conf) {
		if(!conf) return;
		var frec = conf.frec || [];
		var amp = conf.amp || [];
		var ceroY = this.height-this.marginTopY;
		var end = (frec.length < this.cantCols)? frec.length : this.cantCols;

		for(var i = 0; i < end; i++){
			this.context.beginPath();
			this.context.moveTo(i*this.pasoX+this.marginX, ceroY);
			this.context.lineTo(i*this.pasoX+(this.marginX*(5/4)), ceroY);
			this.context.lineTo(i*this.pasoX+(this.marginX*(5/4)), ceroY+(Math.abs(amp[i]))*this.pasoY*(-1*this.cantFils));
			this.context.lineTo(i*this.pasoX+(this.marginX*(6/4)), ceroY+(Math.abs(amp[i]))*this.pasoY*(-1*this.cantFils));
			this.context.lineTo(i*this.pasoX+(this.marginX*(6/4)), ceroY);
			this.context.lineTo((i+1)*this.pasoX+this.marginX, ceroY);
			this.context.moveTo((i+1)*this.pasoX+this.marginX, ceroY);
			this.context.closePath();
			this.context.strokeStyle = this.barsColor;
			this.context.stroke();
		}
	};

	window.FrecDraw = FrecDraw;
})();
