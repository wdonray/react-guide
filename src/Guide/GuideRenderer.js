import React, {Component} from 'react';
import {ContentPosition, GuideController, Step} from "./GuideController";

//TODO: Jumping Content / Non-clickable area / Finished Content Holder / Direction of steps? 

class GuideRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guide: new GuideController(true, [], null, null),
            currentStep: null,
            active: true,
        };
    }

    //TESTING
    componentWillMount() {
        this.setState({active: this.state.guide.getActive()});
        this.state.guide.addStep(new Step('test1', 'This is test 1', ContentPosition.middle));
        this.state.guide.addStep(new Step('test2', 'This is test 2', ContentPosition.bottomLeft));
        console.log({BeforeRender: document.getElementById(this.state.guide.getCurrentStep().element)})
    }

    componentDidMount() {
        console.log(this.state.guide.getCurrentStep());
        this.setState({currentStep: this.state.guide.getCurrentStep()}, () => console.log({AfterRender: document.getElementById(this.state.currentStep.element)}));
    }

    contentPosition = (contentPosition) => {
        switch (contentPosition) {
            case ContentPosition.middle:
                return {
                    position: 'absolute',
                    top: '50%',
                    left: '50%'
                };
            case ContentPosition.bottomLeft:
                return {
                    position: 'absolute',
                    bottom: '8px',
                    left: '16px'
                };
            default:
                return {};
        }
    };

    render() {
        return <div>
            <button id={'test1'} style={{width: '100px', height: '300px'}} onClick={() => {
                this.state.guide.goToPrevStep();
                this.setState({currentStep: this.state.guide.getCurrentStep()});
            }}>
                Prev Step
            </button>
            <button style={{width: '200px', marginLeft: '30px'}} onClick={() => {
                this.state.guide.nextStep();
                this.setState({currentStep: this.state.guide.getCurrentStep()});
            }} id={'test2'}>
                Next Step
            </button>

            <button style={{marginLeft: '30px', zIndex: '9999', position: 'fixed', backgroundColor: 'white'}}
                    onClick={() => {
                        this.state.guide.setActive(!this.state.guide.getActive());
                        this.setState({active: this.state.guide.getActive()});
                    }}>
                Toggle Active
            </button>
            {/* DIMMER */}
            {
                (this.state.guide.getActive() && this.state.currentStep && document.getElementById(this.state.currentStep.element) !== null) ?
                    <div>
                        <div style={{
                            position: "fixed",
                            width: document.getElementById(this.state.currentStep.element).offsetWidth,
                            height: document.getElementById(this.state.currentStep.element).offsetHeight,
                            top: document.getElementById(this.state.currentStep.element).offsetTop - 10,
                            left: document.getElementById(this.state.currentStep.element).offsetLeft - 10,
                            boxShadow: '0 0 0 100vmax rgba(0, 0, 0, .6)',
                            // border: '1px solid #777777',
                            // borderRadius: '5px',
                            pointerEvents: 'none',
                            padding: '10px',
                            transition: 'all 0.5s',
                        }}/>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            // minHeight: '100vh',
                            zIndex: '9999',
                            position: 'fixed',
                            backgroundColor: 'white',
                            transition: 'all 1s',
                            ...this.contentPosition(this.state.currentStep.contentPosition)
                        }}>
                            {this.state.currentStep.content}
                        </div>
                    </div> : null
            }
        </div>
    };
}

export default GuideRenderer
