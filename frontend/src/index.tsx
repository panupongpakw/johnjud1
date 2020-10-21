import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
//import Article from "./component/article/Article";
//import Article1 from "./component/article1/article1";
import Bookmark2 from "./component/Bookmark2/bookmark2";
import Bookmark from "./component/Bookmark/bookmark";

ReactDOM.render(
  <React.StrictMode>
      <Bookmark/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
