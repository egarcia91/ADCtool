/*
 * var a = math.parse("x^2",{x:0});
 * var b = a.compile();
 * b.eval({x:1}) //1
 * b.eval({x:2}) //4
 * b.eval({x:3}) //9
*/
(function(){
	function SignalDesign(div,config){
		HtmlWidget.call(this,div,config);
		this.drawEditor();
		this.showGrafic();
	}

	SignalDesign.prototype = Object.create(HtmlWidget.prototype);
	SignalDesign.prototype.constructor = "SignalDesign";
	SignalDesign.prototype.funcionFFT = [];
	SignalDesign.prototype.elementPartesFuncion = undefined;

	SignalDesign.prototype.thisChange = function(event,t,that){
		var name = t.getAttribute('data-name');
		switch(name){
			case "funcion":
			case "desde":
			case "hasta":
			case "periodo":
				this.showGrafic();
				return true;
				break;
			default:
				return true;
				break;
		}
		return true;
	};

	SignalDesign.prototype.thisClick = function(event,t,that){
		var evt = t.getAttribute('data-evt');
		switch(evt){

			case "calculateSignal":
				this.sendSignal();
				return true;
				break;

			case "agregar":
				this.agregarParteFuncion();
				return true;
				break;

			case "quitar":
				this.quitarParteFuncion();
				return true;
				break;

			default:
				return true;
				break;
		}
	};

	SignalDesign.prototype.drawEditor = function(){

		var template = document.createElement("div");

		var data = document.createElement("div");
		data.classList.add("DivSignalDesignTemplate");

		//Despues vemos si volvemos a usar la transformada a manopla
		//data.appendChild(this.ciclosFila());

		data.appendChild(this.periodoFila());

		data.appendChild(this.funcionFila());

		data.appendChild(this.botonesFila());

		template.appendChild(data);

		var canvasjs = document.createElement("div");
		canvasjs.classList.add("DivSignalDesignTemplate");
		canvasjs.id = "SignalGrafic";
		template.appendChild(canvasjs);


		this.d.appendChild(template);
	};

	SignalDesign.prototype.sendSignal = function(nombre){
		this.emit("creSignal",this.calculateSignal(nombre));
	};

	SignalDesign.prototype.calculateSignal = function(nombre){
		var data = {
			nombre : nombre || "",
			funcion : []
		};

		this.getElementsByClassName("SignalDesignInfo",function(e){
			var dataFunction = {};
			for(var i = 0, node; node = e.childNodes[i]; i++){
				var name = node.getAttribute("data-name");
				if(name == 'periodo' || name == 'nF'){
					data[name] = parseFloat(node.value,10);
				} else if(name == 'funcion'){
					dataFunction[name] = this.functionParse2(node.value);
				} else if(name) {
					dataFunction[name] = parseFloat(node.value,10);
				}
			}
			if(dataFunction['funcion']){
				data['funcion'].push(dataFunction);
			}
		});
		return data;
	};

	SignalDesign.prototype.functionParse2 = function(funcion){
		var a = math.parse(funcion,{x:0});
		var b = a.compile();
		return b;
	};

	SignalDesign.prototype.ciclosFila = function(){

		var ciclos = document.createElement("div");
		ciclos.setAttribute("class","SignalDesignInfo");

		var spanCiclos = document.createElement("span");

		spanCiclos.innerHTML = "Cantidad de Ciclos del Analisis Fourier";

		var inputCiclos = document.createElement("input");

		inputCiclos.setAttribute("type","number");
		inputCiclos.setAttribute("data-name","nF");
		inputCiclos.setAttribute("value","150");
		inputCiclos.setAttribute("min","1");
		inputCiclos.setAttribute("max","600");

		ciclos.appendChild(spanCiclos);
		ciclos.appendChild(inputCiclos);

		return ciclos;
	};

	SignalDesign.prototype.periodoFila = function(){
		var periodo = document.createElement("div");
		periodo.setAttribute("class","SignalDesignInfo");

		var spanPeriodo = document.createElement("span");

		spanPeriodo.innerHTML = "Periodo";

		var inputPeriodo = document.createElement("input");

		inputPeriodo.setAttribute("type","number");
		inputPeriodo.setAttribute("data-name","periodo");
		inputPeriodo.setAttribute("value","10");
		inputPeriodo.setAttribute("min","1");
		inputPeriodo.setAttribute("max","10");

		periodo.appendChild(spanPeriodo);
		periodo.appendChild(inputPeriodo);

		return periodo;
	};

	SignalDesign.prototype.parteFuncion = function(func, desde, hasta){
		var span1Desde = document.createElement("span")
		span1Desde.innerHTML = "Desde";
		var span1Hasta = document.createElement("span")
		span1Hasta.innerHTML = "Hasta";

		var div1Funcion = document.createElement("div")
		div1Funcion.setAttribute("class","SignalDesignInfo");

		var inputdiv11Funcion = document.createElement("input");
		inputdiv11Funcion.setAttribute("type","text");
		inputdiv11Funcion.setAttribute("data-name","funcion");
		inputdiv11Funcion.setAttribute("value",func);
		div1Funcion.appendChild(inputdiv11Funcion);
		div1Funcion.appendChild(span1Desde);

		var inputdiv12Funcion = document.createElement("input");
		inputdiv12Funcion.setAttribute("type","number");
		inputdiv12Funcion.setAttribute("data-name","desde");
		inputdiv12Funcion.setAttribute("value",desde);
		inputdiv12Funcion.setAttribute("min","0");
		inputdiv12Funcion.setAttribute("max","30");
		inputdiv12Funcion.setAttribute("step","any");
		div1Funcion.appendChild(inputdiv12Funcion);
		div1Funcion.appendChild(span1Hasta);

		var inputdiv13Funcion = document.createElement("input");
		inputdiv13Funcion.setAttribute("type","number");
		inputdiv13Funcion.setAttribute("data-name","hasta");
		inputdiv13Funcion.setAttribute("value",hasta);
		inputdiv13Funcion.setAttribute("min","0");
		inputdiv13Funcion.setAttribute("max","30");
		inputdiv13Funcion.setAttribute("step","any");

		div1Funcion.appendChild(inputdiv13Funcion);

		return div1Funcion;
	};

	SignalDesign.prototype.botonesFila = function(){
		var botones = document.createElement("div");
		var agregar = document.createElement("input");
		agregar.type = "button";
		agregar.value = "Agregar Parte";
		agregar.setAttribute("data-evt","agregar");

		var quitar = document.createElement("input");
		quitar.type = "button";
		quitar.value = "Quitar Parte";
		quitar.setAttribute("data-evt","quitar");

		botones.appendChild(agregar);
		botones.appendChild(quitar);

		return botones;
	};

	SignalDesign.prototype.agregarParteFuncion = function(){
		if(!this.elementPartesFuncion) return;
		this.elementPartesFuncion.appendChild(this.parteFuncion("0","0","0"));
	};

	SignalDesign.prototype.quitarParteFuncion = function(){
		if(!this.elementPartesFuncion) return;
		if(!this.elementPartesFuncion.lastChild) return;
		this.elementPartesFuncion.removeChild(this.elementPartesFuncion.lastChild);
	};

	SignalDesign.prototype.funcionFila = function(){

		var funcion = document.createElement("div");
		var spanFuncion = document.createElement("span")
		spanFuncion.innerHTML = "Funci\u00f3n";

		funcion.appendChild(spanFuncion);
		var partesFuncion = document.createElement("div");
		//TODO desharcodear
		partesFuncion.appendChild(this.parteFuncion("(2/5)x","0","2.5"));
		partesFuncion.appendChild(this.parteFuncion("2-(2/5)x","2.5","5"));
		partesFuncion.appendChild(this.parteFuncion("-1","6.25","8.75"));

		funcion.appendChild(partesFuncion);

		this.elementPartesFuncion = partesFuncion;

		return funcion;
	};


	SignalDesign.prototype.showGrafic = function(){
		var dataPoints = this.graficDataPoints(this.calculateSignal());
		var signalChart = new CanvasJS.Chart("SignalGrafic", {
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

	SignalDesign.prototype.graficDataPoints = function(data){
		var t = math.fraction(0,1);
		var fin = data.periodo;
		var division = 512;
		var paso = math.fraction(fin,division);
		var dataPoints = [];

		dataPoints.push({
			x : 0,
			y : 0
		});

		for(var j = 0; j < division; j++){
			t = t.add(paso);
			valueT = t.valueOf();

			var hasPart = false;
			for(var i = 0, parte; parte = data['funcion'][i]; i++){
				if(valueT >= parte.desde && valueT < parte.hasta){
					dataPoints.push({
						x : valueT,
						y : parte.funcion.eval({x:valueT})
					});
					hasPart = true;
					break;
				}
			}
			if(!hasPart){
				dataPoints.push({
					x : valueT,
					y : 0
				});
			}
		}

		return dataPoints;
	};

	window.SignalDesign = SignalDesign;
})();
