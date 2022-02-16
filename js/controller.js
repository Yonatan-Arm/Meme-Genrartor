function init() {
  createGallery()
  document.querySelectorAll("img").forEach((item) => {
    item.addEventListener("click", (event) => {
      onClickImg(item);
    });
  });
}

function onOpenMemeGenerator() {
  var generator = document.querySelector(".Meme-Editor");
  generator.classList.add("flex");
  closeGallery();
}

function onOpenGallery() {
  renderGallery();
  closeGenerator();
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
