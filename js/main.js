var $photoInput = document.querySelector('#entry-photo');
var $photoUpdate = document.querySelector('#image');
var $titleInput = document.querySelector('#entry-title');
var $notesInput = document.querySelector('#notes');

$photoInput.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  if ($photoInput.value) {
    $photoUpdate.src = $photoInput.value;
  } else {
    $photoUpdate.src = 'images/placeholder-image-square.jpg';
  }
}

var $submit = document.querySelector('#form');

$submit.addEventListener('submit', saveEntry);

function saveEntry(event) {
  event.preventDefault();

  var newEntry = {
    title: $titleInput.value,
    notes: $notesInput.value,
    photoUrl: $photoInput.value,
    id: data.nextEntryId
  };
  data.nextEntryId++;

  data.entries.unshift(newEntry);

  var newEntryJSON = JSON.stringify(data);
  localStorage.setItem('journal-entries', newEntryJSON);

  $submit.reset();
}
