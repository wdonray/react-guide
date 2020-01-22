function Step({element, contentPosition, disableNavigation, clickable, toolTip, content}) {
    this.element = element;
    this.content = content;
    this.contentPosition = contentPosition;
    this.dirty = false;
    this.active = false;
    this.disableNavigation = disableNavigation;
    this.clickable = clickable;
    this.toolTip = toolTip;
}

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

function Guide({active, offset, disableBackNavigation}) {
    this.active = active;
    this.steps = [];
    this.offset = offset;
    this.disableBackNavigation = disableBackNavigation;
    //Active
    this.getActive = () => this.active;
    this.setActive = (state, callback) => {
        this.active = state;
        if (callback) {
            callback();
        }
    };

    //Steps
    this.getSteps = () => this.steps;
    this.addStep = (step) => {
        if (this.getSteps().length === 0) {
            step.active = true;
        }
        this.getSteps().push(step);
    };
    this.getCurrentStep = () => {
        return this.getSteps().find(item => item.active)
    };
    this.getCurrentStepIndex = () => {
        return this.getSteps().findIndex(item => item.active)
    };
    this.gotToStep = (step) => {
        let found = this.getSteps().find(item => item === step);
        if (found) {
            let currentStep = this.getCurrentStep();
            this.currentStepCheck(found).active = true;
            currentStep.active = false;
        }
    };
    this.getPrevStep = () => {
        return this.getSteps()[this.getSteps().findIndex(item => item.active) - 1];
    };
    this.removeStep = (step) => {
        for (let i = 0; i < this.getSteps().length; i++) {
            if (this.getSteps()[i] === step) {
                this.getSteps().splice(i, 1);
            }
        }
    };
    this.nextStep = (callback) => {
        if (this.getCurrentStepIndex() >= (this.getSteps().length - 1)) {
            this.getCurrentStep().active = false;
            this.active = false;
        } else {
            let currentStep = this.getCurrentStep();
            let value = this.currentStepCheck(this.getSteps()[this.getCurrentStepIndex() + 1]);
            if (value) {
                value.active = true;
            } else {
                this.active = false;
            }
            currentStep.active = false;
        }
        if (callback) {
            callback()
        }
    };
    this.goToPrevStep = (callback) => {
        let index = this.getCurrentStepIndex();
        if (index >= 1) {
            this.getCurrentStep().active = false;
            this.currentStepCheck(this.getSteps()[index - 1], true).active = true;
        }
        if (callback) {
            callback()
        }
    };
    this.currentStepCheck = (step, back) => {
        let stepToTest = step;
        while (stepToTest && document.getElementById(stepToTest.element) === null) {
            if (!stepToTest.dirty) {
                let dirtyStep = this.getSteps().find(item => item === stepToTest);
                dirtyStep.dirty = true;
                dirtyStep.active = false;
                alert(`Element marked dirty: ${dirtyStep.element}`);
                this.active = false;
            }
            if (back) {
                stepToTest = this.getSteps()[this.getSteps().findIndex(item => item === stepToTest) - 1];
            } else {
                stepToTest = this.getSteps()[this.getSteps().findIndex(item => item === stepToTest) + 1];
            }
        }
        return stepToTest;
    }
}

// function GuideRendererView() {
//     return require('./GuideRenderer');
// }

module.exports = {Step: Step, ContentPosition: ContentPosition, Guide: Guide};