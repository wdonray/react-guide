import React, { Component } from 'react';
import {GuideController, Step} from "./GuideController";

class GuideRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guide: new GuideController([], null, null)
        }
    }

    render(){

        return <div>
            <button id={'test'} onClick={() => {
                this.state.guide.addStep(new Step('test', 'This is test'))
                console.log(this.state.guide.getSteps())
            }}>
                Add Step
            </button>
        </div>
    };
}
export default GuideRenderer
