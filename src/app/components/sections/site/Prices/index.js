import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { servicesSelectors, servicesAsyncActions } from '../../../../redux/reducers/servicesReducer';
import { photosessionsAsyncActions, photosessionsSelectors } from '../../../../redux/reducers/photosessionsReducer';

// Импорт модулей
import Picture from '../../../modules/Picture';
import Icon from "../../../modules/Icon";

// Импорт стилей
import './styles.scss';

export default function Prices(props) {
    const dispatch = useDispatch();

    const services = useSelector(servicesSelectors.services);
    const photosessions = useSelector(photosessionsSelectors.photosessions);

    useEffect(() => {
        if(!services) dispatch(servicesAsyncActions.getElements());
        if(!photosessions) dispatch(photosessionsAsyncActions.getElements());
    }, [dispatch, services, photosessions])

    return (
        <section>
            <h2>Стоимость фотоссессий</h2>
            
            <div className="prices">
            {
                photosessions?.map(i => (
                    <div key={i.id} className="price">
                        <Picture reducerName='photosessions' parentId={i.id} imageName={i.photosessionImages[0].name}/>

                        <div className="description">
                            <div className="description-border">
                                <big>{i.title}</big>
                                <h2>{i.price.toLocaleString()} руб.</h2>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>

            <div className="services">
                <div className="service">
                    <h3>Входит в стоимость</h3>
                    <ul>                    
                        {
                            services?.filter(i => i.type === 1)
                                .map(i => (
                                    <li key={i.id}>
                                        <Icon name="check" size={15} />
                                        <p>{i.name}</p>
                                    </li>
                                ))
                        }
                    </ul>
                </div>
                <div className="service">
                    <h3>Дополнительно можно заказать</h3>
                    <ul>                    
                        {
                            services?.filter(i => i.type === 2)
                                .map(i => (
                                    <li key={i.id}>
                                        <Icon name="check" size={15} />
                                        <p>{i.name}</p>
                                    </li>
                                ))
                        }
                    </ul>    
                </div>
            </div>
        </section >
    );
}