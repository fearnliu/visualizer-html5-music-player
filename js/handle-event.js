
const container = document.querySelector('.container');
const frontFace = document.querySelector('.front-face');
const backFace  = document.querySelector('.back-face');


const outerRing     = document.querySelector('.outerRing');
const playBtton     = document.querySelector('.play-button');
const needleDevice  = document.querySelector('.needle-device');
const progressPilot = document.querySelector('.progress-pilot');

let atBackFace     = false; // 当前是否处于背面
let playAtBegining = true; // 音频是否从头开始播放
let playFininshed  = false;

playBtton.addEventListener('click', () => {

    if (playAtBegining) {    // 第一次开始播放
        playAtBegining = false;

        setTimeout(() => audioSource.start(), 500); // 延时启动音频源
        requestAnimationFrame(updateProgress);  // 更新进度条

    } else {    // 在音频播放中途暂停和继续

        if (audioContext.state === 'running') {
            audioContext.suspend(); // 暂停音频环境
        } else if (audioContext.state === 'suspended') {
            setTimeout(() => audioContext.resume(), 500);   // 继续音频环境
        }
    }

    togglePlayPause();

}, false);


container.addEventListener('click', (event) => {
    if (event.target.classList.contains('ring')) {
        if (!atBackFace) {
            toggleFrontBackFace();
            requestAnimationFrame(draw);
            atBackFace = !atBackFace;
        }
    }

    if (event.target.id === 'visualize-area') {
        if (atBackFace) {
            toggleFrontBackFace();
            cancelAnimationFrame(draw);
            atBackFace = !atBackFace;
        }
    }
}, false);


function updateProgress() {
    requestAnimationFrame(updateProgress);

    let goTimePer = audioContext.currentTime / audioBufferDuration; // 已播放时长比

    if (goTimePer >= 1) {
        cancelAnimationFrame(updateProgress);
        progressPilot.setAttribute('value', '100');
        playAtBegining = true;
        audioContext.close().then(() => {
            togglePlayPause();
        });
        return ; // 结束执行当前函数
    }

    progressPilot.setAttribute('value',`${goTimePer * 100}`);
}


function toggleFrontBackFace() {
    frontFace.classList.toggle('none-display');
    backFace.classList.toggle('none-display');
}


function togglePlayPause() {
    playBtton.classList.toggle('pause-button');
    playBtton.classList.toggle('play-button');

    needleDevice.classList.toggle('needle-for-pause');
    needleDevice.classList.toggle('needle-for-play');

    outerRing.classList.toggle('animation-pause');
    outerRing.classList.toggle('animation-play');
}
