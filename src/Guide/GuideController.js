export function Step(element, content) {
    this.element = element;
    this.content = content;
}
export class GuideController {
    constructor(steps, currentStep, prevStep) {
        this.steps = steps;
        this.currentStep = currentStep;
        this.prevStep = prevStep;
    }
    //Steps
    getSteps = () => this.steps;
    addStep = (step) => this.steps.push(step);
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
        for(let i = 0; i < this.steps.length; i++){
            if ( this.steps[i] === step) {
                this.steps.splice(i, 1);
            }
        }
    };
    nextStep = () => {
        this.prevStep = this.steps[this.steps.length - 1];
        this.steps.pop();
        this.currentStep = this.steps[this.steps.length - 1];
    };
    goToPrevStep = () => {
        let value = this.prevStep;
        this.prevStep = this.steps[this.steps.length - 1];
        this.steps.push(value);
        this.currentStep = value;
    };
}