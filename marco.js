(function(){
	function Marco(div,config){
		HtmlWidget.call(this,div,config);
		this.basicDraw();
	}

	Marco.prototype = Object.create(HtmlWidget.prototype);
	Marco.prototype.constructor = "Marco";

	Marco.prototype.basicDraw = function(){
		var template = '<div class="circuit"></div><div class="signals" data-evt="signals" title="Se&ntilde;ales"></div><div class="filters" data-evt="filters" title="Filtros"></div><div class="circuits" data-evt="circuits" title="Circuitos"></div>';
		this.d.innerHTML = template;
	};
	
	Marco.prototype.thisClick = function(event,t,that){
		var evt = t.getAttribute('data-evt');
		switch(evt){
			case "signals":
				this.emit("signals");
				return true;
			case "filters":
				this.emit("filters");
				return true;
				break;
			case "circuits":
				this.emit("circuits");
				return true;
				break;
			default:
				return true;
				break;
		}
	};

	window.Marco = Marco;
})();
