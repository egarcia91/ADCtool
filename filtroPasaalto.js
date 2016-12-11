(function(){
	function FiltroPasaAlto(div,config){
		Filtro.call(this,div,config);
	}

	FiltroPasaAlto.prototype = Object.create(Filtro.prototype);
	FiltroPasaAlto.prototype.constructor = "FiltroPasaAlto";
	FiltroPasaAlto.prototype.tipo = "Pasa Alto";

	FiltroPasaAlto.prototype.ts = function(s) {
		var result = 0;
		var jw = math.complex(0,s);
		var jw2 = math.multiply(jw,jw);
		var nominador = math.multiply(this.h,jw2);
		var denominador = math.add(math.add(jw2,math.multiply((this.wo/this.q),jw)),this.wo*this.wo);
		result = math.divide(nominador,denominador);
		return {
			dB : math.abs(result),
			phi : math.arg(result)
		}
	};

	FiltroPasaAlto.prototype.init = function() {
		return "resolver";
	};

	FiltroPasaAlto.prototype.ceros = function() {
		return [0,0];
	};

	FiltroPasaAlto.prototype.polos = function() {
		var polo = [];

		polo[0] = (this.wo/2)*(Math.sqrt((1/(this.q*this.q))-4)-1/this.q);
		polo[1] = -1*(this.wo/2)*(Math.sqrt((1/(this.q*this.q))-4)+1/this.q);
		return polo;
	};

	window.FiltroPasaAlto = FiltroPasaAlto;
})();
