import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateToMonthAndYear } from '../../../../assets/scripts/dateToString';

import { publicationsAsyncActions, publicationsSelectors } from '../../../../redux/reducers/publicationsReducer';

// Импорт компонентов
import Slider from '../../../modules/Slider';

// Импорт стилей
import './styles.scss';

export default function Publication(props) {
  const dispatch = useDispatch();
  const publications = useSelector(publicationsSelectors.publications);

  useEffect(() => {
    if (!publications) dispatch(publicationsAsyncActions.getElements());
  }, [dispatch, publications]);

  return (
    <section>
      <h2>Публикации в журналах</h2>

      <div className="publications">
        {
          publications?.map(item => (
            <div key={item.id} className="publication">
              <Slider items={item.publicationImages} parentId={item.id} reducerName='publications' />

              <div className="description">
                <h1>{item.title}</h1>
                <p>{dateToMonthAndYear(item.release)}</p>
              </div>
            </div>
          ))
        }
      </div>

    </section>
  );
}