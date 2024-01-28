// Proyecto: Simulador Deposito Plazo

let continuar
const TASA_365 = 0.05  /// 5% Tasa nominal anual
do {
 class DepositoPlazoFijo {
  constructor(monto, plazo) {
    if (!isNaN(monto) || !isNaN(plazo)) {
      this.ValorFinal = function () {
        let dap = this.monto * (Math.pow(1 + TASA_365 / 1), (this.plazo / 365));
        return "$" + dap;  
      };
      continuar = prompt("¿Desea realizar otra simulación si/no?").toLocaleLowerCase();
    } else {
      alert("Ingrese un monto valido");
    }
  }
 }
 const SIMULACION_DAP = new DepositoPlazoFijo(200000, 180);
 console.log(SIMULACION_DAP);
 console.log(SIMULACION_DAP.ValorFinal())
}
while (continuar === "si") 


console.log("Resultado de la Simulación es $ " + DepositoPlazoFijo())

  


///------------------------------------------------------------------------------------------------

///------------------------------1.0------------------------------------------------------------------------

//let = continuar;
//const TASA_365 = 0.05  /// 5% Tasa nominal anual

//do{
//  class DepositoPlazoFijo {
//   constructor(monto,plazo) {
//   this.monto = parseFloat(prompt("Ingrese Monto a Invertir en Pesos"));
//   this.plazo = parseInt(prompt("Ingrese plazo (De 30 a 365 días)"));
//}
  //   if(!isNaN(monto) || !isNaN(plazo)) {
  //         this.ValorFinal = function(){
  //         let dap = this.monto * Math.pow(1 + (TASA_365/1), this.plazo/365);
  //          return "$" + dap}
  //         }
  // continuar = prompt ("¿Desea realizar otra simulación? (si/no)").toLowerCase();
  //  else{
  //         alert ("Ingrese un monto valido");
        // }   
        
    // }        
//} while (continuar === "si") 
//console.log("Resultado de la Simulación es $")

// const carousel = new bootstrap.Carousel('#myCarousel')