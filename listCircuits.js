(function(){
	function ListCircuits(div,config){
		HtmlWidget.call(this,div,config);
		this._cValue("circuitos",[]);
	}

	ListCircuits.prototype = Object.create(HtmlWidget.prototype);
	ListCircuits.prototype.constructor = "ListCircuits";

	ListCircuits.prototype.thisClick = function(event,t,that){
		var evt = t.getAttribute('data-evt');
		switch(evt){
			case "newCircuit":
				this.clean();
				this.getElementsByClassName("tables")[0].appendChild(this.drawHeader());
				this.getElementsByClassName("tables")[0].appendChild(this.drawEditHeader());
				this.emit("newCircuit");
				return true;
				break;
			case "viewCircuit":
				this.emit("viewCircuit",t.getAttribute("data-name"));
				return true;
				break;
			case "calculateCircuito":
				this.emit("createCircuito",this.getElementsByClassName("CircuitInfo")[0].value);
				return true;
				break;
			case "recalculateCircuito":
				var dataFiltro = {
					h : this.c.circuitos[t.getAttribute("data-name")].filtro.h,
					q : this.c.circuitos[t.getAttribute("data-name")].filtro.q
				};

				this.getElementsByClassName("CircuitoFilterInfo",function(e){
					dataFiltro[e.getAttribute("data-name")] = e.value;
				});

				this.emit("reCircuito",t.getAttribute("data-name"),dataFiltro);
				return true;
				break;
			default:
				return true;
				break;
		}
	};

	ListCircuits.prototype.clean = function(){
		this.getElementsByClassName("tables",function(e){
			e.innerHTML = "";
		})
		this.getElementsByClassName("editor",function(e){
			e.innerHTML = "";
		})
	};

	ListCircuits.prototype.drawHeader = function(){
		var header = document.createElement('div');
		var headerimg = document.createElement('div');
		headerimg.setAttribute("class","circuits");
		headerimg.setAttribute("style","display:inline-block;width:80px;height:80px;");
		var headertitle = document.createElement('div');
		headertitle.innerHTML = "Circuitos";
		headertitle.setAttribute("style","display:inline-block;margin-left:40px;font-size:30pt;");
		header.appendChild(headerimg);
		header.appendChild(headertitle);
		return header;
	};

	ListCircuits.prototype.drawEditHeader = function(){
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		var td1 = document.createElement('th');
		var td2 = document.createElement('th');
		var td3 = document.createElement('th');
		td3.setAttribute("style","text-align:right");
		var text1 = document.createTextNode('Nombre');
		var inputname = document.createElement("input");
		inputname.setAttribute("type","text");
		inputname.setAttribute("class","CircuitInfo");
		inputname.setAttribute("data-name","nombre");
		td2.appendChild(inputname);
		var input = document.createElement('input');
		input.setAttribute("type","button");
		input.setAttribute("data-evt","calculateCircuito");
		input.setAttribute("value","Calcular Circuito");
		td1.appendChild(text1);
		td3.appendChild(input);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
		return table;
	};

	ListCircuits.prototype.readyToDraw = function(i){
		this.clean();
		var header = this.drawHeader();
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		var td1 = document.createElement('th');
		var td2 = document.createElement('th');
		var td3 = document.createElement('th');
		td3.setAttribute("style","text-align:right");
		var text1 = document.createTextNode('Nombre');
		var text2 = document.createTextNode(this.c.circuitos[i].nombre);
		var input = document.createElement('input');
		input.setAttribute("data-evt","recalculateCircuito");
		input.setAttribute("data-name",i);
		input.setAttribute("type","button");
		input.setAttribute("value","Calcular Nuevamente Circuito");
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

		var filtroSetter = document.createElement("div");
		filtroSetter.setAttribute("class","MainFilterInfo");
		var ho = document.createElement("div");
		var spanho = document.createElement("span");
		spanho.innerHTML = "Ho";
		ho.appendChild(spanho);
		var inputho = document.createElement("input");
		inputho.setAttribute("type","number");
		inputho.setAttribute("class","CircuitoFilterInfo");
		inputho.setAttribute("data-name","h");
		inputho.setAttribute("value",parseFloat(this.c.circuitos[i].filtro.h,10));
		inputho.setAttribute("min","0");
		inputho.setAttribute("max","6");
		inputho.setAttribute("step","any");
		ho.appendChild(inputho);
		filtroSetter.appendChild(ho);
		var q = document.createElement("div");
		var spanq = document.createElement("span");
		spanq.innerHTML = "Q";
		q.appendChild(spanq);
		filtroSetter.appendChild(q);
		var inputq = document.createElement("input");
		inputq.setAttribute("type","number");
		inputq.setAttribute("class","CircuitoFilterInfo");
		inputq.setAttribute("data-name","q");
		inputq.setAttribute("value",parseFloat(this.c.circuitos[i].filtro.q,10));
		inputq.setAttribute("min","0");
		inputq.setAttribute("max","10");
		inputq.setAttribute("step","any");
		q.appendChild(inputq);
		var wo = document.createElement("div");
		var spanwo = document.createElement("span");
		spanwo.innerHTML = "Wo "+this.c.circuitos[i].filtro.wo;
		wo.appendChild(spanwo);
		filtroSetter.appendChild(wo);

		this.getElementsByClassName("tables")[0].appendChild(header);
		this.getElementsByClassName("tables")[0].appendChild(table);
		this.getElementsByClassName("editor")[0].appendChild(canvasSignalIn);
		this.getElementsByClassName("editor")[0].appendChild(canvasSignalOut);
		this.getElementsByClassName("editor")[0].appendChild(filtroSetter);
		this.getElementsByClassName("editor")[0].appendChild(canvasFFTIn);
		this.getElementsByClassName("editor")[0].appendChild(canvasFFTOut);
	};


	ListCircuits.prototype.drawTable = function(circuitos){
		this.c.circuitos = circuitos || this.c.circuitos;
		this.clean();
		var header = this.drawHeader();
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		var td1 = document.createElement('th');
		var td2 = document.createElement('th');
		var td3 = document.createElement('th');
		var td4 = document.createElement('th');
		var td5 = document.createElement('th');
		td5.setAttribute("style","text-align:right");
		var text1 = document.createTextNode('Nombre');
		var text2 = document.createTextNode('Entrada');
		var text3 = document.createTextNode('Salida');
		var text4 = document.createTextNode('Filtros');
		var input = document.createElement('input');
		input.setAttribute("data-evt","newCircuit");
		input.setAttribute("type","button");
		input.setAttribute("value","Crear Nuevo");
		td1.appendChild(text1);
		td2.appendChild(text2);
		td3.appendChild(text3);
		td4.appendChild(text4);
		td5.appendChild(input);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		table.appendChild(tr);

		for (var i = 0, circuito; circuito = this.c.circuitos[i]; i++){
			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			var td3 = document.createElement('td');
			var td4 = document.createElement('td');
			var td5 = document.createElement('td');
			var text1 = document.createTextNode(circuito.nombre);
			var text2 = document.createTextNode(circuito.signalIn.nombre);
			var text3 = document.createTextNode(circuito.signalOut.nombre);
			var text4 = document.createTextNode(circuito.filtro.nombre);
			var input = document.createElement('input');
			input.setAttribute("data-evt","viewCircuit");
			input.setAttribute("data-name",i);
			input.setAttribute("type","button");
			input.setAttribute("value","Ver");
			td1.appendChild(text1);
			td2.appendChild(text2);
			td3.appendChild(text3);
			td4.appendChild(text4);
			td5.appendChild(input);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			table.appendChild(tr);
		}

		this.getElementsByClassName("tables")[0].appendChild(header);
		this.getElementsByClassName("tables")[0].appendChild(table);
	};

	window.ListCircuits = ListCircuits;
})();

