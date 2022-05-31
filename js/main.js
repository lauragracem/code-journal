var photoInput = document.querySelector('#entry-photo');
var photoUpdate = document.querySelector('#image');

photoInput.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  if (photoInput.value) {
    photoUpdate.src = photoInput.value;
  } else {
    photoUpdate.src = 'images/placeholder-image-square.jpg';
  }
}
