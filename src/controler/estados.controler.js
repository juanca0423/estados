const {cuentas, balanActiCorriDisp, balanActiCorriExig,balanActiCorriReal,balanActiNoCorriFijo,balanActiNoCorriInta,balanActiNoCorriDife,balanPasiCorri,balanPasiNoCorri,balanPatrCapi,resulIngr, resulCostoVentas, resulGtosOperDist,resulGtosOperAdmi,resulIngFina,resulGtosFina,resulOtroGtos,resulOtroIngr,} = require("./cuentas.controler");
const {hojadetrabajo} =require("./hojatrabajo")
var MoneyFormating = require('money-formating');
var formating = new MoneyFormating();
const efCtrl = {}
const nom =[];

efCtrl.renderEstados = (req, res)=>{
  res.render("ef/index", {cuentas});
};

efCtrl.renderEF = (req, res)=>{
  let n=req.body;        let hTIni=[];
  let hTFin=[];          let eRini=[];
  let balaGeneini=[];    let balaGenefin=[];
  let eRfin=[];          let tabla=true;
  let tabla1=true;       let tabla2=true;
  let tabla3=true;       let gananciaI=0;
  let gananciaF=0;       let total=0;
  let totalF=0;

  function resuVentBrut(estaResu,ind){
    let codven=parseFloat(n[`${resulIngr[0].codigo}${ind}`]);
    let coddev=parseFloat(n[`${resulIngr[1].codigo}${ind}`]);
    let nomven=resulIngr[0].nombre;let nomdev=resulIngr[1].nombre;
    let ventasBrutas=parseFloat(codven-coddev);
    resuCuenObje(estaResu,'Ingresos','','','','subtitulo','','','');
    if(codven){
      resuCuenObje(estaResu,nomven,'','', formating.moneyToCurrency(codven.toFixed(2)),'','','','');
      if(coddev){
        resuCuenObje(estaResu,nomdev,'','', formating.moneyToCurrency(coddev.toFixed(2)),'','','','total');
        resuCuenObje(estaResu,'Ventas Brutas','','',formating.moneyToCurrency(ventasBrutas.toFixed(2)),'','','','');
        return ventasBrutas;
      }else{
        resuCuenObje(estaResu,'Ventas Brutas','','',formating.moneyToCurrency(ventasBrutas.toFixed(2)),'','','','');
        return ventasBrutas;
      };
    }else{
      if(coddev){
        resuCuenObje(estaResu,nomdev,'','',formating.moneyToCurrency(coddev.toFixed(2)),'','','','total');
        resuCuenObje(estaResu,'Perdida Ventas Brutas','','',formating.moneyToCurrency(ventasBrutas.toFixed(2)),'','','' ,'');
      };
      return ventasBrutas;
    };
  };

  function resuMercaderias1(estaResu,ind){
    let merc1=parseFloat(n[`${ resulCostoVentas[0].codigo }${ind}`]);
    let nomb=resulCostoVentas[0].nombre;
    resuCuenObje(estaResu,'Costo de Ventas','','','','subtitulo','','','');
    if(merc1){
      resuCuenObje(estaResu,nomb,'',formating.moneyToCurrency(merc1.toFixed(2)),'','','','','');
      return merc1;
    }else{
      return merc1=0;
    };
  };

  function resuCompBrut(estaResu,ind){
    let comp=parseFloat(n[`${ resulCostoVentas[1].codigo }${ind}`]);
    let gastComp=parseFloat(n[`${resulCostoVentas[2].codigo}${ind}`]);
    let nomComp=resulCostoVentas[1].nombre;
    let nomGastComp=resulCostoVentas[2].nombre;
    if(comp){
      if(gastComp){
        resuCuenObje(estaResu,nomComp,formating.moneyToCurrency(comp.toFixed(2)),'','','','','','');
        resuCuenObje(estaResu,nomGastComp,formating.moneyToCurrency(gastComp.toFixed(2)),'','','','total','','');
        resuCuenObje(estaResu,'Compras Brutas',formating.moneyToCurrency((comp+gastComp).toFixed(2)),'','','','','','');
        return comp+gastComp;
      }else{
        resuCuenObje(estaResu,'Compras Brutas',formating.moneyToCurrency(comp.toFixed(2)),'','','','','','');
        return comp;
      };
    }else{
      if(gastComp){
        resuCuenObje(estaResu,'Compras Brutas',formating.moneyToCurrency(gastCompras.toFixed(2)),'','','','','','');
        return gastComp
      }else{
        return 0;
      };
    };
  };

  function resuCompNeta(estaResu,ind,compbrut){
    let devoComp=parseFloat(n[`${ resulCostoVentas[3].codigo}${ind}`]);
    let nomDevoComp=resulCostoVentas[3].nombre;
    let compNetas=compbrut-devoComp;
    if(compbrut==0){
      if(devoComp){
        resuCuenObje(estaResu,'Compras Netas','',formating.moneyToCurrency(compNetas.toFixed(2)),'','','','total','');
        return compNetas;
      }else{
        return 0;
      };
    }else{
      if(devoComp){
        resuCuenObje(estaResu,nomDevoComp,formating.moneyToCurrency(devoComp.toFixed(2)),'','','','total','','');
        resuCuenObje(estaResu,'Compras Netas','',formating.moneyToCurrency(compNetas.toFixed(2)),'','','','total','');
        return compNetas;
      }else{
        resuCuenObje(estaResu,'Compras Netas','',formating.moneyToCurrency(compNetas.toFixed(2)),'','','','total','');
        return compNetas;
      };
    };
  };

  function mercDisp(estaResu,ind,merc1,compNetas){
    let mercDisp=merc1+compNetas;
    if(mercDisp==0){
      return mercDisp;
    }else{
      resuCuenObje(estaResu,'Mercaderias Diponibles','',formating.moneyToCurrency( mercDisp.toFixed(2)),'','','','','');
      return mercDisp;
    };
  };

  function costVent(estaResu,ind,mercDisp){
    let merc2=parseFloat(n[`${resulCostoVentas[4].codigo}${ind}`]);
    let nomMerc2=resulCostoVentas[4].nombre;
    let costVent=mercDisp-merc2;
    if(merc2){
      resuCuenObje(estaResu, nomMerc2, '', formating.moneyToCurrency(merc2.toFixed(2)), '', '', '', 'total', '');
      resuCuenObje(estaResu, 'Costo de Ventas', '', '',formating.moneyToCurrency(costVent.toFixed(2)), '', '', '','total');
      return costVent;
    }else{
      resuCuenObje(estaResu, 'Costo de Ventas', '', '',formating.moneyToCurrency(costVent.toFixed(2)), '', '', '','total');
      return costVent;
    };
  };

  function margBrut(estaResu,ventBrut,costVent){
    let margBrut=parseFloat(ventBrut-costVent);
    resuCuenObje(estaResu, ((margBrut>0)?'Margen Bruto':'Perdida Bruta'),'','',formating.moneyToCurrency(margBrut.toFixed(2)),'','','','');
    return margBrut;
  };;

  function resuBloq(tablCont,estaResu,ind,subtitulo,subsubtitulo,a,b,c){
    let acumulador=0;
    let tablTemp=[];
    for(let i=0;i<=(tablCont.length-1);i++){
      let cod=parseFloat(n[`${tablCont[i].codigo}${ind}`]);
      let nombre=tablCont[i].nombre;
      if(cod){
        tablTemp.push({
          codigo:tablCont[i].codigo,
          nombre:nombre,
          valor:cod
        });
      };
    };
    for(let i=0;i<=(tablTemp.length-1);i++){
      let cod=parseFloat(n[`${tablTemp[i].codigo}${ind}`]);
      let nombre=tablTemp[i].nombre;

      if(tablTemp.length==1){
        if(a == 'uno'||a == 'tres'||a == 'cinco'){
          acumulador=acumulador+cod;
          resuCuenObje(
            estaResu,
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
            estaResu,
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
            estaResu,
            nombre,
            formating.moneyToCurrency(tablTemp[i].valor.toFixed(2)),
            formating.moneyToCurrency(acumulador.toFixed(2)),
            '',
            '',
            'total',
            'total',
            ''
          );
          return acumulador;
        };
        if(a == 'dos'||a == 'cuatro'||a == 'seis'){
          acumulador=acumulador+cod;
          let subtotal=0;
          let total=0;
          if(a=='dos'){
            subtotal=acumulador+b;
          }else{
            subtotal=b-acumulador;
          };

          if(a=='dos'||a=='seis'){
            total=parseFloat(c-subtotal);
          }else{
            total=parseFloat(c+subtotal);
          };
          resuCuenObje(
            estaResu,
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
            estaResu,
            nombre,
            formating.moneyToCurrency(tablTemp[i].valor.toFixed(2)),
            formating.moneyToCurrency(acumulador.toFixed(2)),
            formating.moneyToCurrency(subtotal.toFixed(2)),
            '',
            'total',
            'total',
            'total'
          );
          if(a=='dos'){
            (acumulador>0)?
              resuCuenObje(
                estaResu,
                'Ganancia en Operación',
                '',
                '',
                formating.moneyToCurrency(total.toFixed(2)),
                '',
                '',
                '',
                ''
              ):
              resuCuenObje(
                estaResu,
                'Perdida en Operación',
                '',
                '',
                formating.moneyToCurrency(total.toFixed(2)),
                '',
                '',
                '',
                ''
              );
          }else if(a=='cuatro'){
            (acumulador>0)?
              resuCuenObje(
                estaResu,
                'Ganancia Despues de Ingresos y Gastos Financieros',
                '',
                '',
                formating.moneyToCurrency(total.toFixed(2)),
                '',
                '',
                '',
                ''
              ):
              resuCuenObje(
                estaResu,
                'Perdida Despues de Ingresos y Gastos Financieros',
                '',
                '',
                formating.moneyToCurrency(total.toFixed(2)),
                '',
                '',
                '',
                ''
              );
          }else if(a=='seis'){
            (acumulador>0)?
              resuCuenObje(
                estaResu,
                'Ganancia Antes de Impuestos y Reservas',
                '',
                '',
                formating.moneyToCurrency(total.toFixed(2)),
                '',
                '',
                '',
                ''
              ):
              resuCuenObje(
                estaResu,
                'Perdida Antes de Impuestos y Reservas',
                '',
                '',
                formating.moneyToCurrency(total.toFixed(2)),
                '',
                '',
                '',
                ''
              );
          };
          return total;
        };
      }else{
        if(i==0){
          if(a == 'uno'||a == 'tres'||a == 'cinco'){
        resuCuenObje(
          estaResu,
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
          estaResu,
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
          estaResu,
          nombre,
          formating.moneyToCurrency( tablTemp[i].valor.toFixed(2)),
          '',
          '',
          '',
          '',
          '',
          ''
        );
        acumulador=acumulador+cod;
          };
          if(a == 'dos'||a == 'cuatro'||a == 'seis'){
          resuCuenObje(
            estaResu,
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
            estaResu,
            nombre,
            formating.moneyToCurrency(tablTemp[i].valor.toFixed(2)),
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
        if(i>0&i<=(tablCont.length-2)){
        resuCuenObje(
          estaResu,
          nombre,
          formating.moneyToCurrency(tablTemp[i].valor.toFixed(2)),
          '',
          '',
          '',
          '',
          '',
          ''
        );
        acumulador=acumulador+cod;
        };
        if(i==(tablCont.length-1)){
          if(a == 'uno'||a == 'tres'||a == 'cinco'){
            acumulador=acumulador+cod;
            resuCuenObje(
              estaResu,
              nombre,
              formating.moneyToCurrency(tablTemp[i].valor.toFixed(2)),
              formating.moneyToCurrency((acumulador).toFixed(2)),
              '',
              '',
              'total',
              'total',
              ''
            );
            return acumulador;
          };
          if(a == 'dos'||a == 'cuatro'||a == 'seis'){
            acumulador=acumulador+cod;
            let subtotal=0;
            let total=0;
            if(a=='dos'){
              subtotal=acumulador+b;
            }else{
              subtotal=b-acumulador;
            };
            if(a=='dos'){
              total=parseFloat(c-subtotal);
            }else{
              total=parseFloat(c+subtotal);
            };
            resuCuenObje(
              estaResu,
              nombre,
              formating.moneyToCurrency(tablTemp[i].valor.toFixed(2)),
              formating.moneyToCurrency(acumulador.toFixed(2)),
              formating.moneyToCurrency(subtotal.toFixed(2)),
              '',
              'total',
              'total',
              'total'
            );
            if(a=='dos'){
              (total>0)?
                resuCuenObje(
                  estaResu,
                  'Ganancia en Operación',
                  '',
                  '',
                  formating.moneyToCurrency(total.toFixed(2)),
                  '',
                  '',
                  '',
                  ''
                ):
                resuCuenObje(
                  estaResu,
                  'Perdida en Operación',
                  '',
                  '',
                  formating.moneyToCurrency(total.toFixed(2)),
                  '',
                  '',
                  '',
                  ''
                );
            }else if(a=='cuatro'){

              (total>0)?
                resuCuenObje(
                  estaResu,
                  'Ganancia Despues de Ingresos y Gastos Financieros',
                  '',
                  '',
                  formating.moneyToCurrency(total.toFixed(2)),
                  '',
                  '',
                  '',
                  ''
                ):
                resuCuenObje(
                  estaResu,
                  'Perdida Despues de Ingresos y Gastos Financieros',
                  '',
                  '',
                  formating.moneyToCurrency(total.toFixed(2)),
                  '',
                  '',
                  '',
                  ''
                );
            }else if(a=='seis'){
              (total>0)?
                resuCuenObje(
                  estaResu,
                  'Ganancia Antes de Impuestos y Reservas',
                  '',
                  '',
                  formating.moneyToCurrency(total.toFixed(2)),
                  '',
                  '',
                  '',
                  ''
                ):
                resuCuenObje(
                  estaResu,
                  'Perdida Antes de Impuestos y Reservas',
                  '',
                  '',
                  formating.moneyToCurrency(total.toFixed(2)),
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

  function resuCuenObje(estaResu,nomb,val1,val2,val3,clas0,clas1,clas2,clas3){
    estaResu.push({nombre:nomb, clase0:clas0, col1:val1, clase1:clas1, col2:val2, clase2:clas2, col3:val3, clase3:clas3});
  };

  function balaBloq(tablCont,estaResu,ind,subtitulo,subsubtitulo,a,b,c){
    let acumulador=0;let tablTemp=[];
    for(let i=0;i<=(tablCont.length-1);i++){
      let cod=parseFloat(n[`${tablCont[i].codigo}${ind}`]);
      let nombre=tablCont[i].nombre;
      if(cod){
        tablTemp.push({
          codigo:tablCont[i].codigo,
          nombre:nombre,
          valor:cod
        });
      };
    };

    for(let i=0;i<=(tablTemp.length-1);i++){
      let cod=tablTemp[i].valor;
      let nombre=tablTemp[i].nombre;
      let codigo=tablTemp[i].codigo;
      if(tablTemp.length==0){
        if(a == 'uno'||a == 'tres'||a == 'cinco'){
          acumulador=acumulador+cod;
          balaCuenObje(
            estaResu,
            subtitulo,
            '','','',
            'subtitulo',
            '','',''
          );
          balaCuenObje(
            estaResu,
            subsubtitulo,
            '','','',
            'subsubtitulo',
            '','',''
          );
          balaCuenObje(
            estaResu,
            nombre,
            tablTemp[i].valor.toFixed(2),
            acumulador.toFixed(2),
            '','',
            'total',
            'total',
            ''
          );
          return acumulador;
        };

        if(a=='dos'){
          acumulador=acumulador+cod;
          let subtotal=acumulador+b;
          let total=parseFloat(c-subtotal);
          balaCuenObje(
            estaResu,
            subsubtitulo,
            '','','',
            'subsubtitulo',
            '','',''
          );
          balaCuenObje(
            estaResu,
            nombre,
            tablTemp[i].valor.toFixed(2),
            acumulador.toFixed(2),
            subtotal.toFixed(2),
            '',
            'total',
            'total',
            'total');
          (acumulador>0)?
            balaCuenObje(
              estaResu,
              'Ganancia en Operación',
              '','',
              total.toFixed(2),
              '','','',''
            ):
            balaCuenObje(
              estaResu,
              'Perdida en Operación',
              '','',
              total.toFixed(2),
              '','','',''
            );
          return total;
        };
      }else if(tablTemp.length==1){

        if(a=='uno'||a=='tres'||a=='cinco'){
          acumulador=acumulador+cod;
          balaCuenObje(
            estaResu,
            subtitulo,
            '','','',
            'subtitulo',
            '','',''
          );
          balaCuenObje(
            estaResu,
            subsubtitulo,
            '','','',
            'subsubtitulo',
            '','',''
          );
          balaCuenObje(
            estaResu,
            nombre,
            tablTemp[i].valor.toFixed(2),
            acumulador.toFixed(2),
            '','',
            'total',
            'total',''
          );
          return acumulador;
        };

        if(a=='dos'){
          acumulador=acumulador+cod;
          let subtotal=acumulador+b;
          let total=parseFloat(c-subtotal);
          balaCuenObje(
            estaResu,
            subsubtitulo,
            '','','',
            'subsubtitulo',
            '','',''
          );
          balaCuenObje(
            estaResu,
            nombre,
            tablTemp[i].valor.toFixed(2),
            acumulador.toFixed(2),
            subtotal.toFixed(2),'',
            'total',
            'total',
            'total'
          );
          (acumulador>0)?
            balaCuenObje(
              estaResu,
              'Ganancia en Operación',
              '','',
              total.toFixed(2),
              '','','',''
            ):
            balaCuenObje(
              estaResu,
              'Perdida en Operación',
              '','',
              total.toFixed(2),
              '','','',''
            );
          return total;
        };
      };
    };
  };

  function balaCuenObje(balaGene,nomb,val1,val2,val3,clas0,clas1,clas2,clas3){
    balaGene.push({
      nombre:nomb,
        clase0:clas0,
        col1:val1,
        clase1:clas1,
        col2:val2,
        clase2:clas2,
        col3:val3,
        clase3:clas3
    });
  };

  hojadetrabajo(n, hTIni, hTFin);
  let ventasBrutasI=resuVentBrut(eRini,'ini');
  let mercaderias1I=resuMercaderias1(eRini,'ini');
  let comprasBrutasI=resuCompBrut(eRini,'ini');
  let comprasNetasI=resuCompNeta(eRini,'ini',comprasBrutasI);
  let mercDispI=mercDisp(eRini,'ini',mercaderias1I,comprasNetasI);
  let costVentI=costVent(eRini,'ini',mercDispI);
  let margBrutI=margBrut(eRini,ventasBrutasI,costVentI);
  let gastosVentasI=resuBloq(resulGtosOperDist,eRini,'ini','Gastos de Operación','Gastos de Distribución','uno',0,0);
  let gastosAdministracionI = resuBloq(resulGtosOperAdmi, eRini, 'ini', '','Gastos de Administración', 'dos', gastosVentasI, margBrutI);
  let ingresosFinancierosI=resuBloq(resulIngFina, eRini, 'ini', 'Ingresos y Gastos Financieros', 'Gastos Financieros', 'tres', 0, 0);
  let gastosFinancierosI=resuBloq(resulGtosFina, eRini, 'ini', '', 'Ingresos Financieros', 'cuatro' ,ingresosFinancierosI,gastosAdministracionI);
  let otrosGastosI=resuBloq(resulOtroGtos,eRini,'ini','Otros Gastos e Ingresos','Otros Gastos','cinco',0,0);
  let OtrosIngresosI=resuBloq(resulOtroIngr,eRini,'ini','','Ingresos Financieros','seis',otrosGastosI,gastosFinancierosI);
  let actiCorriDispI=balaBloq(balanActiCorriDisp,balaGeneini,'ini','Activo','Corriente','uno',0,0);


  let ventasBrutasF=resuVentBrut(eRfin,'fin');
  let mercaderias1F=resuMercaderias1(eRfin,'fin');
  let comprasBrutasF=resuCompBrut(eRfin,'fin');
  let comprasNetasF=resuCompNeta(eRfin,'fin',comprasBrutasF);
  let mercDispF=mercDisp(eRfin,'fin',mercaderias1F,comprasNetasF);
  let costVentF=costVent(eRfin,'fin',mercDispF);
  let margBrutF=margBrut(eRfin,ventasBrutasF,costVentF);
  let gastosVentasF=resuBloq(resulGtosOperDist,eRfin,'fin','Gastos de Operación','Gastos de Distribución','uno',0,0);
  let gastosAdministracionF=resuBloq(resulGtosOperAdmi,eRfin,'fin','','Gastos de Administración','dos',gastosVentasF,margBrutF);
  let ingresosFinancierosF=resuBloq(resulIngFina,eRfin,'fin','Ingresos y Gastos Financieros','Gastos Financieros','tres',0,0);
  let gastosFinancierosF=resuBloq(resulGtosFina,eRfin,'fin','','Ingresos Financieros','cuatro',ingresosFinancierosF,gastosAdministracionF);
  let otrosGastosF=resuBloq(resulOtroGtos,eRfin,'fin','Otros Gastos e Ingresos','Otros Gastos','cinco',0,0);
  let OtrosIngresosF=resuBloq(resulOtroIngr,eRfin,'fin','','Ingresos Financieros','seis',otrosGastosF,gastosFinancierosF);
  let actiCorriDispF=balaBloq(balanActiCorriDisp, balaGenefin,'fin','Activo','Corriente','uno',0,0);

  res.render("ef/estados",{hTIni, hTFin, tabla,tabla1,tabla2,tabla3,eRini,eRfin,balaGeneini,balaGenefin});
};

module.exports = efCtrl;
