const myLibruary = [];

let addBookBtn = document.getElementById("add-book-btn");
let cancelBtn = document.getElementById("input-close-cancel");
let saveBtn = document.getElementById("input-close-save");
let dialog = document.querySelector("[data-modal]");
let bookDisplayDiv = document.querySelector(".book-list");
// let bookDisContainer = document.querySelector(".entered-book-display-section");

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pages, readStatus) {
  let newBook = new Book(title, author, pages, readStatus);
  myLibruary.push(newBook);
}

// POP UP FORM

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
  document.querySelector("[data-modal-form]").reset();
});

// IMPLEMENTATION

saveBtn.addEventListener("click", () => {
  let bookTitle = document.getElementById("book-name").value;
  let authorName = document.getElementById("author-name").value;
  let noOfPages = document.getElementById("no-of-pages").value;
  let isRead = document.getElementById("is-read").checked;

  if (document.querySelector("[data-modal-form]").checkValidity()) {
    addBookToLibrary(bookTitle, authorName, noOfPages, isRead);
    displayBooks();

    // Reset form after submission
    dialog.close();
    document.querySelector("[data-modal-form]").reset();
  }
});

function displayBooks() {
  let bookDisplayDiv = document.querySelector(".entered-book-display-section");
  bookDisplayDiv.innerHTML = ""; // Clear existing content

  myLibruary.forEach((book, index) => {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    let titlePara = document.createElement("p");
    titlePara.textContent = `Title: ${book.title}`;

    let authorPara = document.createElement("p");
    authorPara.textContent = `Author: ${book.author}`;

    let pagesPara = document.createElement("p");
    pagesPara.textContent = `Pages: ${book.pages}`;

    let readStatusPara = document.createElement("p");
    readStatusPara.textContent = `Read Status: ${
      book.readStatus ? "Read" : "Not Read"
    }`;

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removeBook(index);
    });

    let toggleReadBtn = document.createElement("button");
    toggleReadBtn.classList.add("sts-btn");
    toggleReadBtn.textContent = "Toggle Read Status";
    toggleReadBtn.addEventListener("click", () => {
      toggleReadStatus(index);
    });

    bookDiv.appendChild(titlePara);
    bookDiv.appendChild(authorPara);
    bookDiv.appendChild(pagesPara);
    bookDiv.appendChild(readStatusPara);
    bookDiv.appendChild(removeBtn);
    bookDiv.appendChild(toggleReadBtn);

    bookDisplayDiv.appendChild(bookDiv);
  });
}

function removeBook(index) {
  myLibruary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(index) {
  myLibruary[index].readStatus = !myLibruary[index].readStatus;
  displayBooks();
}
