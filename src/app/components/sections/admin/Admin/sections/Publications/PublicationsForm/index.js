import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { publicationsAsyncActions } from "../../../../../../../redux/reducers/publicationsReducer";
import { serverImagesUrl } from '../../../../../../../assets/scripts/serverUrls';
import { dateToInput } from '../../../../../../../assets/scripts/dateToString';

// Импорт компонентов
import Form from "../../../../../../modules/Form";
import ImageResizer from "../../../../../../modules/ImageResizer";
import Icon from "../../../../../../modules/Icon";

// Импорт стилей
import './styles.scss';

export default function PublicationsForm(props) {
    const dispatch = useDispatch();

    const [newImages, setNewImages] = useState([]); // Новые изображения публикаций
    const [oldImages, setOldImages] = useState(props.item ? props.item.publicationImages : []); // Загруженные изображения публикаций
    const [imagesError, setImagesError] = useState(false);

    const { register, handleSubmit, errors } = useForm();

    // Отправка формы для добавления или редактирования
    const onSubmit = (data) => {
        // Проверка наличия изображений
        if(newImages.length === 0 && oldImages.length === 0) {
            setImagesError(true);
            return;
        }

        // Запись загруженных изображений
        data.publicationImages = [ ...newImages, ...oldImages ];

        if (!props.item) dispatch(publicationsAsyncActions.addElement({ publication: data, images: newImages }));
        else dispatch(publicationsAsyncActions.editElement({ publication: data, images: newImages }))
    } // onSubmit

    // Отправка формы для удаления
    const onDelete = (e) => {
        e.preventDefault();
        props.item ? dispatch(publicationsAsyncActions.deleteElement({ id: props.item.id })) : dispatch(props.visibility);
    } // onDelete

    // Загрузка новых изображений
    const onFilesLoad = (files) => {
      const loadedImages = [...oldImages, ...newImages];
      files = files.filter(i => loadedImages.findIndex(oldI => oldI.name === i.name) === -1);
  
      setNewImages((prev) => ([
        ...prev,
        ...files
      ]));
    } // onFilesLoad

    return (
        <Form title={`Публикация ${props.index}`} onSubmit={handleSubmit(onSubmit)} onDelete={onDelete}>
            <ImageResizer onChange={onFilesLoad} multiple={true} />

            {
                <div className='form-images'>
                {
                  (<Fragment>
                    {
                      oldImages.length !== 0 && oldImages.map(image => (
                        <div className={`image `} key={image.id}>
                          <div className="delete-image-icon" onClick={() => setOldImages(oldImages.filter(i => i.id !== image.id))}><Icon name="close" size={15} /></div>
                          <img alt="" src={serverImagesUrl('publications', props.item?.id, 'pc', image.name)} />
                        </div>
                      ))
                    }
      
                    { 
                      newImages.length !== 0 && newImages.map(image => (
                        <div className={`image `} key={image.name}>
                          <div className="delete-image-icon" onClick={() => setNewImages(newImages.filter(i => i.name !== image.name))}><Icon name="close" size={15} /></div>
                          <img alt="" src={image.body} />
                        </div>
                      )) 
                    }
      
                    {
                      newImages.length === 0 && oldImages.length === 0 && 
                        <div className={`loadImage ${ imagesError ? "error" : ""}`}>
                          Загрузите фото
                        </div>
                    }
                  </Fragment>)
                }
              </div>
            }

            <input name='id' defaultValue={props.item ? props.item.id : "0"} ref={register} hidden />
            <input name='title' defaultValue={props.item?.title} ref={register({ required: true })} className={`form-input ${errors.title ? "error" : ""}`} type="text" placeholder="Заголовок" autoComplete="off" />
            <input name='release' defaultValue={dateToInput(props.item?.release)} ref={register({ required: true })} className={`form-input ${errors.release ? "error" : ""}`} type="date" placeholder="Дата публикации" autoComplete="off" />
        </Form>
    );
}