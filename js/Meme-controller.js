
var gCanvas;
var gMeme;
var gCtx ;
var gCurrImg;


  

function onOpenMemeGenerator(img) {
   gCanvas = document.getElementById("my-canvas");
   gCtx = gCanvas.getContext("2d");
  closeGallery();
  renderImgMeme(img) 
  window.addEventListener("resize", () => {
    resizeCanvas();
  });
}

function clearCanvas() {
    gCtx.clearRect(x, y, gCanvas.width, gCanvas.height)
  }



  function renderMeme(txt){
    drawImg(gCurrImg)
    var lineIdx=0
    if(gCurrMeme.lines.length === 0){
      draw(2,txt)

    }else{
   gCurrMeme.lines.forEach(line =>{
     draw(lineIdx,line.txt)
     lineIdx++
   })}

  }


function renderImgMeme(img) {
  if(!img) img = gCurrImg
  var generator = document.querySelector(".Meme-Editor");
  generator.style.display="flex";
  gCanvas.style.display = "block";
  drawImg(img);
  gCurrImg = img;
  gMeme = createMeme(img.dataset.id);
}

function onDrawText(txt) {
    setLineTxt(txt)
}
 

function OnDownload(link) {
  downloadImg(link);
}

function onChangeColor(color) {
  setColor(color);
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
