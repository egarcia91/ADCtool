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
	}

	SignalDesign.prototype = Object.create(HtmlWidget.prototype);
	SignalDesign.prototype.constructor = "SignalDesign";
	SignalDesign.prototype.funcionFFT = [];

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
			case "frec-amp":
				this.botonFrecAmp(t);
				return true;
			case "reset":
				this.emit("reset");
				return true;
				break;
			case "invfase":
				this.emit("invfase");
				return true;
				break;
			case "allfrec":
				this.emit("allfrec");
				return true;
				break;
			case "show":
				this.hide(false);
				return true;
				break;
			case "calculateSignal":
				this.calculateSignal();
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
		var ciclos = document.createElement("div");
		var spanCiclos = document.createElement("span")
		spanCiclos.innerHTML = "Ciclos";
		var inputCiclos = document.createElement("input");
		inputCiclos.setAttribute("type","number");
		inputCiclos.setAttribute("class","SignalDesignInfo");
		inputCiclos.setAttribute("data-name","nF");
		inputCiclos.setAttribute("value","150");
		inputCiclos.setAttribute("min","1");
		inputCiclos.setAttribute("max","600");
		ciclos.appendChild(spanCiclos);
		ciclos.appendChild(inputCiclos);
		template.appendChild(ciclos);
		var periodo = document.createElement("div");
		var spanPeriodo = document.createElement("span")
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
		template.appendChild(periodo);
		var funcion = document.createElement("div");
		var spanFuncion = document.createElement("span")
		spanFuncion.innerHTML = "Funci\u00f3n";
		var span1Desde = document.createElement("span")
		var span2Desde = document.createElement("span")
		var span3Desde = document.createElement("span")
		span1Desde.innerHTML = "Desde";
		span2Desde.innerHTML = "Desde";
		span3Desde.innerHTML = "Desde";
		var span1Hasta = document.createElement("span")
		var span2Hasta = document.createElement("span")
		var span3Hasta = document.createElement("span")
		span1Hasta.innerHTML = "Hasta";
		span2Hasta.innerHTML = "Hasta";
		span3Hasta.innerHTML = "Hasta";
		var div1Funcion = document.createElement("div")
		var div2Funcion = document.createElement("div")
		var div3Funcion = document.createElement("div")
		var inputdiv11Funcion = document.createElement("input");
		inputdiv11Funcion.setAttribute("type","text");
		inputdiv11Funcion.setAttribute("class","SignalDesignInfo");
		inputdiv11Funcion.setAttribute("data-name","funcion");
		inputdiv11Funcion.setAttribute("data-part","0");
		inputdiv11Funcion.setAttribute("value","(2/5)x");
		div1Funcion.appendChild(inputdiv11Funcion);
		div1Funcion.appendChild(span1Desde);
		var inputdiv12Funcion = document.createElement("input");
		inputdiv12Funcion.setAttribute("type","number");
		inputdiv12Funcion.setAttribute("class","SignalDesignInfo");
		inputdiv12Funcion.setAttribute("data-name","desde");
		inputdiv12Funcion.setAttribute("data-part","0");
		inputdiv12Funcion.setAttribute("value","0");
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
		inputdiv13Funcion.setAttribute("value","2.5");
		inputdiv13Funcion.setAttribute("min","0");
		inputdiv13Funcion.setAttribute("max","30");
		inputdiv13Funcion.setAttribute("step","any");
		div1Funcion.appendChild(inputdiv13Funcion);
		var inputdiv21Funcion = document.createElement("input");
		inputdiv21Funcion.setAttribute("type","text");
		inputdiv21Funcion.setAttribute("class","SignalDesignInfo");
		inputdiv21Funcion.setAttribute("data-name","funcion");
		inputdiv21Funcion.setAttribute("data-part","1");
		inputdiv21Funcion.setAttribute("value","2-(2/5)x");
		div2Funcion.appendChild(inputdiv21Funcion);
		div2Funcion.appendChild(span2Desde);
		var inputdiv22Funcion = document.createElement("input");
		inputdiv22Funcion.setAttribute("type","number");
		inputdiv22Funcion.setAttribute("class","SignalDesignInfo");
		inputdiv22Funcion.setAttribute("data-name","desde");
		inputdiv22Funcion.setAttribute("data-part","1");
		inputdiv22Funcion.setAttribute("value","2.5");
		inputdiv22Funcion.setAttribute("min","0");
		inputdiv22Funcion.setAttribute("max","30");
		inputdiv22Funcion.setAttribute("step","any");
		div2Funcion.appendChild(inputdiv22Funcion);
		div2Funcion.appendChild(span2Hasta);
		var inputdiv23Funcion = document.createElement("input");
		inputdiv23Funcion.setAttribute("type","number");
		inputdiv23Funcion.setAttribute("class","SignalDesignInfo");
		inputdiv23Funcion.setAttribute("data-name","hasta");
		inputdiv23Funcion.setAttribute("data-part","1");
		inputdiv23Funcion.setAttribute("value","5");
		inputdiv23Funcion.setAttribute("min","0");
		inputdiv23Funcion.setAttribute("max","30");
		inputdiv23Funcion.setAttribute("step","any");
		div2Funcion.appendChild(inputdiv23Funcion);
		var inputdiv31Funcion = document.createElement("input");
		inputdiv31Funcion.setAttribute("type","text");
		inputdiv31Funcion.setAttribute("class","SignalDesignInfo");
		inputdiv31Funcion.setAttribute("data-name","funcion");
		inputdiv31Funcion.setAttribute("data-part","2");
		inputdiv31Funcion.setAttribute("value","-1");
		div3Funcion.appendChild(inputdiv31Funcion);
		div3Funcion.appendChild(span3Desde);
		var inputdiv32Funcion = document.createElement("input");
		inputdiv32Funcion.setAttribute("type","number");
		inputdiv32Funcion.setAttribute("class","SignalDesignInfo");
		inputdiv32Funcion.setAttribute("data-name","desde");
		inputdiv32Funcion.setAttribute("data-part","2");
		inputdiv32Funcion.setAttribute("value","6.25");
		inputdiv32Funcion.setAttribute("min","0");
		inputdiv32Funcion.setAttribute("max","30");
		inputdiv32Funcion.setAttribute("step","any");
		div3Funcion.appendChild(inputdiv32Funcion);
		div3Funcion.appendChild(span3Hasta);
		var inputdiv33Funcion = document.createElement("input");
		inputdiv33Funcion.setAttribute("type","number");
		inputdiv33Funcion.setAttribute("class","SignalDesignInfo");
		inputdiv33Funcion.setAttribute("data-name","hasta");
		inputdiv33Funcion.setAttribute("data-part","2");
		inputdiv33Funcion.setAttribute("value","8.75");
		inputdiv33Funcion.setAttribute("min","0");
		inputdiv33Funcion.setAttribute("max","30");
		inputdiv33Funcion.setAttribute("step","any");
		div3Funcion.appendChild(inputdiv33Funcion);
		funcion.appendChild(spanFuncion);
		funcion.appendChild(div1Funcion);
		funcion.appendChild(div2Funcion);
		funcion.appendChild(div3Funcion);
		template.appendChild(funcion);
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


	window.SignalDesign = SignalDesign;
})();
