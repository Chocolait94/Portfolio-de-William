document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.getElementById("searchIcon"); 
  const searchBar = document.getElementById("searchBar");
  const closeSearch = document.getElementById("closeSearch");

  searchIcon.addEventListener("click", () => {
    searchBar.classList.add("show");
  });

  closeSearch.addEventListener("click", () => {
    searchBar.classList.remove("show");
  });
})