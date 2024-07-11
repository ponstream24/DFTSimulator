# <p align="center">[DFTSimulator](https://ponstream24.github.io/DFTSimulator) Info</p>

## 1 シミュレータの目的・概要

### 1.1 シミュレータの目的
このシミュレータは、**離散フーリエ変換（DFT）** という単元を学ぶ初学者を対象としています。離散フーリエ変換は信号処理やデータ解析の基本的な手法であり、その手順や理解が難しい点をビジュアル化して学習をサポートします。

### 1.2 シミュレータの対象者
このシミュレータは、離散フーリエ変換の初学者を対象としています。数学や工学の学生、データサイエンティストなどが対象です。

### 1.3 単元の中で分かりづらい内容
離散フーリエ変換の単元において、特に理解しづらい点は以下です：
- **離散フーリエ変換の手順**: 具体的な数学的な計算手法やアルゴリズムの理解が困難な点です。

### 1.4 教えたい内容
今回のシミュレータ教材を使って教えたい内容は以下の通りです：

1. **波形の生成**:
   - 正弦波、矩形波、三角波、のこぎり波などの基本波形の生成。
   - 合成波の生成（複数の周波数と振幅の組み合わせによる波形の合成）。

2. **DFTの手順**:
   - 離散フーリエ変換の計算過程。
   - 各サンプル点に対する計算の流れ。

3. **DFTの結果の解釈**:
   - 時間領域の信号と周波数領域のスペクトルの関係。
   - 周波数スペクトルの振幅の意味とその解釈。

### 1.5 シミュレータのレイアウト図（画面構成）
シミュレータの画面構成は以下の通りです：

1. **波形選択セクション**:
   - 波形の種類を選択するドロップダウンメニュー。
   - 基本周波数とサンプル数を入力するフィールド。
   - 合成波を選択した場合、周波数と振幅のパラメータを追加・削除する機能。

2. **信号生成セクション**:
   - 「信号を生成」ボタン。
   - 生成された信号を表示するテキストエリア。

3. **DFT計算セクション**:
   - 「DFTを計算」ボタン。
   - 計算結果を表示するエリア。

4. **結果表示セクション**:
   - 生成された信号のグラフ表示。
   - DFTの振幅スペクトルのグラフ表示。

![dft simulator yukitetsuka com_](https://github.com/ponstream24/DFTSimulator/assets/87808547/328d9eb1-670d-44b6-9c67-1aa06dfb93b5)


## 2 動作

### 基本動作
基本的な使い方は以下の通りです：

1. **波形選択セクション**:
   - ドロップダウンメニューを使い、波形の種類を選択します。

        ![スクリーンショット 2024-07-11 14 22 13](https://github.com/ponstream24/DFTSimulator/assets/87808547/77a5c2d5-510e-46c0-8db9-f3c3c0e56e40)
     
2. **信号生成セクション**:
   - 「基本周波数 (Hz)」を入力します。
   - 「サンプル数」を入力します。
   - 「信号を生成」ボタンを押します。

        ![スクリーンショット 2024-07-11 14 25 24](https://github.com/ponstream24/DFTSimulator/assets/87808547/950fd98d-04b2-4440-b1b4-7850a314a0d1)
   - 下の「信号とDFT出力」の「生成された信号」に反映されていることを確認します。

        ![スクリーンショット 2024-07-11 14 27 42](https://github.com/ponstream24/DFTSimulator/assets/87808547/d5400ef9-d1d8-4dce-bd6f-3dc1492cb89d)

3. **DFT計算セクション**:
   - 「DFTを計算」ボタンを押して、DFTの計算を行います。

        ![スクリーンショット 2024-07-11 14 30 21](https://github.com/ponstream24/DFTSimulator/assets/87808547/fe73d338-2025-4da1-9739-5910a4ae5d8a)
   - 下の「信号とDFT出力」の「DFT振幅スペクトル」に反映されていることを確認します。

        ![スクリーンショット 2024-07-11 14 31 17](https://github.com/ponstream24/DFTSimulator/assets/87808547/4d1a0ed4-0531-454d-9de2-6ec11dbec724)

## 3 機能・使用ツール

### 3.1 Utilityツール
   - グラフ出力のために、「[Plotly](https://plotly.com/)」を利用しているため、以下の機能が使えます。
     - スクリーンショット
     - 拡大・移動
   - [Bulma](https://bulma.io/)をCSSフレームワークとして利用しているため、CSSファイルなしでのUI作成を行っています。

## 4 数式・プログラム

### 正弦波 (Sine Wave)
#### 数式
$$ x[n] = \sin\left( \frac{2\pi f n}{N} \right) $$
#### プログラム
```js
// 正弦波
case 'sine':
  for (let i = 0; i < samples; i++) {
    signal[i] = Math.sin(angularFrequency * i);
  }
  break;
````
#### サンプル( 50Hz, サンプル数200)
![スクリーンショット 2024-07-11 14 52 23](https://github.com/ponstream24/DFTSimulator/assets/87808547/e521be59-f955-44e3-b0c1-ab56618f5b56)

### 矩形波 (Square Wave)
#### 数式
$$ x[n] = \text{sign}\left(\sin\left( \frac{2\pi f n}{N} \right)\right) $$
#### プログラム
```js
// 矩形波
case 'square':
  for (let i = 0; i < samples; i++) {
    signal[i] = Math.sign(Math.sin(angularFrequency * i));
  }
  break;
````
#### サンプル( 50Hz, サンプル数200)
![スクリーンショット 2024-07-11 14 53 45](https://github.com/ponstream24/DFTSimulator/assets/87808547/429c3718-366f-4acb-96ec-230615653455)

### 三角波 (Triangle Wave)
#### 数式
$$ x[n] = \frac{2}{\pi} \arcsin\left(\sin\left( \frac{2\pi f n}{N} \right)\right) $$
#### プログラム
```js
// 三角波
case 'triangle':
  for (let i = 0; i < samples; i++) {
    signal[i] = 2 * Math.asin(Math.sin(angularFrequency * i)) / Math.PI;
  }
  break;
````
#### サンプル( 50Hz, サンプル数200)
![スクリーンショット 2024-07-11 14 54 14](https://github.com/ponstream24/DFTSimulator/assets/87808547/88cf10ad-669d-4f07-86ba-66ff0dfe5f89)

### のこぎり波 (Sawtooth Wave)
#### 数式
$$ x[n] = 2 \left( \frac{f n}{N} - \left\lfloor \frac{f n}{N} + 0.5 \right\rfloor \right) $$
#### プログラム
```js
// のこぎり波
case 'sawtooth':
  for (let i = 0; i < samples; i++) {
    signal[i] = 2 * (i / samples - Math.floor(i / samples + 0.5));
  }
  break;
````
#### サンプル( 50Hz, サンプル数200)
![スクリーンショット 2024-07-11 14 54 40](https://github.com/ponstream24/DFTSimulator/assets/87808547/2f2c9fa2-d8b8-4554-8748-0c1344259196)

### 合成波 (Composite Wave)
#### 数式
$$ x[n] = \sum_{k=1}^{K} A_k \sin\left( \frac{2\pi f_k n}{N} \right) $$
#### プログラム
```js
// 合成波
case 'composite':
  const frequencies = Array.from(document.querySelectorAll('input[name="frequency[]"]')).map(input => parseFloat(input.value));
  const amplitudes = Array.from(document.querySelectorAll('input[name="amplitude[]"]')).map(input => parseFloat(input.value));

  for (let i = 0; i < samples; i++) {
    signal[i] = 0;
    for (let j = 0; j < frequencies.length; j++) {
      const angularFreq = 2 * Math.PI * frequencies[j] / samples;
      signal[i] += amplitudes[j] * Math.sin(angularFreq * i);
    }
  }
  break;
````
#### サンプル( 10Hz/20Hz/50Hz(各振幅 1), サンプル数200)
![スクリーンショット 2024-07-11 14 55 30](https://github.com/ponstream24/DFTSimulator/assets/87808547/370b11b7-46d0-4a61-91fd-0dc2c6c28907)


## 参考文献
- [1] 三井田惇郎，須田宇宙，”数値計算法　第2版新装版”, 森北出版株式会社, 2019年
- [2] “simple_dft”, [https://github.com/sudahiroshi/simple_dft](https://github.com/sudahiroshi/simple_dft), 2024/7/11参照
- [3] OpenAI. (n.d.). ChatGPT, [https://openai.com/chatgpt](https://openai.com/chatgpt), 2024/7/11参照

## 付録

### Github
DFTSimulator Web : [https://ponstream24.github.io/DFTSimulator](https://ponstream24.github.io/DFTSimulator)
Git Repository : [https://github.com/ponstream24/DFTSimulator.git](https://github.com/ponstream24/DFTSimulator.git)

### シミュレーター生成に使ったメインのプロンプト
```
Make the following system.
This system is a simulator for beginning students learning the Discrete Fourier Transform (DFT). The simulator provides the ability to generate different types of waveforms (sine, square, triangle, sawtooth, and composite) and calculate the DFT for them. The user can set the basic parameters: waveform type, fundamental frequency, and number of samples.

If synthetic waves are selected, the user can specify multiple frequencies and corresponding amplitudes. This allows for the construction of complex signals. The generated signal is displayed as numerical data and can also be visualized graphically; the function to calculate the DFT applies a discrete Fourier transform to the generated signal and displays its amplitude spectrum.

The simulator is intended to be intuitive, helping the user to visually understand the generated signal and the DFT results. The technologies used include HTML, CSS (using the Bulma framework), and JavaScript. graphs are drawn through the Plotly library, helping the user to observe theoretical concepts as real data.

The main goal of the system is to help learners intuitively understand the basic steps of DFT and its results.
```
