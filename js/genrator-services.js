var gCurrShape;
var gCanvas = document.getElementById("my-canvas");
var gCtx = gCanvas.getContext("2d");
var gCurrMeme;
var gCurrImg;
var gColorText= 'white';





function  createMeme(imgId){
  var gMeme = {
    imgId,
    selectedLineIdx: 0,
    lines:[],
  };
  gCurrMeme =gMeme
return gMeme;
}



function drawText(text, x, y,textColor) {
  gCtx.lineWidth = 1;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = textColor ;
  gCtx.font = '40px Impact';
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}


function getMeme(img){
  
}

function drawImg(elImg) {
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

 
function setLineTxt(txt){
  var lineIdx= gCurrMeme.lines.length
var gtxt={
    txt,
    size: 40,
    align: "center",
    color: gColorText,
    lineIdx
}
gCurrMeme.lines.push(gtxt)
var lines= gCurrMeme.lines
  lines.forEach(line=>{
    draw(line.lineIdx,line.txt, line.color) 
    lineIdx++
  })
}

function  setColor(color){
  gColorText=color;
}



function downloadImg(elLink){
  const imgContent = gCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
    elLink.download = 'my-img';
  }




// function draw(ev) {
//   const offsetX = ev.offsetX;
//   const offsetY = ev.offsetY;
//   // console.log(offsetX,offsetY)
//   // const { offsetX, offsetY } = ev
//   switch (gCurrShape) {
//     case "triangle":
//       drawTriangle(offsetX, offsetY);
//       break;
//     case "rect":
//       drawRect(offsetX, offsetY);
//       break;
//     case "arc":
//       drawarc(offsetX, offsetY, 100, 0, 2 * Math.PI);
//       break;
//     case "line":
//       drawLine(offsetX, offsetY);
//       break;
//   }
// }



function draw(lineIdx,text,textColor) {
  if(!textColor) textColor=gColorText
  switch (lineIdx) {
    case 0:
      drawText(text,50, 50,textColor);
      break;
    case 1:
      drawText(text,50, 400,textColor);
      break;
    case 2:
      drawText(text,50, 200,textColor);
      break;
  }
}

