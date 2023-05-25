const loadPhones = async (searchText, dataLimit) => {
  try {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
  } catch {
    (error) => console.log(error);
  }
};
const displayPhones = (phones, dataLimit) => {
  // console.log(phones, dataLimit);
  const phoneSection = document.getElementById("phone-container");
  phoneSection.textContent = "";
  //   display 12 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 12) {
    phones = phones.slice(0, 12);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  // display no found
  const noPhoneFound = document.getElementById("no-phone-found");
  if (phones.length === 0) {
    // noPhoneFound.classList.remove("d-none");
    noPhoneFound.style = "display:block !important;";
  } else {
    noPhoneFound.style = "display:none !important;";
    // noPhoneFound.classList.add("d-none ");
  }
  // display all Phone
  phones.forEach((phone) => {
    const phonesDiv = document.createElement("div");
    phonesDiv.classList.add("col");
    phonesDiv.innerHTML = `
      <div class="card">
      <img src=" ${phone.image} " class="card-img-top card-image" alt="..." />
      <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">
      This is a longer card with supporting text below as a natural
      lead-in to additional content. This content is a little bit
      longer.
      </p>
      <button id="details-btn" onclick="phoneDetails ('${phone.slug}')" class="btn btn-info my-2 text-bg-success"  data-bs-toggle="modal" data-bs-target="#phoneDetailModal">
      Details
    </button>
      </div>
      </div>
      `;
    phoneSection.appendChild(phonesDiv);
    // stop loader
  });
  toggleSpinner(false);
};
const prosesSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("input-field");
  const searchText = searchField.value;
  // searchField.value = "";
  loadPhones(searchText, dataLimit);
};
// Normal search
document.getElementById("search-btn").addEventListener("click", function () {
  //start loader
  prosesSearch(12);
});
// enter key search
document
  .getElementById("input-field")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      prosesSearch(12);
    }
  });
// loader function
const toggleSpinner = (isLoader) => {
  const displaySpinner = document.getElementById("loading-spinner");
  if (isLoader) {
    displaySpinner.classList.remove("d-none");
    // displaySpinner.style = "display:block !important;";
  } else {
    displaySpinner.classList.add("d-none");
    // displaySpinner.style = "display:none !important;";
  }
};
document.getElementById("show-all-btn").addEventListener("click", function () {
  prosesSearch();
});
// loadDetails
const phoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetail(data.data);
};
// phone Detail Modal Label add
const displayPhoneDetail = (phone) => {
  console.log(phone);
  const phoneTitle = document.getElementById("phoneDetailModalLabel");
  phoneTitle.classList.add("phone-title");
  phoneTitle.innerText = phone.name;
  const PhoneAllDetails = document.getElementById("modal-body");
  PhoneAllDetails.innerHTML = `
    <h2>Release Date: ${
      phone.releaseDate ? phone.releaseDate : "No releaseDate found"
    } </h2>
    <h2>Storage: ${phone.mainFeatures.memory} </h2>
    <h2>DisplaySize: ${phone.mainFeatures.displaySize} </h2>
    <h2>ChipSet: ${phone.mainFeatures.chipSet} </h2> 
    <h2>Sensors: ${phone.mainFeatures.sensors[0]}, ${
    phone.mainFeatures.sensors[1] ? phone.mainFeatures.sensors[1] : " "
  } ,${phone.mainFeatures.sensors[2] ? phone.mainFeatures.sensors[2] : " "},${
    phone.mainFeatures.sensors[3] ? phone.mainFeatures.sensors[3] : " "
  }, ${phone.mainFeatures.sensors[4] ? phone.mainFeatures.sensors[4] : " "},${
    phone.mainFeatures.sensors[5] ? phone.mainFeatures.sensors[5] : " "
  }.</h2>
    <h2>Brand: ${phone.brand} </h2>
    <h2>Others : ${phone.others.Bluetooth},${phone.others.WLAN} </h2>
    <h2>USB: ${phone.others.USB}</h2>
    `;
};
loadPhones("samsung");
