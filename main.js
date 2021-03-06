(function(){
	function Main(div,config){
		HtmlWidget.call(this,div,config);

		this.basicDraw();
		this.Marco = new Marco(this.getElementsByClassName("marco")[0]);
		this.Marco.addEventListener("signals",this.listSignals.bind(this));
//		this.Marco.addEventListener("filters",this.listFilters.bind(this));
//		this.Marco.addEventListener("circuits",this.listCircuits.bind(this));

	}

	Main.prototype = Object.create(HtmlWidget.prototype);
	Main.prototype.constructor = "Main";
	Main.prototype.Filtro = [];
	Main.prototype.Circuito = [];

	Main.prototype.basicDraw = function(){
		var template = '<div class="marco"></div><div class="content"></div>';
		this.d.innerHTML = template;
	};

	Main.prototype.listSignals = function(){
		this.SignalManager = new SignalManager(this.getElementsByClassName("content")[0],{
			signals : signal //VARIABLE GLOBAL HORRIBLE
		});
	};

//	Main.prototype.listCircuits = function(){
//		if(typeof(this.ListCircuits) != "object"){
//			this.ListCircuits = new ListCircuits(this.getElementsByClassName("content")[0],{
//				circuitos : this.Circuito
//			});
//			this.ListCircuits.addEventListener("newCircuit",this.newCircuito.bind(this));
//			this.ListCircuits.addEventListener("createCircuito",this.createCircuito.bind(this));
//			this.ListCircuits.addEventListener("reCircuito",this.reCircuito.bind(this));
//			this.ListCircuits.addEventListener("viewCircuit",this.viewCircuito.bind(this));
//		}
//		this.ListCircuits.drawTable(this.Circuito);
//	};
//
//	Main.prototype.listFilters = function(){
//		if(typeof(this.ListFiltros) != "object"){
//			this.ListFiltros = new ListFiltros(this.getElementsByClassName("content")[0],{
//				filtros : this.Filtro
//			});
//			this.ListFiltros.addEventListener("newFiltro",this.newFiltro.bind(this));
//			this.ListFiltros.addEventListener("viewFiltro",this.viewFiltro.bind(this));
//			this.ListFiltros.addEventListener("createFiltro",this.createFiltro.bind(this));
//		}
//		this.ListFiltros.drawTable(this.Filtro);
//	};
//
//	Main.prototype.newCircuito = function(){
//		if(typeof(this.EdCircuito) != "object"){
//			this.EdCircuito = new EditorCircuito(this.getElementsByClassName("editor")[0]);
//			this.EdCircuito.addEventListener("saveCircuito",this.onCreateCircuito.bind(this));
//		}
//		this.EdCircuito.drawEditor({
//			signals : this.Signal,
//			filtros : this.Filtro,
//		});
//	};
//	
//	Main.prototype.createFiltro = function(nombre){
//		if(typeof(this.EdFiltro) != "object") return;
//		this.EdFiltro.calculateFiltro(nombre);
//	};
//
//	Main.prototype.reCircuito = function(i,data){
//		this.Circuito[i].filtro.c.q = parseFloat(data.q,10);
//		this.Circuito[i].filtro.c.h = parseFloat(data.h,10);
//		var nombreOSO = this.Circuito[i].signalOut.nombre;
//		this.Circuito[i].signalOut.importSignal(this.Circuito[i].signalIn.exportSignal());
//		this.Circuito[i].signalOut.setNombre(nombreOSO);
//		this.Circuito[i].signalOut.setFilter(this.Circuito[i].filtro.getdB(this.Circuito[i].signalIn.frec));
//		this.Circuito[i].signalOut.getValues(this.confGeneral);
//		this.Circuito[i].signalOut.serializeValues();
//		this.viewCircuito(i);
//	};
//
//	Main.prototype.createCircuito = function(nombre){
//		if(typeof(this.EdCircuito) != "object") return;
//		this.EdCircuito.calculateCircuito(nombre);
//	};
//
//	Main.prototype.newFiltro = function(){
//		if(typeof(this.EdFiltro) != "object"){
//			this.EdFiltro = new EditorFiltro(this.getElementsByClassName("editor")[0]);
//			this.EdFiltro.addEventListener("saveFiltro",this.onCreateFiltro.bind(this));
//		}
//		this.EdFiltro.drawEditor();
//	};
//
//	Main.prototype.viewCircuito = function(i){
//		this.ListCircuits.readyToDraw(i);
//		this.Circuito[i].signalIn.firstdraw(this.getElementsByClassName("MainCanvasSignal")[0],"red");
//		this.Circuito[i].signalIn.firstdrawFrecDiag(this.getElementsByClassName("MainCanvasInFFT")[0],"red");
//		this.Circuito[i].signalOut.firstdraw(this.getElementsByClassName("MainCanvasSignalOut")[0],"blue");
//		this.Circuito[i].signalOut.firstdrawFrecDiag(this.getElementsByClassName("MainCanvasOutFFT")[0],"blue");
//	};
//
//	Main.prototype.viewFiltro = function(a){
//		this.ListFiltros.readyToDraw(a);
//		this.Filtro[a].firstdraw(this.getElementsByClassName("MainCanvasBodedB")[0],"red");
//	};
//
//	Main.prototype.onCreateCircuito = function(data){
//		siganlIn = data.signalIn;
//		filter = data.filter;
//		circuito = {};
//		var index = this.Signal.push(new Signal(null,this.Signal[siganlIn].exportSignal()));
//		this.Signal[index-1].setNombre(this.Signal[siganlIn].nombre+" + "+this.Filtro[filter].nombre);
//		this.Signal[index-1].setFilter(this.Filtro[filter].getdB(this.Signal[index-1].frec));
//
//		this.Signal[index-1].getValues(this.confGeneral);
//		this.Signal[index-1].serializeValues();
//		circuito["signalIn"] = this.Signal[siganlIn];
//		circuito["filtro"] = this.Filtro[filter];
//		circuito["signalOut"] = this.Signal[index-1];
//		circuito["nombre"] = data.nombre;
//		this.Circuito.push(circuito);
//		this.listSignals();
//	};
//
//	Main.prototype.onCreateFiltro = function(data,tipo){
//		switch(tipo){
//			case "Notch": 
//				this.Filtro.push(new FiltroNotch(null,data));
//				break;
//			case "pasaBajo": 
//				this.Filtro.push(new FiltroPasaBajo(null,data));
//				break;
//			case "pasaBanda": 
//				this.Filtro.push(new FiltroPasaBanda(null,data));
//				break;
//			case "pasaAlto": 
//				this.Filtro.push(new FiltroPasaAlto(null,data));
//				break;
//			default:
//				this.Filtro.push(new FiltroNotch(null,data));
//				break;
//		}
//		this.listFilters();
//	};

	window.Main = Main;
})();

