

function  renderMeme(meme){
    drawImg(meme);
    closeGallery()

}



function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth - 40
  }

  function drawImg(elImg) {
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
  }
  
