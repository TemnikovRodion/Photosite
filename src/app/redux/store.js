import { configureStore } from '@reduxjs/toolkit'
import aboutReducer from './reducers/aboutReducer';
import messageReducer from './reducers/messageReducer';
import photosessionsReducer from './reducers/photosessionsReducer';
import publicationsReducer from './reducers/publicationsReducer';
import loginReducer from './reducers/loginReducer';
import servicesReducer from './reducers/servicesReducer';

export default configureStore({
    reducer: {
        about: aboutReducer,
        photosessions: photosessionsReducer,
        publications: publicationsReducer,
        services: servicesReducer,
        message: messageReducer,
        login: loginReducer
    }
})