import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
import { photosessionsActions, photosessionsAsyncActions, photosessionsSelectors } from '../../../../redux/reducers/photosessionsReducer';

// Импорт компонентов
import Picture from '../../../../components/modules/Picture';

// Импорт стилей
import "./styles.scss";

export default function Photosession(props) {
  const dispatch = useDispatch();
  const photosessions = useSelector(photosessionsSelectors.photosessions);
  const photosession = useSelector(photosessionsSelectors.photosession);

  const photosessionId = Number(props.match.params.id);

  useEffect(() => {
    if(!photosessions) dispatch(photosessionsAsyncActions.getElement(photosessionId));
    else dispatch(photosessionsActions.selectPhotosession(photosessionId))
  }, [dispatch, photosessionId, photosessions]);
  
  return (
    <section>
      { /*Заголовок фотосессии */}
      <h2>{photosession?.title}</h2>

      { /* Фотографии */}
      <div id="images" className="images">
        {
          photosession?.photosessionImages?.map(i => (
            <Picture key={i.id} reducerName='photosessions' parentId={photosession.id} imageName={i.name}/>
          ))
        }
      </div>
    </section >
  );
}