// Домен сервера
const server = 'https://localhost:44341';

// Адрес API сервера
function serverApiUrl(reducerName) {
     return `${server}/api/${reducerName}`;
} // serverApiUrl

// Адрес изображений с сервера
function serverImagesUrl(reducerName, parentId, device, imageName) {
     return `${server}/images/${reducerName}/${parentId}/${device}/${imageName}`;
} // serverImagesUrl

export {
     serverApiUrl,
     serverImagesUrl
}