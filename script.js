const items = Array.from(document.querySelectorAll('.list-item'))

function throttle(func, delay) {
  let timeout = null
  return function(...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func.call(this, ...args)
        timeout = null
      }, delay)
    }
  }
}

const cb = throttle(evt => {
  defineWhichItem(window.scrollY - calc((1.5em + 0.375 * ((100vw - 20em) / 42.5)) * 12)
}, 0)

window.addEventListener('scroll', cb)

const playAudio = (fileName) => {
  const audio = new Audio(`../${fileName}.mp3`);
  audio.play();
}

const defineWhichItem = (scrollY) => {
  items.find(item => {
    const elemRect = item.getBoundingClientRect()
    const bodyRect = document.body.getBoundingClientRect()
    const offset = elemRect.top - bodyRect.top
    if (offset > scrollY && offset <= scrollY + elemRect.height) {
      item.classList.add('highlighted')
      const trackName = item.getAttribute('data-audio')
      playAudio(trackName)
    } else {
      item.classList.remove('highlighted')
    }
  })
}

