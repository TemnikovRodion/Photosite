import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginAsyncActions } from '../../../../redux/reducers/loginReducer';

// Импорт компонентов
import Form from "../../../modules/Form";
import Modal from '../../../modules/Modal';

// Стили
import './styles.scss';

export default function Login(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  // Отправка формы
  const onSubmit = (data) => {
    dispatch(loginAsyncActions.getToken({ user: data }));
  } // onSubmit

  return (
    <Modal>
      <div className="login">
        <Form title="Вход" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="login"
            type="text"
            ref={register({required: true})}
            className={`form-input ${errors.login ? 'error' : ''}`}
            placeholder="Логин"
            autoComplete="off"
          />
          <input
            name="password"
            type='password'
            ref={register({required: true})}
            className={`form-input ${errors.password ? 'error' : ''}`}
            placeholder="Пароль"
            autoComplete="off"
          />

          <button type="submit" className="form-btn">Войти</button>
        </Form>
      </div >
    </Modal>
  );
}