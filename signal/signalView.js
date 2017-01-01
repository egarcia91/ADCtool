!function(){
	function SignalView(div,config){
		HtmlWidget.call(this,div,config);
		this.basicDraw();
		SignalView.showGrafic(this.c.signal, "MainCanvasSignal");
	}

	SignalView.prototype = Object.create(HtmlWidget.prototype);
	SignalView.prototype.constructor = "SignalView";

	SignalView.prototype.thisChange = function(event,t,that){
		var name = t.getAttribute('data-name');
		switch(name){
			default:
				return true;
				break;
		}
		return true;
	};

	SignalView.prototype.thisClick = function(event,t,that){
		var evt = t.getAttribute('data-evt');
		switch(evt){

			default:
				return true;
				break;
		}
	};

	SignalView.prototype.drawViewHeader = function(){
		var table = document.createElement('table');
		table.style.width = "100%";
		var tr = document.createElement('tr');
		var td1 = document.createElement('th');
		td1.style.width = "20%";
		var td2 = document.createElement('th');
		td2.style.width = "60%";
		var td3 = document.createElement('th');
		td3.setAttribute("style","text-align:right");
		var text1 = document.createTextNode('Nombre');
		var text2 = document.createTextNode(this.c.signal.nombre);

		var input = document.createElement('input');
		input.setAttribute("data-evt","idealSignal");
//		input.setAttribute("data-name",i);
		input.setAttribute("type","button");
		input.setAttribute("value","Salida Ideal");

		td1.appendChild(text1);
		td2.appendChild(text2);
		td3.appendChild(input);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);

		return table;
	};

	SignalView.prototype.basicDraw = function(){
		var canvasSignalIn = document.createElement('div');
		canvasSignalIn.setAttribute("class","MainCanvasSignal");
		canvasSignalIn.id = "MainCanvasSignal";
		var canvasSignalOut = document.createElement('div');
		canvasSignalOut.setAttribute("class","MainCanvasSignalOut");
		canvasSignalOut.id = "MainCanvasSignalOut";
		var canvasFFTIn = document.createElement('div');
		canvasFFTIn.setAttribute("class","MainCanvasInFFT");
		canvasFFTIn.id = "MainCanvasInFFT";
		var canvasFFTOut = document.createElement('div');
		canvasFFTOut.setAttribute("class","MainCanvasOutFFT");
		canvasFFTOut.id = "MainCanvasOutFFT";

		this.d.appendChild(this.drawViewHeader());
		this.d.appendChild(canvasSignalIn);
		this.d.appendChild(canvasSignalOut);
		this.d.appendChild(canvasFFTIn);
		this.d.appendChild(canvasFFTOut);
	};

	SignalView.showGrafic = function(sig, id){
		var dataPoints = window.Signal.graficDataPoints(sig);
		var signalChart = new CanvasJS.Chart(id, {
			data: [{
				type: "line",
				dataPoints: dataPoints
			}],
			axisX: {
				tickThickness: 0
			},
			axisY: {
				maximum: 1,
				minimum: -1,
				tickThickness: 0
			}
		});
		signalChart.render();
	};


	window.SignalView = SignalView;
}();
