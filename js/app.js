document.getElementById('idealWeightForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const sexo = document.getElementById('sexo').value;
    const edad = document.getElementById('edad').value;
    const pesoActual = document.getElementById('pesoActual').value;
    const estatura = document.getElementById('estatura').value;

    // Calcular peso ideal según Lorentz
    let pesoIdeal;
    if (sexo === 'M') {
        pesoIdeal = estatura - 100 - ((estatura - 150) / 4);
    } else if (sexo === 'F') {
        pesoIdeal = estatura - 100 - ((estatura - 150) / 2.5);
    }

    // Calcular IMC
    const estaturaM = estatura / 100;
    const imc = pesoActual / (estaturaM * estaturaM);

    // Clasificación del IMC
    let clasificacionIMC;
    let imcBadgeClass;
    if (imc < 18.5) {
        clasificacionIMC = 'Bajo peso';
        imcBadgeClass = 'bg-warning';
    } else if (imc >= 18.5 && imc < 24.9) {
        clasificacionIMC = 'Peso normal';
        imcBadgeClass = 'bg-success';
    } else if (imc >= 25 && imc < 29.9) {
        clasificacionIMC = 'Sobrepeso';
        imcBadgeClass = 'bg-warning';
    } else if (imc >= 30 && imc < 34.9) {
        clasificacionIMC = 'Obesidad I';
        imcBadgeClass = 'bg-danger';
    } else if (imc >= 35 && imc < 39.9) {
        clasificacionIMC = 'Obesidad II';
        imcBadgeClass = 'bg-danger';
    } else if (imc >= 40) {
        clasificacionIMC = 'Obesidad III';
        imcBadgeClass = 'bg-danger';
    }

    // Calcular peso a perder o ganar
    const pesoDiferencia = pesoActual - pesoIdeal;
    const pesoAjuste = Math.abs(pesoDiferencia.toFixed(2)) + ' kg ';
    const ajusteTexto = pesoDiferencia > 0 ? 'a perder' : 'a ganar';
    const badgeClass = pesoDiferencia > 0 ? 'bg-danger' : 'bg-success';

    // Mostrar resultados
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('d-none');
    resultDiv.innerHTML = `
        <div class="result-header">Resultados:</div>
        <div class="result-item"><strong>Sexo:</strong> ${sexo === 'M' ? 'Masculino' : 'Femenino'}</div>
        <div class="result-item"><strong>Edad:</strong> ${edad} años</div>
        <div class="result-item"><strong>Peso Actual:</strong> ${pesoActual} kg</div>
        <div class="result-item"><strong>Estatura:</strong> ${estatura} cm</div>
        <div class="result-item"><strong>Peso Ideal:</strong> <span class="badge rounded-pill bg-primary">${pesoIdeal.toFixed(1)} kg</span></div>
        <div class="result-item"><strong>IMC:</strong> <span class="badge rounded-pill ${imcBadgeClass}">${imc.toFixed(1)} (${clasificacionIMC})</span></div>
        <div class="result-item"><strong>Peso ${ajusteTexto}:</strong> <span class="badge rounded-pill ${badgeClass}">${pesoAjuste}</span></div>
    `;
});
