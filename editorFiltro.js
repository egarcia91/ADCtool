(function(){
	function EditorFiltro(div,config){
		HtmlWidget.call(this,div,config);
		this.tipo = "Notch";
	}

	EditorFiltro.prototype = Object.create(HtmlWidget.prototype);
	EditorFiltro.prototype.constructor = "EditorFiltro";

	EditorFiltro.prototype.thisClick = function(event,t,that){
		var evt = t.getAttribute('data-evt');
		switch(evt){
			case "tipo":
				this.tipo = t.value;
				return true;
				break;
			case "calculateFiltro":
				this.calculateFiltro();
				return true;
				break;
			default:
				return true;
				break;
		}
	};

	EditorFiltro.prototype.calculateFiltro = function(nombre){
		var data = {
			nombre : nombre || ""
		};

		this.getElementsByClassName("FilterInfo",function(e){
			var name = e.getAttribute("data-name");
			data[name] = (e.getAttribute("type") == "number")? parseFloat(e.value,10): e.value;
		});
		this.emit("saveFiltro",data,this.tipo);
	};

	EditorFiltro.prototype.drawEditor = function(){
		var template = document.createElement("div");
		var radio1 = document.createElement("input");
		var radio1label = document.createElement("label");
		radio1.setAttribute("type","radio");
		radio1.setAttribute("name","tipo");
		radio1.setAttribute("data-evt","tipo");
		radio1.setAttribute("value","Notch");
		radio1.setAttribute("class","FilterInfo");
		radio1label.appendChild(radio1);
		radio1label.appendChild(document.createTextNode("Notch"));
		template.appendChild(radio1label);
		var radio2 = document.createElement("input");
		var radio2label = document.createElement("label");
		radio2.setAttribute("type","radio");
		radio2.setAttribute("name","tipo");
		radio2.setAttribute("data-evt","tipo");
		radio2.setAttribute("value","pasaBajo");
		radio2.setAttribute("class","FilterInfo");
		radio2label.appendChild(radio2);
		radio2label.appendChild(document.createTextNode("Pasa Bajo"));
		template.appendChild(radio2label);
		var radio3 = document.createElement("input");
		var radio3label = document.createElement("label");
		radio3.setAttribute("type","radio");
		radio3.setAttribute("name","tipo");
		radio3.setAttribute("data-evt","tipo");
		radio3.setAttribute("value","pasaAlto");
		radio3.setAttribute("class","FilterInfo");
		radio3label.appendChild(radio3);
		radio3label.appendChild(document.createTextNode("Pasa Alto"));
		template.appendChild(radio3label);
		var radio4 = document.createElement("input");
		var radio4label = document.createElement("label");
		radio4.setAttribute("type","radio");
		radio4.setAttribute("name","tipo");
		radio4.setAttribute("data-evt","tipo");
		radio4.setAttribute("value","pasaBanda");
		radio4.setAttribute("class","FilterInfo");
		radio4label.appendChild(radio4);
		radio4label.appendChild(document.createTextNode("Pasa Banda"));
		template.appendChild(radio4label);
		var ho = document.createElement("div");
		var spanho = document.createElement("span");
		spanho.innerHTML = "Ho";
		ho.appendChild(spanho);
		var inputho = document.createElement("input");
		inputho.setAttribute("type","number");
		inputho.setAttribute("class","FilterInfo");
		inputho.setAttribute("data-name","h");
		inputho.setAttribute("value",parseFloat("1",10));
		inputho.setAttribute("min","0");
		inputho.setAttribute("max","6");
		inputho.setAttribute("step","any");
		ho.appendChild(inputho);
		template.appendChild(ho);
		var q = document.createElement("div");
		var spanq = document.createElement("span");
		spanq.innerHTML = "Q";
		q.appendChild(spanq);
		var inputq = document.createElement("input");
		inputq.setAttribute("type","number");
		inputq.setAttribute("class","FilterInfo");
		inputq.setAttribute("data-name","q");
		inputq.setAttribute("value",parseFloat("0.1",10));
		inputq.setAttribute("min","0");
		inputq.setAttribute("max","10");
		inputq.setAttribute("step","any");
		q.appendChild(inputq);
		template.appendChild(q);
		var wo = document.createElement("div");
		var spanwo = document.createElement("span");
		spanwo.innerHTML = "Wo";
		wo.appendChild(spanwo);
		var inputwo = document.createElement("input");
		inputwo.setAttribute("type","number");
		inputwo.setAttribute("class","FilterInfo");
		inputwo.setAttribute("data-name","wo");
		inputwo.setAttribute("value",parseFloat("1.88",10));
		inputwo.setAttribute("min","0");
		inputwo.setAttribute("max","1000");
		inputwo.setAttribute("step","any");
		wo.appendChild(inputwo);
		template.appendChild(wo);
		this.d.appendChild(template);
	};

	window.EditorFiltro = EditorFiltro;
})();

