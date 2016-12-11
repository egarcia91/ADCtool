(function(){
	function FiltroPasaBajo(div,config){
		Filtro.call(this,div,config);
	}

	FiltroPasaBajo.prototype = Object.create(Filtro.prototype);
	FiltroPasaBajo.prototype.constructor = "FiltroPasaBajo";
	FiltroPasaBajo.prototype.tipo = "Pasa Bajo";

	FiltroPasaBajo.prototype.ts = function(s) {
		var result = 0;
		var jw = math.complex(0,s);
		var jw2 = math.multiply(jw,jw);
		var nominador = (this.h*this.wo*this.wo);
		var denominador = math.add(math.add(jw2,math.multiply((this.wo/this.q),jw)),this.wo*this.wo);
		result = math.divide(nominador,denominador);
		return {
			dB : math.abs(result),
			phi : math.arg(result)
		}
	};

	FiltroPasaBajo.prototype.init = function() {
		return 20*Math.log10(this.h*this.wo*this.wo)
	};

	FiltroPasaBajo.prototype.ceros = function() {
		return [];
	};

	FiltroPasaBajo.prototype.polos = function() {
		var polo = [];

		polo[0] = (this.wo/2)*(Math.sqrt((1/(this.q*this.q))-4)-1/this.q);
		polo[1] = -1*(this.wo/2)*(Math.sqrt((1/(this.q*this.q))-4)+1/this.q);
		return polo;
	};

	window.FiltroPasaBajo = FiltroPasaBajo;
})();
