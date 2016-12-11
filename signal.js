/*
 * Signal
 *  sen~al:
 *  todas las frecuencias en frec.
 *  todas las amplitudes en amp.
 *  todas las fases en fase.
 *  el periodo en periodo.
 *
 *  fourier:
 *  todos los coeficientes de Fourier en an y bn.
 *  la cantidad de coef de Fourier en nF.
 *
 *  datos:
 *  los tiempos discretos de forma (tiempos).
 *  los valores discretos de forma (valores).
 *  las sumas de valores discretos de forma (suma).
 *  todas las atenuaciones o amplificaciones en dB.
 *  todas las multiplicaciones de amp estan en filtro.
 *  todos los defasajes en phi.
 *  la funcion en funcion.
*/
(function(){
	function Signal(div,config){
		HtmlWidget.call(this,div,config);

		this._cValue("an",[]);
		this._cValue("bn",[]);

		this._cValue("frec",[]);
		this._cValue("amp",[]);
		this._cValue("fase",[]);
		this._cValue("periodo",10);

		this._cValue("tiempo",[]);
		this._cValue("valores",[]);
		this._cValue("suma",[]);

		this._cValue("dB",[]);
		this._cValue("filtro",[]);
		this._cValue("phi",[]);

		this._cValue("funcion",[]);
		this._cValue("nF",1);

		this._cValue("nombre","");

		this.Fourier = new FourierAnalisis();

	}

	Signal.prototype = Object.create(HtmlWidget.prototype);
	Signal.prototype.constructor = "Signal";
	Signal.prototype.discretValues = [];

	Object.defineProperty(Signal.prototype, "nombre", {
		get: function() {
			return this.c.nombre;
		}
	});

	Object.defineProperty(Signal.prototype, "nF", {
		get: function() {
			return this.c.nF;
		}
	});

	Object.defineProperty(Signal.prototype, "an", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.an));
		}
	});

	Object.defineProperty(Signal.prototype, "bn", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.bn));
		}
	});

	Object.defineProperty(Signal.prototype, "frec", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.frec));
		}
	});
	
	Object.defineProperty(Signal.prototype, "amp", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.amp));
		}
	});
	
	Object.defineProperty(Signal.prototype, "fase", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.fase));
		}
	});
	
	Object.defineProperty(Signal.prototype, "periodo", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.periodo));
		}
	});
	
	Object.defineProperty(Signal.prototype, "tiempo", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.tiempo));
		}
	});

	Object.defineProperty(Signal.prototype, "valores", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.valores));
		}
	});

	Object.defineProperty(Signal.prototype, "suma", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.suma));
		}
	});

	Object.defineProperty(Signal.prototype, "dB", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.dB));
		}
	});

	Object.defineProperty(Signal.prototype, "phi", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.phi));
		}
	});

	Object.defineProperty(Signal.prototype, "funcion", {
		get: function() {
			return this.c.funcion;
		}
	});

	Object.defineProperty(Signal.prototype, "filtro", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.filtro));
		}
	});

	Signal.prototype.getDiscretValues = function(confG){
		if(!confG) return;
		var t = confG.init || 0;
		var fin = confG.fin || 10;
		var hDV = confG.hDV || 1;
		this.discretValues = [];
		for(; t < fin; t = parseFloat((t+=hDV).toFixed(9),10)){
			this.setDiscretValues(t);
		}
	};

	Signal.prototype.calcFFT = function(){
		var nDV = this.discretValues.length; //number of discret values;
		var fft = new FFT(nDV,1/this.periodo);
		fft.forward(this.discretValues);
		for(var i = 1; i < nDV/2; i++){
			this.c.amp[i-1] = fft.spectrum[i];
			this.c.an[i-1] = fft.real[i]*(2/nDV);
			this.c.bn[i-1] = fft.imag[i]*(-2/nDV);
			this.c.frec[i-1] = (i/this.periodo);
			this.c.fase[i-1] = (this.bn[i-1]>0)?(Math.atan(this.an[i-1]/this.bn[i-1])/Math.PI):((Math.atan(this.an[i-1]/this.bn[i-1])+Math.PI)/Math.PI);
		}
	};

	Signal.prototype.getValues = function(confG){
		if(!confG) return;
		var t = confG.init || 0;
		var fin = confG.fin || 10;
		var h = confG.h || 1;
		this.c.suma = [];
		this.c.valores = [];
		this.c.tiempo = [];
		for(; t < fin; t = parseFloat((t+=h).toFixed(9),10)){
			this.iterFourier(t);
		}
	};

	Signal.prototype.setDiscretValues = function(t){
		if(t<=2.5){
			this.discretValues.push(this.c.funcionFFT[0].eval({x:t}));
//			this.c.suma.push(this.c.funcionFFT[0].eval({x:t}));
		}else if(t>2.5 && t<5){
			this.discretValues.push(this.c.funcionFFT[1].eval({x:t}));
//			this.c.suma.push(this.c.funcionFFT[1].eval({x:t}));
		}else if(t>6.2499 && t<8.75){
			this.discretValues.push(this.c.funcionFFT[2].eval({x:t}));
//			this.c.suma.push(this.c.funcionFFT[2].eval({x:t}));
		}else{
			this.discretValues.push(0);
//			this.c.suma.push(0);
		}
	};

	Signal.prototype.setNombre = function(t){
		this.c.nombre = t;
	};

	Signal.prototype.iterFourier = function(t){
		var ret = this.Fourier.fourierSum({
			t : t,
			nF : this.nF,
			an : this.an,
			bn : this.bn,
			dB : this.dB,
			phi : this.phi,
			fase : this.fase,
			filtro : this.filtro
		});
		this.c.tiempo.push(t);
		this.c.valores.push(ret.valores);
		this.c.suma.push(ret.suma);
	};

	Signal.prototype.firstdrawFrecDiag = function(div,color){
		this.CanvasDrawFD = new FrecDraw(div);
		this.CanvasDrawFD.addEventListener("clickCanvas", this.onClickFrec.bind(this));
		this.CanvasDrawFD.addEventListener("clickCirculoCanvas", this.onClickFase.bind(this));
		this.drawFrecDiag(div,color);
	};

	Signal.prototype.drawFrecDiag = function(div,color){
		this.CanvasDrawFD.draw(color);
		var amp = [];
		var fase = [];
		for(var i = 0; i < this.nF; i++){
			if(this.filtro[i]!=undefined){
				amp[i] = this.filtro[i]*this.amp[i];
				if(this.filtro[i] == 0){
					fase[i] = undefined;
				} else {
					fase[i] = this.fase[i];
				}
			} else {
				amp[i] = this.amp[i];
				fase[i] = this.fase[i];
			}
		}

		this.CanvasDrawFD.drawResultFase({
			frec : this.frec,
			fase : fase,
			phi : this.phi
		});

		this.CanvasDrawFD.drawResult({
			frec : this.frec,
			amp : amp
		});
	};

	Signal.prototype.onClickFase = function(i,ang){
		this.emit("clickCirculoCanvas",i,ang);
	};

	Signal.prototype.onClickFrec = function(i,y,x){
		this.emit("clickCanvas",i,y,x);
	};

	Signal.prototype.firstdraw = function(div,color){
		this.CanvasDraw = new SignalDraw(div);
		this.draw(div,color);
	};

	Signal.prototype.draw = function(div,color){
		this.CanvasDraw.draw(color);
		this.CanvasDraw.drawResult({
			tiempo : this.tiempo,
			result : this.suma,
			datos : this.valores
		});
//		this.CanvasDraw.drawFrequency({
//			tiempo : this.c.tiempo,
//			result : this.c.suma,
//			datos : this.c.valores
//		});
	};

	Signal.prototype.importSignal = function(data){
		this.c.nf = data.nF;
		this.c.an = data.an;
		this.c.bn = data.bn;
		this.c.amp = data.amp;
		this.c.frec = data.frec;
		this.c.fase = data.fase;
		this.c.periodod = data.periodo;
		this.c.valores = data.valores;
		this.c.suma = data.suma;
	};

	Signal.prototype.exportSignal = function(){
		return {
			nF : this.nF,
			an : this.an,
			bn : this.bn,
			amp : this.amp,
			frec : this.frec,
			fase : this.fase,
			periodo : this.periodo,
			valores : this.valores,
			suma : this.suma
		}
	};

	Signal.prototype.calcAnBn = function(){
		var coefF = this.Fourier.calcAnBn({
			nF : this.nF,
			periodo : this.periodo,
			funcion : this.funcion
		});
		this.c.an = coefF.an;
		this.c.bn = coefF.bn;
	};

	Signal.prototype.setFilter = function(filter){
		dB = filter.dB || [];
		phi = filter.phi || [];
		for(var i = 0; dB[i] != undefined; i++){
			if(dB[i] != "inf"){
				this.c.dB[i] = dB[i];
				this.c.filtro[i] = Math.pow(10,(dB[i]/20))
				this.c.phi[i] = phi[i];
//				this.c.phi[i] = phi[i]+this.fase[i];
			}
		}
	};

	Signal.prototype.changeAnBn = function(){
		for(var i = 0; i < this.nF; i++){
			var phi = this.c.phi[i];
			if(this.c.filtro[i] == undefined) continue;
			if(this.c.phi[i] == undefined) phi = 0;
			var angTot = phi + this.fase[i];
			var sigAn = 1;
			var sigBn = 1;
			if(angTot > 1) {
				angTot -= 2;
			} else if (angTot < -1) {
				angTot += 2;
			}
			if(angTot > 0 && angTot < 0.5 ){
				// "Cuad 1"
			}else if(angTot < 0 && angTot > -0.5 ){
				sigAn = -1;
				angTot = Math.abs(angTot);
				// "Cuad 4"
			}else if(angTot < -0.5 && angTot > -1 ){
				sigAn = sigBn = -1;
				angTot = 1 - Math.abs(angTot);
				// "Cuad 3"
			}else if(angTot > 0.5 && angTot < 1 ){
				sigBn = -1;
				angTot = 1 - Math.abs(angTot);
				// "Cuad 2"
			}
			var nom = (this.c.filtro[i]*this.c.filtro[i]*this.c.amp[i]*this.c.amp[i])
			var den = 1+Math.tan(angTot*Math.PI);
			var bn = Math.sqrt(nom/den);
			var an = Math.tan(angTot*Math.PI)*bn;
			bn *=sigBn;
			an *=sigAn;
			this.c.an[i] = an;
			this.c.bn[i] = bn;
		}
	};

	Signal.prototype.serializeValues = function(){
		this.changeAnBn();
		this.frecAmp();
		//an cambia //DONE
		//bn cambia //DONE
		
		//frec igual
		//amp cmabia //DONE
		//fase cmabia //DONE
		//periodo igual
		
		//tiempo cambia  //DONE
		//valores cambia //DONE
		//suma cambia //DONE

		this.c.dB = [];
		this.c.filtro = [];
		this.c.phi = [];
//
		this.c.funcion = [];
		//nF se mantiene
	};

	Signal.prototype.removeAllFrec = function(){
		for(var i = 0; i < this.nF; i++)
			this.c.filtro[i] = 0;
	};

	Signal.prototype.ampMultiply = function(i,y,x){
		if(this.filtro[i] && (this.amp[i] > 0)){
			this.c.filtro[i] = y/this.amp[i];
		}
	};

	Signal.prototype.frecAddRm = function(i){
		if(this.filtro[i]){
			this.c.filtro[i] = 0;
			this.c.phi[i] = this.fase[i];
		} else {
			this.c.filtro[i] = 1;
		}
	};

	Signal.prototype.setFase = function(i,ang){
		this.c.fase[i] = ang;
	};

	Signal.prototype.frecAmp = function(){
		var infosignal = this.Fourier.frecAmp({
			nF : this.nF,
			periodo : this.periodo,
			an : this.an,
			bn : this.bn,
		});
		this.c.frec = infosignal.frec;
		this.c.amp = infosignal.amp;
		this.c.fase = infosignal.fase;
	};

	window.Signal = Signal;
})();

