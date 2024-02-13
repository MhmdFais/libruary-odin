let addBookBtn = document.getElementById("add-book-btn");
let cancelBtn = document.getElementById("input-close-cancel");
let saveBtn = document.getElementById("input-close-save");
let dialog = document.querySelector("[data-modal]");
let bookDisplayDiv = document.querySelector(".book-list");

class Book {
  myLibruary = [];

  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  showModel() {
    dialog.showModal();
  }

  addBookToLibruary(title, author, pages, readStatus) {
    let newBook = new Book(title, author, pages, readStatus);
    this.myLibruary.push(newBook);
  }

  closeDialog(e) {
    e.preventDefault();
    dialog.close();
    document.querySelector("[data-modal-form]").reset();
  }

  displayBooks() {
    let bookDisplayDiv = document.querySelector(
      ".entered-book-display-section"
    );
    bookDisplayDiv.innerHTML = "";

    this.myLibruary.forEach((book, index) => {
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
        this.removeBook(index);
      });

      let toggleReadBtn = document.createElement("button");
      toggleReadBtn.classList.add("sts-btn");
      toggleReadBtn.textContent = "Toggle Read Status";
      toggleReadBtn.addEventListener("click", () => {
        this.toggleReadStatus(index);
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

  removeBook(index) {
    this.myLibruary.splice(index, 1);
    this.displayBooks();
  }

  toggleReadStatus(index) {
    this.myLibruary[index].readStatus = !this.myLibruary[index].readStatus;
    this.displayBooks();
  }
}

let bookObj = new Book();

saveBtn.addEventListener("click", () => {
  let bookTitle = document.getElementById("book-name").value;
  let authorName = document.getElementById("author-name").value;
  let noOfPages = document.getElementById("no-of-pages").value;
  let isRead = document.getElementById("is-read").checked;

  if (document.querySelector("[data-modal-form]").checkValidity()) {
    bookObj.addBookToLibruary(bookTitle, authorName, noOfPages, isRead);
    bookObj.displayBooks();

    // Reset form after submission
    dialog.close();
    document.querySelector("[data-modal-form]").reset();
  }
});

addBookBtn.addEventListener("click", () => {
  bookObj.showModel();
});

cancelBtn.addEventListener("click", (e) => {
  bookObj.closeDialog(e);
});
