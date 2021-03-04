import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { photosessionsAsyncActions } from "../../../../../../../redux/reducers/photosessionsReducer";
import { serverImagesUrl } from '../../../../../../../assets/scripts/serverUrls';

// Импорт компонентов
import Form from "../../../../../../modules/Form";
import ImageResizer from "../../../../../../modules/ImageResizer";
import Icon from "../../../../../../modules/Icon";

// Импорт стилей
import './styles.scss';

export default function PhotosessionsForm(props) {
  const dispatch = useDispatch();

  const [newImages, setNewImages] = useState([]); // Новые изображения фотосессий
  const [oldImages, setOldImages] = useState(props.item ? props.item.photosessionImages : []); // Загруженные изображения фотосессий
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
    data.photosessionImages = [ ...newImages, ...oldImages ];

    if (!props.item) dispatch(photosessionsAsyncActions.addElement({ photosession: data, images: newImages }));
    else dispatch(photosessionsAsyncActions.editElement({ photosession: data, images: newImages }))
  } // onSubmit

  // Отправка формы для удаления
  const onDelete = (e) => {
    e.preventDefault();
    props.item ? dispatch(photosessionsAsyncActions.deleteElement({ id: props.item.id })) : dispatch(props.visibility);
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
    <Form title={`Фотосессия ${props.index}`} onSubmit={handleSubmit(onSubmit)} onDelete={onDelete}>
      <ImageResizer onChange={onFilesLoad} multiple={true} />

      {
        <div className='form-images'>
          {
            (<Fragment>
              {
                oldImages.length !== 0 && oldImages.map(image => (
                  <div className={`image `} key={image.id}>
                    <div className="delete-image-icon" onClick={() => setOldImages(oldImages.filter(i => i.id !== image.id))}><Icon name="close" size={15} /></div>
                    <img alt="" src={serverImagesUrl('photosessions', props.item?.id, 'pc', image.name)} />
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
      <input name='price' defaultValue={props.item?.price} ref={register({ required: true })} className={`form-input ${errors.price ? "error" : ""}`} type="number" placeholder="Стоимость" autoComplete="off" />
      <input name='title' defaultValue={props.item?.title} ref={register({ required: true })} className={`form-input ${errors.title ? "error" : ""}`} type="text" placeholder="Заголовок" autoComplete="off" />
      <textarea name='description' defaultValue={props.item?.description} ref={register({ required: true })} className={`form-area ${errors.description ? "error" : ""}`} type="text" placeholder="Описание" autoComplete="off" />
    </Form >
  );
}
