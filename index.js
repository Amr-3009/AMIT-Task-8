// grid for title and control buttons
const gridContainer = document.createElement("div");
gridContainer.setAttribute("class", "grid-container");
document.body.appendChild(gridContainer);
// Header h1 tag
const header = document.createElement("h1");
header.textContent = "Gallery";
gridContainer.appendChild(header);
// input tag for uploading images
const input = document.createElement("input");
input.setAttribute("id", "img-upload");
input.setAttribute("type", "file");
input.setAttribute("accept", "image/*");
gridContainer.appendChild(input);
const label = document.createElement("label");
label.textContent = "Upload Image";
label.setAttribute("for", "img-upload");
label.setAttribute("class", "upload-input");
gridContainer.appendChild(label);
// button tag for opening the detele all images modal
const button = document.createElement("button");
button.setAttribute("data-modal-target", "#modal");
button.setAttribute("class", "delete-all-btn");
button.textContent = "Delete All";
gridContainer.appendChild(button);
// variables to store the images
let imagesArray = [];
// gallery-container for displaying the images
const galleryContainer = document.createElement("div");
galleryContainer.setAttribute("class", "gallery-container");
document.body.appendChild(galleryContainer);
// modal for deleting all images
const modal = document.createElement("div");
modal.setAttribute("class", "modal");
modal.setAttribute("id", "modal");
document.body.appendChild(modal);
// modal header
const modalHeader = document.createElement("div");
modalHeader.setAttribute("class", "modal-header");
modal.appendChild(modalHeader);
const modalTitle = document.createElement("div");
modalTitle.textContent = "Deleting all images";
modalHeader.appendChild(modalTitle);
const modalClose = document.createElement("button");
modalClose.setAttribute("data-close-button", "");
modalClose.setAttribute("class", "modal-close");
modalClose.textContent = "✖";
modalHeader.appendChild(modalClose);
// modal body
const modalContent = document.createElement("div");
modalContent.setAttribute("class", "modal-content");
modal.appendChild(modalContent);
const modalText = document.createElement("p");
modalText.textContent = "Are you sure you want to delete all images?";
modalContent.appendChild(modalText);
const modalConfirm = document.createElement("button");
modalConfirm.setAttribute("class", "modal-confirm");
modalConfirm.textContent = "✔";
modalContent.appendChild(modalConfirm);
// modal overlay
const modalOverlay = document.createElement("div");
modalOverlay.setAttribute("id", "modal-overlay");
document.body.appendChild(modalOverlay);
// modal variables
// modal-close -> button that closes the modal
// modal-confirm -> button that confirms the deletion of all images
// modal-overlay -> overlay for the modal
// modal -> modal for deleting all images
//------------------------------------------
// image modal
const imgModal = document.createElement("div");
imgModal.setAttribute("class", "img-modal");
imgModal.setAttribute("id", "img-modal");
document.body.appendChild(imgModal);
// image modal header
const imgModalHeader = document.createElement("div");
imgModalHeader.setAttribute("class", "img-modal-header");
imgModal.appendChild(imgModalHeader);
const imgModalTitle = document.createElement("div");
// image name displayed in the modal
imgModalTitle.textContent = "placeholder";
imgModalHeader.appendChild(imgModalTitle);
const imgModalClose = document.createElement("button");
imgModalClose.setAttribute("data-close-button", "");
imgModalClose.setAttribute("class", "img-modal-close");
imgModalClose.textContent = "✖";
imgModalHeader.appendChild(imgModalClose);
// image modal body
const imgModalContent = document.createElement("div");
imgModalContent.setAttribute("class", "img-modal-content");
imgModal.appendChild(imgModalContent);
const prevBtn = document.createElement("button");
prevBtn.setAttribute("class", "prev-btn");
prevBtn.textContent = "◀";
imgModalContent.appendChild(prevBtn);
const imgContainer = document.createElement("div");
const modalImg = document.createElement("img");
modalImg.setAttribute("class", "modal-img");

// image displayed in the modal
modalImg.src = "assets/imgs/placeholder.png";
imgContainer.appendChild(modalImg);
imgContainer.setAttribute("class", "img-container");
imgModalContent.appendChild(imgContainer);
//div for the radio buttons
const imgModalNav = document.createElement("div");
imgModalNav.setAttribute("class", "img-modal-nav");
imgContainer.appendChild(imgModalNav);
const nextBtn = document.createElement("button");
nextBtn.setAttribute("class", "next-btn");
nextBtn.textContent = "▶";
imgModalContent.appendChild(nextBtn);
const imgModalOverlay = document.createElement("div");
imgModalOverlay.setAttribute("id", "img-modal-overlay");
document.body.appendChild(imgModalOverlay);

// Functions
imgModalClose.addEventListener("click", toggleImgModal);
imgModalOverlay.addEventListener("click", toggleImgModal);
button.addEventListener("click", toggleModal);

modalClose.addEventListener("click", toggleModal);
document.addEventListener("keydown", escModal);
modalOverlay.addEventListener("click", toggleModal);

modalConfirm.addEventListener("click", () => {
  deleteAll();
  toggleModal();
});

// function to display the images
input.addEventListener("change", () => {
  const file = input.files;
  imagesArray.push(file[0]);
  displayImages();
});

function toggleModal() {
  modal.classList.toggle("active");
  modalOverlay.classList.toggle("active");
}

function displayImages() {
  let images = "";
  imagesArray.forEach((image, index) => {
    images += `<div class = "gallery-item">
    <p class = "image-name">${extractFilename(image.name)}</p>
    <img data-modal-target = "#img-modal" class = "gallery-image" src = "${URL.createObjectURL(
      image
    )}" alt = "image" />
      <div class = "buttons-container">
        <button class = "delete-btn" onclick = "deleteImage(${index})">Delete</button>
        <button class = "edit-btn" onclick = "renameImage(${index})">Rename</button>
      </div>
    </div>`;
  });
  galleryContainer.innerHTML = images;
  let galleryImages = document.querySelectorAll(".gallery-image");
  galleryImages.forEach((image) => {
    image.addEventListener("click", toggleImgModal);
  });
  imgModalArray();
}

function deleteImage(index) {
  imagesArray.splice(index, 1);
  displayImages();
}

function deleteAll() {
  imagesArray = [];
  displayImages();
}

function extractFilename(path) {
  const match = path.match(/([^\\/]+)(?=\.\w+$)/);
  return match ? match[0] : "";
}

function renameImage(index) {
  const imageName = document.querySelectorAll(".image-name")[index];
  newName = prompt("Enter new name", imageName.innerHTML);
  if (newName !== "") {
    imageName.innerHTML = newName;
  } else {
    alert("Please enter a valid name");
  }
}

function escModal(e) {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    toggleModal();
  } else if (e.key === "Escape" && imgModal.classList.contains("active")) {
    toggleImgModal();
  } else if (e.key === "ArrowRight" && imgModal.classList.contains("active")) {
    nextImage();
  } else if (e.key === "ArrowLeft" && imgModal.classList.contains("active")) {
    prevImage();
  }
}

function toggleImgModal(e) {
  imgModal.classList.toggle("active");
  imgModalOverlay.classList.toggle("active");
  displayModalImage(e.target.src);
  imgModalTitle.textContent = e.target.previousElementSibling.textContent;
  createRadio();
  radioNav();
}

function displayModalImage(src) {
  modalImg.src = src;
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

function imgModalArray() {
  let imgsModalArray = [];
  const galleryImages = document.querySelectorAll(".gallery-image");
  galleryImages.forEach((image) => {
    imgsModalArray.push(image.src);
  });
  return imgsModalArray;
}

function imgModalNameArray() {
  let imgsModalNameArray = [];
  const galleryImages = document.querySelectorAll(".image-name");
  galleryImages.forEach((image) => {
    imgsModalNameArray.push(image.textContent);
  });
  return imgsModalNameArray;
}

function nextImage() {
  let imgsModalArray = imgModalArray();
  let currentImg = modalImg.src;
  let index = imgsModalArray.indexOf(currentImg);
  if (index === imgsModalArray.length - 1) {
    index = -1;
  }
  modalImg.src = imgsModalArray[index + 1];
  let imgsModalNameArray = imgModalNameArray();
  let currentImgName = imgModalTitle.textContent;
  let indexName = imgsModalNameArray.indexOf(currentImgName);
  if (indexName === imgsModalNameArray.length - 1) {
    indexName = -1;
  }
  imgModalTitle.textContent = imgsModalNameArray[indexName + 1];
  radioNav();
}

function prevImage() {
  let imgsModalArray = imgModalArray();
  let currentImg = modalImg.src;
  let index = imgsModalArray.indexOf(currentImg);
  if (index === 0) {
    index = imgsModalArray.length;
  }
  modalImg.src = imgsModalArray[index - 1];
  let imgsModalNameArray = imgModalNameArray();
  let currentImgName = imgModalTitle.textContent;
  let indexName = imgsModalNameArray.indexOf(currentImgName);
  if (indexName === 0) {
    indexName = imgsModalNameArray.length;
  }
  imgModalTitle.textContent = imgsModalNameArray[indexName - 1];
  radioNav();
}

function createRadio() {
  const radioArray = document.querySelectorAll(".radio-button");
  if (radioArray.length > 0) {
    for (let i = 0; i < radioArray.length; i++) {
      radioArray[i].remove();
    }
  }
  let imgsTotal = document.querySelectorAll(".gallery-image").length;
  for (let i = 0; i < imgsTotal; i++) {
    let radioBtn = document.createElement("input");
    radioBtn.setAttribute("type", "radio");
    radioBtn.setAttribute("class", "radio-button");
    radioBtn.setAttribute("name", "radio-btn");
    radioBtn.setAttribute("id", `radio-btn-${i}`);
    imgModalNav.appendChild(radioBtn);
  }
}

function radioNav() {
  let radioArray = document.querySelectorAll(".radio-button");
  let imgsModalArray = imgModalArray();
  let currentImg = modalImg.src;
  let index = imgsModalArray.indexOf(currentImg);
  radioArray[index].checked = true;
  for (let i = 0; i < radioArray.length; i++) {
    radioArray[i].addEventListener("click", () => {
      modalImg.src = imgsModalArray[i];
      imgModalTitle.textContent = imgModalNameArray()[i];
    });
  }
}
