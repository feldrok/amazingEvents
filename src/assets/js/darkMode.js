const btn = document.querySelector("button.mobile-menu-button")
const menu = document.querySelector(".mobile-menu")

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden")
})


// Dark Mode Toggle
const sunIcon = document.querySelector(".sunIcon")
const moonIcon = document.querySelector(".moonIcon")

const userTheme = localStorage.getItem("theme")
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches

const iconToggle = () => {
  moonIcon.classList.toggle("display-none")
  sunIcon.classList.toggle("display-none")
}

const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark")
    moonIcon.classList.add("display-none")
    return
  }
  sunIcon.classList.add("display-none")
}

const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
    iconToggle()
    return
  }
  document.documentElement.classList.add("dark")
  localStorage.setItem("theme", "dark")
  iconToggle()
}

sunIcon.addEventListener("click", () => {
  themeSwitch()
})

moonIcon.addEventListener("click", () => {
  themeSwitch()
})

themeCheck()
