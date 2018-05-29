// // import React from 'react';
// // import ReactDOM from 'react-dom';
// import './index.css';
// // import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// import 'babel-polyfill';
// import React from 'react';
// import { render } from 'react-dom';
// import { Router } from 'react-router';
// import { browserHistory } from 'react-router-dom';
// import routes from './routes';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//
// render(
//     <Router routes={routes} history={browserHistory} />,
//     document.getElementById('app')
// );
//
// // ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import Global from './components/Global';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render(
    <div><Global></Global></div>, document.getElementById('root')
);