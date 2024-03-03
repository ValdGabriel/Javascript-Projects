//--------------------------------------PROYECTO: SIMULADOR DEPOSITO A PLAZO-------------------------------------//

class DepositoPlazoFijo {
  constructor(monto, plazo, tasa) {
    this.monto = monto;
    this.plazo = plazo;
    this.tasa = tasa;
  }

  ValorFinal() {
    let dap = this.monto * Math.pow(1 + (this.tasa / 100) / 365, this.plazo);
    return "$" + dap.toFixed(2);
  }
}

const button = document.getElementById("SIMULACION_DAP");
button.addEventListener("click", function() {
  let montoInput = document.getElementById("Monto");
  let monto = Validation(montoInput.value, "monto");
  let plazoInput = document.getElementById("Plazo");
  let plazo = Validation(plazoInput.value, "plazo");
  let tasaInput = document.getElementById("Tasa");
  let tasa = Validation(tasaInput.value, "tasa");

  function Validation(value, type) {
    if (type === "monto") {
      if (isNaN(value)) {
        Swal.fire({
          title: 'Monto inválido!',
          text: 'Por favor ingrese un monto válido',
          icon: 'error',
          confirmButtonText: 'Continuar'
        });
        return false;
      }
      return value;
    }
    if (type === "plazo") {
      if (isNaN(value) || value < 30 || value > 365) {
        Swal.fire({
          title: 'Plazo inválido!',
          text: 'Por favor ingrese un plazo entre 30 y 365 días',
          icon: 'error',
          confirmButtonText: 'Continuar'
        });
        return false;
      }
      return value;
    }
    if (type === "tasa") {
      if (isNaN(value)) {
        Swal.fire({
          title: 'Tasa inválida!',
          text: 'Por favor ingrese una tasa válida',
          icon: 'error',
          confirmButtonText: 'Continuar'
        });
        return false;
      }
      return value;
    }
  }

  if (monto && plazo && tasa) {
    const SIMULACION_DAP = new DepositoPlazoFijo(monto, plazo, tasa);
    localStorage.setItem('Resultado de la Simulación es', JSON.stringify(SIMULACION_DAP.ValorFinal()));
    console.log("Resultado de la Simulación es " + SIMULACION_DAP.ValorFinal());

/// CHART VISUALIZATION
    const GET_CHART_VALUE = JSON.parse(localStorage.getItem('Resultado de la Simulación es'));
    const FINAL_CHART_VALUE = parseFloat(GET_CHART_VALUE);
    const DAILY_CHART_VALUE = Array.from({length: 365}, (_, i) => FINAL_CHART_VALUE / 365 * (i + 1));

    const DESPLEGARCHART = document.getElementById('DapChart').getContext('2d');
    new Chart (DESPLEGARCHART, {
      type: 'line',
      data: {
        labels: Array.from({length: 365}, (_, i) => 'Día ' + i),
        datasets: [{
          label: 'Valor del depósito',
          data: [DAILY_CHART_VALUE],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            min: Math.trunc(SIMULACION_DAP.monto), 
            max: Math.trunc(SIMULACION_DAP.ValorFinal()),
            ticks: {
              stepSize: 1000 
            }
          }
        }
      }
    });

    const resultDiv = document.getElementById('simulationResult');
    resultDiv.innerHTML = 'El resultado de la simulación es: ' + SIMULACION_DAP.ValorFinal();

    montoInput.value = "";
    plazoInput.value = "";
    tasaInput.value = "";
  }
});
