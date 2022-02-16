
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
}


function closeGallery() {
  var gallery = document.querySelector(".image-Gallery");
  gallery.innerHTML = "";
}

