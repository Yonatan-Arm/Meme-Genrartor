
var gCanvas;
var gMeme;
var gCtx ;
var gCurrImg;
var selectedLine =-1;
var gStartPos;
var gCurrLine;
var prevLine;
var gFont ="Impact"
var isSelected = false;
var gAlignText='center';
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
addListeners()
var isDrag=false;
var width=40;
var gFontSize=40;

  

function onOpenMemeGenerator(img) {
  console.log('run')
   gCanvas = document.getElementById("my-canvas");
   gCtx = gCanvas.getContext("2d");
  closeGallery();
  renderImgMeme(img) 
  
}

 function onDeleteText(){
   if(isSelected){
     if(selectedLine>0) selectedLine= selectedLine-1
    removeLine(selectedLine)
    renderMeme()
    isSelected = false
    gCurrLine=''
   }
  
}

function clearCanvas() {
    gCtx.clearRect(x, y, gCanvas.width, gCanvas.height)
  }


  function drawText(line, x, y,textColor=gColorText) {
    if(line.size) gFontSize = line.size 
    if(line.font) gFont = line.font 
    if(line.align) gAlignText = line.align
    gCtx.lineWidth = 1;
    gCtx.textAlign = gAlignText;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = textColor ;
    gCtx.font = `${gFontSize}px ${gFont}`;
    if(line.txt) line = line.txt
    gCtx.fillText(line, x, y);
    gCtx.strokeText(line, x, y);
  }


  function renderMeme(txt){
    drawImg(gCurrImg)
    var lineIdx=0
   gCurrMeme.lines.forEach(line =>{
     if(line.pos.x){
      drawText(line,line.pos.x,line.pos.y,line.color , line.align)
     }else{
       draw(lineIdx,line.txt)
     }
     lineIdx++
   })}

  

  function ShowTextInput(txt){
    
    if(isSelected){
        if(!gCurrLine) {
          gCurrLine=removeLine(selectedLine-1) 
        }
        renderMeme()
        drawText(txt,gCurrLine[0].pos.x,gCurrLine[0].pos.y,gColorText , gAlignText)
    }else{ 
      renderMeme()
      drawText(txt,200, 200,gColorText)
    }
  }

  function updatePos(line,x,y){
    if(!gMeme.lines[line])return
gMeme.lines[line].pos= {x,y}
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
  width=gCtx.measureText(txt).width
  var txt = document.getElementById('Meme')
  if(isSelected)setLineTxt(txt.value, gFontSize , gCurrLine[0].pos , gAlignText)
  else setLineTxt(txt.value, gFontSize, 0 ,gAlignText)
    txt.value = ''
    // gCurrLine=''
    isSelected=false
    gCurrLine=''
    
}


function onChangeFontSize(num){
  gFontSize += num;

}
 function onchangeFont(font){
   gFont = font
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
  gCanvas.width = elContainer.offsetWidth -10;
  renderMeme()
  // gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height);
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
  window.addEventListener("resize", () => {
    resizeCanvas();
  });
}

function addMouseListeners() {
  gCanvas.addEventListener('mousemove', onMove)
  gCanvas.addEventListener('mousedown', onDown)
  gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners(){
  gCanvas.addEventListener('touchmove', onMove)
  gCanvas.addEventListener('touchstart', onDown)
  gCanvas.addEventListener('touchend', onUp)
}



function onDown(ev) {
  const pos = getEvPos(ev)
  if (isTextClicked(pos) > -1) {
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
  } 


}

function onChooseLine(){ 
  if(selectedLine === -1) selectedLine=0
  if(gMeme.lines[selectedLine]){
    if(selectedLine>0 || prevLine){
     gCtx.clearRect(prevLine.pos.x-width   , prevLine.pos.y-gFontSize -2, (prevLine.pos.x + 5) , prevLine.pos.y +2)
    renderMeme()
    }
    isSelected= true
    var line= gMeme.lines[selectedLine]
    gCtx.strokeStyle = 'blue';
    gCtx.strokeRect(line.pos.x -width  , line.pos.y-gFontSize -2, (line.pos.x + 5), line.pos.y+2 );
   var txt= document.getElementById("Meme")
   txt.value=gMeme.lines[selectedLine].txt 
   selectedLine++
   prevLine= gMeme.lines[selectedLine-1]
  }
  if(!gMeme.lines[selectedLine]) selectedLine = -1
}



function isTextClicked(clickedPos) {
  selectedLine= gMeme.lines.findIndex(line =>{
    return(clickedPos.x>=line.pos.x- width && 
      clickedPos.x<=line.pos.x+10 &&
      clickedPos.y>=line.pos.y-gFontSize&& 
      clickedPos.y<=line.pos.y +10);
})
   return selectedLine
}


function onMove(ev) {
  console.log('onMove()');
  if (isDrag) {
      const pos = getEvPos(ev)
      const dx = pos.x - gStartPos.x
      const dy = pos.y - gStartPos.y
      moveLine(dx, dy)
      gMeme.lines[selectedLine].pos= gStartPos 
      renderMeme()
      // renderCanvas()
  }
}

function onUp() {
  console.log('onUp()');
  setLineDrag(false)
  selectedLine = -1;
  document.body.style.cursor = 'grab'
}

 function setLineDrag(flag){
   isDrag = flag;

 }

 function moveLine(dx, dy) {
  gStartPos.x += dx
  gStartPos.y += dy

}



function getEvPos(ev) {
  var pos = {
      x: ev.offsetX,
      y: ev.offsetY
  }
  if (gTouchEvs.includes(ev.type)) {
      ev.preventDefault()
      ev = ev.changedTouches[0]
      pos = {
          x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
          y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
      }
  }
  return pos
}


function onSetAlignText(val){
  gAlignText = val
}

