import { BookAPI } from '../api/book.service';
const bookApi = new BookAPI();

let selectedBooks = {};

const shoppingListArray =
  JSON.parse(localStorage.getItem('shoppingList')) || [];
console.log(shoppingListArray);
const shoppingList = document.querySelector('.shopping-list');

function addToFavorites(book) {
  favoriteBooks.push(book);
  localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
  renderFavorites();
}

function renderFavorites() {
  if (!shoppingList) return;

  shoppingList.innerHTML = '';

  if (selectedBooks.length === 0) {
    shoppingList.innerHTML = `
      <p class="some-book">
        This page is empty, add some books<br />and proceed to order.
      </p>
      <div class="stack-of-books">
        <div class="stack-of-books">
          <img
            src="./images/books-list-00100.png"
            alt="stack of books"
            width="265"
            height="198"
          />
        </div>
      `;
  } else {
    shoppingList.innerHTML = selectedBooks
      .map(book => {
        return `
          <li class="shopping-list-book">
            <img class="shopping-book-img" src="${book.book_image}" alt="${book.title}" width="100" height="142" />
            <div class="shopping-book-info">
              <div class="shopping-book-title">
                <h3>${book.title}</h3>
                <p>${book.category}</p>
              </div>
              <a href="#">
                <svg class="book__add-cart-icon" width="28" height="28">
                  <use href="./images/blocks.svg#icon-blocks1"></use>
                </svg>
              </a>
            </div>
            <div class="shopping-book-box">
              <p class="shopping-book-description">${book.description}</p>
              <div class="shopping-book-author">
                <p>${book.author}</p>
                <ul class="shopping-book-retailers">
                  <li class="books-retailers-icon">
                    <a href="#">
                      <svg class="amazon_logo-icon" width="32" height="14">
                        <use href="./images/blocks.svg#icon-Amazon_logo"></use>
                      </svg>
                    </a>
                  </li>
                  <li class="books-retailers-icon">
                    <a href="#">
                      <svg class="icon-book-opened" width="20" height="20">
                        <use href="./images/blocks.svg#icon-book-opened"></use>
                      </svg>
                    </a>
                  </li>
                  <li class="books-retailers-icon">
                    <a href="#">
                      <svg class="icon-books-cl" width="20" height="20">
                        <use href="./images/blocks.svg#icon-books-cl"></use>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        `;
      })
      .join('');
  }
}

(async () => {
  const books = await bookApi.getTopBooksList();
  const selectedId = shoppingListArray.map(b => b.id);
  selectedBooks = books.reduce((acc, b) => {
    b.books.forEach(book => {
      if (selectedId.includes(book._id)) {
        acc.push(book);
      }
    });
    return acc;
  }, []);
  // console.log(selectedBooks);
  renderFavorites();
})();
