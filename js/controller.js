

function init(){
    document.querySelectorAll('img').forEach(item => {
        item.addEventListener('click', event => {
            onClickImg(item)
        })
      })
}

function onOpenMemeGenerator(){
    renderMeme(memeId)
}


function onOpenGallery(){
    var gallery=document.querySelector('.Image-Gallery')
   
}

function onClickImg(img) {
    img.style.border= "3px solid red";
}