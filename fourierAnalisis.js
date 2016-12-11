(function(){
	function FourierAnalisis(div,config){
		HtmlWidget.call(this,div,config);
		this._cValue("nF",1);
		this._cValue("periodo",10);
		this.periodPI = 2*Math.PI/this.c.periodo;
		this.funcion;
	}

	FourierAnalisis.prototype = Object.create(HtmlWidget.prototype);
	FourierAnalisis.prototype.constructor = "FourierAnalisis";

	FourierAnalisis.prototype.calcAnBn = function(data){
		this.c.nF = data.nF;
		this.c.periodo = data.periodo;
		this.periodPI = 2*Math.PI/this.c.periodo;
		this.funcion = data.funcion;
		return this.calculate();
	};

	FourierAnalisis.prototype.frecAmp = function(conf){
		if(!conf) return {};
		var nF = conf.nF || 1,
			periodo = conf.periodo || 10,
			phi = conf.phi || [],
			an = conf.an || [],
			bn = conf.bn || [];
		var frecuencia = [];
		var amplitud = [];
		var defasaje = [];
		for(var j = 0; j < nF; j++){
			frecuencia[j] = (j+1)/periodo;
			amplitud[j] = Math.sqrt(an[j]*an[j]+bn[j]*bn[j]);
			if(bn[j]>0){
				defasaje[j] = (Math.atan(an[j]/bn[j])/Math.PI);
			} else {
				defasaje[j] = ((Math.atan(an[j]/bn[j])+Math.PI)/Math.PI);
			}
//			defasaje[j] = (defasaje[j] > 1)? defasaje[j]-2 : defasaje[j];
//			defasaje[j] = (defasaje[j] < -1)? defasaje[j]+2 : defasaje[j];
		}
		return {
			frec : frecuencia,
			amp : amplitud,
			fase : defasaje
		};
	};

	FourierAnalisis.prototype.fourierSum = function(conf){
		if(!conf) return {};
		var t = conf.t || 0;
		var nF = conf.nF || 1;
		var an = conf.an || [];
		var bn = conf.bn || [];
		var filtro = conf.filtro || [];
		var fase = conf.fase || [];
		var phi = conf.phi || [];
		var suma = 0;
		var valores = [];

		for(var j = 0; j < nF; j++){
			if(filtro[j] == undefined) { //NORMAL
				suma += valores[j] =  an[j]*Math.cos((j+1)*this.periodPI*t)+bn[j]*Math.sin((j+1)*this.periodPI*t);
			} else { //CON FILTRO
				var amplitud = filtro[j]*Math.sqrt((an[j]*an[j])+(bn[j]*bn[j]));
				var angulo = fase[j]*Math.PI;
				if(phi[j] != undefined)
					angulo = (fase[j]+phi[j])*Math.PI;
				suma += valores[j] = amplitud*Math.sin(((j+1)*this.periodPI*t) + angulo)
			}
		}
		return {
			valores : valores,
			suma : suma
		};
	};

	FourierAnalisis.prototype.calculate = function(){
		var an = [];
		var bn = [];
		var funcion = this.funcion || [];
		for(var i = 1; (i-1) < this.c.nF; i++){
			var ani = 0;
			var bni = 0;
			for(var j = 0, f; f = funcion[j]; j++){
				if(f.funcion['l']){
					ani += (this.integertcos(i,f.hasta,f.desde))*f.funcion['l'];
					bni += (this.integertsin(i,f.hasta,f.desde))*f.funcion['l'];
				} 
				if(f.funcion['c']){
					ani += (this.integercos(i,f.hasta,f.desde))*f.funcion['c'];
					bni += (this.integersin(i,f.hasta,f.desde))*f.funcion['c'];
				}
			}
			an.push(ani*(2/this.c.periodo));
			bn.push(bni*(2/this.c.periodo));
		}

		return {
			an : an,
			bn : bn
		}
	};

	FourierAnalisis.prototype.integersin = function(n,a,b) {
		return this.cos(n,b)-this.cos(n,a);
	}

	FourierAnalisis.prototype.integertsin = function(n,a,b) {
		return this.tsin(n,a)-this.tsin(n,b);
	}

	FourierAnalisis.prototype.integercos = function(n,a,b) {
		return this.sen(n,a)-this.sen(n,b);
	};

	FourierAnalisis.prototype.integertcos = function(n,a,b) {
		return this.tcos(n,a)-this.tcos(n,b);
	};

	FourierAnalisis.prototype.tcos = function(n,a) {
		return (Math.cos(n*this.periodPI*a)/(n*n*this.periodPI*this.periodPI))+(a*Math.sin(n*this.periodPI*a))/(n*this.periodPI);
	};

	FourierAnalisis.prototype.tsin = function(n,a) {
		return (Math.sin(n*this.periodPI*a)/(n*n*this.periodPI*this.periodPI))-(a*Math.cos(n*this.periodPI*a))/(n*this.periodPI);
	};

	FourierAnalisis.prototype.sen = function(n,a) {
		return (Math.sin(n*this.periodPI*a)/(n*this.periodPI));
	};

	FourierAnalisis.prototype.cos = function(n,a) {
		return (Math.cos(n*this.periodPI*a)/(n*this.periodPI));
	};

	window.FourierAnalisis = FourierAnalisis;
})();
