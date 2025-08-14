// Array para almacenar los libros
const myLibrary = [];

// Declaracion variables y selectores
const libraryEl = document.querySelector('#library');
const form = document.querySelector('#bookForm');



// Objetos
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function clearLibrary() {
  libraryEl.innerHTML = "";
}

function makeBookCard(book) {
  const card = document.createElement('article');
  card.className = 'book-card';
  card.dataset.id = book.id;

  const h3 = document.createElement('h3');
  h3.textContent = book.title;

  const pAuthor = document.createElement('p');
  pAuthor.textContent = `Author: ${book.author}`;

  const pPages = document.createElement('p');
  pPages.textContent = `Pages: ${book.pages}`;

  const pRead = document.createElement('p');
  pRead.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

  card.appendChild(h3);
  card.appendChild(pAuthor);
  card.appendChild(pPages);
  card.appendChild(pRead);


  //declaramos variables creandolas dentro de la creación de la Card
  const btnRemove = document.createElement('button');
  btnRemove.textContent = 'Remove';
  btnRemove.classList.add('btn-remove');

  const btnToggle = document.createElement('button');
  btnToggle.textContent = book.read ? 'Mark as unread' : 'Mark as read';
  btnToggle.classList.add('btn-toggle');

  card.appendChild(btnRemove);
  card.appendChild(btnToggle);

  if (book.read) {
    card.classList.add('is-read');
  }

  return card;
}

function displayLibrary() {
  clearLibrary();
  myLibrary.forEach(book => {
    const card = makeBookCard(book);
    libraryEl.appendChild(card);
  });
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

libraryEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const card = e.target.closest('.book-card');
  const id = card?.dataset.id;
  if (!id) return;

  const idx = myLibrary.findIndex(b => b.id === id);
  if (idx === -1) return;

  if (btn.classList.contains('btn-remove')) {
    myLibrary.splice(idx, 1);
    displayLibrary();
  }

  if (btn.classList.contains('btn-toggle')){
    myLibrary[idx].toggleRead();
    displayLibrary();
  }
});

//prevenimos que pulsar en el formulario recargue la web
form.addEventListener('submit', (e) =>{
  e.preventDefault();
  console.log("Formulario enviado sin recargar")

  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const pages = Number(form.pages.value);
  const read = form.read.checked;

  //checks
  if (!title || !author){
    alert("Title and Author are required");
    return;
  }
  if (!Number.isInteger(pages) || pages <= 0){
    alert("Pages must be positive.");
    return
  }

  addBookToLibrary(title, author, pages, read);
  displayLibrary();
  form.reset();
  
  console.log({title, author, pages, read});
});