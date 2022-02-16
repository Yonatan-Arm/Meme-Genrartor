var gCurrShape;

var gMeme;
var gCurrImg;

function onOpenMemeGenerator(img) {
  var gCanvas = document.getElementById("my-canvas");
  var gCtx = gCanvas.getContext("2d");
  closeGallery();
  getMeme(img);
  window.addEventListener("resize", () => {
    resizeCanvas();
  });
}

function renderMeme(img) {
  closeGallery();
  drawImg(img);
  gCurrImg = meme;
  gMeme = createMeme(img.dataset.id, txt, color);
}

function onDrawText(txt) {
  drawText(txt, 20, 50);
}

function OnDownload(link) {
  downloadImg(link);
}

function onChangeColor(color) {
  console.log(color);
}

function closeGenerator() {
  var generator = document.querySelector(".Meme-Editor");
  generator.classList.remove("flex");
  var canvas = document.getElementById("my-canvas");
  canvas.style.display = "none";
}

function resizeCanvas() {
  var elContainer = document.querySelector(".canvas-container");
  gCanvas.width = elContainer.offsetWidth - 100;
  gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height);
}
