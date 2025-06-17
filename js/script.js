const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar .navbar-nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("show");
});

function showPopup(imageSrc) {
  const popup = document.getElementById("popup");
  const popupImage = document.getElementById("popupImage");
  popupImage.src = imageSrc;
  popup.style.display = "block";
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}
