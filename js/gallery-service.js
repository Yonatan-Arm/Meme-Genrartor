var gImgs = [];

function createGallery() {
  for (var i = 1; i < 19; i++) {
    var img = createImg(i);
    gImgs.push(img);
  }
  renderGallery();
}

function createImg(id) {
  var img = {
    id,
    url: `img/${id}.jpg`,
  };
  return img;
}

function renderGallery() {
  var gallery = document.querySelector(".image-Gallery");
  var strHTML = "";
  gImgs.forEach(
    (img) => (strHTML += `<img src="${img.url}" data-Id=${img.id} alt="meme"> `)
  );
  gallery.innerHTML = strHTML;
}

function closeGallery() {
  var gallery = document.querySelector(".image-Gallery");
  gallery.innerHTML = "";
}
