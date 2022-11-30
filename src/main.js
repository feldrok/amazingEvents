currentSlideID = 1

sliderElement = document.getElementById("slider")
totalSlides = sliderElement.childElementCount

function next() {
  if (currentSlideID < totalSlides) {
    currentSlideID++
    showSlide()
  } else if (currentSlideID === totalSlides) {
    currentSlideID = 1
    showSlide()
  }
}

function prev() {
  if (currentSlideID > 1) {
    currentSlideID--
    showSlide()
  } else if (currentSlideID === 1) {
    currentSlideID = totalSlides
    showSlide()
  }
}

function showSlide() {
  slides = document.getElementById("slider").getElementsByTagName("li")
  for (let index = 0; index < totalSlides; index++) {
    const element = slides[index]
    if (currentSlideID === index + 1) {
      element.classList.remove("hidden")
    } else {
      element.classList.add("hidden")
    }
  }
}

function autoPlay() {
  showSlide()
  setTimeout(() => {
    autoPlay()
    if (currentSlideID === totalSlides) {
      currentSlideID = 1
    } else {
      currentSlideID++
    }
  }, 5000)
}

autoPlay()