document.addEventListener("DOMContentLoaded", () => {
  const countriesContainer = document.getElementById("countries-container");
  const searchName = document.getElementById("searchName");
  const searchCapital = document.getElementById("searchCapital");
  const searchLanguage = document.getElementById("searchLanguage");

  const sortByName = document.getElementById("sortByName");
  const sortByCapital = document.getElementById("sortByCapital");
  const sortByLanguage = document.getElementById("sortByLanguage");

  const prevPage = document.getElementById("prevPage");
  const nextPage = document.getElementById("nextPage");
  const pageIndicator = document.getElementById("pageIndicator");

  let countriesData = countries;
  let filteredData = countriesData;
  let sortOrder = "asc";

  let itemsPerPage = 5;
  let currentPage = 1;

  function displayCountries(data) {
    countriesContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.classList.add("country-card");
      countryCard.innerHTML = `
            <img src="${country.flag}">
            <h3>${country.name}</h3>
            <p>Capital: ${country.capital || "N/A"}</p>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Languages: ${country.languages.join(", ")}</p>
        `;
      countriesContainer.appendChild(countryCard);
    });

    updatePaginationControls(data.length);
  }

  function updatePaginationControls(totalItems) {
    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === Math.ceil(totalItems / itemsPerPage);
    pageIndicator.textContent = `Page ${currentPage}`;
  }

  function filterCountries(field) {
    const inputs = {
      name: searchName.value.toLowerCase(),
      capital: searchCapital.value.toLowerCase(),
      language: searchLanguage.value.toLowerCase(),
    };

    const filters = {
      name: (country) => country.name.toLowerCase().includes(inputs.name),
      capital: (country) =>
        country.capital &&
        country.capital.toLowerCase().includes(inputs.capital),
      language: (country) =>
        country.languages.some((lang) =>
          lang.toLowerCase().includes(inputs.language)
        ),
    };

    let filteredOptions = countriesData.filter(filters[field]);

    showDropdown(filteredOptions, field);
    displayCountries(filteredOptions);
  }

  function showDropdown(data, field) {
    const dropdownList = document.getElementById(`${field}DropdownList`);
    dropdownList.innerHTML = "";

    data.forEach((item) => {
      const dropdownItem = document.createElement("div");
      dropdownItem.classList.add("dropdown-item");
      if (field === "name") dropdownItem.textContent = item.name;
      if (field === "capital") dropdownItem.textContent = item.capital;
      if (field === "language")
        dropdownItem.textContent = item.languages.join(", ");
      dropdownItem.addEventListener("click", () => {
        if (field === "name") searchName.value = item.name;
        if (field === "capital") searchCapital.value = item.capital;
        if (field === "language")
          searchLanguage.value = item.languages.join(", ");
        dropdownList.style.display = "none";
        filterCountries(field);
      });
      dropdownList.appendChild(dropdownItem);
    });

    dropdownList.style.display = "block";
  }

  function hideDropdowns() {
    document.querySelectorAll(".dropdown-list").forEach((dropdown) => {
      dropdown.style.display = "none";
    });
  }

  document.addEventListener("mousemove", hideDropdowns);
  searchName.addEventListener("input", () => filterCountries("name"));
  searchCapital.addEventListener("input", () => filterCountries("capital"));
  searchLanguage.addEventListener("input", () => filterCountries("language"));

  document.addEventListener("click", hideDropdowns);

  function sortData(sortBy) {
    filteredData.sort((a, b) => {
      let valA = a[sortBy] || "";
      let valB = b[sortBy] || "";

      if (sortBy === "languages") {
        valA = a.languages.length > 0 ? a.languages[0] : "";
        valB = b.languages.length > 0 ? b.languages[0] : "";
      }

      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

    sortOrder = sortOrder === "asc" ? "desc" : "asc";
    currentPage = 1;
    displayCountries(filteredData);
  }
    
  sortByName.addEventListener("click", () => sortData("name"));
  sortByCapital.addEventListener("click", () => sortData("capital"));
  sortByLanguage.addEventListener("click", () => sortData("languages"));

  prevPage.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayCountries(filteredData);
    }
  });

  nextPage.addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      currentPage++;
      displayCountries(filteredData);
    }
  });

  document
    .getElementById("recordsPerPage")
    .addEventListener("change", (event) => {
      itemsPerPage = parseInt(event.target.value);
      currentPage = 1;
      displayCountries(filteredData);
    });

  displayCountries(filteredData);
});
