# <p align="center">[DFTSimulator](https://ponstream24.github.io/DFTSimulator)</p>

## 1 シミュレータの目的・概要

### 1.1 シミュレータの目的
このシミュレータは、**離散フーリエ変換（DFT）** という単元を学ぶ初学者を対象としている。離散フーリエ変換は信号処理やデータ解析の基本的な手法であり、その手順や理解が難しい点をビジュアル化して学習をサポートする。

### 1.2 シミュレータの対象者
このシミュレータは、離散フーリエ変換の初学者を対象としており、数学や工学の学生、データサイエンティストなどが対象。

### 1.3 単元の中で分かりづらい内容
離散フーリエ変換の単元において、特に理解しづらい点：
- **離散フーリエ変換の手順**: 具体的な数学的な計算手法やアルゴリズムの理解が困難な点。

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

### 1.5 シミュレータのレイアウト図（画面構成）・表示例

上から順番に実行していくだけで、簡単にDFTができるレイアウトになっています。*画1.5*

シミュレータの画面構成は以下の通りです：

1. **波形選択セクション**: *画1.1*
   - 波形の種類を選択するドロップダウンメニュー。
   - 基本周波数とサンプル数を入力するフィールド。
   - 合成波を選択した場合、周波数と振幅のパラメータを追加・削除する機能。

        ![スクリーンショット 2024-07-11 14 22 13](https://github.com/ponstream24/DFTSimulator/assets/87808547/77a5c2d5-510e-46c0-8db9-f3c3c0e56e40)*画1.1*
2. **信号生成セクション**: *画1.2*
   - 「信号を生成」ボタン。
   - 生成された信号を表示するテキストエリア。

        ![スクリーンショット 2024-07-11 14 25 24](https://github.com/ponstream24/DFTSimulator/assets/87808547/950fd98d-04b2-4440-b1b4-7850a314a0d1)*画1.2*
3. **DFT計算セクション**: *画1.3*
   - 「DFTを計算」ボタン。
   - 計算結果を表示するエリア。
  
        ![スクリーンショット 2024-07-11 14 30 21](https://github.com/ponstream24/DFTSimulator/assets/87808547/fe73d338-2025-4da1-9739-5910a4ae5d8a)*画1.3*
4. **結果表示セクション**: *画1.4*
   - 生成された信号のグラフ表示。
   - DFTの振幅スペクトルのグラフ表示。

        ![スクリーンショット 2024-07-11 14 55 30](https://github.com/ponstream24/DFTSimulator/assets/87808547/370b11b7-46d0-4a61-91fd-0dc2c6c28907)*画1.4*

5. **全体写真**
![dft simulator yukitetsuka com_](https://github.com/ponstream24/DFTSimulator/assets/87808547/328d9eb1-670d-44b6-9c67-1aa06dfb93b5)*画1.5*

## 2 理論

### 2.1 周波数
　周波数とは１秒当たりの振動数でHzで表せます。周波数によって色や音、揺れなどが変化し、特に音は周波数が低いと、低い音、周波数が高いと高い音になります。また、普段の色や音は１つの周波数だけではなく、複数の周波数が重なり合って色や音を作り出しています。

### 2.1 フーリエ変換と離散フーリエ変換
　フーリエ変換はアナログ信号の周波数を周波数領域に変換する方法ですが、離散フーリエ変換はデジタル信号の周波数を周波数領域に変換する方法です。下の図(*画2.1*)の通り、アナログ信号は連続的な波の情報ですが、デジタル信号は離散的な波の情報です。
 
![image](https://github.com/ponstream24/DFTSimulator/assets/87808547/e2899c52-988f-46ed-8861-0676e441032f)*画2.1*
<p align="center">出展 : [KLV大学 光センサーコース　アナログ信号とデジタル信号の違い](https://www.klv.co.jp/corner/fft-in-freq-analysis.html)</p>

### 2.2 DFT理論
DFTは、まず離散的な時間サンプルx[n](n = 0,1,2,3,4,....,N-1)を入力として受け取ります。このサンプルは等間隔でサンプリングされた信号です。次に与えられたサンプルから、それぞれの周波数kに対する振幅と位相を計算します。

$$ X[k] = \sum_{n=0}^{N-1} x[n] e^{-j\frac{2\pi}{N} nk} $$
<p align="right">・・・ 式(1) </p>

### 2.3 周波数解析

周波数解析についてシュミレーターを使いながら説明します。

まず、周波数解析とは、信号や波形を周波数成分に分解し、その特性を解析することです。
> 「周波数解析とは、信号や波形を周波数成分に分解し、その特性を解析することです。」
> - 引用元: KLV大学 光センサーコース、[周波数解析におけるフーリエ変換を数式を使わずにわかりやすく解説！](https://www.klv.co.jp/corner/fft-in-freq-analysis.html#fourier_transform,2024/7/9%E5%8F%82%E7%85%A7)、2024/07/11

信号を周波数解析することで、周波数領域に信号を変換することができます。その周波数解析の一つとしてフーリエ解析があります。フーリエ変換によって、時間領域の信号を周波数領域の信号へと変換することができます。*画2.2*
![スクリーンショット 2024-07-11 17 23 18](https://github.com/ponstream24/DFTSimulator/assets/87808547/35a20a41-2437-4c15-9d49-10237ee41925)*画2.2*

上部の波形は時間領域の信号を横軸を時間、縦軸を振幅とし、下部の波形は周波数領域の信号を横軸を周波数、縦軸を振幅を表しています。これによって、周波数領域を見るとその信号にはどの周波数成分が含まれているかをかいせすることができます。

例えば、合成波( 10Hz,20Hz,50Hz 各振幅1 )を生成します。*画2.3*

![スクリーンショット 2024-07-11 17 29 28](https://github.com/ponstream24/DFTSimulator/assets/87808547/2f692426-2c96-42b4-bc3f-d84c08f349ec)*画2.3*

生成した合成波を離散フーリエ変換すると、以下のように10Hz,20Hz,50Hzの部分で振幅が大きくなっていることがわかります。*画2.4*
![スクリーンショット 2024-07-11 17 42 39](https://github.com/ponstream24/DFTSimulator/assets/87808547/9fbbcd53-1979-4b9b-9735-d3df69f02c2b)*画2.4*

## 3 感想
自分でDFTのシステムを構築したのでより理解が深まった。DFTができたので、次はDFTを使った音加工やIoTなどにも活かして開発してみたいと思う。


## 参考文献
- [1] 三井田惇郎，須田宇宙，”数値計算法　第2版新装版”, 森北出版株式会社, 2019年
- [2] “simple_dft”, [https://github.com/sudahiroshi/simple_dft](https://github.com/sudahiroshi/simple_dft), 2024/7/11参照
- [3] OpenAI. (n.d.). ChatGPT, [https://openai.com/chatgpt](https://openai.com/chatgpt), 2024/7/11参照
- [4] ケイエルブイ株式会社. "周波数解析におけるフーリエ変換を数式を使わずにわかりやすく解説！". ケイエルブイ, [https://www.klv.co.jp/corner/fft-in-freq-analysis.html](https://www.klv.co.jp/corner/fft-in-freq-analysis.html), 2024/7/11参照


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
