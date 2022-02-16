var gCurrShape;
var gCanvas = document.getElementById("my-canvas");
var gCtx = gCanvas.getContext("2d");
var gMeme;
var gCurrImg;


function getMeme(img){
  if(!img) img = gCurrImg
  var generator = document.querySelector(".Meme-Editor");
  generator.style.display="flex";
  gCanvas.style.display = "block";
  renderMeme(img);
}



function  createMeme(imgId , txt , color){
  var gMeme = {
    imgId,
    selectedLineIdx: 0,
    lines: [
      {
        txt,
        size: 40,
        align: "center",
        color
      },
    ],
  };
return gMeme;
}


function drawImg(elImg) {
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawText(text, x, y) {
  gCtx.lineWidth = 1;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = 'white';
  gCtx.font = '40px Impact';
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}
 






function downloadImg(elLink){
  const imgContent = gCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
    elLink.download = 'my-img';
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


