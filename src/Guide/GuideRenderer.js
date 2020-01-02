import React, {Component} from 'react';
import {ContentPosition} from "./Guide";
import {Button} from "@material-ui/core";
import {Close} from "@material-ui/icons"
import img from "../Test/173-300x300.jpg"
import './Guide.css'
//TODO: Finished Content Holder / Direction of steps? / If currentElement changes position update dimmer
//TODO: Can only have one guide per render / Raise Events / Higher-order component / If ID is not found skip to next or raise error

class GuideRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guide: props.guide,
            currentStep: null,
            active: true,
            fade: false,
        };
    }

    componentDidMount() {
        //Init
        if (this.state.guide) {
            this.setState({currentStep: this.state.guide.getCurrentStep()});
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.guide.active && nextProps.guide.currentStep){
            //Get the current steps element
            let step = document.getElementById(nextProps.guide.getCurrentStep().element);
            //Check if we have actually moved to the next step and are not on same element
            if (prevState.currentStep && nextProps.guide.getCurrentStep() !== prevState.currentStep) {
                //Grab the prev element and remove the added styles
                let prevStep = document.getElementById(prevState.currentStep.element);
                //Only issue I see with this is if the element had one of these styles we have effectively overwritten it
                prevStep.style.pointerEvents = null;
                prevStep.style.zIndex = null;
            }
            //Add styles to the current element to make it clickable
            if (step) {
                step.style.removeProperty('pointerEvents');
                step.style.removeProperty('zIndex');
                step.style.pointerEvents = 'auto';
                step.style.zIndex = '9999';
            }
            //Make entire page not clickable
            document.body.style.removeProperty('pointerEvents');
            document.body.style.pointerEvents = 'none';
        } else {
            document.body.style.pointerEvents = null;
        }
        return {
            active: nextProps.guide.active,
            currentStep: nextProps.guide.currentStep
        }
    };

    getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    };

    positionTop = (contentPosition, elementHeight) => {
        if (this.getKeyByValue(ContentPosition, contentPosition).includes('top')) {
            return '1%';
        } else if (this.getKeyByValue(ContentPosition, contentPosition).includes('middle')) {
            return (window.innerHeight - elementHeight) / 2
        }
        return 'auto';
    };

    positionBottom = (contentPosition) => {
        if (this.getKeyByValue(ContentPosition, contentPosition).includes('bottom')) {
            return '1%';
        }
        return 'auto';
    };

    positionLeft = (contentPosition, elementWidth) => {
        if (this.getKeyByValue(ContentPosition, contentPosition) === 'middleRight') {
            return null;
        } else if (this.getKeyByValue(ContentPosition, contentPosition).includes('Left')) {
            return '1%';
        } else if (this.getKeyByValue(ContentPosition, contentPosition).includes('middle')) {
            return (window.innerWidth - elementWidth) / 2;
        } else if (this.getKeyByValue(ContentPosition, contentPosition).includes('Middle')) {
            return (window.innerWidth - elementWidth) / 2;
        }
        return 'auto';
    };

    positionRight = (contentPosition) => {
        if (this.getKeyByValue(ContentPosition, contentPosition).includes('Right')) {
            return '1%';
        }
        return 'auto';
    };

    render() {
        return <div>
            <Button variant="contained" id={'test1'} style={{width: '100px', height: '300px'}}>
                World
            </Button>
            <Button variant="contained" style={{width: '200px', marginLeft: '30px'}} id={'test2'}>
                Hello
            </Button>
            <Button variant="contained"
                    style={{marginLeft: '30px', zIndex: '9999', position: 'fixed', backgroundColor: 'white', pointerEvents: 'auto'}}
                    onClick={() => {
                        this.state.guide.setActive(!this.state.guide.getActive());
                        this.setState({active: this.state.guide.getActive()});
                    }}>
                Toggle Active
            </Button>
            <img id={'test3'} style={{position: 'absolute', bottom: '30px', right: '30px'}} src={img}/>
            {/* DIMMER */}
            {
                (this.state.guide &&
                    this.state.guide.getActive() &&
                    this.state.currentStep &&
                    document.getElementById(this.state.currentStep.element) !== null) ?
                    <div className={'parent'}>
                        <div className={'dimmer'} style={{
                            width: document.getElementById(this.state.currentStep.element).offsetWidth,
                            height: document.getElementById(this.state.currentStep.element).offsetHeight,
                            top: document.getElementById(this.state.currentStep.element).offsetTop - 10,
                            left: document.getElementById(this.state.currentStep.element).offsetLeft - 10,
                        }}/>
                        <div
                            className={'container'}
                            style={{
                                display: this.state.fade ? 'none' : 'flex',
                                right: this.positionRight(this.state.currentStep.contentPosition),
                                left: this.positionLeft(this.state.currentStep.contentPosition, document.getElementById(this.state.currentStep.element).offsetWidth),
                                bottom: this.positionBottom(this.state.currentStep.contentPosition),
                                top: this.positionTop(this.state.currentStep.contentPosition, document.getElementById(this.state.currentStep.element).offsetHeight),
                            }}>
                            <Button
                                size={'small'}
                                variant="contained"
                                onClick={() => {
                                    this.state.guide.setActive(!this.state.guide.getActive());
                                    this.setState({active: this.state.guide.getActive()});
                                }}>
                                <Close/>
                            </Button>
                            {this.state.currentStep.content}
                            <div>
                                <Button
                                    size={'large'}
                                    variant="contained"
                                    disabled={this.state.guide.prevStep.length === 0}
                                    onClick={() => {
                                        this.state.guide.goToPrevStep();
                                        this.setState({fade: true});
                                        setTimeout(() => {
                                            this.setState({fade: false});
                                        }, 500)
                                    }}
                                >
                                    Back
                                </Button>
                                <Button
                                    size={'large'}
                                    variant="contained"
                                    onClick={() => {
                                        this.state.guide.nextStep();
                                        this.setState({fade: true});
                                        setTimeout(() => {
                                            this.setState({fade: false});
                                        }, 500)
                                    }}
                                >
                                    {this.state.guide.steps.length === 1 ? 'End' : 'Forward'}
                                </Button>
                            </div>
                        </div>
                    </div> : null
            }
        </div>
    };
}

export default GuideRenderer