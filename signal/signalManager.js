(function(){
	function SignalManager(div,config){
		HtmlWidget.call(this,div,config);
		this._cValue("signals",[]);

		this.basicDraw();
		this.drawTable();
	}

	SignalManager.prototype = Object.create(HtmlWidget.prototype);
	SignalManager.prototype.constructor = "SignalManager";

	SignalManager.prototype.thisClick = function(event,t,that){
		var evt = t.getAttribute('data-evt');
		switch(evt){

//			case "idealSignal":
//				t.style = "display:none";
//				this.idealSignal(t.getAttribute("data-name"));
//				return true;
//				break;

			case "newSignal":
				this.onNewSignalClick();
				return true;
				break;

			case "calculateSignal":

				var nombre = this.getElementsByClassName("SignalDesignInfo")[0].value;
				this.SigDesign.sendSignal(nombre);

				return true;
				break;

			case "viewSignal":
				this.onViewSignalClick(t.getAttribute("data-name"));
				return true;
				break;

			default:
				return true;
				break;
		}
	};

	SignalManager.prototype.onNewSignalClick = function(){
		this.clean();
		this.getElementsByClassName("tables")[0].appendChild(this.drawHeader());
		this.getElementsByClassName("tables")[0].appendChild(this.drawEditHeader());

		this.SigDesign = new SignalDesign(this.getElementsByClassName("editor")[0]);
		this.SigDesign.addEventListener("creSignal",this.onCalc.bind(this));
	};

//	SignalManager.prototype.onSignalInCanvasClick = function(index,i,y,x){
//		this.c.signals[index].frecAddRm(i);
//		this.c.signals[index].getValues(confGeneral);
//		this.c.signals[index].draw(this.getElementsByClassName("MainCanvasSignalOut")[0],"blue");
//		this.c.signals[index].drawFrecDiag(this.getElementsByClassName("MainCanvasOutFFT")[0],"blue");
//	};
//
//	SignalManager.prototype.onSignalOutCanvasClickFase = function(index,i,ang){
//		this.c.signals[index].setFase(i,ang);
//		this.c.signals[index].getValues(confGeneral);
//		this.c.signals[index].draw(this.getElementsByClassName("MainCanvasSignalOut")[0],"blue");
//		this.c.signals[index].drawFrecDiag(this.getElementsByClassName("MainCanvasOutFFT")[0],"blue");
//	};
//
//	SignalManager.prototype.onSignalOutCanvasClick = function(index,i,y,x){
//		this.c.signals[index].ampMultiply(i,y,x);
//		this.c.signals[index].getValues(confGeneral);
//		this.c.signals[index].draw(this.getElementsByClassName("MainCanvasSignalOut")[0],"blue");
//		this.c.signals[index].drawFrecDiag(this.getElementsByClassName("MainCanvasOutFFT")[0],"blue");
//	};

//	SignalManager.prototype.idealSignal = function(i){
//		var index = this.c.signals.push(new Signal(null,this.c.signals[i].exportSignal()));
//		this.c.signals[i].addEventListener("clickCanvas", this.onSignalInCanvasClick.bind(this,index-1));
//		this.c.signals[index-1].setNombre(this.c.signals[i].nombre+" salida ideal");
//		this.c.signals[index-1].removeAllFrec();
//		this.c.signals[index-1].getValues(confGeneral);
//		this.c.signals[index-1].firstdraw(this.getElementsByClassName("MainCanvasSignalOut")[0],"blue");
//		this.c.signals[index-1].firstdrawFrecDiag(this.getElementsByClassName("MainCanvasOutFFT")[0],"blue");
//		this.c.signals[index-1].addEventListener("clickCanvas", this.onSignalOutCanvasClick.bind(this,index-1));
//		this.c.signals[index-1].addEventListener("clickCirculoCanvas", this.onSignalOutCanvasClickFase.bind(this,index-1));
//	};

	SignalManager.prototype.onViewSignalClick = function(i){

		this.clean();
		this.getElementsByClassName("tables")[0].appendChild(this.drawHeader());

		var sig = this.c.signals[i];
		this.SigView = new SignalView(this.getElementsByClassName("editor")[0],{
			signal : sig
		});

//		this.readyToDraw(i);
//		this.c.signals[i].firstdraw(this.getElementsByClassName("MainCanvasSignal")[0],"red");
//		this.c.signals[i].firstdrawFrecDiag(this.getElementsByClassName("MainCanvasInFFT")[0],"red");
	};

	SignalManager.prototype.onCalc = function(data){
		this.c.signals.push(new Signal(null,data));

		this.drawTable();
	};


	SignalManager.prototype.readyToDraw = function(i){

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

	SignalManager.prototype.drawEditHeader = function(){
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
	
	SignalManager.prototype.drawHeader = function(){
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

	SignalManager.prototype.clean = function(){
		this.getElementsByClassName("tables",function(e){
			e.innerHTML = "";
		})
		this.getElementsByClassName("editor",function(e){
			e.innerHTML = "";
		})
	};

	SignalManager.prototype.tableTemplateHead = function(){

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

	SignalManager.prototype.tableTemplateBody = function(sig,i){
		var tr = document.createElement('tr');

		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');

		var text1 = document.createTextNode(sig.nombre);
		var text2 = document.createTextNode(sig.periodo);
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

	SignalManager.prototype.drawTable = function(signals){
		this.c.signals = signals || this.c.signals;

		this.clean();

		var header = this.drawHeader();

		var table = document.createElement('table');

		table.appendChild(this.tableTemplateHead());

		for(var i = 0, sig; sig = this.c.signals[i]; i++){
			table.appendChild(this.tableTemplateBody(sig,i));
		}

		this.getElementsByClassName("tables")[0].appendChild(header);
		this.getElementsByClassName("tables")[0].appendChild(table);
	};

	SignalManager.prototype.basicDraw = function(){
		var template = '<div class="tables"></div><div class="editor"></div>';
		this.d.innerHTML = template;
	};

	window.SignalManager = SignalManager;
})();

