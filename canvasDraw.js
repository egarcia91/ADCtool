(function(){
	function CanvasDraw(div,config){
		HtmlWidget.call(this,div,config);
		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute("width",this.widthDefault);
		this.canvas.setAttribute("height",this.heightDefault);
		this.d.appendChild(this.canvas);
	}

	CanvasDraw.prototype = Object.create(HtmlWidget.prototype);
	CanvasDraw.prototype.constructor = "CanvasDraw";
	CanvasDraw.prototype.widthDefault = "310";
	CanvasDraw.prototype.heightDefault = "200";

	window.CanvasDraw = CanvasDraw;
})();
