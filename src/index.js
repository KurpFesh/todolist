import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import './index.css';
import App from './components/App/App';

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

ReactDOM.render(
    <Provider store={store}>
        <DragDropContextProvider backend={HTML5Backend}>
            <App />
        </DragDropContextProvider>
    </Provider>, 
    document.getElementById('root')
);
