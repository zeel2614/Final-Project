document.addEventListener("DOMContentLoaded", () => {
  const countriesContainer = document.getElementById("countries-container");
  const searchName = document.getElementById("searchName");
  const searchCapital = document.getElementById("searchCapital");
  const searchLanguage = document.getElementById("searchLanguage");
  const sortByName = document.getElementById("sortByName");
  const sortByCapital = document.getElementById("sortByCapital");
  const sortByLanguage = document.getElementById("sortByLanguage");

  let countriesData = countries;
  let nameSortOrder = "asc";
  let capitalSortOrder = "asc";
  let languageSortOrder = "asc";

  function displayCountries(data) {
    countriesContainer.innerHTML = "";
    data.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.classList.add("country-card");
      countryCard.innerHTML = `
                    <img src="${country.flag}">
                    <h3>${country.name}</h3>
                    <p>Capital: ${country.capital || "N/A"}</p>
                    <p>Population: ${country.population.toLocaleString()}</p>
                    <p>Languages: ${country.languages}</p>
                `;
      countriesContainer.appendChild(countryCard);
    });
  }

  function filterCountries() {
    let filteredData = countriesData.filter((country) => {
      const nameMatch = country.name
        .toLowerCase()
        .includes(searchName.value.toLowerCase());
      const capitalMatch = country.capital
        ? country.capital
            .toLowerCase()
            .includes(searchCapital.value.toLowerCase())
        : false;
      const languageMatch = country.languages.some((lang) =>
        lang.toLowerCase().includes(searchLanguage.value.toLowerCase())
      );

      return nameMatch && capitalMatch && languageMatch;
    });

    displayCountries(filteredData);
  }

  searchName.addEventListener("input", filterCountries);
  searchCapital.addEventListener("input", filterCountries);
  searchLanguage.addEventListener("input", filterCountries);

  sortByName.addEventListener("click", () => {
    countriesData.sort((a, b) =>
      nameSortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    nameSortOrder = nameSortOrder === "asc" ? "desc" : "asc";
    displayCountries(countriesData);
  });

  sortByCapital.addEventListener("click", () => {
    countriesData.sort((a, b) =>
      capitalSortOrder === "asc"
        ? (a.capital || "").localeCompare(b.capital || "")
        : (b.capital || "").localeCompare(a.capital || "")
    );
    capitalSortOrder = capitalSortOrder === "asc" ? "desc" : "asc";
    displayCountries(countriesData);
  });

  sortByLanguage.addEventListener("click", () => {
    countriesData.sort((a, b) =>
      languageSortOrder === "asc"
        ? a.languages.length - b.languages.length
        : b.languages.length - a.languages.length
    );
    languageSortOrder = languageSortOrder === "asc" ? "desc" : "asc";
    displayCountries(countriesData);
  });

  displayCountries(countriesData);
});
