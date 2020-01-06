import React, {Component, createRef} from 'react';
import {ContentPosition} from "./Guide";
import {Button, Grid, IconButton} from "@material-ui/core";
import {Close, ArrowLeft, ArrowRight, RadioButtonChecked, RadioButtonUnchecked} from "@material-ui/icons"
// import img from "../Test/173-300x300.jpg"
import './GuideStyle.css'

//TODO: Can only have one guide per render / Higher-order component

class GuideRenderer extends Component {
    constructor(props) {
        super(props);
        this.containerRef = createRef();
        this.state = {
            guide: props.guide,
            onNextStep: props.onNextStep,
            onPrevStep: props.onPrevStep,
            onStart: props.onStart,
            onEnd: props.onEnd,
            currentStep: null,
            active: true,
            fade: false,
        };
        document.addEventListener('nextStep', () => {
            this.state.guide.nextStep(this.state.onNextStep);
            this.setState({fade: true});
            setTimeout(() => {
                this.setState({fade: false});
            }, 500)
        })
    }

    componentDidMount() {
        //Init
        if (this.state.guide && this.state.guide.getActive()) {
            if (this.state.onStart) {
                this.state.onStart();
            }
            this.setCurrentStep();
            this.interval = setInterval(this.setCurrentStep, 1000);
            window.addEventListener('resize', this.setCurrentStep);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setCurrentStep);
        clearInterval(this.interval);
    }

    setCurrentStep = () => {
        this.setState({currentStep: this.state.guide.getCurrentStep()})
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.guide.getActive() && nextProps.guide.getCurrentStep()) {
            //Get the current steps element
            let step = document.getElementById(nextProps.guide.getCurrentStep().element);
            //Check if we have actually moved to the next step and are not on same element
            if (prevState.currentStep && nextProps.guide.getCurrentStep() !== prevState.currentStep) {
                //Grab the prev element and remove the added styles
                let prevStep = document.getElementById(prevState.currentStep.element);
                //TODO: Only issue I see with this is if the element had one of these styles we have effectively overwritten it
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
            active: nextProps.guide.getActive(),
            currentStep: nextProps.guide.getCurrentStep()
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
            {/*<Button variant="contained" id={'test1'} style={{width: '100px', height: '300px'}}>*/}
            {/*    World*/}
            {/*</Button>*/}
            {/*<Button onClick={(e) => {*/}
            {/*    document.dispatchEvent(new Event('nextStep'));*/}
            {/*}} variant="contained" style={{width: '200px', marginLeft: '30px'}} id={'test2'}>*/}
            {/*    Hello*/}
            {/*</Button>*/}
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
            {/*        }}>*/}
            {/*    Toggle Active*/}
            {/*</Button>*/}
            {/*<img id={'test3'} style={{position: 'absolute', bottom: '30px', right: '30px'}} src={img}/>*/}
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
                        {/*Container*/}
                        <div
                            ref={this.containerRef}
                            className={'container'}
                            style={{
                                display: this.state.fade ? 'none' : 'flex',
                                right: this.positionRight(this.state.currentStep.contentPosition),
                                left: this.positionLeft(this.state.currentStep.contentPosition, this.containerRef.current ? this.containerRef.current.offsetWidth : 0),
                                bottom: this.positionBottom(this.state.currentStep.contentPosition),
                                top: this.positionTop(this.state.currentStep.contentPosition, this.containerRef.current ? this.containerRef.current.offsetHeight : 0),
                            }}>
                            <div style={{height: '25px'}}>
                                <IconButton
                                    style={{position: 'absolute', top: '0px', right: '0px'}}
                                    size={'small'}
                                    onClick={() => {
                                        this.state.guide.setActive(!this.state.guide.getActive(), this.state.onEnd);
                                        this.setState({active: this.state.guide.getActive()});
                                    }}>
                                    <Close/>
                                </IconButton>
                            </div>
                            <div style={{textAlign: 'center', maxWidth: '600px'}}>
                                {this.state.currentStep.content}
                            </div>
                            <div style={{display: 'flex', height: '35px', marginTop: '10px'}}>
                                <IconButton
                                    size={'small'}
                                    disabled={this.state.guide.getCurrentStepIndex() === 0}
                                    onClick={() => {
                                        this.state.guide.goToPrevStep(this.state.onPrevStep);
                                        this.setState({fade: true});
                                        setTimeout(() => {
                                            this.setState({fade: false});
                                        }, 500)
                                    }}
                                >
                                    <ArrowLeft/>
                                </IconButton>
                                <Grid style={{margin: '0 auto', width: 'auto'}} container spacing={2}>
                                    {
                                        this.state.guide.getSteps().map((step) => {
                                            if (step === this.state.currentStep) {
                                                return <Grid item key={step.element}> <RadioButtonChecked  color={'primary'}/> </Grid>
                                            }
                                            return <Grid item key={step.element}> <RadioButtonUnchecked color={step.dirty ? 'disabled' : 'action'}/> </Grid>
                                        })
                                    }
                                </Grid>
                                <IconButton
                                    style={{position: 'relative', right: '0px'}}
                                    size={'small'}
                                    onClick={() => {
                                        this.state.guide.nextStep(this.state.onNextStep);
                                        this.setState({fade: true});
                                        setTimeout(() => {
                                            this.setState({fade: false});
                                        }, 500)
                                    }}
                                >
                                    <ArrowRight/>
                                </IconButton>
                            </div>
                        </div>
                    </div> : null
            }
        </div>
    };
}

export default GuideRenderer