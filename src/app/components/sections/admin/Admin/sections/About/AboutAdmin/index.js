import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { aboutsAsyncActions, aboutsSelectors, aboutActions } from '../../../../../../../redux/reducers/aboutReducer';

// Импорт компонентов
import AboutForm from "../AboutForm";
import Toast from '../../../../../../modules/Toast';

// Импорт стилей
import './styles.scss';

export default function AboutAdmin(props) {
  const dispatch = useDispatch();

  const abouts = useSelector(aboutsSelectors.abouts);
  const success = useSelector(aboutsSelectors.success);
  const error = useSelector(aboutsSelectors.error);
  const newFormVisibility = useSelector(aboutsSelectors.newFormVisibility);

  // Загрузка данных
  useEffect(() => {
    if(!abouts) dispatch(aboutsAsyncActions.getElements())
  }, [dispatch, abouts])

  return (
    <section>
      <h2>Обо мне</h2>

      { success && <Toast message={success} theme='success' onClose={aboutActions.removeSuccess()}/> }
      { error && <Toast message={error} theme='error' onClose={aboutActions.removeError()}/> }

      {
        abouts?.map((item, index) => (
          <AboutForm key={item.id} index={index + 1} item={item} />
        ))
      }

      {
        newFormVisibility ?
          <AboutForm index="" visibility={aboutActions.setNewFormVisibility(false)}/> :
          <button className="form-btn" onClick={() => dispatch(aboutActions.setNewFormVisibility(true))}>Добавить еще</button>
      }
    </section>
  );
}