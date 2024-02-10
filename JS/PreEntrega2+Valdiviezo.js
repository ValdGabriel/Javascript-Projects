//--------------------------------------PROYECTO: SIMULADOR DEPOSITO A PLAZO-------------------------------------//

let continuar;
const TASA_365 = 5; // 5% Tasa nominal anual

class DepositoPlazoFijo {
  constructor(monto, plazo) {
    this.monto = monto;
    this.plazo = plazo;
  }
  ValorFinal() {
    let dap = this.monto * (Math.pow(1 + (TASA_365 / 100), (this.plazo / 365)));
    return "$" + dap.toFixed(2);
  }
}

const SIMULACION_DAP = new DepositoPlazoFijo();
console.log(SIMULACION_DAP.ValorFinal());

do {
  let monto = Validation(prompt("Ingrese el monto a invertir en Pesos"));
  let plazo = Validation(prompt("Ingrese plazo (De 30 a 365 días)"));
  if (plazo < 30 || plazo > 365) {
    alert("Plazo inválido. Por favor, ingrese un plazo entre 30 y 365 días.");
    continue;
  }
  const SIMULACION_DAP = new DepositoPlazoFijo(monto, plazo);
  alert("Resultado de la Simulación es " + SIMULACION_DAP.ValorFinal())
  console.log("Resultado de la Simulación es " + SIMULACION_DAP.ValorFinal());
  continuar = prompt("¿Desea realizar otra simulación si/no?").toLocaleLowerCase();
} while (continuar === "si");

function Validation(monto, plazo) {
  if ((isNaN(monto)) || (plazo < 30 || plazo > 365)) {
    alert("Dato inválido. Por favor, ingrese un valor numérico.");
    return Validation(prompt("Ingrese el monto a invertir en Pesos"));
  }
  return parseFloat(monto);
}