var gCanvas;
var gCtx ;

function init(){
    renderGallery()
gCanvas = document.getElementById('my-canvas');
gCtx = gCanvas.getContext('2d');
resizeCanvas()
  
}

function onOpenMemeGenerator(){
    var generator = document.querySelector('.Meme-Editor')
    generator.classList.add('flex');
    // renderMeme()
    closeGallery()
}


function onOpenGallery(){
    renderGallery()
    closeGenerator()
   document.querySelectorAll('img').forEach(item => {
    item.addEventListener('click', event => {
        onClickImg(item)
    })
  })
}


function onClickImg(img) {
    img.style.border= "3px solid red";
    gCanvas.style.display="block";
    renderMeme(img)
}

function closeGenerator(){
    var generator = document.querySelector('.Meme-Editor')
    generator.classList.remove('flex');
    var canvas= document.getElementById('my-canvas')
    canvas.style.display="none"

}
 
function closeGallery(){
    var gallery = document.querySelector('.image-Gallery')
    gallery.innerHTML='';
}