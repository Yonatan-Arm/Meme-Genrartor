var gCanvas;
var gMeme;
var gCtx;
var gCurrImg;
var selectedLine = -1;
var gStartPos;
var gCurrLine;
var prevLine;
var prevWidth;
var gElCanvasContainer = document.querySelector('.canvas-container')
var gFont = "Impact";
var isSelected = false;
var gAlignText = "center";
const gTouchEvs = ["touchstart", "touchmove", "touchend"];
var isDrag = false;
var width = 40;
var gFontSize = 40;

function onOpenMemeGenerator(img) {
  gCanvas = document.getElementById("my-canvas");
  gCtx = gCanvas.getContext("2d");
  closeGallery();
  renderImgMeme(img);
  prevWidth= gCanvas.width
  addListeners();
}

function onDeleteText() {
  if (isSelected) {
    removeLine(selectedLine);
    renderMeme();
    isSelected = false;
    gCurrLine = "";
  }
}

function clearCanvas() {
  gCtx.clearRect(x, y, gCanvas.width, gCanvas.height);
}

function drawText(line, x, y, textColor = gColorText) {
  let size = gFontSize;
  let font = gFont;
  let align = gAlignText;
  if (line.size) size = line.size;
  if (line.font) font = line.font;
  if (line.align) align = line.align;
  gCtx.lineWidth = 1;
  gCtx.textAlign = align;
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = textColor;
  gCtx.font = `${size}px ${font}`;
  if (line.txt) line = line.txt;
  gCtx.fillText(line, x, y);
  gCtx.strokeText(line, x, y);
}

function renderMeme(txt) {
  drawImg(gCurrImg);
  var lineIdx = 0;
  gCurrMeme.lines.forEach((line) => {
    if (line.pos.x) {
      if( line.pos.x > gCanvas.width -50) line.pos.x= gCanvas.width -50
      drawText(line, line.pos.x, line.pos.y, line.color, line.align);
    } else {
      draw(lineIdx, line.txt);
    }
    lineIdx++;
  });
}

function ShowTextInput(txt) {
  if (!txt) txt = document.getElementById("Meme").value;
  if (isSelected) {
    if (!gCurrLine) {
      gCurrLine = removeLine(selectedLine);
    }
    renderMeme();
    drawText(
      txt,
      gCurrLine[0].pos.x,
      gCurrLine[0].pos.y,
      gColorText,
      gAlignText
    );
  } else {
    renderMeme();
    drawText(txt, gCanvas.width / 4, gCanvas.height / 2, gColorText);
  }
}

function updatePos(line, x, y) {
  if (!gMeme.lines[line]) return;
  if (x < 0 || x > gCanvas.width - 100) x = 100;
  gMeme.lines[line].pos = { x, y };
}

function renderImgMeme(img) {
  if (!img) img = gCurrImg;
  var generator = document.querySelector(".Meme-Editor");
  generator.style.display = "flex";
  gCanvas.style.display = "block";
  drawImg(img);
  gCurrImg = img;
  gMeme = createMeme(img.dataset.id);
}

function onDrawText(txt) {
  width = gCtx.measureText(txt).width;
  var txt = document.getElementById("Meme");
  if (isSelected)
    setLineTxt(txt.value, gFontSize, gCurrLine[0].pos, gAlignText);
  else setLineTxt(txt.value, gFontSize, 0, gAlignText);
  txt.value = "";
  isSelected = false;
  gCurrLine = "";
}

function onChangeFontSize(num) {
  // renderMeme()
  gFontSize = gFontSize + num;
  ShowTextInput();
}

function onchangeFont(font) {
  renderMeme();
  gFont = font;
  ShowTextInput();
}
function onChangeColor(color) {
  renderMeme();
  setColor(color);
  ShowTextInput();
}

function onSetAlignText(val) {
  renderMeme();
  gAlignText = val;
  ShowTextInput();
}

function OnDownload(link) {
  renderMeme();
  downloadImg(link);
}

function closeGenerator() {
  var generator = document.querySelector(".Meme-Editor");
  generator.style.display = "none";
  var canvas = document.getElementById("my-canvas");
  canvas.style.display = "none";
}

function resizeCanvas() {
  gElCanvasContainer= document.querySelector('.canvas-container')
  gCanvas.width =  gElCanvasContainer.offsetWidth
  gCanvas.height =  gElCanvasContainer.offsetHeight
    renderMeme();
  }


function addListeners() {
  addMouseListeners();
  addTouchListeners();
  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
  });
}

function addMouseListeners() {
  gCanvas.addEventListener("mousemove", onMove);
  gCanvas.addEventListener("mousedown", onDown);
  gCanvas.addEventListener("mouseup", onUp);
}

function addTouchListeners() {
  gCanvas.addEventListener("touchmove", onMove);
  gCanvas.addEventListener("touchstart", onDown);
  gCanvas.addEventListener("touchend", onUp);
}

function onDown(ev) {
  const pos = getEvPos(ev);
  if (isTextClicked(pos) > -1) {
    setLineDrag(true);
    gStartPos = pos;
    document.body.style.cursor = "grabbing";
  }
}

function onChooseLine() {
  if (selectedLine === -1) selectedLine = 0;
  if (gMeme.lines[selectedLine]) {
    if (selectedLine > 0 || prevLine) {
      gCtx.clearRect(
        prevLine.pos.x - width,
        prevLine.pos.y - gFontSize - 2,
        prevLine.pos.x + 5,
        prevLine.pos.y + 2
      );
      renderMeme();
    }
    isSelected = true;
    var line = gMeme.lines[selectedLine];
    var distance = gCtx.measureText(line.txt).width;
    gCtx.strokeStyle = "blue";
    gCtx.strokeRect(
      line.pos.x - distance,
      line.pos.y - gFontSize - 2,
      line.pos.x + distance,
      line.pos.y + 2
    );
    var txt = document.getElementById("Meme");
    txt.value = gMeme.lines[selectedLine].txt;
    selectedLine++;
    prevLine = gMeme.lines[selectedLine - 1];
  }
  if (!gMeme.lines[selectedLine]) selectedLine = -1;
}

function isTextClicked(clickedPos) {
  selectedLine = gMeme.lines.findIndex((line) => {
    var distance = gCtx.measureText(line.txt).width;
    return (
      line.pos.x < clickedPos.x + distance &&
      line.pos.x + distance > clickedPos.x &&
      line.pos.y - gFontSize < clickedPos.y +  gFontSize &&
      line.pos.y + line.size >= clickedPos.y
    );
  });
  return selectedLine;
}

function onMove(ev) {
  if (isDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    moveLine(dx, dy);
    gMeme.lines[selectedLine].pos = gStartPos;
    renderMeme();
  }
}

function onUp() {
  setLineDrag(false);
  selectedLine = -1;
  document.body.style.cursor = "grab";
}

function setLineDrag(flag) {
  isDrag = flag;
}

function moveLine(dx, dy) {
  gStartPos.x += dx;
  gStartPos.y += dy;
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append("img", imgDataUrl);

  fetch("//ca-upload.com/here/upload.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log("Got back live url:", url);
      onSuccess(url);
    })
    .catch((err) => {
      console.error(err);
    });
}

function uploadImg() {
  const imgDataUrl = gCanvas.toDataURL("image/jpeg");

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);

    document.querySelector(".share-container").innerHTML = `
      <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
         Share   
      </a>`;
  }

  doUploadImg(imgDataUrl, onSuccess);
}

function onImgInput(ev) {
  loadImageFromInput(ev, uploadImg);
}

function uploadImg(img) {
  gCurrImg = img;
  renderMeme();
}

function loadImageFromInput(ev, onImageReady) {
  document.querySelector(".share-container").innerHTML = "";
  var reader = new FileReader();

  reader.onload = function (event) {
    console.log("onload");
    var img = new Image();
    // Render on canvas
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
    gImg = img;
  };
  console.log("after");
  reader.readAsDataURL(ev.target.files[0]);
}
