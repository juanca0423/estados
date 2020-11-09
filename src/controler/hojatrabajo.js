const {cuentas} = require("./cuentas.controler"),
  MoneyFormating = require('money-formating'),
  fg = new MoneyFormating(),
  efCtrl = {},
  nom =[],
  htCtrl = {};

let tabla=true,
  tabla1=true,
  tabla2=true,
  tabla3=true,
  sDI=0,
  sHI=0,
  sAI=0,
  sPaI=0,
  sPeI=0,
  sGI=0,
  sDF=0,
  sHF=0,
  sAF=0,
  sPaF=0,
  sPeF=0,
  sGF=0,
  gananciaI=0,
  gananciaF=0,
  total=0,
  totalF=0;

htCtrl.hojadetrabajo=(n, hTIni, hTFin)=>{
  /*
   * for(
   *   let i = 0;
   *   i <= (cuentas.length - 1);
   *   i ++)
   * recorre el array cuentas que es
   * la nomenclatura
  */
  for(let i = 0;i <= (cuentas.length - 1);i ++){
    /*
     * definimos variables nesesarias
     * codini: es el valor de nuestro
     *   balance de saldos inicial
     * codfin: es el valor de nuestro
     *   balance de saldos final
     * ambos los combertimos a numeros
     *   con dos decimales
     * nombre: es el nombre de la cuenta
    */
    let codini = parseFloat(n[`${cuentas[i].codigo}ini`]),
      codfin = parseFloat(n[`${cuentas[i].codigo}fin`]),
      nombre=cuentas[i].nombre;
    if(codini){ //si existe
      if(cuentas[i].saldo == 'activo'){ //si es activo
        /*
         * este es un ternario que debera
         *   ser modificado en otras
         *   versiones por un if
         * su funcion es separar las cuentas
         *   de inventarios ya que el
         *   tratamiento de estas cuentas es
         *   diferente en la hoja de trabajo
         * ver nota 1
        */
        (cuentas[i].codigo == '111301')?
          htCtrl.hojaTrabActiVerd(hTIni,'ini',nombre, codini, n):
          htCtrl.hojaTrabActifals(hTIni,'ini', nombre, codini);
      }else if(cuentas[i].saldo == 'pasivo'){ //si es pasivo
        htCtrl.hojaTrabPasi(hTIni, 'ini', nombre, codini);
      }else if(cuentas[i].saldo == 'perdida'){ //si es perdida
        /*
         * si es la cuenta 220001 no hase nada
         *   ya que es el inventario inicial
         *   de mercaderias
         *   de lo contrario agrega la cuenta
         *   al arreglo
         * ver nota 1
        */
        if(cuentas[i].codigo === '220001'){
        }else{
          htCtrl.hojaTrabPerd( hTIni,'ini',nombre,codini);
        };
      }else if(cuentas[i].saldo == 'ganancia'){ // si es ganancia
        /*
         * si existe el inventario final y no
         *   el inicial en contrario
         * ver nota 1
        */
        if(cuentas[i].codigo === '220005'){
          if(!parseFloat(n['111301ini'])){
            htCtrl.hojaTrabGanaVerd( hTIni, 'ini', nombre, codini)
          };
        }else{
          htCtrl.hojaTrabGanaFals(hTIni,'ini',nombre,codini);
        };
      };
    };
    if(codfin){
      if(cuentas[i].saldo == 'activo'){
        (cuentas[i].codigo == '111301')?
          htCtrl.hojaTrabActiVerd(hTFin,'fin', nombre, codfin, n):
          htCtrl.hojaTrabActifals(hTFin,'fin',nombre, codfin);
      }else if(cuentas[i].saldo=='pasivo'){
        htCtrl.hojaTrabPasi(hTFin,'fin',nombre,codfin);
      }else if(cuentas[i].saldo == 'perdida'){
        if(cuentas[i].codigo === '220001'){
        }else{
          htCtrl.hojaTrabPerd(hTFin, 'fin', nombre, codfin);
        };
      }else if(cuentas[i].saldo=='ganancia'){
        if(cuentas[i].codigo==='220005'){
          if(!parseFloat(n['111301fin'])){
            htCtrl.hojaTrabGanaVerd(hTFin, 'fin', nombre, codfin);
          };
        }else{
          htCtrl.hojaTrabGanaFals(hTFin,'fin', nombre,codfin);
        };
      };
    };
  };

  if(hTIni.length>0){
    htCtrl.hojaTrabSumas(
      hTIni,
      'Sumas',
      fg.moneyToCurrency(sDI.toFixed(2)),
      fg.moneyToCurrency(sHI.toFixed(2)),
      fg.moneyToCurrency(sAI.toFixed(2)),
      fg.moneyToCurrency(sPaI.toFixed(2)),
      fg.moneyToCurrency(sPeI.toFixed(2)),
      fg.moneyToCurrency(sGI.toFixed(2))
    );
  };

  gananciaI=sGI-sPeI;

  if(gananciaI != 0){
    htCtrl.hojaTrabSumas(
      hTIni,
      ((gananciaI>0)?'Ganancia antes de impuesto y reservas':'Perdida del ejercicio'),
      '',
      '',
      ((gananciaI>0)?'':fg.moneyToCurrency(-gananciaI.toFixed(2))),
      ((gananciaI>0)?fg.moneyToCurrency(gananciaI.toFixed(2)):''),
      ((gananciaI>0)?fg.moneyToCurrency(gananciaI.toFixed(2)):''),
      ((gananciaI>0)?'':fg.moneyToCurrency(-ganancciaI.toFixed(2)))
    );
    total=(gananciaI>0)?gananciaI+sPeI:(ganaciaI)+sAI;
    console.log(sAI,sPaI)
    if(total.toFixed(2)==sPeI.toFixed(2)){
      htCtrl.hojaTrabSumas(
        hTIni,
        'Sumas Iguales',
        '',
        '',
        fg.moneyToCurrency(sAI+gananciaI.toFixed(2)),
        fg.moneyToCurrency(sPaI.toFixed(2)),
        fg.moneyToCurrency(sPeI.toFixed(2)),
        fg.moneyToCurrency(total.toFixed(2))
      );
    };
    (total.toFixed(2)==sGI.toFixed(2))?
      htCtrl.hojaTrabSumas(
        hTIni,
        'Sumas Iguales',
        '',
        '',
        fg.moneyToCurrency(sAI.toFixed(2)),
        fg.moneyToCurrency((sPaI+gananciaI).toFixed(2)),
        fg.moneyToCurrency(total.toFixed(2)),
        fg.moneyToCurrency(sGI.toFixed(2))
      ):
      tabla2=false;
  };

  if(hTFin.length > 0){
    htCtrl.hojaTrabSumas(
      hTFin,
      'Sumas',
      fg.moneyToCurrency(sDF.toFixed(2)),
      fg.moneyToCurrency(sHF.toFixed(2)),
      fg.moneyToCurrency(sAF.toFixed(2)),
      fg.moneyToCurrency(sPaF.toFixed(2)),
      fg.moneyToCurrency(sPeF.toFixed(2)),
      fg.moneyToCurrency(sGF.toFixed(2))
    );
  };
  gananciaF=sGF + sPeF;

  if(gananciaF>0){
    htCtrl.hojaTrabSumas(
      hTFin,
      'Ganancia antes de impuesto y reservas',
      '',
      '',
      '',
      fg.moneyToCurrency(gananciaF.toFixed(2)),
      fg.moneyToCurrency(gananciaF.toFixed(2)),
      ''
    );
    totalF=gananciaF+sPaF;
    (totalF.toFixed(2)==sAF.toFixed(2))?
      htCtrl.hojaTrabSumas(
        hTFin,
        'Sumas Iguales',
        '',
        '',
        fg.moneyToCurrency(sAF.toFixed(2)),
        fg.moneyToCurrency(totalF.toFixed(2)),
        fg.moneyToCurrency((sPeF+gananciaF).toFixed(2)),
        fg.moneyToCurrency(sGF.toFixed(2))
      ):
      tabla3=false;
  }else{
    htCtrl.hojaTrabSumas(
      hTFin,
      'Perdida del ejercicio',
      '',
      '',
      fg.moneyToCurrency(-(gananciaF).toFixed(2)),
      '',
      '',
      fg.moneyToCurrency(-(gananciaF).toFixed(2))
    );
    totalF = -(gananciaF)+sAF;
    (totalF.toFixed(2) == sPaF.toFixed(2))?
      htCtrl.hojaTrabSumas(
        hTFin,
        'Sumas Iguales',
        '',
        '',
        fg.moneyToCurrency((sAF+(-gananciaF).toFixed(2))),
        fg.moneyToCurrency(sPaF.toFixed(2)),
        fg.moneyToCurrency((sPeF.toFixed(2))),
        fg.moneyToCurrency((sGaF+(-gananciaF).toFixed(2)))
      ):
      tabla3=false;

  };
};

/* htCtrl.hojaTrabSumas=(a, b, c, d, e, f, g, h)
 * @param array  a: hoja de trabajo
 * @param string b: Texto
 * @param number c: Debe
 * @param number d: Haber
 * @param number e: Activo
 * @param number f: Pasivo
 * @param number g: Perdidas
 * @param number h: Ganancias
 */
htCtrl.hojaTrabSumas=(a, b, c, d, e, f, g, h)=>{
  a.push({nombre: b, debe: c, haber: d, activo: e, pasivo: f, perdida: g, ganancia: h});
};

/* htCtrl.hojaTrabGanaFals=(a, b, c, d)
 * @param array  a: hoja de trabajo
 * @param string b: 'ini' o 'fin'
 * @param string c: nombre de cuenta
 * @param number d: monto de la cuenta
*/
htCtrl.hojaTrabGanaFals=(a, b, c, d)=>{
  let e = fg.moneyToCurrency(d.toFixed(2));
  a.push({nombre:c, debe:'', haber: e, activo:'', pasivo:'', perdida:'', ganancia: e});
  if(b == 'ini'){
    sHI = sHI + d;
    sGI = sGI + d;
  }else if(b == 'fin'){
    sGF = sGF + d;
    sHF = sHF + d;
  };
};

/* htCtrl.hojaTrabGanaVerd=(a, b, c, d)
 * @param array  a: hoja de trabajo
 * @param string b: 'ini' o 'fin'
 * @param string c: nombre de cuenta
 * @param number d: monto de la cuenta
*/
htCtrl.hojaTrabGanaVerd=(a, b, c, d)=>{
  let e = fg.moneyToCurrency(d.toFixed(2));
  a.push({nombre: c, debe: '', haber: '', perdida: '', ganancia: e, activo: e, pasivo: ''});
  if(b == 'ini'){
    sGI=sGI+d;
    sAI=sAI+d;
  }else if(b == 'fin'){
    sGF=sGF+d;
    sAF=sAF+d;
  };
};

/* htCtrl.hojaTrabPerd=(a, b, c, d)
 * @param array  a: hoja de trabajo
 * @param string b: 'ini' o 'fin'
 * @param string c: nombre de cuenta
 * @param number d: monto de la cuenta
*/
htCtrl.hojaTrabPerd=(a, b, c, d)=>{
  let e = fg.moneyToCurrency(d.toFixed(2));
  a.push({nombre:c, debe:e, haber:'', activo:'', pasivo:'', perdida:e, ganancia:''});
  if(b == 'ini'){
    sDI=sDI+d;
    sPeI=sPeI+d;
  }else if(b == 'fin'){
    sDebeF=sDF+d;
    sPeF=sPeF+d;
  };
};

/* htCtrl.hojaTrabPasi=(a, b, c, d)
 * @param array  a: hoja de trabajo
 * @param string b: 'ini' o 'fin'
 * @param string c: nombre de cuenta
 * @param number d: monto de la cuenta
*/
htCtrl.hojaTrabPasi=(a, b, c, d )=>{
  let e = fg.moneyToCurrency(d.toFixed(2));
  a.push({nombre:c, debe:'', haber:e, activo:'', pasivo:e, perdida:'', ganancia:''});
  if(b == 'ini'){
    sHI=sHI+d;
    sPaI=sPaI+d;
  }else if(b == 'fin'){
    sHF=sHF+d;
    sPaF=sPaF+d;
  };
};

/* htCtrl.hojaTrabActifals=(a, b, c, d)
 * @param array  a: hoja de trabajo
 * @param string b: 'ini' o 'fin'
 * @param string c: nombre de cuenta
 * @param number d: monto de la cuenta
*/
htCtrl.hojaTrabActifals=(a, b, c, d)=>{
  let e = fg.moneyToCurrency(d.toFixed(2));
  a.push({nombre:c, debe:e, haber:'', activo:e, pasivo:'', perdida:'', ganancia:''});
  if(b == 'ini'){
    sDI = sDI + d;
    sAI = sAI + d;
  }else if(b == 'fin'){
    sDF = sDF + d;
    sAF = sAF + d;
  };
};

/* htCtrl.hojaTrabActiVerd=(a, b, c, d)
 * @param array  a: hoja de trabajo
 * @param string b: 'ini' o 'fin'
 * @param string c: nombre de cuenta
 * @param number d: monto de la cuenta
 * @param array  n: valores del formulario
*/
htCtrl.hojaTrabActiVerd=(a, b, c ,d, n)=>{
  let e = fg.moneyToCurrency(d.toFixed(2)),
    g = parseFloat(n[`220005${b}`]),
    f = fg.moneyToCurrency(g.toFixed(2))
  a.push({nombre: c, debe:e, haber:'', perdida:e, ganancia: f, activo:f, pasivo:''});
  if(b == 'ini'){
    sDI = sDI + d;
    sPeI = sPeI + d;
    sGI = sGI + g;
    sAI = sAI + g;
  }else if(b == 'fin'){
    sDF = sDF + d;
    sPeF = sPeF + d;
    sGF = sGF + g;
    sAF = sAF + g;
  };
};

module.exports = htCtrl;

/** nota 1
 * inventarios, estos cuentan con una
 * peculiaridad, esta es que los
 * inventarios iniciales van en dos
 * estados distintos, en el balance de
 * situacion general y en el estado de
 * resultados o costo de produccion,
 * segun sea el caso, motivo por el
 * cual estos serian algo especial
*/
