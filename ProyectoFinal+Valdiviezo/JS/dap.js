//--------------------------------------PROYECTO: SIMULADOR DEPOSITO A PLAZO-------------------------------------//

class DepositoPlazoFijo {
  constructor(monto, plazo) {
    this.monto = monto;
    this.plazo = plazo;
  }

  async fetchTasas() {
    const response = await fetch('./tasas.json');
    const data = await response.json();
    const tasas = data.tasas;
    return { tasas };
  }

  async valorFinal() {
    const { tasas } = await this.fetchTasas();
    const dap = this.monto * Math.pow(1 + (tasas[`dap_${this.plazo}`] / 100) / 365, this.plazo);
    return { valorFinal: "$" + dap.toFixed(2) };
  }
}

const button = document.getElementById("SIMULACION_DAP");
button.addEventListener("click", async () => {
  let montoInput = document.getElementById("Monto");
  let plazoInput = document.getElementById("Plazo");

  function Validation(value, type) {
    if (type === "monto") {
      if (isNaN(value)) {
        Swal.fire({
          title:'Monto inválido!',
          text: 'Por favor ingrese un monto válido',
          icon: 'error',
          confirmButtonText: 'Continuar'
        });
        return false;
      }
      return value;
    }

    if (type === "plazo") {
      if (isNaN(value) || ![30, 60, 90, 180, 365].includes(parseInt(value))) {
        Swal.fire({
          title: 'Plazo inválido!',
          text: 'Por favor solo ingrese uno de los siguientes plazos en dias: 30, 60, 90, 180, 365',
          icon: 'error',
          confirmButtonText: 'Continuar'
        });
        return false;
      }
      return value;
    }
  }

  let monto = Validation(montoInput.value, "monto");
  let plazo = Validation(plazoInput.value, "plazo");

  if (monto && plazo) {
    const SIMULACION_DAP = new DepositoPlazoFijo(monto, plazo);
    const { tasas } = await SIMULACION_DAP.fetchTasas();
    const result = await SIMULACION_DAP.valorFinal();

    console.log("Resultado de la Simulación es " + result.valorFinal);
    localStorage.setItem('Resultado de la Simulación es', JSON.stringify(result));

    // Despliegue Chart

    const chartDiv = document.getElementById('chart');
    const chartData = [{
      x: Array.from({ length:(plazo + 1)}, (_, i) => i + 1),
      y: Array.from({ length:(plazo)}, (_, i) =>
        SIMULACION_DAP.monto * Math.pow(1 + (tasas[`dap_${SIMULACION_DAP.plazo}`] / 100) / 365, SIMULACION_DAP.plazo / 365 * (i + 1))),
        max: SIMULACION_DAP.valorFinal(),
      x: {
            min: Math.trunc(SIMULACION_DAP.monto),
            max: (SIMULACION_DAP.valorFinal()),
      type: 'scatter',
      mode: 'lines',
      line: { color: 'rgba(75, 192, 192, 1)' },
      fill: 'tozeroy',
  }}];

    Plotly.newPlot(chartDiv, chartData);

    const resultDiv = document.getElementById('simulationResult');
    resultDiv.innerHTML = 'El resultado de la simulación es: ' + result.valorFinal;

    montoInput.value = "";
    plazoInput.value = "";
  }
});
