const notesContainer = document.getElementById("app");
const addNoteBtn = notesContainer.querySelector(".add-note-btn");
const delNotesBtn = document.querySelector(".delete-notes-btn");
const noteTitleModalForm = document.getElementById("note-title-modal");

// You can use either forEach or Map
getNotes().map(note => {
  const noteElement = createNoteElement(note.id, note.title, note.content);
  notesContainer.insertBefore(noteElement, addNoteBtn);
});

addNoteBtn.addEventListener('click', addNote);
delNotesBtn.addEventListener('click', deleteAllNotes);

// Get Notes
function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// Save Notes
function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// Create Note Element
function createNoteElement(id, title, content) {
  const textareaElement = document.createElement("textarea");
  const divElement = document.createElement("div");
  const divHeaderElement = document.createElement("div");
  const btnElement = document.createElement("button");
  const imgElement = document.createElement("img");
  const pElement = document.createElement("p");
  const inputElement = document.createElement("input");

  imgElement.src = 'src/asset/close.png';
  btnElement.classList.add('close-btn');
  btnElement.appendChild(imgElement);

  pElement.classList.add('notes-title');
  pElement.innerText = title;

  inputElement.setAttribute('id', 'note-title');
  inputElement.setAttribute('autocomplete', 'off');
  inputElement.placeholder = 'Title';
  inputElement.value = title;

  divHeaderElement.classList.add('note-header');
  divHeaderElement.append(inputElement, btnElement);

  textareaElement.classList.add('note');
  textareaElement.setAttribute('spellcheck', 'false');
  textareaElement.value = content;
  textareaElement.placeholder = 'Take a note...';

  divElement.classList.add('sticky-notes', 'note-animation');
  divElement.append(divHeaderElement, textareaElement);

  inputElement.addEventListener("change", () => {
    console.log("changing input");
    updateNote(id, inputElement.value, textareaElement.value);
  });

  textareaElement.addEventListener("change", () => {
    console.log("changing textarea");
    updateNote(id, inputElement.value, textareaElement.value);
  });

  btnElement.addEventListener("click", () => {
    const doDelete = confirm("Are you sure you wish to delete this note?");
    if (doDelete) {
      deleteNote(id, divElement);
    }
  })

  //  return textareaElement;
  return divElement;
}

// Add Note
function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    title: "",
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.title, noteObject.content)
  notesContainer.insertBefore(noteElement, addNoteBtn);

  notes.push(noteObject);
  saveNotes(notes);
}

// Update Note
function updateNote(id, title, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter(note => note.id == id)[0];

  targetNote.title = title;
  targetNote.content = newContent;
  saveNotes(notes);
}

// Delte Note
function deleteNote(id, element) {
  const notes = getNotes().filter(note => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}

function deleteAllNotes() {
  const doDelete = confirm("Are you sure you wish to clear all notes?");

  if (doDelete) {
    location.reload();
    window.localStorage.clear();
  }

}
