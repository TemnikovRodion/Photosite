import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { photosessionsAsyncActions, photosessionsSelectors } from '../../../../redux/reducers/photosessionsReducer';

// Импорт компонентов
import Picture from '../../../../components/modules/Picture';

// Импорт стилей
import './styles.scss';

export default function Photosessions(props) {
  const dispatch = useDispatch();
  const photosessions = useSelector(photosessionsSelectors.photosessions);

  useEffect(() => {
    if(!photosessions) dispatch(photosessionsAsyncActions.getElements());
  }, [dispatch, photosessions]);

  return (
    <section className="photosessions">
      { /*Заголовок*/}
      <div className="title">
        <h2>Фотосессии</h2>
      </div>

      { /*Каталог фотосессий */}
      <div className="catalog">
        {
          photosessions?.map(i => (
              <div key={i.id} className="item">
                <Link to={`/photosession/${i.id}`}>
                  <Picture reducerName='photosessions' parentId={i.id} imageName={i.photosessionImages[0].name}/>
                </Link>
                <h3>{i.title}</h3>
                <p>{i.description}</p>
              </div>
          ))
        }
      </div>
    </section>
  );
}