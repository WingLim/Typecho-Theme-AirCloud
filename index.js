// Nav switch function on mobile
const navToggle = document.getElementById('site-nav-toggle');
navToggle.addEventListener('click', () => {
    let aboutContent = document.getElementById('nav-content')
    if (!aboutContent.classList.contains('show-block')) {
        aboutContent.classList.add('show-block');
        aboutContent.classList.remove('hide-block')
    } else {
        aboutContent.classList.add('hide-block')
        aboutContent.classList.remove('show-block');
    }
})