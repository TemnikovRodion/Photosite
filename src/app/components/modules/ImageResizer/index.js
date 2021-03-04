import React from "react";
import Resizer from "react-image-file-resizer";

// Импорт стилей
import "./styles.scss";

export default function ImageResizer(props) {
    // Размеры изображения
    const width = 1200;
    const height = 800;
    const quality = 95;

    // Ресайз файла изображения
    const resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(
            file,
            width,
            height,
            'WEBP',
            quality,
            0,
            uri => {
                resolve(uri)
            },
            'base64',
            width,
            height,
        )
    }) // resizeFile

    // Вызов диалогового окна
    const showDialogOnClick = (e) => {
        e.preventDefault();

        let parent = e.target.parentNode;
        parent.lastElementChild.click();
    } // showDialogOnClick

    // Обработка выбора изображений
    const onFilesChange = async (e) => {
        let input = e.target;
        let selectedFiles = input.files;
        let files = [];

        if (selectedFiles.length > 0) {
            for (let i = 0; i < selectedFiles.length; i++) {
                // Имя файла
                let fileName = selectedFiles[i].name.substring(0, selectedFiles[i].name.lastIndexOf('.')) + '.webp';

                // Ресайз изображений
                let file = await resizeFile(selectedFiles[i]);

                // Коллекция изображений
                files.push({ name: fileName, body: file });
            } // for

            //Сброс выбранных файлов в input
            input.value = "";

            props.onChange(files);
        } // if
    } // onFilesChange

    return (
        <div className="form-files-input">
            <button className="form-btn" onClick={showDialogOnClick}>Загрузить фото</button>
            <input name='images' type="file" accept=".jpg, .jpeg, .png, .webp" multiple={props.multiple} onChange={onFilesChange} hidden />
        </div>
    );
}