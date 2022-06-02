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

  renderList(data.entries);

  $submit.reset();
  var $image = document.querySelector('#image');
  $image.src = 'images/placeholder-image-square.jpg';
}

function createEntry(entry) {
  var $entryList = document.createElement('li');
  var $image = document.createElement('img');
  $image.setAttribute('src', entry.photoUrl);
  $entryList.appendChild($image);
  var $twoRows = document.createElement('div');
  $twoRows.setAttribute('class', 'two-rows');
  $entryList.appendChild($twoRows);
  var $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  $twoRows.appendChild($h2);
  var $edit = document.createElement('i');
  $edit.setAttribute('class', 'fas fa-pen');
  $twoRows.appendChild($edit);
  var $paragraph = document.createElement('p');
  $paragraph.textContent = entry.notes;
  $twoRows.appendChild($paragraph);
  return $entryList;
}

function renderList(list) {
  var $entries = document.querySelector('#journal-entries');
  $entries.innerHTML = '';
  for (var i = 0; i < list.length; i++) {
    var entry = list[i];
    var journalEntry = createEntry(entry);
    $entries.appendChild(journalEntry);
  }
}

renderList(data.entries);
