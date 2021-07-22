const toggleClass = (addRemoveClass, className) => {
    const el = document.body
    if (addRemoveClass === 'addClass') {
        el.classList.add(className)
    } else {
        el.classList.remove(className)
    }
}

export default toggleClass
