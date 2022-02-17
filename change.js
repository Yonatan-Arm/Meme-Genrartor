const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
addListeners()


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
  
  
  
  // function myDown(e){
  //   if (e.pageX < x + textLength + canvas.offsetLeft && e.pageX > x - textLength + canvas.offsetLeft && e.pageY < y + 15 + canvas.offsetTop &&
  //   e.pageY > y -15 + canvas.offsetTop){
  //    x = e.pageX - canvas.offsetLeft;
  //    y = e.pageY - canvas.offsetTop;
  //    dragok = true;
  //    canvas.onmousemove = myMove;
  //   }
  //  }
  
  function setTextDrag(line) {
    gMeme.selectedLineIdx = line.lineIdx
    console.log(line);
  }


  function getMemePos(){
    const pos= gCurrMeme.lines.pos
    return pos
   }


  function drawText(text, x, y,textColor , size=40) {
    gCurrMeme.lines.pos= {x =x , y=y}
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = textColor ;
    gCtx.font = `${size}px Impact`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
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
      drawImg(line.lineIdx,line.txt, line.color) 
      lineIdx++
    })
  }
  

  
function SetTxtLocation(lineIdx,text,textColor) {
    if(!textColor) textColor=gColorText
    switch (lineIdx) {
      case 0:
        drawText(text,50, 50,textColor);
        break;
      case 1:
        drawText(text,50, 300,textColor);
        break;
      case 2:
        drawText(text,50, 200,textColor);
        break;
    }
  }