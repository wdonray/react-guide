export function Step(element, content, contentPosition) {
    this.element = element;
    this.content = content;
    this.contentPosition = contentPosition;
    this.dirty = false;
    this.active = false;
}
export const ContentPosition =  {
    topLeft: 1,
    topMiddle: 2,
    topRight: 3,
    middleLeft: 4,
    middle: 5,
    middleRight: 6,
    bottomLeft: 7,
    bottomMiddle: 8,
    bottomRight: 9
};

export class Guide {
    constructor(active, steps) {
        this.active = active;
        this.steps = steps;
    }
    //Active
    getActive = () => this.active;
    setActive = (state) => this.active = state;
    //Steps
    getSteps = () => this.steps;
    addStep = (step) => {
        if (this.getSteps().length === 0) {
            step.active = true;
        }
        this.getSteps().push(step);
    };
    getCurrentStep = () => {
        return this.getSteps().find(item => item.active)
    };
    getCurrentStepIndex = () => {
        return this.getSteps().findIndex(item => item.active)
    };
    gotToStep = (step) => {
        let found = this.getSteps().find(item => item === step);
        if (found) {
            this.currentStep = found;
            return this.currentStep;
        }
        return this.currentStep;
    };
    getPrevStep = () => {
        return this.getSteps()[this.getSteps().findIndex(item => item.active) - 1];
    };
    removeStep = (step) => {
        for (let i = 0; i < this.getSteps().length; i++) {
            if (this.getSteps()[i] === step) {
                this.getSteps().splice(i, 1);
            }
        }
    };
    nextStep = () => {
        if (this.getCurrentStepIndex() >= (this.getSteps().length - 1)) {
            this.getCurrentStep().active = false;
            this.active = false;
        } else {
            this.currentStepCheck(this.getSteps()[this.getCurrentStepIndex() + 1]).active = true;
            this.getCurrentStep().active = false;
        }
        console.log(this.getSteps())
    };
    goToPrevStep = () => {
        let index = this.getCurrentStepIndex();
        if (index >= 1) {
            this.getCurrentStep().active = false;
            this.currentStepCheck(this.getSteps()[index - 1], true).active = true;
        }
    };
    currentStepCheck = (step, back) => {
        let stepToTest = step;
        // console.log(stepToTest)
        while (document.getElementById(stepToTest.element) === null) {
            let dirtyStep = this.getSteps().find(item => item === stepToTest);
            dirtyStep.dirty = true;
            dirtyStep.active = false;
            console.log(`Element marked dirty: ${dirtyStep.element}`);
            if (back) {
                stepToTest = this.getSteps()[this.getSteps().findIndex(item => item === stepToTest) - 1];
            } else {
                stepToTest = this.getSteps()[this.getSteps().findIndex(item => item === stepToTest) + 1];
            }
        }
        return stepToTest;
    }
}