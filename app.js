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
        signal[i] = 2 * (i / sampleRate * frequency - Math.floor(0.5 + i / sampleRate * frequency));
      }
      break;
    case 'composite':
      const params = Array.from(document.querySelectorAll('#paramsContainer input[type="number"]')).reduce((acc, input, index) => {
        if (index % 2 === 0) {
          acc.push({ freq: parseFloat(input.value), amp: 1 });
        } else {
          acc[acc.length - 1].amp = parseFloat(input.value);
        }
        return acc;
      }, []);

      for (let i = 0; i < samples; i++) {
        signal[i] = params.reduce((sum, { freq, amp }) => sum + amp * Math.sin(2 * Math.PI * freq * i / sampleRate), 0);
      }
      break;
  }

  return signal;
}

// Add parameter fields for composite waveform
document.getElementById('addParam').addEventListener('click', () => {
  const paramsContainer = document.getElementById('paramsContainer');

  const newFields = `
    <div class="field is-horizontal param-row">
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
    </div>
  `;

  paramsContainer.insertAdjacentHTML('beforeend', newFields);
});

// Delete parameter fields for composite waveform
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-param')) {
    const paramRow = event.target.closest('.param-row');
    paramRow.remove();
  }
});

// Event listener for waveform selection
document.getElementById('waveform').addEventListener('change', (event) => {
  const waveform = event.target.value;
  const compositeParams = document.getElementById('compositeParams');

  if (waveform === 'composite') {
    compositeParams.style.display = 'block';
  } else {
    compositeParams.style.display = 'none';
  }
});

// Event listeners for signal generation and DFT calculation
document.getElementById('generateSignal').addEventListener('click', () => {
  const waveform = document.getElementById('waveform').value;
  const frequency = parseFloat(document.getElementById('frequency').value);
  const samples = parseInt(document.getElementById('samples').value, 10);

  const signal = generateSignal(waveform, frequency, samples);

  document.getElementById('inputSignal').value = signal.join(',');
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

  const trace = {
    x: Array.from({ length: signal.length }, (_, i) => i),
    y: magnitude,
    type: 'scatter',
  };

  const layout = {
    title: 'DFT振幅スペクトル',
    xaxis: { title: '周波数ビン' },
    yaxis: { title: '振幅' }
  };

  Plotly.newPlot('outputDFT', [trace], layout);
});

// Set the current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;
