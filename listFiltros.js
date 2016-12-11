(function(){
	function ListFiltros(div,config){
		HtmlWidget.call(this,div,config);
		this._cValue("filtros",[]);
	}

	ListFiltros.prototype = Object.create(HtmlWidget.prototype);
	ListFiltros.prototype.constructor = "ListFiltros";

	ListFiltros.prototype.thisClick = function(event,t,that){
		var evt = t.getAttribute('data-evt');
		switch(evt){
			case "newFiltro":
				this.clean();
				this.getElementsByClassName("tables")[0].appendChild(this.drawHeader());
				this.getElementsByClassName("tables")[0].appendChild(this.drawEditHeader());
				this.emit("newFiltro");
				return true;
				break;
			case "calculateFiltro":
				this.emit("createFiltro",this.getElementsByClassName("FilterInfo")[0].value);
				return true;
				break;
			case "viewFiltro":
				this.emit("viewFiltro",t.getAttribute("data-name"));
				return true;
				break;
			default:
				return true;
				break;
		}
	};

	ListFiltros.prototype.clean = function(){
		this.getElementsByClassName("tables",function(e){
			e.innerHTML = "";
		})
		this.getElementsByClassName("editor",function(e){
			e.innerHTML = "";
		})
	};

	ListFiltros.prototype.drawHeader = function(){
		var header = document.createElement('div');
		var headerimg = document.createElement('div');
		headerimg.setAttribute("class","filters");
		headerimg.setAttribute("style","display:inline-block;width:80px;height:80px;");
		var headertitle = document.createElement('div');
		headertitle.innerHTML = "Filtros";
		headertitle.setAttribute("style","display:inline-block;margin-left:40px;font-size:30pt;");
		header.appendChild(headerimg);
		header.appendChild(headertitle);
		return header;
	};

	ListFiltros.prototype.drawEditHeader = function(){
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		var td1 = document.createElement('th');
		var td2 = document.createElement('th');
		var td3 = document.createElement('th');
		td3.setAttribute("style","text-align:right");
		var text1 = document.createTextNode('Nombre');
		var inputname = document.createElement("input");
		inputname.setAttribute("type","text");
		inputname.setAttribute("class","FilterInfo");
		inputname.setAttribute("data-name","nombre");
		td2.appendChild(inputname);
		var input = document.createElement('input');
		input.setAttribute("type","button");
		input.setAttribute("data-evt","calculateFiltro");
		input.setAttribute("value","Definir Filtro");
		td1.appendChild(text1);
		td3.appendChild(input);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
		return table;
	};


	ListFiltros.prototype.readyToDraw = function(i){
		this.clean();
		var header = this.drawHeader();
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		var td1 = document.createElement('th');
		var td2 = document.createElement('th');
		var td3 = document.createElement('th');
		td3.setAttribute("style","text-align:right");
		var text1 = document.createTextNode('Nombre');
		var text2 = document.createTextNode(this.c.filtros[i].nombre);
		var input = document.createElement('input');
		input.setAttribute("data-evt","idealSignal");
		input.setAttribute("data-name",i);
		input.setAttribute("type","button");
		input.setAttribute("value","Crear Salida Ideal");
		td1.appendChild(text1);
		td2.appendChild(text2);
//		td3.appendChild(input);
		tr.appendChild(td1);
		tr.appendChild(td2);
//		tr.appendChild(td3);
		table.appendChild(tr);

		var canvasBodeDiagramdB = document.createElement('div');
		canvasBodeDiagramdB.setAttribute("class","MainCanvasBodedB");
		var canvasBodeDiagramPhi = document.createElement('div');
		canvasBodeDiagramPhi.setAttribute("class","MainCanvasBodePhi");

		this.getElementsByClassName("tables")[0].appendChild(header);
		this.getElementsByClassName("tables")[0].appendChild(table);
		this.getElementsByClassName("editor")[0].appendChild(canvasBodeDiagramdB);
		this.getElementsByClassName("editor")[0].appendChild(canvasBodeDiagramPhi);
	};

	ListFiltros.prototype.drawTable = function(filtros){
		this.c.filtros = filtros || this.c.filtros;
		this.clean();
		var header = this.drawHeader();
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		var td1 = document.createElement('th');
		var td2 = document.createElement('th');
		var td3 = document.createElement('th');
		var td4 = document.createElement('th');
		var td5 = document.createElement('th');
		var td6 = document.createElement('th');
		td6.setAttribute("style","text-align:right");
		var text1 = document.createTextNode('Nombre');
		var text2 = document.createTextNode('Tipo');
		var text3 = document.createTextNode('Q');
		var text4 = document.createTextNode('Wo');
		var text5 = document.createTextNode('H');
		var input = document.createElement('input');
		input.setAttribute("data-evt","newFiltro");
		input.setAttribute("type","button");
		input.setAttribute("value","Crear Nuevo");
		td1.appendChild(text1);
		td2.appendChild(text2);
		td3.appendChild(text3);
		td4.appendChild(text4);
		td5.appendChild(text5);
		td6.appendChild(input);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);
		table.appendChild(tr);

		for (var i = 0, filtro; filtro = this.c.filtros[i]; i++){
			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			var td3 = document.createElement('td');
			var td4 = document.createElement('td');
			var td5 = document.createElement('td');
			var td6 = document.createElement('td');
			var text1 = document.createTextNode(filtro.nombre);
			var text2 = document.createTextNode(filtro.tipo);
			var text3 = document.createTextNode(filtro.q);
			var text4 = document.createTextNode(filtro.wo);
			var text5 = document.createTextNode(filtro.h);
			var input = document.createElement('input');
			input.setAttribute("data-evt","viewFiltro");
			input.setAttribute("data-name",i);
			input.setAttribute("type","button");
			input.setAttribute("value","Ver");
			td1.appendChild(text1);
			td2.appendChild(text2);
			td3.appendChild(text3);
			td4.appendChild(text4);
			td5.appendChild(text5);
			td6.appendChild(input);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tr.appendChild(td6);
			table.appendChild(tr);
		}

		this.getElementsByClassName("tables")[0].appendChild(header);
		this.getElementsByClassName("tables")[0].appendChild(table);
	};

	window.ListFiltros = ListFiltros;
})();

