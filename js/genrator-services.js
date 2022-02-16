var gCurrShape;
var gCanvas = document.getElementById("my-canvas");
var gCtx = gCanvas.getContext("2d");
var gMeme;

function renderMeme(meme) {
  closeGallery();
  drawImg(meme);
  gMeme=createMeme(meme.dataset.id)
}

 function getMeme(img){
   var generator = document.querySelector(".Meme-Editor");
   generator.style.display="flex";
  gCanvas.style.display = "block";
  renderMeme(img);
 }


function  createMeme(imgId){
  var gMeme = {
    imgId,
    selectedLineIdx: 0,
    lines: [
      {
        txt: "I sometimes eat Falafel",
        size: 20,
        align: "left",
        color: "red",
      },
    ],
  };
return gMeme;
}

function resizeCanvas() {
  var elContainer = document.querySelector(".canvas-container");
  gCanvas.width = elContainer.offsetWidth - 100;
}

function drawImg(elImg) {
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}



function draw(ev) {
  const offsetX = ev.offsetX;
  const offsetY = ev.offsetY;
  // console.log(offsetX,offsetY)
  // const { offsetX, offsetY } = ev
  switch (gCurrShape) {
    case "triangle":
      drawTriangle(offsetX, offsetY);
      break;
    case "rect":
      drawRect(offsetX, offsetY);
      break;
    case "arc":
      drawarc(offsetX, offsetY, 100, 0, 2 * Math.PI);
      break;
    case "line":
      drawLine(offsetX, offsetY);
      break;
  }
}


