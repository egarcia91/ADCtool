(function(){
	function Filtro(div,config){
		HtmlWidget.call(this,div,config);

		this._cValue("wo",0);
		this._cValue("q",0);
		this._cValue("h",0);

		this._cValue("logW",[]);
		this._cValue("dB",[]);
		this._cValue("fase",[]);

		this._cValue("frec",[]);
		this._cValue("nombre","");
	}

	Filtro.prototype = Object.create(HtmlWidget.prototype);
	Filtro.prototype.constructor = "Filtro";

	Object.defineProperty(Filtro.prototype, "nombre", {
		get: function() {
			return this.c.nombre;
		}
	});

	Object.defineProperty(Filtro.prototype, "wo", {
		get: function() {
			return this.c.wo;
		}
	});

	Object.defineProperty(Filtro.prototype, "q", {
		get: function() {
			return this.c.q;
		}
	});

	Object.defineProperty(Filtro.prototype, "h", {
		get: function() {
			return this.c.h;
		}
	});

	Object.defineProperty(Filtro.prototype, "logW", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.logW));
		}
	});

	Object.defineProperty(Filtro.prototype, "dB", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.dB));
		}
	});

	Object.defineProperty(Filtro.prototype, "fase", {
		get: function() {
			return JSON.parse(JSON.stringify(this.c.fase));
		}
	});


	Filtro.prototype.getdB = function(frec){
		frec = frec || [];
		var dB = [];
		var phi = [];
		var result;
		for(var i = 0; frec[i] != undefined; i++){
			result = this.ts(frec[i]*2*Math.PI);
			if (result.dB == 0){
				dB.push("inf");
				phi.push(0);
			} else {
				dB.push(20*Math.log10(result.dB));
				phi.push((result.phi/Math.PI));
			}
		}
		return {
			dB : dB,
			phi : phi
		}
	};

	Filtro.prototype.firstdraw = function(div,color){
		this.CanvasDraw = new FiltroDraw(div);
		this.draw(div,color);
	};

	Filtro.prototype.draw = function(div,color){
		this.CanvasDraw.draw(color);
		this.getValues();
		this.CanvasDraw.drawdB({
			logW : this.logW,
			dB : this.dB
		});
//		this.CanvasDraw.drawPhi({
//			tiempo : this.c.tiempo,
//			result : this.c.suma,
//			datos : this.c.valores
//		});
	};



	Filtro.prototype.getValues = function(){
		var paso = 0.01;
		var a;
		for(var t = 0.1; ; t = parseFloat((t+=paso).toFixed(2),10)){
			a = this.ts(t);
			this.c.logW.push(t);
			if(t==1){
				paso = 0.01;
			} else if(t==10) {
				paso = 1;
			} else if(t==100) {
				paso = 100;
			} else if(t==1000) {
				paso = 1000;
			} else if(t==10000) {
				paso = 10000;
			} else if(t==100000) {
				paso = 100000;
			}else if(t==1000000){
				break;
			}
			if (a.dB == 0) continue;
			this.c.dB.push(20*Math.log10(a.dB));
			this.c.fase.push(a.fase);
		}
	};

	window.Filtro = Filtro;
})();
