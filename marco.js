(function(){
	function Marco(div,config){
		HtmlWidget.call(this,div,config);
	}

	Marco.prototype = Object.create(HtmlWidget.prototype);
	Marco.prototype.constructor = "Marco";

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
