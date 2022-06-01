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

  $submit.reset();
}

var entryIndex = [
  {
    title: 'Dummy Entry',
    description: 'This is a random entry for testing purposes only.',
    imageURL: 'images/placeholder-image-square.jpg'
  }
];

function createEntry(entry) {
  var $entryList = document.createElement('li');
  var $image = document.createElement('img');
  $image.setAttribute('src', entry.imageURL);
  $entryList.appendChild($image);
  var $twoRows = document.createElement('div');
  $twoRows.setAttribute('class', 'two-rows');
  $entryList.appendChild($twoRows);
  var $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  $twoRows.appendChild($h2);
  var $paragraph = document.createElement('p');
  $paragraph.textContent = entry.description;
  $twoRows.appendChild($paragraph);
  return $entryList;
}

var $entries = document.querySelector('#journal-entries');
for (var i = 0; i < entryIndex.length; i++) {
  var entry = entryIndex[i];
  var journalEntry = createEntry(entry);
  $entries.appendChild(journalEntry);
}
