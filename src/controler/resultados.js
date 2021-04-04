const {
  resulIngr,
  resulCostoVentas,
  resulGtosOperDist,
  resulGtosOperAdmi,
  resulIngFina,
  resulGtosFina,
  resulOtroGtos,
  resulOtroIngr
} = require("./cuentas.controler");
let MoneyFormating = require('money-formating');
let fg = new MoneyFormating();
const reCtrl = {};

/*reCtrl.resuCuenObje=(a, b, c, d, e, f, g, h, i)=>{
 * @params {array}  a: almacena los datos
 * @parans {string} b: columna 1 nombre
 * @params {number} c: valor columna 2 col1
 * @oarams {number} d: valor columna 3 col2
 * @params {number} e: valor columna 4 col3
 * @params {string} f: clase del nombre
 * @params {string} g: clase de col1
 * @params {string} h: clase de col2
 * @params {string} i: clase de col3
*/
reCtrl.resuCuenObje = (a, b, c, d, e, f, g, h, i)=>{
  a.push({
    nombre:b,
    clase0:f,
    col1:c,
    clase1:g,
    col2:d,
    clase2:h,
    col3:e,
    clase3:i
  });
};

/*reCtrl.resultados = (n, a, b)=>{
 * @params {array} n:
 * @params {array} a: estado de resultados ini
 * @params {array} b: estado de resultados fin
*/
reCtrl.resultados = (n, a, b)=>{
  /* variables
   * vBI: Ventas Brutas Ini
   * m1I: mercaderias 1 Ini
   * cBI: compras Brutas Ini
   * cNI: compras Netas Ini
   * mDI: merc Disp Ini
   * cVI: cost Vent Ini
   * mBI: margBrut Ini
   * gVI: gastosVentas Ini
   * gAI: gastosAdministracion Ini
   * iFI: ingresosFinancieros Ini
   * gFI: gastosFinancieros Ini
   * oGI: otros Gastos Ini
   * OII: Otros Ingresos Ini
   *
   * vBF: Ventas Brutas Fin
   * m1F: mercaderias 1 Fin
   * cBF: compras Brutas Fin
   * cNF: compras Netas Fin
   * mDF: merc Disp Fin
   * cVF: cost Vent Fin
   * mBF: margBrut Fin
   * gVF: gastosVentas Fin
   * gAF: gastosAdministracion Fin
   * iFF: ingresosFinancieros Fin
   * gFF: gastosFinancieros Fin
   * oGF: otros Gastos Fin
   * OIF: Otros Ingresos Fin
  */
  let vBI = resuVentBrut(
    a,
    'ini'
  );
  let m1I = resuMercaderias1(
    a,
    'ini'
  );
  let cBI = resuCompBrut(
    a,
    'ini'
  );
  let cNI = resuCompNeta(
    a,
    'ini',
    cBI
  );
  let mDI = mercDisp(
    a,
    'ini',
    m1I,
    cNI
  );
  let cVI = costVent(
    a,
    'ini',
    mDI
  );
  let mBI = margBrut(
    a,
    vBI,
    cVI
  );
  let gVI = resuBloq(
    resulGtosOperDist,
    a,
    'ini',
    'Gastos de Operación','Gastos de Distribución',
    'uno',
    0,
    0
  );
  let gAI = resuBloq(
    resulGtosOperAdmi,
    a,
    'ini',
    '',
    'Gastos de Administración',
    'dos',
    gVI,
    mBI
  );
  let iFI = resuBloq(
    resuIngrFina,
    a,
    'ini',
    'Ingresos y Gastos Financieros',
    'Gastos Financieros',
    'tres',
    0,
    0
  );
  let gFI = resuBloq(
    resuGastFina,
    a,
    'ini',
    '',
    'Ingresos Financieros',
    'cuatro' ,
    iFI,
    gAI
  );
  let oGI = resuBloq(
    resuOtroGast,
    a,
    'ini',
    'Otros Gastos e Ingresos',
    'Otros   Gastos',
    'cinco',
    0,
    0
  );
  let OII = resuBloq(
    resulOtroIngr,
    a,
    'ini',
    '',
    'Ingresos Financieros',
    'seis',
    oGI,
    gFI
  );


  let vBF = resuVentBrut(
    b,
    'fin'
  );
  let m1F = resuMercaderias1(
    b,
    'fin'
  );
  let cBF = resuCompBrut(
    b,
    'fin'
  );
  let cNF = resuCompNeta(
    b,
    'fin',
    cBF
  );
  let mDF = mercDisp(
    b,
    'fin',
    m1F,
    cNF
  );
  let cVF = costVent(
    b,
    'fin',
    mDF
  );
  let mBF = margBrut(
    b,
    vBF,
    cVF
  );
  let gVF = resuBloq(
    resulGtosOperDist,
    b,
    'fin',
    'Gastos de Operación',
    'Gastos de  Distribución',
    'uno',
    0,
    0
  );
  let gAF = resuBloq(
    resulGtosOperAdmi,
    b,
    'fin',
    '',
    'Gastos de Administración',
    'dos',
    gVF,
    mBF
  );
  let iFF = resuBloq(
    resulIngFina,
    b,
    'fin',
    'Ingresos y Gastos Financieros',
    'Gastos Financieros',
    'tres',
    0,
    0
  );
  let gFF = resuBloq(
    resulGtosFina,
    b,
    'fin',
    '',
    'Ingresos Financieros',
    'cuatro',
    iFF,
    gAF
  );
  let oGF = resuBloq(
    resulOtroGtos,
    b,
    'fin',
    'Otros Gastos e Ingresos',
    'Otros Gastos',
    'cinco',
    0,
    0
  );
  let OIF = resuBloq(
    resulOtroIngr,
    b,
    'fin',
    '',
    'Ingresos Financieros',
    'seis',
    oGF,
    gFF
  );
};

/*reCtrl.resuBloq = (a, b, c, d, e, f, g, h)=>{
 * @params {array}  a: tabla de contenido
 * @params {array}  b: estado de resultados
 * @params {string} c: indice 'ini' o 'fin'
 * @params {string} d: subtitulo
 * @params {string} e: subsubtitulo
 * @params {string} f: 'uno' 'dos' 'tres' 'cuatro'
 *   'cinco' 'seis'
 * @params {array} g: acumulador
 * @params {array} h: saldo anterior
 * @params {array} n: datos del formulario
*/
reCtrl.resuBloq = (a, b, c, d, e, f, g, h, n)=>{
  /* variables acumulativas
   * @let {number} acumulador: acumula el valor
   * @let {array} tablTemp: se almacenaran
   *   los valores de n
  */
  let acumulador=0;
  let tablTemp = [];
  /* for(let i=0;i<=(a.length-1);i++)
   * recorre los datos del formulario creando
   *   un objeto con con nombre de cuenta,
   *   codigo de la nomenclatura y el valor
   *   llamada tablTemp
  */
  for(let i=0;i<=(a.length-1);i++){
    let cod=parseFloat(n[`${a[i].codigo}${c}`]);
    let nombre=a[i].nombre;
    if(cod){
      tablTemp.push({
        codigo:a[i].codigo,
        nombre:nombre,
        valor:cod
      });
    };
  };

  for(let i=0;i<=(tablTemp.length-1);i++){
    let val = tablTemp[i].valor;
    let cur = fg.moneyToCurrency(val.toFixed(2));
    let cod = parseFloat(val);
    let nombre=tablTemp[i].nombre;
    if(tablTemp.length==1){// si la  tabla temporal es uno
      if(f == 'uno'||f == 'tres'||f == 'cinco'){
        acumulador=acumulador+cod;
        reCtrl.titulo1(b, d, e, nombre, cur, g);
        return acumulador;
      };
      if(f == 'dos'||f == 'cuatro'||f == 'seis'){
        acumulador=acumulador+cod;
        let subtotal=0;
        let total=0;
        (f == 'dos')?
          subtotal=acumulador+g:
          subtotal=g-acumulador;
        (f == 'dos'||f == 'seis')?
          total=parseFloat(h-subtotal):
          total=parseFloat(h+subtotal);
        reCtrl.titulo2(b, subtotal, e, nombre, cur, acumulador);
        if(f == 'dos'){
          (acumulador>0)?
            resuCuenObje(
              b,
              'Ganancia en Operación',
              '',
              '',
              fg.moneyToCurrency(total.toFixed(2)),
              '',
              '',
              '',
              ''
            ):
            resuCuenObje(
              b,
              'Perdida en Operación',
              '',
              '',
              fg.moneyToCurrency(total.toFixed(2)),
              '',
              '',
              '',
              ''
            );
        }else if(f == 'cuatro'){
          (acumulador>0)?
            resuCuenObje(
              b,
              'Ganancia Despues de Ingresos y Gastos Financieros',
              '',
              '',
              fg.moneyToCurrency(total.toFixed(2)),
              '',
              '',
              '',
              ''
            ):
            resuCuenObje(
              b,
              'Perdida Despues de Ingresos y Gastos Financieros',
              '',
              '',
              fg.moneyToCurrency(total.toFixed(2)),
              '',
              '',
              '',
              ''
            );
        }else if(f == 'seis'){
          (acumulador>0)?
            resuCuenObje(
              b,
              'Ganancia Antes de Impuestos y Reservas',
              '',
              '',
              fg.moneyToCurrency(total.toFixed(2)),
              '',
              '',
              '',
              ''
            ):
            resuCuenObje(
              b,
              'Perdida Antes de Impuestos y Reservas',
              '',
              '',
              fg.moneyToCurrency(total.toFixed(2)),
              '',
              '',
              '',
              ''
            );
        };
        return total;
      };
    }else if(tablTemp.length>1){
      if(i==0){// si es el primer elemento
        if(f == 'uno'||f == 'tres'||f == 'cinco'){
          resuCuenObje(
            b,
            subtitulo,
            '',
            '',
            '',
            'subtitulo',
            '',
            '',
            ''
          );
          resuCuenObje(
            b,
            subsubtitulo,
            '',
            '',
            '',
            'subsubtitulo',
            '',
            '',
            ''
          );
          resuCuenObje(// esto no
            b,
            nombre,
            cur,
            '',
            '',
            '',
            '',
            '',
            ''
          );
          acumulador=acumulador+cod;
        };
        if(f == 'dos'||f == 'cuatro'||f == 'seis'){
          resuCuenObje(
            b,
            subsubtitulo,
            '',
            '',
            '',
            'subsubtitulo',
            '',
            '',
            ''
          );
          resuCuenObje(
            b,
            nombre,
            cur,
            '',
            '',
            '',
            '',
            '',
            ''
          );
          acumulador=acumulador+cod;
        };
      };
      if(i>0 & i<=(tablCont.length-2)){// si es entre el segundo y el penultimo
        resuCuenObje(
          b,
          nombre,
          cur,
          '',
          '',
          '',
          '',
          '',
          ''
        );
        acumulador=acumulador+cod;
      };
      if(i==(tablCont.length-1)){// si es el ultimo
        if(f == 'uno'||f == 'tres'||f == 'cinco'){
          acumulador=acumulador+cod;
          resuCuenObje(
            b,
            nombre,
            cur,
            fg.moneyToCurrency((acumulador).toFixed(2)),
            '',
            '',
            'total',
            'total',
            ''
          );
          return acumulador;
        };
        if(f == 'dos'||f == 'cuatro'||f == 'seis'){
          acumulador = acumulador + cod;
          let subtotal=0;
          let total=0;
          if(f == 'dos'){
            subtotal=acumulador+g;
          }else{
            subtotal = g-acumulador;
          };
          if(f == 'dos'){
            total=parseFloat(h-subtotal);
          }else{
            total=parseFloat(h+subtotal);
          };
          resuCuenObje(
            b,
            nombre,
            cur,
            fg.moneyToCurrency(acumulador.toFixed(2)),
            fg.moneyToCurrency(subtotal.toFixed(2)),
            '',
            'total',
            'total',
            'total'
          );
          if(f == 'dos'){
            (total>0)?
              resuCuenObje(
                b,
                'Ganancia en Operación',
                '',
                '',
                fg.moneyToCurrency(total.toFixed(2)),
                '',
                '',
                '',
                ''
              ):
              resuCuenObje(
                b,
                'Perdida en Operación',
                '',
                '',
                fg.moneyToCurrency(total.toFixed(2)),
                '',
                '',
                '',
                ''
              );
          }else if(f == 'cuatro'){
            (total>0)?
              resuCuenObje(
                b,
                'Ganancia Despues de Ingresos y Gastos Financieros',
                '',
                '',
                fg.moneyToCurrency(total.toFixed(2)),
                '',
                '',
                '',
                ''
              ):
              resuCuenObje(
                b,
                'Perdida Despues de Ingresos y Gastos Financieros',
                '',
                '',
                fg.moneyToCurrency(total.toFixed(2)),
                '',
                '',
                '',
                ''
              );
          }else if(f == 'seis'){
            (total>0)?
              resuCuenObje(
                b,
                'Ganancia Antes de Impuestos y Reservas',
                '',
                '',
                fg.moneyToCurrency(total.toFixed(2)),
                '',
                '',
                '',
                ''
              ):
              resuCuenObje(
                b,
                'Perdida Antes deImpuestos y Reservas',
                '',
                '',
                fg.moneyToCurrency(total.toFixed(2)),
                '',
                '',
                '',
                ''
              );
          };
          return total;
        };
      };
    };
  };
};

/*reCtrl.titulo=(a, b, c, d, e, f)=>{
 * @params {array}  a: estado de resultados
 * @params {string} b: subtitulo
 * @params {string} c: subsubtitulo
 * @params {string} d: nombre
 * @params {string} e: currency
 * @params {number} f: acumulado
*/
reCtrl.titulo1 = (a, b, c, d, e, f)=>{
  reCtrl.resuCuenObje(
    a,
    b, '', '', '',
    'subtitulo', '', '', ''
  );
  reCtrl.resuCuenObje(
    a,
    c, '', '', '',
    'subsubtitulo', '', '', ''
  );
  reCtrl.resuCuenObje(
    a,
    d,
    e,
    fg.moneyToCurrency(f.toFixed(2)), '', '',
    'total',
    'total', '');
};

/*-reCtrl.titulo2 = (a, b, c, d, e, f)=>{
 * @params {array}  a: estado de resultados
 * @params {number} b: subtotal
 * @params {string} c: subsubtitulo
 * @params {string} d: nombre
 * @params {string} e: currency
 * @params {number} f: acumulado
*/
reCtrl.titulo2 = (a, b, c, d, e, f)=>{
  resuCuenObje(
    a,
    c, '', '', '',
    'subsubtitulo', '', '', ''
  );
  resuCuenObje(
    a,
    d,
    e,
    fg.moneyToCurrency(f.toFixed(2)),
    fg.moneyToCurrency(b.toFixed(2)), '',
    'total',
    'total',
    'total'
  );
};
