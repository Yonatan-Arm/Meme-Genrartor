function init() {
  createGallery();
  document.querySelectorAll("img").forEach((item) => {
    item.addEventListener("click", () => {
      onClickImg(item);
    });
  });
}

function onOpenGallery() {
  // closeMenu()
  renderGallery();
  closeGenerator();
  document.querySelectorAll("img").forEach((item) => {
    item.addEventListener("click", () => {
      onClickImg(item);
    });
  });
}

function onClickImg(img) {
  onOpenMemeGenerator(img);
  closeGallery();
}

function closeGallery() {
  var gallery = document.querySelector(".image-Gallery");
  gallery.innerHTML = "";
}

function openMenu() {
  var elBtn = document.querySelector(".pages-btn");
  elBtn.style.display = "grid";
  elBtn.innerHTML += `<button class="btn-close" onclick="closeMenu()">X</button>`;
  var elLayout = document.querySelector(".main-layout");
  // elLayout.style.pointer = "none";
}

function closeMenu() {
  var elBtn = document.querySelector(".pages-btn");
  elBtn.style.display = "none";
}
