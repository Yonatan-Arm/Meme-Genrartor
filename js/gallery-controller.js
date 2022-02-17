
function init() {
  createGallery()
  document.querySelectorAll("img").forEach((item) => {
    item.addEventListener("click", (event) => {
      onClickImg(item);
    });
  });

}


function onOpenGallery() {
  renderGallery();
  closeGenerator();
  document.querySelectorAll("img").forEach((item) => {
    item.addEventListener("click", (event) => {
      onClickImg(item);
    });
  });
}

function onClickImg(img) {
    onOpenMemeGenerator(img)
    closeGallery()
}


function closeGallery() {
  var gallery = document.querySelector(".image-Gallery");
  gallery.innerHTML = "";
}


function openMenu() {
  var elBtn = document.querySelector('.pages-btn')
  elBtn.style.display='grid' ;
  elBtn.innerHTML += `<button class="btn-close" onclick="closeMenu()">X</button>`
}

function closeMenu() {
  var elBtn = document.querySelector('.pages-btn')
  elBtn.style.display='none' ;
}


