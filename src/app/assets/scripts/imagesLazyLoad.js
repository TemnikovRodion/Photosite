export function setImageSrcOnView(entries, observer) {
    let picture = entries[0].target;

    if(entries[0].isIntersecting && picture.classList.contains('lazyload')) {
        for (let i = 0; i < picture.children.length; i++) {
            picture.children[i].srcset = picture.children[i].dataset.srcset;
            picture.children[i].removeAttribute("data-srcset");
        } // for
    
        picture.removeAttribute("class");
        observer.unobserve(picture);
    } // if
} // setImageSrcOnView