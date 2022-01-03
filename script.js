function Book(title, author, pages, isRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
}

Book.prototype.info = function() {
	let sToReturn = `${this.title} by ${this.author}, ${this.pages} pages, `;
	if (this.isRead === true)
		sToReturn += "read already";
	else
		sToReturn += "not read yet";
	return sToReturn;
}

Book.prototype.read = function() {
	this.isRead = !this.isRead;
}

let myLibrary = [];

const displayBooksDOM = document.querySelector("#display-books");

function addBookToLibrary(book) {
	myLibrary.push(book);
	displayAllBooks();
}

function removeBookFromLibrary(index) {
	myLibrary.splice(index, 1);
	displayAllBooks();
}

function readTheLibraryBook(index) {
	myLibrary[index].read();
	displayAllBooks();
}

function displayAllBooks() {
	displayBooksDOM.replaceChildren();
	for (let i = 0; i < myLibrary.length; ++i) {
		const bookOnDisplay = document.createElement("div");
		const bookOnDisplayText = document.createTextNode(myLibrary[i].info());
		bookOnDisplay.appendChild(bookOnDisplayText);
		
		const bookOnDisplayRemoveButton = document.createElement("button");
		bookOnDisplayRemoveButton.textContent = "REMOVE BOOK"
		bookOnDisplay.appendChild(bookOnDisplayRemoveButton);
		
		const bookOnDisplayReadButton = document.createElement("button");
		bookOnDisplayReadButton.textContent = "SWITCH READ"
		bookOnDisplay.appendChild(bookOnDisplayReadButton);
		
		bookOnDisplayRemoveButton.addEventListener('click', () => removeBookFromLibrary(i));
		bookOnDisplayReadButton.addEventListener('click', () => readTheLibraryBook(i));
		
		displayBooksDOM.appendChild(bookOnDisplay);
	}
}

function newBookCreate() {
	const sBookTitle = prompt("Please write book's title");
	if (sBookTitle === null) return;
	const sBookAuthor = prompt("Please write book's author");
	if (sBookAuthor === null) return;
	let iBookPages;
	while (true) {
		const sBookPages = prompt("Please write a number of book's pages", "1");
		if (sBookPages === null) return;
		iBookPages = parseInt(sBookPages);
		if (isNaN(iBookPages)) {
			alert("Error, not a number!")
		}
		else if (iBookPages <= 0) {
			alert("Not enough pages!")
		}
		else {
			break;
		}
	}
	const bBookRead = confirm("Have you read the book?");
	const newBook = new Book(sBookTitle, sBookAuthor, iBookPages, bBookRead);
	addBookToLibrary(newBook);
}

document.querySelector("#new-book-button").addEventListener('click', newBookCreate);