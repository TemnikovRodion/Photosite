import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { aboutsAsyncActions } from "../../../../../../../redux/reducers/aboutReducer";
import { serverImagesUrl } from '../../../../../../../assets/scripts/serverUrls';

// Импорт компонентов
import Form from "../../../../../../modules/Form";
import ImageResizer from "../../../../../../modules/ImageResizer";
import Icon from "../../../../../../modules/Icon";

// Импорт стилей
import './styles.scss';

export default function AboutForm(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, watch, errors } = useForm();

  // Новое изображение статьи
  const [image, setImage] = useState(); 

  // Отправка формы для добавления или редактирования
  const onSubmit = (data) => {
    if(!props.item) dispatch(aboutsAsyncActions.addElement({ about: data, image: image }));
    else dispatch(aboutsAsyncActions.editElement({ about: data, image: image }))
  } // onSubmit

  // Отправка формы для удаления
  const onDelete = (e) => {
    e.preventDefault();
    props.item ? dispatch(aboutsAsyncActions.deleteElement({ id: props.item.id })) : dispatch(props.visibility);
  } // onDelete

  // Выбор файлов
  const onFilesChange = (files) => {
    setImage(files ? files[0] : undefined);
    setValue('image', files ? files[0].name : undefined);
  } // onFilesChange

  return (
    <Form title={`Статья ${props.index}`} onSubmit={handleSubmit(onSubmit)} onDelete={onDelete}>
      <ImageResizer onChange={onFilesChange} multiple={false} />

      { 
        <div className="form-images">
          { watch('image', props.item?.image) || image ? 
            <div className='image' >
              <div className="delete-image-icon" onClick={() => onFilesChange(undefined)}><Icon name="close" size={15} /></div>
              <img alt="" src={ image ? image.body : serverImagesUrl('abouts', props.item?.id, 'pc', props.item?.image)} />
            </div> :
            <div className={`loadImage ${ errors.image ? "error" : ""}`}>
              Загрузите фото
            </div>
          }
        </div>
      }

      <input name='id' defaultValue={props.item ? props.item.id : "0"} ref={register} hidden/>
      <input name='image' defaultValue={props.item?.image} ref={register({required: true})} hidden />
      <input name='title' defaultValue={props.item?.title} ref={register({ required: true })} className={`form-input ${ errors.title ? "error" : "" }`} type="text" placeholder="Заголовок" autoComplete="off"/>
      <textarea name='text' defaultValue={props.item?.text} ref={register({ required: true })} className={`form-area ${ errors.text ? "error" : "" }`} type="text" placeholder="Описание" autoComplete="off" />
    </Form>
  );
}