// app js

const daysEl = document.getElementById('days')
const hoursEl = document.getElementById('hours')
const minEl = document.getElementById('minutes')
const secEl = document.getElementById('seconds')

const newYear = new Date('01-01-2022')

const countdown = () => {

    const today = new Date();

    const diff = (newYear - today) / 1000

    const days = Math.floor(diff / 3600 / 24)
    const hours = Math.floor(diff / 3600) % 24
    const minutes = Math.floor(diff / 60) % 60
    const seconds = Math.floor(diff) % 60

    daysEl.innerHTML = days
    hoursEl.innerHTML = hours
    secEl.innerHTML = seconds
    minEl.innerHTML = minutes
}

countdown();

setInterval(() => countdown(), 1000);