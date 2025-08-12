// Array para almacenar los libros
const myLibrary = [];

// Elemento HTML donde se pintan
const libraryEl = document.querySelector('#library');

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

  return card;
}

function displayLibrary() {
  clearLibrary();
  myLibrary.forEach(book => {
    const card = makeBookCard(book);
    libraryEl.appendChild(card);
  });
}
