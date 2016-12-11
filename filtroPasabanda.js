(function(){
	function FiltroPasaBanda(div,config){
		Filtro.call(this,div,config);
	}

	FiltroPasaBanda.prototype = Object.create(Filtro.prototype);
	FiltroPasaBanda.prototype.constructor = "FiltroPasaBanda";
	FiltroPasaBanda.prototype.tipo = "Pasa Banda";

	FiltroPasaBanda.prototype.ts = function(s) {
		var result = 0;
		var jw = math.complex(0,s);
		var jw2 = math.multiply(jw,jw);
		var nominador = math.multiply(jw,this.h*(this.wo/this.q));
		var denominador = math.add(math.add(jw2,math.multiply((this.wo/this.q),jw)),this.wo*this.wo);
		result = math.divide(nominador,denominador);
		return {
			dB : math.abs(result),
			phi : math.arg(result)
		}
	};

	FiltroPasaBanda.prototype.init = function() {
		return "resolver";
	};

	FiltroPasaBanda.prototype.ceros = function() {
		return [0];
	};

	FiltroPasaBanda.prototype.polos = function() {
		var polo = [];

		polo[0] = (this.wo/2)*(Math.sqrt((1/(this.q*this.q))-4)-1/this.q);
		polo[1] = -1*(this.wo/2)*(Math.sqrt((1/(this.q*this.q))-4)+1/this.q);
		return polo;
	};

	window.FiltroPasaBanda = FiltroPasaBanda;
})();
