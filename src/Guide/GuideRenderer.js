import React from 'react';
// import {ContentPosition} from "./Guide";
import {Grid, IconButton, Tooltip, withStyles} from "@material-ui/core";
import {ArrowLeft, ArrowRight, Close, RadioButtonChecked, RadioButtonUnchecked,} from "@material-ui/icons"
import './GuideStyle.css'

function ContentPosition() {
    return {
        topLeft: 1,
        topMiddle: 2,
        topRight: 3,
        middleLeft: 4,
        middle: 5,
        middleRight: 6,
        bottomLeft: 7,
        bottomMiddle: 8,
        bottomRight: 9
    }
}

const CustomToolTip = withStyles({
    popper: {
        zIndex: 9999,
    },
    tooltip: {
        color: "white",
        backgroundColor: "black",
        zIndex: 9999,
        fontSize: "13px",
    },
    arrow: {
        color: "black",
        zIndex: 9999,
    }
})(Tooltip);

class GuideRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guide: props.guide,
            currentStep: null,
            active: true,
            fade: false,
            toolTip: false,
        };
        document.addEventListener('nextStep', () => this.nextStep(this.state.guide));
        window.addEventListener('keydown', (event) => this.escKeyPress(event, this.state.guide));

        this.stepChanged = this.stepChanged.bind(this);
        this.escKeyPress = this.escKeyPress.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.setCurrentStep = this.setCurrentStep.bind(this);
        this.getKeyByValue = this.getKeyByValue.bind(this);
        this.positionTop = this.positionTop.bind(this);
        this.positionBottom = this.positionBottom.bind(this);
        this.positionLeft = this.positionLeft.bind(this);
        this.positionRight = this.positionRight.bind(this);
    }

    componentDidMount() {
        //Init
        if (this.state.guide && this.state.guide.getActive()) {
            if (this.props.onStart) {
                this.props.onStart();
            }
            this.setCurrentStep();
            this.interval = setInterval(this.setCurrentStep, 500);
            window.addEventListener('resize', this.setCurrentStep);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.guide.getActive() && prevState.active !== prevProps.guide.getActive()) {
            if (prevProps.onStart) {
                prevProps.onStart();
            }
            this.setCurrentStep();
            clearInterval(this.interval);
            this.interval = setInterval(this.setCurrentStep, 500);
            window.addEventListener('resize', this.setCurrentStep);
        } else if (!prevProps.guide.getActive() && prevState.active !== prevProps.guide.getActive()) {
            clearInterval(this.interval)
            if (prevProps.onEnd) {
                prevProps.onEnd()
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setCurrentStep);
        window.removeEventListener('keydown', this.escKeyPress);
        document.removeEventListener('nextStep', this.nextStep);
        clearInterval(this.interval);
    }

    escKeyPress(event, guide) {
        if (event.key === 'Escape') {
            if (guide.getActive()) {
                guide.setActive(false);
            }
        }
    }

    nextStep(guide) {
        setTimeout(() => {
            guide.nextStep(this.props.onNextStep);
            this.stepChanged();
        }, 1000);
    }

    stepChanged() {
        this.setState({fade: true});
        setTimeout(() => {
            this.setState({fade: false});
        }, 500);
    }

    setCurrentStep() {
        this.setState({currentStep: this.props.guide.getCurrentStep()})
    };

    static getDerivedStateFromProps(props, state) {
        //TODO: IF on same step no need to do all of this again
        if (props.guide.getActive() && props.guide.getCurrentStep()) {
            //Get the current steps element
            let step = document.getElementById(props.guide.getCurrentStep().element);
            //Check if we have actually moved to the next step and are not on same element
            if (state.currentStep && props.guide.getCurrentStep() !== state.currentStep) {
                //Grab the prev element and remove the added styles
                let prevStep = document.getElementById(state.currentStep.element);
                //TODO: Only issue I see with this is if the element had one of these styles we have effectively overwritten it

                // prevStep.style.pointerEvents = null;
                prevStep.style.zIndex = null;
            }
            //Add styles to the current element to make it clickable
            if (step) {
                step.style.removeProperty('pointerEvents');
                step.style.removeProperty('zIndex');
                //step.style.pointerEvents = 'auto';
                step.style.zIndex = '9999';
            }
            //Make entire page not clickable
            document.body.style.removeProperty('pointerEvents');
            document.body.style.pointerEvents = 'none';
        } else {
            document.body.style.pointerEvents = null;
        }
        return {
            active: props.guide.getActive(),
            currentStep: props.guide.getCurrentStep(),
        }
    };

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    };

    positionTop(contentPosition, elementHeight) {
        if (this.getKeyByValue(ContentPosition(), contentPosition).includes('top')) {
            return '1%';
        } else if (this.getKeyByValue(ContentPosition(), contentPosition).includes('middle')) {
            return (window.innerHeight - elementHeight) / 2
        }
        return 'auto';
    };

    positionBottom(contentPosition) {
        if (this.getKeyByValue(ContentPosition(), contentPosition).includes('bottom')) {
            return '1%';
        }
        return 'auto';
    };

    positionLeft(contentPosition, elementWidth) {
        if (this.getKeyByValue(ContentPosition(), contentPosition) === 'middleRight') {
            return null;
        } else if (this.getKeyByValue(ContentPosition(), contentPosition).includes('Left')) {
            return '1%';
        } else if (this.getKeyByValue(ContentPosition(), contentPosition).includes('middle')) {
            return (window.innerWidth - elementWidth) / 2;
        } else if (this.getKeyByValue(ContentPosition(), contentPosition).includes('Middle')) {
            return (window.innerWidth - elementWidth) / 2;
        }
        return 'auto';
    };

    positionRight(contentPosition) {
        if (this.getKeyByValue(ContentPosition(), contentPosition).includes('Right')) {
            return '1%';
        }
        return 'auto';
    };

    render() {
        return <div>
            {
                (this.state.guide &&
                    this.state.active &&
                    this.state.currentStep &&
                    document.getElementById(this.state.currentStep.element) !== null) ?
                    <div className={'parent'}>
                        <CustomToolTip
                            enterDelay={this.props.toolTipEnterDelay ? this.props.toolTipEnterDelay : 500}
                            leaveDelay={this.props.toolTipLeaveDelay ? this.props.toolTipLeaveDelay : 0}
                            placement={typeof this.state.currentStep.toolTipPlacement === "string" ? this.state.currentStep.toolTipPlacement : 'bottom'}
                            title={typeof this.state.currentStep.toolTip === "string" ? this.state.currentStep.toolTip : ''}
                            arrow={true}
                        >
                            <div className={'dimmer'}
                                 onClick={() => document.getElementById(this.state.currentStep.element).click()}
                                 onMouseEnter={(e) => {
                                     document.getElementById(this.state.currentStep.element).focus()
                                 }}
                                 onMouseLeave={(e) => {
                                     document.getElementById(this.state.currentStep.element).blur()
                                 }}
                                 style={{
                                     width: document.getElementById(this.state.currentStep.element).getBoundingClientRect().width
                                         + (this.state.guide.offset ? this.state.guide.offset : 0),
                                     height: document.getElementById(this.state.currentStep.element).getBoundingClientRect().height
                                         + (this.state.guide.offset ? this.state.guide.offset : 0),
                                     top: document.getElementById(this.state.currentStep.element).getBoundingClientRect().top
                                         - (this.state.guide.offset ? this.state.guide.offset : 0),
                                     left: document.getElementById(this.state.currentStep.element).getBoundingClientRect().left
                                         - (this.state.guide.offset ? this.state.guide.offset : 0),
                                     cursor: this.state.currentStep.clickable ? 'pointer' : 'default',
                                     animation: this.props.blink ? 'blink 1s step-end infinite alternate' : null,
                                 }}
                            />
                        </CustomToolTip>
                        {/*Container*/}
                        <div
                            id={'container'}
                            className={'container'}
                            style={{
                                display: this.state.fade ? 'none' : 'flex',
                                right: this.positionRight(this.state.currentStep.contentPosition),
                                left: this.positionLeft(this.state.currentStep.contentPosition, document.getElementById('container') ? document.getElementById('container').offsetWidth : 0),
                                bottom: this.positionBottom(this.state.currentStep.contentPosition),
                                top: this.positionTop(this.state.currentStep.contentPosition, document.getElementById('container') ? document.getElementById('container').offsetHeight : 0),
                                backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : 'white'
                            }}>
                            <div style={{height: '25px'}}>
                                <div style={{
                                    position: 'absolute', top: '0px', left: '0px', padding: '2px'
                                }}>
                                    <div className={'numberCircle'}>
                                        {this.state.guide.getCurrentStepIndex() + 1}
                                    </div>
                                </div>
                                <IconButton
                                    style={{position: 'absolute', top: '0px', right: '0px'}}
                                    size={'small'}
                                    onClick={() => {
                                        this.state.guide.setActive(!this.state.guide.getActive(), this.props.onEnd);
                                        this.setState({active: this.state.guide.getActive()});
                                    }}>
                                    <Close/>
                                </IconButton>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: this.state.currentStep.content}}
                                 style={{textAlign: 'center', maxWidth: '600px'}}>
                            </div>
                            <div style={{display: 'flex', height: '35px', marginTop: '10px'}}>
                                <IconButton
                                    size={'small'}
                                    disabled={this.state.guide.disableBackNavigation || this.state.guide.getCurrentStepIndex() === 0}
                                    onClick={() => {
                                        this.state.guide.goToPrevStep(this.props.onPrevStep);
                                        this.stepChanged()
                                    }}
                                >
                                    <ArrowLeft/>
                                </IconButton>
                                <Grid style={{margin: '0 auto', width: 'auto'}} container spacing={2}>
                                    {
                                        this.state.guide.getSteps().map((step) => {
                                            if (step === this.state.currentStep) {
                                                return <Grid item key={step.element}> <RadioButtonChecked
                                                    color={'primary'}/> </Grid>
                                            }
                                            return <Grid item key={step.element}> <RadioButtonUnchecked
                                                color={step.dirty ? 'disabled' : 'action'}
                                                onClick={() => {
                                                    if (!this.state.guide.disableBackNavigation) {
                                                        this.state.guide.gotToStep(step);
                                                        this.stepChanged();
                                                    }
                                                }}/> </Grid>
                                        })
                                    }
                                </Grid>
                                <IconButton
                                    style={{position: 'relative', right: '0px'}}
                                    size={'small'}
                                    disabled={this.state.guide.getCurrentStep().disableNavigation}
                                    onClick={() => {
                                        this.state.guide.nextStep(this.props.onNextStep);
                                        this.stepChanged();
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

const GuideWrapper = (WrappedComponent, props) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.setBackgroundColor = this.setBackgroundColor.bind(this);
            this.updateGuide = this.updateGuide.bind(this);
            this.setBlink = this.setBlink.bind(this);
        }

        state = {
            backgroundColor: props.backgroundColor,
            guide: props.guide,
            blink: props.blink
        };

        setBackgroundColor(color) {
            this.setState({backgroundColor: color});
        };

        updateGuide(guide) {
            this.setState({guide})
        };

        setBlink(blink) {
            this.setState({blink})
        };

        render() {
            return <React.Fragment>
                <GuideRenderer {...props} blink={this.state.blink} guide={this.state.guide}
                               backgroundColor={this.state.backgroundColor}/>
                <WrappedComponent {...this.props} {...props} setBackgroundColor={this.setBackgroundColor}
                                  updateGuide={this.updateGuide} setBlink={this.setBlink}/>
            </React.Fragment>
        }
    }
};

export default GuideWrapper