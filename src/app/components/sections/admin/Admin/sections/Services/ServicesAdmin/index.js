import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { servicesActions, servicesAsyncActions, servicesSelectors } from '../../../../../../../redux/reducers/servicesReducer';

// Импорт компонентов
import ServicesForm from "../ServicesForm";
import Toast from '../../../../../../modules/Toast';

// Импорт стилей
import './styles.scss';


export default function ServicesAdmin(props) {
    const dispatch = useDispatch();

    const services = useSelector(servicesSelectors.services);
    const success = useSelector(servicesSelectors.success);
    const error = useSelector(servicesSelectors.error);
    const newFormVisibility = useSelector(servicesSelectors.newFormVisibility);

    // Загрузка данных
    useEffect(() => {
        if(!services) dispatch(servicesAsyncActions.getElements())
    }, [dispatch, services])

    return (
        <section>
            <h2>Услуги</h2>

            { success && <Toast message={success} theme='success' onClose={servicesActions.removeSuccess()}/> }
            { error && <Toast message={error} theme='error' onClose={servicesActions.removeError()}/> }

            {
                services?.map((item, index) => (
                    <ServicesForm key={item.id} index={index + 1} item={item} />
                ))
            }

            {
                newFormVisibility ?
                    <ServicesForm index="" visibility={servicesActions.setNewFormVisibility(false)}/> :
                    <button className="form-btn" onClick={() => dispatch(servicesActions.setNewFormVisibility(true))}>Добавить еще</button>
            }
        </section>
    );
}
