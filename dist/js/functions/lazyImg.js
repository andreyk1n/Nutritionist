// document.addEventListener("DOMContentLoaded", () => {
//     const lazyImages = document.querySelectorAll('img.lazy');
//     const lazyBackgrounds = document.querySelectorAll('.lazy-bg');

//     const imageObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const target = entry.target;
//                 if (target.tagName === 'IMG') {
//                     target.src = target.getAttribute('data-src');
//                     target.classList.remove('lazy');
//                 } else if (target.classList.contains('lazy-bg')) {
//                     target.style.backgroundImage = `url(${target.getAttribute('data-bg')})`;
//                     target.classList.remove('lazy-bg');
//                 }

//                 observer.unobserve(target);
//             }
//         });
//     });
//     lazyImages.forEach(image => {
//         imageObserver.observe(image);
//     });
//     lazyBackgrounds.forEach(background => {
//         imageObserver.observe(background);
//     });
// });
// // For use: data-src="" and for tag <img> class="lazy" For bg image data-bg="" and class="lazy-bg"

document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('img.lazy');
    const lazyBackgrounds = document.querySelectorAll('.lazy-bg');

    const placeholderImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; // Прозоре 1x1 піксельне зображення

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                if (target.tagName === 'IMG') {
                    const realSrc = target.getAttribute('data-src');
                    if (realSrc) {
                        target.src = realSrc;
                        target.removeAttribute('data-src');
                        target.classList.remove('lazy');
                    }
                } else if (target.classList.contains('lazy-bg')) {
                    const realBg = target.getAttribute('data-bg');
                    if (realBg) {
                        target.style.backgroundImage = `url(${realBg})`;
                        target.removeAttribute('data-bg');
                        target.classList.remove('lazy-bg');
                    }
                }

                observer.unobserve(target);
            }
        });
    });

    lazyImages.forEach(image => {
        // Додати заглушку, якщо `src` відсутній
        if (!image.hasAttribute('src')) {
            image.src = placeholderImage;
        }
        imageObserver.observe(image);
    });

    lazyBackgrounds.forEach(background => {
        imageObserver.observe(background);
    });
});
