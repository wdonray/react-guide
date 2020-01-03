import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import GuideRenderer from "./Guide/GuideRenderer";
import {ContentPosition, Guide, Step} from "./Guide/Guide";

let guide = new Guide(true, [],);
guide.addStep(new Step('test1', 'This is test 1', ContentPosition.middle));
guide.addStep(new Step('test2', 'This is test 2', ContentPosition.bottomMiddle));
guide.addStep(new Step('fail', 'This should fail', ContentPosition.middleRight));
guide.addStep(new Step('test3', 'This is test 3', ContentPosition.topRight));
ReactDOM.render(<GuideRenderer guide={guide} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
