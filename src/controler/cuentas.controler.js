const nomenc = require("./json/nomenclatura.json");
const cuentas=[];
const cuentasCtrl={};
let cuentaCtrl={};
//funciones
cuentasCtrl.recorreYAsigna =(origen, destino)=>{
  for(let i=0; i <=(origen.length - 1); i++){
      destino.push(origen[i]);
  };
};

//variables
cuentasCtrl.balanActiCorriDisp=[];
cuentasCtrl.balanActiCorriExig=[];
cuentasCtrl.balanActiCorriReal=[];
cuentasCtrl.balanActiNoCorriFijo=[];
cuentasCtrl.balanActiNoCorriInta=[];
cuentasCtrl.balanActiNoCorriDife=[];
cuentasCtrl.balanPasiCorri=[];
cuentasCtrl.balanPasiNoCorri=[];
cuentasCtrl.balanPatrCapi=[];
cuentasCtrl.resulIngr=[];
cuentasCtrl.resulCostoVentas=[];
cuentasCtrl.resulGtosOperDist=[];
cuentasCtrl.resulGtosOperAdmi=[];
cuentasCtrl.resulIngFina=[];
cuentasCtrl.resulGtosFina=[];
cuentasCtrl.resulOtroGtos=[];
cuentasCtrl.resulOtroIngr=[];

cuentasCtrl.recorreYAsigna(nomenc.nivel1[0].nivel2[0].nivel3[0].nivel4[0].nivel5, cuentasCtrl.balanActiCorriDisp);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[0].nivel2[0].nivel3[0].nivel4[1].nivel5, cuentasCtrl.balanActiCorriExig);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[0].nivel2[0].nivel3[0].nivel4[2].nivel5, cuentasCtrl.balanActiCorriReal);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[0].nivel2[0].nivel3[1].nivel4[0].nivel5, cuentasCtrl.balanActiNoCorriFijo);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[0].nivel2[0].nivel3[1].nivel4[1].nivel5, cuentasCtrl.balanActiNoCorriInta);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[0].nivel2[0].nivel3[1].nivel4[2].nivel5, cuentasCtrl.balanActiNoCorriDife);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[0].nivel2[1].nivel3[0].nivel4, cuentasCtrl.balanPasiCorri);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[0].nivel2[1].nivel3[1].nivel4, cuentasCtrl.balanPasiNoCorri);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[0].nivel2[2].nivel3, cuentasCtrl.balanPatrCapi);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[1].nivel2[0].nivel3, cuentasCtrl.resulIngr);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[1].nivel2[1].nivel3, cuentasCtrl.resulCostoVentas);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[1].nivel2[2].nivel3[0].nivel4, cuentasCtrl.resulGtosOperDist);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[1].nivel2[2].nivel3[1].nivel4, cuentasCtrl.resulGtosOperAdmi);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[1].nivel2[3].nivel3, cuentasCtrl.resulIngFina);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[1].nivel2[4].nivel3, cuentasCtrl.resulGtosFina);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[1].nivel2[5].nivel3, cuentasCtrl.resulOtroGtos);

cuentasCtrl.recorreYAsigna(nomenc.nivel1[1].nivel2[6].nivel3, cuentasCtrl.resulOtroIngr);

//nomenclatura
cuentasCtrl.cuentas=cuentas.concat(cuentasCtrl.balanActiCorriDisp, cuentasCtrl.balanActiCorriExig, cuentasCtrl.balanActiCorriReal, cuentasCtrl.balanActiNoCorriFijo, cuentasCtrl.balanActiNoCorriInta, cuentasCtrl.balanActiNoCorriDife, cuentasCtrl.balanPasiCorri, cuentasCtrl.balanPasiNoCorri, cuentasCtrl.balanPatrCapi, cuentasCtrl.resulIngr, cuentasCtrl.resulCostoVentas, cuentasCtrl.resulGtosOperDist, cuentasCtrl.resulGtosOperAdmi, cuentasCtrl.resulIngFina, cuentasCtrl.resulGtosFina, cuentasCtrl.resulOtroGtos, cuentasCtrl.resulOtroIngr);

module.exports = cuentasCtrl,cuentaCtrl;
