(function(){
	function EditorCircuito(div,config){
		HtmlWidget.call(this,div,config);
		this.signals = [];
		this.filtros = [];
	}

	EditorCircuito.prototype = Object.create(HtmlWidget.prototype);
	EditorCircuito.prototype.constructor = "EditorCircuito";

	EditorCircuito.prototype.thisClick = function(event,t,that){
		var evt = t.getAttribute('data-evt');
		switch(evt){
			case "signalSelect":
				this.tableSignal(false);
				this.setSignalIn(t.getAttribute("data-name"));
				return true;
				break;
			case "filterSelect":
				this.tableFiltro(false);
				this.setFilter(t.getAttribute("data-name"));
				return true;
				break;
			case "signalInSet":
				this.tableSignal(true);
				return true;
				break;
			case "filtroInSet":
				this.tableFiltro(true);
				return true;
				break;
			case "calculateCircuito":
				this.calculateCircuito();
				return true;
				break;
			default:
				return true;
				break;
		}
	};

	EditorCircuito.prototype.tableSignal = function(show){
		this.getElementsByClassName("CircuitListSignals",function(e){
			e.style = (show)? "display:block" : "display:none";
		});
		this.getElementsByClassName("CircuitListFilters",function(e){
			e.style = "display:none";
		});
	};

	EditorCircuito.prototype.tableFiltro = function(show){
		this.getElementsByClassName("CircuitListSignals",function(e){
			e.style = "display:none";
		});
		this.getElementsByClassName("CircuitListFilters",function(e){
			e.style = (show)? "display:block" : "display:none";
		});
	};

	EditorCircuito.prototype.setSignalIn = function(i){
		this.getElementsByClassName("circuitSignalIn",function(e){
			e.innerHTML = this.signals[i].nombre;
			e.setAttribute('data-name','signalIn');
			e.setAttribute('value',i);
		});
	};

	EditorCircuito.prototype.setFilter = function(i){
		this.getElementsByClassName("circuitFilter",function(e){
			e.innerHTML = this.filtros[i].nombre;
			e.setAttribute('data-name','filter');
			e.setAttribute('value',i);
		});
	};

	EditorCircuito.prototype.drawEditor = function(conf){
		this.signals = conf.signals || [];
		this.filtros = conf.filtros || [];
		circuito = conf.circuito || {};
		var template = document.createElement("div");

//		var input = document.createElement('input');
//		input.setAttribute("data-evt","calculateCircuito");
//		input.setAttribute("type","button");
//		input.setAttribute("value","Calcular Circuito");
//		template.appendChild(input);
		
		var maincircuit = document.createElement("div");
		maincircuit.setAttribute("class","MainCircuit");
		var signalInCircuit = document.createElement("div");
		signalInCircuit.setAttribute("class","circuitSignalInDiv");
		var signalInCircuitSpan = document.createElement("span");
		signalInCircuitSpan.innerHTML = "Se\u00f1al Entrada";
		signalInCircuit.appendChild(signalInCircuitSpan);
		var signalInCircuitS = document.createElement("div");
//		if(circuito.signalIn){
//			signalInCircuitS.innerHTML = circuito.signalIn.periodo;
//		}
		signalInCircuitS.setAttribute("class","circuitSignalIn");
		signalInCircuitS.setAttribute("data-evt","signalInSet");
		signalInCircuit.appendChild(signalInCircuitS);
		maincircuit.appendChild(signalInCircuit);

		var filterCircuit = document.createElement("div");
		filterCircuit.setAttribute("class","circuitFilterDiv");
		var filterCircuitSpan = document.createElement("span");
		filterCircuitSpan.innerHTML = "Filtro";
		filterCircuit.appendChild(filterCircuitSpan);
		var filterCircuitF = document.createElement("div");

		filterCircuitF.setAttribute("class","circuitFilter");
		filterCircuitF.setAttribute("data-evt","filtroInSet");
		filterCircuit.appendChild(filterCircuitF);
		maincircuit.appendChild(filterCircuit);

		var listsignals = document.createElement("div");
		listsignals.setAttribute("class","CircuitListSignals");
		listsignals.setAttribute("style","display:none");
		var tablesignals = document.createElement("table");
		var tr1 = document.createElement('tr');
		var td1 = document.createElement('th');
		var text1 = document.createTextNode('Seleccione Se\u00f1al');
		td1.appendChild(text1);
		tr1.appendChild(td1);
		tablesignals.appendChild(tr1);
		for (var j = 0, signal; signal = this.signals[j]; j++){
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.setAttribute("data-name",j);
			td.setAttribute("data-evt","signalSelect");
			var text = document.createTextNode(signal.nombre);
			td.appendChild(text);
			tr.appendChild(td);
			tablesignals.appendChild(tr);
		}

		listsignals.appendChild(tablesignals);

		var listfilters = document.createElement("div");
		listfilters.setAttribute("class","CircuitListFilters");
		listfilters.setAttribute("style","display:none");

		var tablefiltros = document.createElement("table");
		var tr1 = document.createElement('tr');
		var td1 = document.createElement('th');
		var text1 = document.createTextNode('Seleccione Filtro');
		td1.appendChild(text1);
		tr1.appendChild(td1);
		tablefiltros.appendChild(tr1);
		for (var i = 0, filtro; filtro = this.filtros[i]; i++){
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.setAttribute("data-name",i);
			td.setAttribute("data-evt","filterSelect");
			var text = document.createTextNode(filtro.nombre);
			td.appendChild(text);
			tr.appendChild(td);
			tablefiltros.appendChild(tr);
		}
		listfilters.appendChild(tablefiltros);

		template.appendChild(maincircuit);
		template.appendChild(listsignals);
		template.appendChild(listfilters);
		this.d.appendChild(template);
	};

	EditorCircuito.prototype.calculateCircuito = function(nombre){
		var data = {
			nombre : nombre || ""
		};

		this.getElementsByClassName('circuitSignalIn',function(e){
			data[e.getAttribute("data-name")] = parseInt(e.getAttribute("value"));
		});

		this.getElementsByClassName('circuitFilter',function(e){
//			if(!data[e.getAttribute("data-name")]){
//				data[e.getAttribute("data-name")] = [];
//			}
//			data[e.getAttribute("data-name")].push(parseInt(e.getAttribute("value")));
			data[e.getAttribute("data-name")] = parseInt(e.getAttribute("value"));
		});
		this.emit("saveCircuito",data);
	};

	window.EditorCircuito = EditorCircuito;
})();
