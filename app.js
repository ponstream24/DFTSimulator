// app.js

// DFT calculation function
function dft(signal) {
  const N = signal.length;
  const real = new Array(N).fill(0);
  const imag = new Array(N).fill(0);

  for (let k = 0; k < N; k++) {
    for (let n = 0; n < N; n++) {
      const angle = (2 * Math.PI * k * n) / N;
      real[k] += signal[n] * Math.cos(angle);
      imag[k] -= signal[n] * Math.sin(angle);
    }
  }

  return { real, imag };
}

// Signal generation function
function generateSignal(waveform, frequency, samples) {
  const signal = new Array(samples).fill(0);
  const sampleRate = samples;
  const angularFrequency = 2 * Math.PI * frequency / sampleRate;

  switch (waveform) {
    case 'sine':
      for (let i = 0; i < samples; i++) {
        signal[i] = Math.sin(angularFrequency * i);
      }
      break;
    case 'square':
      for (let i = 0; i < samples; i++) {
        signal[i] = Math.sign(Math.sin(angularFrequency * i));
      }
      break;
    case 'triangle':
      for (let i = 0; i < samples; i++) {
        signal[i] = 2 * Math.abs(2 * (i / sampleRate * frequency - Math.floor(i / sampleRate * frequency + 0.5))) - 1;
      }
      break;
    case 'sawtooth':
      for (let i = 0; i < samples; i++) {
        signal[i] = 2 * (i / sampleRate * frequency - Math.floor(i / sampleRate * frequency + 0.5));
      }
      break;
    case 'composite':
      const frequencies = Array.from(document.querySelectorAll('input[name="frequency[]"]')).map(input => parseFloat(input.value));
      const amplitudes = Array.from(document.querySelectorAll('input[name="amplitude[]"]')).map(input => parseFloat(input.value));

      for (let i = 0; i < samples; i++) {
        for (let j = 0; j < frequencies.length; j++) {
          const angularFreq = 2 * Math.PI * frequencies[j] / sampleRate;
          signal[i] += amplitudes[j] * Math.sin(angularFreq * i);
        }
      }
      break;
    default:
      break;
  }

  return signal;
}

// Event listeners
document.getElementById('waveform').addEventListener('change', (event) => {
  const compositeParams = document.getElementById('compositeParams');
  if (event.target.value === 'composite') {
    compositeParams.style.display = 'block';
  } else {
    compositeParams.style.display = 'none';
  }
});

document.getElementById('addParam').addEventListener('click', () => {
  const paramsContainer = document.getElementById('paramsContainer');
  const paramRow = document.createElement('div');
  paramRow.className = 'field is-horizontal param-row';
  paramRow.innerHTML = `
    <div class="field-body">
      <div class="field">
        <label class="label" for="freq">周波数 (Hz)</label>
        <div class="control">
          <input class="input" type="number" name="frequency[]" value="1" min="1">
        </div>
      </div>
      <div class="field">
        <label class="label" for="amp">振幅</label>
        <div class="control">
          <input class="input" type="number" name="amplitude[]" value="1" min="0">
        </div>
      </div>
      <div class="field">
        <label class="label"></label>
        <div class="control">
          <button class="button is-danger delete-param">削除</button>
        </div>
      </div>
    </div>
  `;
  paramsContainer.appendChild(paramRow);
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-param')) {
    event.target.closest('.param-row').remove();
  }
});

document.getElementById('generateSignal').addEventListener('click', () => {
  // Clear previous data
  document.getElementById('inputSignal').value = '';
  Plotly.purge('outputSignal');
  Plotly.purge('outputDFT');

  const waveform = document.getElementById('waveform').value;
  const frequency = parseFloat(document.getElementById('frequency').value);
  const samples = parseInt(document.getElementById('samples').value, 10);

  const signal = generateSignal(waveform, frequency, samples);

  document.getElementById('inputSignal').value = signal.join(',');

  const traceSignal = {
    x: Array.from({ length: signal.length }, (_, i) => i),
    y: signal,
    type: 'scatter',
  };

  const layoutSignal = {
    title: '生成された信号',
    xaxis: { title: 'サンプル' },
    yaxis: { title: '振幅' },
  };

  Plotly.newPlot('outputSignal', [traceSignal], layoutSignal);
});

document.getElementById('calculateDFT').addEventListener('click', () => {
  const inputSignal = document.getElementById('inputSignal').value;
  const signal = inputSignal.split(',').map(Number);

  if (signal.some(isNaN)) {
    alert('有効な数値をカンマで区切って入力してください。');
    return;
  }

  const { real, imag } = dft(signal);

  const magnitude = real.map((r, i) => Math.sqrt(r * r + imag[i] * imag[i]));

  const traceDFT = {
    x: Array.from({ length: signal.length }, (_, i) => i),
    y: magnitude,
    type: 'scatter',
  };

  const layoutDFT = {
    title: 'DFT振幅スペクトル',
    xaxis: { title: '周波数ビン' },
    yaxis: { title: '振幅' },
  };

  Plotly.newPlot('outputDFT', [traceDFT], layoutDFT);
});

// Set the current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;
