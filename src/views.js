import moment from "moment";
import { getFilters } from "./filters";
import { getNotes, sortNotes } from "./notes";

/// generate the DOM structure for a note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  // setup the note title
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);

  // setup the linnk
  noteEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  // setup stats message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);

  return noteEl;
};

// Render application notes
const renderNotes = () => {
  const notesEl = document.querySelector("#notes");

  const filters = getFilters();
  const notes = sortNotes(filters.sortBy);

  const filtereNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  notesEl.innerHTML = "";

  if (filtereNotes.length > 0) {
    filtereNotes.forEach((note) => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show";
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};

const initializeEditPage = (noteId) => {
  const titleElement = document.querySelector("#note-title");
  const bodyElement = document.querySelector("#note-body");
  const dateELment = document.querySelector("#last-edited");
  const notes = getNotes();
  const note = notes.find((note) => note.id == noteId);

  if (!note) {
    location.assign("/index.html");
  }

  titleElement.value = note.title;
  bodyElement.value = note.body;
  dateELment.textContent = generateLastEdited(note.updatedAt);
};

//Generate the last edited message
const generateLastEdited = (timestamp) =>
  `Last edited ${moment(timestamp).fromNow()}`;

export { generateLastEdited, renderNotes, generateNoteDOM, initializeEditPage };
