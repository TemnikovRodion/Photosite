import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { photosessionsActions, photosessionsAsyncActions, photosessionsSelectors } from '../../../../../../../redux/reducers/photosessionsReducer';

// Импорт компонентов
import PhotosessionsForm from "../PhotosessionsForm";
import Toast from '../../../../../../modules/Toast';

// Импорт стилей
import './styles.scss'

export default function PhotosessionsAdmin(props) {
    const dispatch = useDispatch();

    const photosessions = useSelector(photosessionsSelectors.photosessions);
    const success = useSelector(photosessionsSelectors.success);
    const error = useSelector(photosessionsSelectors.error);
    const newFormVisibility = useSelector(photosessionsSelectors.newFormVisibility);

    // Загрузка данных
    useEffect(() => {
        if(!photosessions) dispatch(photosessionsAsyncActions.getElements())
    }, [dispatch, photosessions])

    return (
        <section>
            <h2>Фотосессии</h2>

            { success && <Toast message={success} theme='success' onClose={photosessionsActions.removeSuccess()}/> }
            { error && <Toast message={error} theme='error' onClose={photosessionsActions.removeError()}/> }

            {
                photosessions?.map((item, index) => (
                    <PhotosessionsForm key={item.id} index={index + 1} item={item} />
                ))
            }

            {
                newFormVisibility ?
                    <PhotosessionsForm index="" visibility={photosessionsActions.setNewFormVisibility(false)}/> :
                    <button className="form-btn" onClick={() => dispatch(photosessionsActions.setNewFormVisibility(true))}>Добавить еще</button>
            }
        </section>
    );
}