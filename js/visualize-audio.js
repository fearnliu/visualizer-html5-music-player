const canvasElement = document.querySelector('#visualize-area');
const canvasContext = canvasElement.getContext('2d');

const width  = canvasElement.width;
const height = canvasElement.height;


audioAnalyser.fftSize = 256; // 默认值为 2048，用于进行 快速傅里叶变换 以捕获音频数据

const bufferLength = audioAnalyser.frequencyBinCount;   // 此值固定为 AnalyserNode 接口中 fftSize 值的一半，该属性通常用于可视化数据的数值数量
const dataArray    = new Uint8Array(bufferLength); // 初始化一个 8 位无符号整数数组，用于存储当前尺寸的 FFT 收集的数据点

canvasContext.clearRect(0, 0, width, height); // 绘画之前先清空画布

function draw() {
    requestAnimationFrame(draw);

    audioAnalyser.getByteFrequencyData(dataArray); // 获取传递到此音频节点的实时频率数据，并将其保存到 dataArray（Unit8Array类型）

    canvasContext.fillStyle = 'rgb(32, 32, 32)';    // 绘制 visualize area 背景
    canvasContext.fillRect(0, 0, width, height);

    let barWidth = (width / bufferLength) * 2.5; // 条形块的宽度，乘以 2.5 是因为返回的频率区域中有很多是空数据
    let barHeight; // 条形块的高度
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        canvasContext.fillStyle = `rgb( ${barHeight+100}, 50, 50 )`;
        canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2); // 避免条形块高度超过容器

        x += barWidth + 1;
    }
}
