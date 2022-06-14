var $photoInput = document.querySelector('#entry-photo');
var $photoUpdate = document.querySelector('#image');
var $titleInput = document.querySelector('#entry-title');
var $notesInput = document.querySelector('#notes');
var $entries = document.querySelector('#journal-entries');
var $new = document.querySelector('#new');

var $entryForm = document.querySelector('.journal-entry');
var $formHeader = document.querySelector('.journal-entry h1');
var $entriesEntry = document.querySelector('.entries');
var $header = document.querySelector('.header');
var $delete = document.querySelector('.delete');

var $submit = document.querySelector('#form');

$photoInput.addEventListener('input', updatePhoto);
$entries.addEventListener('click', editClick);
$new.addEventListener('click', function () {
  data.editing = null;
  switchView('journal-entry');
});

function editClick(event) {
  var target = event.target;
  if (target.closest('a')) {
    var parent = target.closest('li');
    var id = Number(parent.getAttribute('data-entry-id'));
    var found = data.entries.find(function (element) {
      return element.id === id;
    });
    data.editing = found;

    $titleInput.value = data.editing.title;
    $photoInput.value = data.editing.photoUrl;
    $photoUpdate.src = data.editing.photoUrl;
    $notesInput.value = data.editing.notes;
  }

  switchView('journal-entry');
}

function updatePhoto(event) {
  if ($photoInput.value) {
    $photoUpdate.src = $photoInput.value;
  } else {
    $photoUpdate.src = 'images/placeholder-image-square.jpg';
  }
}

$submit.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  if (data.editing) {
    editSaveEntry();
  } else {
    saveEntry();
  }
}

function saveEntry() {
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
  $photoUpdate.src = 'images/placeholder-image-square.jpg';

  switchView('entries');
}

function editSaveEntry() {
  var editEntry = {
    title: $titleInput.value,
    notes: $notesInput.value,
    photoUrl: $photoInput.value,
    id: data.editing.id
  };

  var findIndex = data.entries.findIndex(function (element) {
    return element.id === data.editing.id;
  });
  data.entries[findIndex] = editEntry;

  renderList(data.entries);

  $submit.reset();
  var $image = document.querySelector('#image');
  $image.src = 'images/placeholder-image-square.jpg';
  data.editing = null;
  switchView('entries');
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

function switchView(view) {
  if (view === 'journal-entry') {
    $entryForm.classList.remove('hidden');
    $header.classList.add('hidden');
    if (data.editing) {
      $formHeader.textContent = 'Edit Entry';
    } else {
      $formHeader.textContent = 'New Entry';
      $delete.className = 'delete hidden';
    }
  } else {
    $entryForm.classList.add('hidden');
  }

  if (view === 'entries') {
    $entriesEntry.classList.remove('hidden');
  } else {
    $entriesEntry.classList.add('hidden');
  }

}

window.addEventListener('DOMContentLoaded', event => {
  switchView('entries');
});
