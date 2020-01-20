import React from 'react';
import {Button} from "@material-ui/core";
import img from "./Test/173-300x300.jpg"
import './App.css';
import {ContentPosition, Guide, Step} from "./Guide/Guide";
import GuideWrapper from "./Guide/GuideRenderer";

let guide = new Guide(true, 10, false);
guide.addStep(new Step('test1', ContentPosition().middle, false, 'Lorem <strong>ipsum</strong> dolor sit amet, consectetur adipiscing elit. Suspendisse luctus lobortis ligula in tristique. Nam interdum sed augue ut feugiat. Cras ornare ultrices tellus non sollicitudin. Vivamus vitae fringilla urna. Pellentesque non lobortis tellus, vel viverra sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Proin suscipit justo eget mauris vulputate, sagittis gravida turpis dapibus. Duis lacinia et felis quis bibendum. Cras eros orci, auctor quis blandit nec, imperdiet non ante. Integer vitae porta magna. Sed interdum mauris ante, ac ullamcorper sapien dignissim eget. Vestibulum tempus dolor quis mollis sollicitudin. Aliquam non viverra.'));
guide.addStep(new Step('test2', ContentPosition().bottomMiddle, true, 'Praesent fermentum leo sapien, eu ultricies neque mollis in. Sed suscipit risus nec enim commodo convallis. Etiam nec porttitor enim. Pellentesque eu nisl tellus. Aliquam erat volutpat. Nulla vel orci ante. Sed metus purus, pellentesque sed mi a, feugiat fermentum augue. Maecenas id tincidunt nibh, at placerat metus. Phasellus non odio diam. Nulla facilisis quis turpis nec mollis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque elementum ornare orci, sit amet feugiat est consequat non. Maecenas viverra mi vel sem porta gravida. Vivamus et ullamcorper purus. Sed eget tincidunt leo, vitae lobortis dui. Nullam lobortis id purus ut molestie. Nam eu magna nunc. Donec turpis eros, placerat at ullamcorper vitae, dignissim sed lacus. Nullam malesuada id dui.'));
// guide.addStep(new Step('fail', 'fail', ContentPosition().middleRight));
guide.addStep(new Step('test3',  ContentPosition().topRight, false, 'Nam et mi sed lectus fermentum facilisis. Suspendisse eleifend, odio id molestie convallis, urna lorem efficitur est, et tempus lectus lacus vel ex. Praesent arcu massa, porttitor eu lacinia id, vulputate non libero. Vestibulum nec aliquam leo. Proin ac maximus felis, nec tincidunt enim. Praesent sapien purus, feugiat eget fringilla vitae, fermentum non nunc. Mauris dictum, diam vel hendrerit bibendum.'));

function App() {
  return (
    <div className="App">
          <Button onClick={() => console.log('world')} variant="contained" id={'test1'} style={{width: '100px', height: '300px'}}>
              World
          </Button>
          <Button onClick={(e) => {
              document.dispatchEvent(new Event('nextStep'));
          }} variant="contained" style={{width: '200px', marginLeft: '30px'}} id={'test2'}>
              Hello
          </Button>
          {/*<Button variant="contained"*/}
          {/*        style={{*/}
          {/*            marginLeft: '30px',*/}
          {/*            zIndex: '9999',*/}
          {/*            position: 'fixed',*/}
          {/*            backgroundColor: 'white',*/}
          {/*            pointerEvents: 'auto'*/}
          {/*        }}*/}
          {/*        onClick={() => {*/}
          {/*            this.state.guide.setActive(!this.state.guide.getActive());*/}
          {/*            this.setState({active: this.state.guide.getActive()});*/}
          {/*            console.log({State: this.state})*/}
          {/*        }}>*/}
          {/*    Toggle Active*/}
          {/*</Button>*/}
          <img id={'test3'} style={{position: 'absolute', bottom: '30px', right: '30px'}} src={img}/>
    </div>
  );
}

export default GuideWrapper(App, guide);
