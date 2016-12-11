(function(){
	function ListSignals(div,config){
		HtmlWidget.call(this,div,config);
		this._cValue("signals",[]);

		this.drawTable();
	}

	ListSignals.prototype = Object.create(HtmlWidget.prototype);
	ListSignals.prototype.constructor = "ListSignals";

	ListSignals.prototype.thisClick = function(event,t,that){
		var evt = t.getAttribute('data-evt');
		switch(evt){
//			case "idealSignal":
//				t.style = "display:none";
//				this.emit("idealSignal",t.getAttribute("data-name"));
//				return true;
//				break;
			case "newSignal":
				console.log("HOLA");
				//this.SigDesign.addEventListener("creSignal",this.onCalc.bind(this));

				this.clean();
				this.getElementsByClassName("tables")[0].appendChild(this.drawHeader());
				this.getElementsByClassName("tables")[0].appendChild(this.drawEditHeader());

				this.SigDesign = new SignalDesign(this.getElementsByClassName("editor")[0]);
				this.SigDesign.addEventListener("creSignal",this.onCalc.bind(this));

//				this.emit("newSignal");
				return true;
				break;
//			case "calculateSignal":
//				this.emit("createSignal",this.getElementsByClassName("SignalDesignInfo")[0].value);
//				return true;
//				break;
//			case "viewSignal":
//				this.emit("viewSignal",t.getAttribute("data-name"));
//				return true;
//				break;
			default:
				return true;
				break;
		}
	};

	ListSignals.prototype.onCalc = function(data){
		var index = this.Signal.push(new Signal(null,data));
//		this.Signal[index-1].getDiscretValues(this.confGeneral);
//		this.Signal[index-1].calcFFT();
//		this.Signal[index-1].getValues(this.confGeneral);
////		this.Signal[index-1].calcAnBn();
////		this.Signal[index-1].frecAmp();
//		this.listSignals();
	};


	ListSignals.prototype.readyToDraw = function(i){
		this.clean();
		var header = this.drawHeader();
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		var td1 = document.createElement('th');
		var td2 = document.createElement('th');
		var td3 = document.createElement('th');
		td3.setAttribute("style","text-align:right");
		var text1 = document.createTextNode('Nombre');
		var text2 = document.createTextNode(this.c.signals[i].nombre);
		if(this.c.signals[i].nombre.indexOf("salida ideal") > -1){
			var input = document.createElement('div');
		} else {
			var input = document.createElement('input');
			input.setAttribute("data-evt","idealSignal");
			input.setAttribute("data-name",i);
			input.setAttribute("type","button");
			input.setAttribute("value","Crear Salida Ideal");
		}
		td1.appendChild(text1);
		td2.appendChild(text2);
		td3.appendChild(input);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);

		var canvasSignalIn = document.createElement('div');
		canvasSignalIn.setAttribute("class","MainCanvasSignal");
		var canvasSignalOut = document.createElement('div');
		canvasSignalOut.setAttribute("class","MainCanvasSignalOut");
		var canvasFFTIn = document.createElement('div');
		canvasFFTIn.setAttribute("class","MainCanvasInFFT");
		var canvasFFTOut = document.createElement('div');
		canvasFFTOut.setAttribute("class","MainCanvasOutFFT");

		this.getElementsByClassName("tables")[0].appendChild(header);
		this.getElementsByClassName("tables")[0].appendChild(table);
		this.getElementsByClassName("editor")[0].appendChild(canvasSignalIn);
		this.getElementsByClassName("editor")[0].appendChild(canvasSignalOut);
		this.getElementsByClassName("editor")[0].appendChild(canvasFFTIn);
		this.getElementsByClassName("editor")[0].appendChild(canvasFFTOut);
	};

	ListSignals.prototype.drawEditHeader = function(){
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		var td1 = document.createElement('th');
		var td2 = document.createElement('th');
		var td3 = document.createElement('th');
		td3.setAttribute("style","text-align:right");
		var text1 = document.createTextNode('Nombre');
		var inputname = document.createElement("input");
		inputname.setAttribute("type","text");
		inputname.setAttribute("class","SignalDesignInfo");
		inputname.setAttribute("data-name","nombre");
		td2.appendChild(inputname);
		var input = document.createElement('input');
		input.setAttribute("type","button");
		input.setAttribute("data-evt","calculateSignal");
		input.setAttribute("value","Definir Se\u00f1al de entrada");
		td1.appendChild(text1);
		td3.appendChild(input);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
		return table;
	};
	
	ListSignals.prototype.drawHeader = function(){
		var header = document.createElement('div');
		var headerimg = document.createElement('div');
		headerimg.setAttribute("class","signals");
		headerimg.setAttribute("style","display:inline-block;width:80px;height:80px;");
		var headertitle = document.createElement('div');
		headertitle.innerHTML = "Se\u00f1ales";
		headertitle.setAttribute("style","display:inline-block;margin-left:40px;font-size:30pt;");
		header.appendChild(headerimg);
		header.appendChild(headertitle);
		return header;
	};

	ListSignals.prototype.clean = function(){
		this.getElementsByClassName("tables",function(e){
			e.innerHTML = "";
		})
		this.getElementsByClassName("editor",function(e){
			e.innerHTML = "";
		})
	};

	ListSignals.prototype.tableTemplateHead = function(){

		var tr = document.createElement('tr');

		var td1 = document.createElement('th');
		var td2 = document.createElement('th');
		var td3 = document.createElement('th');

		td3.setAttribute("style","text-align:right");
		var text1 = document.createTextNode('Nombre');
		var text2 = document.createTextNode('Periodo');
		var input = document.createElement('input');

		input.setAttribute("data-evt","newSignal");
		input.setAttribute("type","button");
		input.setAttribute("value","Crear Nuevo");

		td1.appendChild(text1);
		td2.appendChild(text2);
		td3.appendChild(input);

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);

		return tr;
	};

	ListSignals.prototype.tableTemplateBody = function(signal){
		var tr = document.createElement('tr');

		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');

		var text1 = document.createTextNode(signal.nombre);
		var text2 = document.createTextNode(signal.periodo);
		var input = document.createElement('input');

		input.setAttribute("data-evt","viewSignal");
		input.setAttribute("data-name",i);
		input.setAttribute("type","button");
		input.setAttribute("value","Ver");

		td1.appendChild(text1);
		td2.appendChild(text2);
		td3.appendChild(input);

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);

		return tr;
	};

	ListSignals.prototype.drawTable = function(signals){
		this.c.signals = signals || this.c.signals;
		this.clean();
		var header = this.drawHeader();
		var table = document.createElement('table');
		table.appendChild(this.tableTemplateHead());

		for(var i = 0, signal; signal = this.c.signals[i]; i++){
			table.appendChild(this.tableTemplateBody(signal));
		}

		this.getElementsByClassName("tables")[0].appendChild(header);
		this.getElementsByClassName("tables")[0].appendChild(table);
	};

	window.ListSignals = ListSignals;
})();

