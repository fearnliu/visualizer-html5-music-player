
const audioContext  = new AudioContext();    // 创建一个音频环境
const audioSource   = audioContext.createBufferSource();    // 在音频环境中创建声源，由于是加载 .mps 文件，所以使用 createBuffer() 方法
const audioAnalyser = audioContext.createAnalyser();    // AnalyserNode节点

let audioBufferDuration = 0;

document.onreadystatechange = () => {

    if (document.readyState === 'complete') {

        fetch('../assets/audio/Horizon - Janji.mp3')
            .then(response => response.arrayBuffer()) // HTTP响应，音频文件为 ArrayBuffer 类型
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) // 从音频文件解析出原始数据，
            .then(decodedData => {
                audioSource.buffer = decodedData;

                audioBufferDuration = audioSource.buffer.duration;  // 音频缓冲时长，以秒为单位

                audioSource.connect(audioAnalyser);
                audioAnalyser.connect(audioContext.destination);    // 连接到设备音频结点
            });
    }
};
