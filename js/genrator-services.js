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




function drawImg(elImg) {
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

 
function setLineTxt(txt , size ,pos = 0 , align ){
  var lineIdx= gCurrMeme.lines.length
var gtxt={
    txt,
    font: gFont,
    size,
    align,
    color: gColorText,
    lineIdx,
    pos
}

gCurrMeme.lines.push(gtxt)
renderMeme(txt)

}

function  setColor(color){
  gColorText=color;
}


function removeLine(lineIdx){
  if(lineIdx<0) var line = gCurrMeme.lines.splice([lineIdx],1)
  else var line = gCurrMeme.lines.splice([lineIdx-1],1)
gCurrMeme.lines.forEach(function(line) {
  if(line.lineIdx > (lineIdx-1)){
    line.lineIdx = line.lineIdx-1 
  }
})


  selectedLine= -1
return line
}


function downloadImg(elLink){
  const imgContent = gCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
    elLink.download = 'my-img';
  }

function draw(lineIdx,text,textColor) {
  var line = gMeme.lines[lineIdx];
  if(!text) return
  if(!textColor) textColor=gColorText
  switch (lineIdx) {
    case 0:
      drawText(line,200, 50,textColor);
      updatePos(lineIdx,200, 50)
      break;
    case 1:
      drawText(line,200, 350,textColor);
      updatePos(lineIdx,200, 350)
      break;
    case 2:
      drawText(line,200, 200,textColor);
      updatePos(lineIdx,200, 200)
      break;
      default:
      var x= getRandomIntInclusive(100,200)
      var y= getRandomIntInclusive(100, 200)
      drawText(line,x,y,textColor);
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

