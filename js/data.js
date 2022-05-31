/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var entryJSON = localStorage.getItem('journal-entries');
if (entryJSON !== null) {
  data = JSON.parse(entryJSON);
}

window.addEventListener('beforeunload', entryBase);

function entryBase(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('journal-entries', dataJSON);
}
