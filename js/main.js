var $photoInput = document.querySelector('#entry-photo');
var $photoUpdate = document.querySelector('#image');
var $titleInput = document.querySelector('#entry-title');
var $notesInput = document.querySelector('#notes');
var $entries = document.querySelector('#journal-entries');

var $editTitle = document.querySelector('#edit-title');
var $editPhoto = document.querySelector('#edit-photo');
var $editImage = document.querySelector('#edit-image');
var $editNotes = document.querySelector('#edit-notes');

$photoInput.addEventListener('input', updatePhoto);
$entries.addEventListener('click', editClick);
$editPhoto.addEventListener('input', updateEditPhoto);

function editClick(event) {
  var target = event.target;
  if (target.closest('a')) {
    var parent = target.closest('li');
    var id = Number(parent.getAttribute('data-entry-id'));
    var found = data.entries.find(function (element) {
      return element.id === id;
    });
    data.editing = found;
    $editTitle.value = data.editing.title;
    $editPhoto.value = data.editing.photoUrl;
    $editImage.src = data.editing.photoUrl;
    $editNotes.value = data.editing.notes;
  }
}

function updateEditPhoto(event) {
  if ($editPhoto.value) {
    $editImage.src = $editPhoto.value;
  } else {
    $editImage.src = 'images/placeholder-image-square.jpg';
  }
}

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

  renderList(data.entries);

  $submit.reset();
  var $image = document.querySelector('#image');
  $image.src = 'images/placeholder-image-square.jpg';
}

function createEntry(entry) {
  var $entryList = document.createElement('li');
  $entryList.setAttribute('data-entry-id', entry.id);
  var $image = document.createElement('img');
  $image.setAttribute('src', entry.photoUrl);
  $entryList.appendChild($image);
  var $twoRows = document.createElement('div');
  $twoRows.setAttribute('class', 'two-rows');
  $entryList.appendChild($twoRows);
  var $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  $twoRows.appendChild($h2);
  var $anchor = document.createElement('a');
  $anchor.setAttribute('href', '#edit-entries');
  $twoRows.appendChild($anchor);
  var $span = document.createElement('span');
  $span.setAttribute('title', 'edit');
  $anchor.appendChild($span);
  var $edit = document.createElement('i');
  $edit.setAttribute('class', 'fas fa-pen');
  $edit.setAttribute('id', 'icon');
  $span.appendChild($edit);
  var $paragraph = document.createElement('p');
  $paragraph.textContent = entry.notes;
  $twoRows.appendChild($paragraph);
  return $entryList;
}

function renderList(list) {

  $entries.innerHTML = '';
  for (var i = 0; i < list.length; i++) {
    var entry = list[i];
    var journalEntry = createEntry(entry);
    $entries.appendChild(journalEntry);
  }
}

renderList(data.entries);
