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



function drawText(text, x, y,textColor=gColorText) {
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
    lineIdx,
    pos:0
}

gCurrMeme.lines.push(gtxt)
renderMeme(txt)
}

function  setColor(color){
  gColorText=color;
}



function downloadImg(elLink){
  const imgContent = gCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
    elLink.download = 'my-img';
  }






function draw(lineIdx,text,textColor) {
  if(!text) return
  if(!textColor) textColor=gColorText
  switch (lineIdx) {
    case 0:
      drawText(text,50, 50,textColor);
      updatePos(lineIdx,50, 50)
      break;
    case 1:
      drawText(text,50, 400,textColor);
      updatePos(lineIdx,50, 400)
      break;
    case 2:
      drawText(text,50, 200,textColor);
      updatePos(lineIdx,50, 200)
      break;
      default:
      var x= getRandomIntInclusive(50,200)
      var y= getRandomIntInclusive(50, 200)
      drawText(text,x,y,textColor);
      updatePos(lineIdx,x, y)
      break;
}
}



function getMemePos(){
  const pos= gCurrMeme.lines.pos
  return pos
 }
 



function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

