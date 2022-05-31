var nextEntryId = 0;

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

// window.addEventListener('beforeunload', saveEntry);

function saveEntry(event) {
  event.preventDefault();

  var newEntry = {
    title: $titleInput.value,
    notes: $notesInput.value,
    photoUrl: $photoInput.value,
    id: nextEntryId
  };
  nextEntryId++;

  var entryBase = [];
  var entryJSON = localStorage.getItem('journal-entries');
  if (entryJSON !== null) {
    entryBase = JSON.parse(entryJSON);
  }

  entryBase.push(newEntry);

  var newEntryJSON = JSON.stringify(entryBase);
  localStorage.setItem('journal-entries', newEntryJSON);

  $photoUpdate.src = 'images/placeholder-image-square.jpg';
  $titleInput.value = '';
  $notesInput.value = '';
  $photoInput.value = '';
}
