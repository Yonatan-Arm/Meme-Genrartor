
var gCanvas;
var gMeme;
var gCtx ;
var gCurrImg;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
addListeners()
var isDrag=false;

  

function onOpenMemeGenerator(img) {
  console.log('run')
   gCanvas = document.getElementById("my-canvas");
   gCtx = gCanvas.getContext("2d");
  closeGallery();
  renderImgMeme(img) 
  
}

function clearCanvas() {
    gCtx.clearRect(x, y, gCanvas.width, gCanvas.height)
  }



  function renderMeme(txt){
    drawImg(gCurrImg)
    var lineIdx=0
   gCurrMeme.lines.forEach(line =>{
     if(line.pos.x){
      drawText(line.txt,line.pos.x,line.pos.y,line.color)
     }else{
       draw(lineIdx,line.txt)
     }
     lineIdx++
   })}

  

  function ShowTextInput(txt){
    draw(2,txt)
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
  var txt = document.getElementById('Meme')
    setLineTxt(txt.value)
    txt.value = ''
    
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
  if (!isTextClicked(pos)) return
  // setCircleDrag(true)
  // gStartPos = pos
  document.body.style.cursor = 'grabbing'

}

function isTextClicked(clickedPos) {
  const  pos  = getMemePos()
  // && size.actualBoundingBoxDescent<clickedPos.y<
  var selectedLine=gMeme.lines.find(line => {
    const size=gCtx.measureText(line)
    console.log(size);
    line.pos.x > clickedPos.x < line.pos.x+ size.width && line.pos.y < clickedPos.y < size.fontBoundingBoxAscent
    return line
   } )
   setTextDrag(selectedLine)
}


function onMove(ev) {
  console.log('onMove()');
  // const circle = getCircle();
  // if (circle.isDrag) {
  //     const pos = getEvPos(ev)
  //     const dx = pos.x - gStartPos.x
  //     const dy = pos.y - gStartPos.y
  //     moveCircle(dx, dy)
  //     gStartPos = pos
  //     renderCanvas()
  // }
}

function onUp() {
  console.log('onUp()');
  // setCircleDrag(false)
  document.body.style.cursor = 'grab'
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
