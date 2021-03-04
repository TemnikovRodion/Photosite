import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { servicesAsyncActions } from "../../../../../../../redux/reducers/servicesReducer";

// Импорт компонентов
import Form from "../../../../../../modules/Form";

// Импорт стилей
import './styles.scss';

export default function ServicesForm(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  // Отправка формы для добавления или редактирования
  const onSubmit = (data) => {
    if (!props.item) dispatch(servicesAsyncActions.addElement({ service: data }));
    else dispatch(servicesAsyncActions.editElement({ service: data }))
  } // onSubmit

  // Отправка формы для удаления
  const onDelete = (e) => {
    e.preventDefault();
    props.item ? dispatch(servicesAsyncActions.deleteElement({ id: props.item.id })) : dispatch(props.visibility);
  } // onDelete

  return (
    <Form title={`Услуга ${props.index}`} onSubmit={handleSubmit(onSubmit)} onDelete={onDelete}>
      <input name='id' defaultValue={props.item ? props.item.id : "0"} ref={register} className="form-input" type="text" hidden />
      <input name='name' defaultValue={props.item?.name} ref={register({ required: true })} className={`form-input ${errors.name ? "error" : ""}`} type="text" placeholder="Название" autoComplete="off" />

      <select name='type' className={`form-input ${errors.type ? "error" : ""}`} ref={register({required: true})} defaultValue={props.item?.type} >
        <option value="1">Основные</option>
        <option value="2" >Дополнительные</option>
      </select>
    </Form>
  );
}