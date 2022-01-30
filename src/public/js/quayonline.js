const start = document.getElementById("start");
const stop = document.getElementById("stop");
const download = document.getElementById("download");
const video = document.querySelector("video");
const resolution = document.querySelectorAll(".resolution");
const frameRate = document.querySelectorAll(".frameRate");
const timeStart = document.querySelector(".start--time");
let seconds = 0;
let minute = 0;
let hours = 0;
let widthvideo = 1280;
let frameRateVideo = 30;
let heightvideo = 720;
let recorder, stream;
try {
  if (!navigator.mediaDevices.getDisplayMedia) {
    alert("không có getDisplayMedia ");
  }
} catch {
  window.location = "/callback/app?app=quayvideoonline";
}
function handleClickFrameRate() {
  console.log(document.querySelector(".frameRate.frameRatecheck"));
  document
    .querySelector(".frameRate.frameRatecheck")
    .classList.remove("frameRatecheck");
  this.classList.add("frameRatecheck");
  frameRateVideo = this.getAttribute("frameRatevideo") * 1;
}
function handleClickResolution() {
  document
    .querySelector(".resolution.resolutioncheck")
    .classList.remove("resolutioncheck");
  this.classList.add("resolutioncheck");
  heightvideo = this.getAttribute("resolutionheight") * 1;
  widthvideo = this.getAttribute("resolutionwidth") * 1;
}
for (let i = 0; i < resolution.length; i++) {
  resolution[i].onclick = handleClickResolution;
}
for (let i = 0; i < frameRate.length; i++) {
  frameRate[i].onclick = handleClickFrameRate;
}
async function startRecording() {
  if (!navigator.mediaDevices.getDisplayMedia) {
    alert("không có getDisplayMedia ");
  }
  stream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: {
      mediaSource: "screen",
      width: widthvideo,
      height: heightvideo,
      frameRate: frameRateVideo,
    },
  });
  recorder = new MediaRecorder(stream);
  const chunks = [];
  recorder.ondataavailable = (e) => chunks.push(e.data);
  var timeRecording = setInterval(() => {
    seconds += 1;
    if (seconds === 60) {
      seconds = 0;
      minute++;
      if (minute === 60) {
        minute = 0;
        hours = 1;
      }
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    timeStart.innerHTML = hours + ":" + minute + ":" + seconds;
    seconds *= 1;
    minute *= 1;
    hours *= 1;
  }, 1000);
  recorder.onstop = (e) => {
    clearInterval(timeRecording);
    const completeBlob = new Blob(chunks, { type: "video/mp4" });
    video.src = URL.createObjectURL(completeBlob);
    var url = video.getAttribute("src");
    video.play();
    download.setAttribute("href", url);
    download.download = "video.mp4";
  };
  recorder.start();
}
start.addEventListener("click", () => {
  [seconds, minute, hours] = [0, 0, 0];
  start.style.color = "red";
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");
  startRecording();
});

stop.addEventListener("click", () => {
  start.style.color = "#eee";
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");
  recorder.stop();
  stream.getVideoTracks()[0].stop();
});
