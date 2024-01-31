const myLibruary = [];

let addBookBtn = document.getElementById("add-book-btn");
let cancelBtn = document.getElementById("input-close-cancel");
let saveBtn = document.getElementById("input-close-save");
let dialog = document.getElementById("dialog");

function Book(title, author, pages, readStatus){
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
});

// IMPLEMENTATION 

saveBtn.addEventListener("click", () => {
    let bookTitle = document.getElementById("book-name").value;
    let authorName = document.getElementById("author-name").value;
    let noOfPages = document.getElementById("no-of-pages").value;
    let isRead = document.getElementById("is-read").checked;

    // console.log(bookTitle);
    // console.log(authorName);
    // console.log(noOfPages);
    // console.log(isRead);

    addBookToLibrary(bookTitle, authorName, noOfPages, isRead);

    clearTheInputFields();

})

function clearTheInputFields(){
    document.getElementById("book-name").value = "";
    document.getElementById("author-name").value = "";
    document.getElementById("no-of-pages").value = "";
    document.getElementById("is-read").checked = false;
}
