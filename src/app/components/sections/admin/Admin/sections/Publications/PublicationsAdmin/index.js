import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { publicationsActions, publicationsAsyncActions, publicationsSelectors } from '../../../../../../../redux/reducers/publicationsReducer';

// Импорт компонентов
import PublicationsForm from "../PublicationsForm";
import Toast from '../../../../../../modules/Toast';

// Импорт стилей
import './styles.scss'

export default function PublicationsAdmin(props) {
    const dispatch = useDispatch();
    
    const publications = useSelector(publicationsSelectors.publications);
    const success = useSelector(publicationsSelectors.success);
    const error = useSelector(publicationsSelectors.error);
    const newFormVisibility = useSelector(publicationsSelectors.newFormVisibility);

    useEffect(() => {
        if(!publications) dispatch(publicationsAsyncActions.getElements())
    }, [dispatch, publications])

    return (
        <section>
            <h2>Публикации</h2>

            { success && <Toast message={success} theme='success' onClose={publicationsActions.removeSuccess()}/> }
            { error && <Toast message={error} theme='error' onClose={publicationsActions.removeError()}/> }

            {
                publications?.map((item, index) => (
                    <PublicationsForm key={item.id} index={index + 1} item={item} />
                ))
            }

            {
                newFormVisibility ?
                    <PublicationsForm index="" visibility={publicationsActions.setNewFormVisibility(false)}/> :
                    <button className="form-btn" onClick={() => dispatch(publicationsActions.setNewFormVisibility(true))}>Добавить еще</button>
            }
        </section>
    );
}