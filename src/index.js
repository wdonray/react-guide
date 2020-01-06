import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import GuideRenderer from "./Guide/GuideRenderer";
import {ContentPosition, Guide, Step} from "./Guide/Guide";

let guide = new Guide(true, [],);
guide.addStep(new Step('test1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse luctus lobortis ligula in tristique. Nam interdum sed augue ut feugiat. Cras ornare ultrices tellus non sollicitudin. Vivamus vitae fringilla urna. Pellentesque non lobortis tellus, vel viverra sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Proin suscipit justo eget mauris vulputate, sagittis gravida turpis dapibus. Duis lacinia et felis quis bibendum. Cras eros orci, auctor quis blandit nec, imperdiet non ante. Integer vitae porta magna. Sed interdum mauris ante, ac ullamcorper sapien dignissim eget. Vestibulum tempus dolor quis mollis sollicitudin. Aliquam non viverra.', ContentPosition.middle));
guide.addStep(new Step('test2', 'Praesent fermentum leo sapien, eu ultricies neque mollis in. Sed suscipit risus nec enim commodo convallis. Etiam nec porttitor enim. Pellentesque eu nisl tellus. Aliquam erat volutpat. Nulla vel orci ante. Sed metus purus, pellentesque sed mi a, feugiat fermentum augue. Maecenas id tincidunt nibh, at placerat metus. Phasellus non odio diam. Nulla facilisis quis turpis nec mollis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque elementum ornare orci, sit amet feugiat est consequat non. Maecenas viverra mi vel sem porta gravida. Vivamus et ullamcorper purus. Sed eget tincidunt leo, vitae lobortis dui. Nullam lobortis id purus ut molestie. Nam eu magna nunc. Donec turpis eros, placerat at ullamcorper vitae, dignissim sed lacus. Nullam malesuada id dui.', ContentPosition.bottomMiddle));
guide.addStep(new Step('fail', 'fail', ContentPosition.middleRight));
guide.addStep(new Step('test3', 'Nam et mi sed lectus fermentum facilisis. Suspendisse eleifend, odio id molestie convallis, urna lorem efficitur est, et tempus lectus lacus vel ex. Praesent arcu massa, porttitor eu lacinia id, vulputate non libero. Vestibulum nec aliquam leo. Proin ac maximus felis, nec tincidunt enim. Praesent sapien purus, feugiat eget fringilla vitae, fermentum non nunc. Mauris dictum, diam vel hendrerit bibendum.', ContentPosition.topRight));
ReactDOM.render(<GuideRenderer guide={guide} onStart={() => console.log('Start')} onEnd={() => console.log('End')} onNextStep={() => console.log('Next')} onPrevStep={() => console.log('Prev')} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
