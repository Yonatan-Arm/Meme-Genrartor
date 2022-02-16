function init() {
  createGallery()
  document.querySelectorAll("img").forEach((item) => {
    item.addEventListener("click", (event) => {
      onClickImg(item);
    });
  });
window.addEventListener('resize', () => {
    resizeCanvas()})
}

function onOpenMemeGenerator() {
  closeGallery();
  getMeme()
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
    getMeme(img)
}

function closeGenerator() {
  var generator = document.querySelector(".Meme-Editor");
  generator.classList.remove("flex");
  var canvas = document.getElementById("my-canvas");
  canvas.style.display = "none";
}

function closeGallery() {
  var gallery = document.querySelector(".image-Gallery");
  gallery.innerHTML = "";
}

function onDrawText(txt){
    drawText(txt, 20 , 50)
}

 function onChangeColor(color){
     console.log(color);
 }

 function OnDownload(link){
     downloadImg(link)
 }