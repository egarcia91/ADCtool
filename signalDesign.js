/*
 * var a = math.parse("x^2",{x:0});
 * var b = a.compile();
 * b.eval({x:1}) //1
 * b.eval({x:2}) //4
 * b.eval({x:3}) //8
*/
(function(){
	function SignalDesign(div,config){
		HtmlWidget.call(this,div,config);
		this.drawEditor();
	}

	SignalDesign.prototype = Object.create(HtmlWidget.prototype);
	SignalDesign.prototype.constructor = "SignalDesign";
	SignalDesign.prototype.funcionFFT = [];
	SignalDesign.prototype.elementPartesFuncion = undefined;

	SignalDesign.prototype.thisChange = function(event,t,that){
		var name = t.getAttribute('data-name');
		switch(name){
			case "function":
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
//			case "frec-amp":
//				this.botonFrecAmp(t);
//				return true;
//			case "reset":
//				this.emit("reset");
//				return true;
//				break;
//			case "invfase":
//				this.emit("invfase");
//				return true;
//				break;
//			case "allfrec":
//				this.emit("allfrec");
//				return true;
//				break;
//			case "show":
//				this.hide(false);
//				return true;
//				break;
//			case "calculateSignal":
//				this.calculateSignal();
//				return true;
//				break;

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
		template.setAttribute("class","DivSignalDesignTemplate");

		template.appendChild(this.ciclosFila());

		template.appendChild(this.periodoFila());

		template.appendChild(this.funcionFila());

		template.appendChild(this.botonesFila());

		this.d.appendChild(template);
	};

	SignalDesign.prototype.calculateSignal = function(nombre){
		var data = {
			nombre : nombre || "",
			funcion : {}
		};
		this.getElementsByClassName("SignalDesignInfo",function(e){
			var name = e.getAttribute("data-name");
			switch(name){
				case "hasta":
				case "desde":
					if(!data["funcion"][e.getAttribute('data-part')])
						data["funcion"][e.getAttribute('data-part')] = {};
					data["funcion"][e.getAttribute('data-part')][name] = parseFloat(e.value,10);
					break;
				case "funcion":
					if(!data["funcion"][e.getAttribute('data-part')])
						data["funcion"][e.getAttribute('data-part')] = {};
					if(!data["funcion"][e.getAttribute('data-part')][name]);
						data["funcion"][e.getAttribute('data-part')][name] = {};
					data["funcion"][e.getAttribute('data-part')][name] = this.functionParse(e.value);
					break;
				default:
					data[name] = parseInt(e.value,10);
					break;
			}
			data["funcionFFT"] = this.funcionFFT;
		});
		this.emit("creSignal",data);
	};

	SignalDesign.prototype.hide = function(hide){
		this.getElementsByClassName("DivShowSignalDesignTemplate",function(e){
			e.style.display = (hide)? "block" : "none";
		});

		this.getElementsByClassName("DivSignalDesignTemplate",function(e){
			e.style.display = (hide)? "none" : "block";
		});
	};

	SignalDesign.prototype.botonFrecAmp = function(t){
		var type = t.getAttribute("data-name");
		if(type == "amp"){
			type = "fase";
			t.setAttribute("data-name","fase");
			t.value = "Fase";
		} else {
			type = "amp";
			t.setAttribute("data-name","amp");
			t.value = "Amplitud";
		}
		this.emit("faseamp",type);
	};

	SignalDesign.prototype.resC = function(f){
		var res;
		if(isNaN(f)){
			if(this.isFraction(f)){
				res = eval(f);
				res = (res == undefined)? 0 : res;
			}
		} else { 
			res = eval(f);
			res = (res == undefined)? 0 : res;
		}
		return res;
	};

	SignalDesign.prototype.isFraction = function(funcion){
		funcion = funcion.replace(/\(/g,"");
		funcion = funcion.replace(/\)/g,"");
		if(funcion.indexOf("/") > 0){
			if(isNaN(funcion.split("/")[0])) return false;
			if(isNaN(funcion.split("/")[1])) return false;
		}
		return true;
	};

	SignalDesign.prototype.functionFraction = function(funcion){
		funcion = funcion.replace(/\(/g,"");
		funcion = funcion.replace(/\)/g,"");
		if(funcion.indexOf("/") > 0)
			funcion = parseInt(funcion.split("/")[0],10)/parseInt(funcion.split("/")[1],10);
		return funcion;
	};

	SignalDesign.prototype.fftAlgorithm = function(funcion){
//		console.log(funcion);
		var a = math.parse(funcion,{x:0});
		var b = a.compile();
		this.funcionFFT.push(b);
//		console.log(b.eval({x:2.5}))
		//b.eval({x:1}) //1
		//b.eval({x:2}) //4
		//b.eval({x:3}) //8
	};

	SignalDesign.prototype.functionParse = function(funcion){
		this.fftAlgorithm(funcion);
		var f = "";
		var data = {};
		var indexOfP = funcion.indexOf("+");
		if(indexOfP > 0)
			f = funcion.split("+");
		var indexOfM = funcion.indexOf("-");
		if(indexOfM > 0){
			f = funcion.split("-");
			for(var i = 1, ff; ff = f[i]; i++)
				f[i] = "-"+f[i];
		}
		//TODO que pasa si suma y resta a la vez??

		for(var i = 0, fun; fun = f[i]; i++){
			if(fun.indexOf("x") > -1){
				fun = fun.replace("x","");
				fun = fun.replace("(","");
				fun = this.functionFraction(fun);
				data["l"] = parseFloat(fun,10);
			} else {
				fun = this.functionFraction(fun);
				data["c"] = parseFloat(fun,10);
			}
		}
		if(i == 0){
			if(funcion.indexOf("x") > -1){
				f = funcion.replace("x","");
				f = this.functionFraction(f);
				data["l"] = parseFloat(f,10);
			} else {
				f = this.functionFraction(funcion);
				data["c"] = parseFloat(f,10);
			}
		}
		return data;
	};


	SignalDesign.prototype.ciclosFila = function(){

		var ciclos = document.createElement("div");

		var spanCiclos = document.createElement("span");

		spanCiclos.innerHTML = "Cantidad de Ciclos del Analisis Fourier";

		var inputCiclos = document.createElement("input");

		inputCiclos.setAttribute("type","number");
		inputCiclos.setAttribute("class","SignalDesignInfo");
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

		var spanPeriodo = document.createElement("span");

		spanPeriodo.innerHTML = "Periodo";

		var inputPeriodo = document.createElement("input");

		inputPeriodo.setAttribute("type","number");
		inputPeriodo.setAttribute("class","SignalDesignInfo");
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

		var inputdiv11Funcion = document.createElement("input");
		inputdiv11Funcion.setAttribute("type","text");
		inputdiv11Funcion.setAttribute("class","SignalDesignInfo");
		inputdiv11Funcion.setAttribute("data-name","funcion");
		inputdiv11Funcion.setAttribute("data-part","0");
		inputdiv11Funcion.setAttribute("value",func);
		div1Funcion.appendChild(inputdiv11Funcion);
		div1Funcion.appendChild(span1Desde);

		var inputdiv12Funcion = document.createElement("input");
		inputdiv12Funcion.setAttribute("type","number");
		inputdiv12Funcion.setAttribute("class","SignalDesignInfo");
		inputdiv12Funcion.setAttribute("data-name","desde");
		inputdiv12Funcion.setAttribute("data-part","0");
		inputdiv12Funcion.setAttribute("value",desde);
		inputdiv12Funcion.setAttribute("min","0");
		inputdiv12Funcion.setAttribute("max","30");
		inputdiv12Funcion.setAttribute("step","any");
		div1Funcion.appendChild(inputdiv12Funcion);
		div1Funcion.appendChild(span1Hasta);

		var inputdiv13Funcion = document.createElement("input");
		inputdiv13Funcion.setAttribute("type","number");
		inputdiv13Funcion.setAttribute("class","SignalDesignInfo");
		inputdiv13Funcion.setAttribute("data-name","hasta");
		inputdiv13Funcion.setAttribute("data-part","0");
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


	window.SignalDesign = SignalDesign;
})();
