const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

addBookmarkBtn.addEventListener("click", addBookmark);

function addBookmark() {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name || !url) {
    alert("Enter both the name and URL");
    return;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    alert("URL should start with http:// or https://");
    return;
  }

  // dodaj bookmark
  bookmarks.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  renderBookmarks();

  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
}

function renderBookmarks() {
  bookmarkList.innerHTML = "";

  bookmarks.forEach((bookmark) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.target = "_blank";
    link.textContent = bookmark.name;

    // kreiraj remove dugme
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", function () {
      // ukloni iz niza i storage
      bookmarks = bookmarks.filter(
        (b) => b.url !== bookmark.url || b.name !== bookmark.name,
      );
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      li.remove(); // ukloni iz DOM-a
    });

    li.appendChild(link);
    li.appendChild(removeButton);

    bookmarkList.appendChild(li);
  });
}

// prikaži bookmarkove kad se stranica učita
renderBookmarks();
