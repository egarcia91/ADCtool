(function(){
	function FiltroNotch(div,config){
		Filtro.call(this,div,config);
	}

	FiltroNotch.prototype = Object.create(Filtro.prototype);
	FiltroNotch.prototype.constructor = "FiltroNotch";
	FiltroNotch.prototype.tipo = "Notch";

	FiltroNotch.prototype.ts = function(s) {
		var result = 0;
		var jw = math.complex(0,s);
		var jw2 = math.multiply(jw,jw);
		var nominador = math.multiply(this.h,math.add(jw2,this.wo*this.wo));
		var denominador = math.add(math.add(jw2,math.multiply((this.wo/this.q),jw)),this.wo*this.wo);
		result = math.divide(nominador,denominador);
		return {
			dB : math.abs(result),
			phi : math.arg(result)
		}
	};

	FiltroNotch.prototype.init = function() {
		return 20*Math.log10(this.h);
	};

	FiltroNotch.prototype.ceros = function() {
		return "resolver";
	};

	FiltroNotch.prototype.polos = function() {
		var polo = [];
		polo[0] = (this.wo/2)*(Math.sqrt((1/(this.q*this.q))-4)-1/this.q);
		polo[1] = -1*(this.wo/2)*(Math.sqrt((1/(this.q*this.q))-4)+1/this.q);
		return polo;
	};

	window.FiltroNotch = FiltroNotch;
})();
