export function Step(element, content, contentPosition) {
    this.element = element;
    this.content = content;
    this.contentPosition = contentPosition;
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
        this.currentStep = null;
        this.prevStep = [];
    }
    //Active
    getActive = () => this.active;
    setActive = (state) => this.active = state;
    //Steps
    getSteps = () => this.steps;
    addStep = (step) => {
        this.steps.push(step);
        this.currentStep = this.steps[this.steps.length - 1];
    };
    getCurrentStep = () => this.currentStep;
    gotToStep = (step) => {
        let found = this.steps.find(item => item === step);
        if (found) {
            this.currentStep = found;
            return this.currentStep;
        }
        return this.currentStep;
    };
    removeStep = (step) => {
        for (let i = 0; i < this.steps.length; i++) {
            if (this.steps[i] === step) {
                this.steps.splice(i, 1);
            }
        }
    };
    nextStep = () => {
        this.prevStep.push(this.steps[this.steps.length - 1]);
        this.steps.pop();
        if (this.steps.length === 0) {
            this.active = false;
            this.currentStep = null;
        } else {
            this.currentStep = this.steps[this.steps.length - 1];
        }
    };
    goToPrevStep = () => {
        let value = this.prevStep[this.prevStep.length - 1];
        this.prevStep.pop();
        this.steps.push(value);
        this.currentStep = value;
    };
}