import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { messageSelectors, messageAsyncActions, messagesActions } from '../../../../redux/reducers/messageReducer';

// Импорт компонентов
import Modal from "../../../modules/Modal";
import Form from "../../../modules/Form";
import Icon from "../../../modules/Icon";
import Toast from "../../../modules/Toast";

// Стили
import './styles.scss';

export default function Callback(props) {
  const dispatch = useDispatch();

  const success = useSelector(messageSelectors.success);
  const error = useSelector(messageSelectors.error);
  const newFormVisibility = useSelector(messageSelectors.newFormVisibility);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    dispatch(messageAsyncActions.sendMessage(data));
  } // onSubmit

  return (
    <Fragment>
      <div className="callback-show-btn" onClick={() => dispatch(messagesActions.setNewFormVisibility(true))}>
        <Icon name="callback" size={25} />
      </div>

      { success && <Toast message={success} theme='success' onClose={messagesActions.removeSuccess()} />}
      { error && <Toast message={error} theme='error' onClose={messagesActions.removeError()} />}

      {
        newFormVisibility &&
        (<Modal>
          <div className="callback">
            <Form title="Задать вопрос"
              onSubmit={handleSubmit(onSubmit)}
              onClose={() => dispatch(messagesActions.setNewFormVisibility(false))}
            >
              <input
                name='name'
                className={`form-input ${errors['name'] ? 'error' : ''}`}
                type="text"
                ref={register({ required: true })}
                placeholder="Имя" autoComplete='off' />
              <input
                name='email'
                className={`form-input ${errors['email'] ? 'error' : ''}`}
                type="text"
                ref={register({
                  required: true,
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Введите корректный email!"
                  }
                })}
                placeholder="Email" autoComplete='off' />
              {errors.email?.type === 'pattern' && <span className="formError" role="alert">{errors.email.message}</span>}
              <input
                name='phone'
                className={`form-input ${errors['phone'] ? 'error' : ''}`}
                type="text"
                ref={register({
                  required: true,
                  pattern: {
                    value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/,
                    message: "Введите корректный номер телефона!"
                  }
                })}
                placeholder="Номер телефона"
                autoComplete='off' />
              {errors.phone?.type === 'pattern' && <span className="formError" role="alert">{errors.phone.message}</span>}
              <textarea
                name='question'
                className={`form-area ${errors['question'] ? 'error' : ''}`}
                ref={register({ required: true })}
                placeholder="Напишите вопрос..."
                autoComplete='off' />

              <button type="submit" className="form-btn">Отправить</button>
            </Form>
          </div>
        </Modal>)
      }

    </Fragment>
  );
}