"use strict";

function Step(_ref) {
  var element = _ref.element,
      contentPosition = _ref.contentPosition,
      disableNavigation = _ref.disableNavigation,
      clickable = _ref.clickable,
      toolTip = _ref.toolTip,
      toolTipPlacement = _ref.toolTipPlacement,
      content = _ref.content;
  this.element = element;
  this.content = content;
  this.contentPosition = contentPosition;
  this.dirty = false;
  this.active = false;
  this.disableNavigation = disableNavigation;
  this.clickable = clickable;
  this.toolTip = toolTip;
  this.toolTipPlacement = toolTipPlacement;
}

function ToolTipPlacement() {
  return {
    bottomEnd: 'bottom-end',
    bottomStart: 'bottom-start',
    bottom: 'bottom',
    leftEnd: 'left-end',
    leftStart: 'left-start',
    left: 'left',
    rightEnd: 'right-end',
    rightStart: 'right-start',
    right: 'right',
    topEnd: 'top-end',
    topStart: 'top-start',
    top: 'top'
  };
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
  };
}

function Guide(_ref2) {
  var _this = this;

  var active = _ref2.active,
      offset = _ref2.offset,
      disableBackNavigation = _ref2.disableBackNavigation;
  this.active = active;
  this.steps = [];
  this.offset = offset;
  this.disableBackNavigation = disableBackNavigation; //Active

  this.getActive = function () {
    return _this.active;
  };

  this.setActive = function (state, callback) {
    if (state && !_this.getCurrentStep()) {
      return;
    }

    _this.active = state;

    if (callback) {
      callback();
    }
  }; //Steps


  this.getSteps = function () {
    return _this.steps;
  };

  this.addStep = function (step) {
    if (_this.getSteps().length === 0) {
      step.active = true;
    }

    _this.getSteps().push(step);
  };

  this.getCurrentStep = function () {
    return _this.getSteps().find(function (item) {
      return item.active;
    });
  };

  this.getCurrentStepIndex = function () {
    return _this.getSteps().findIndex(function (item) {
      return item.active;
    });
  };

  this.gotToStep = function (step) {
    var found = _this.getSteps().find(function (item) {
      return item === step;
    });

    if (found) {
      var currentStep = _this.getCurrentStep();

      _this.currentStepCheck(found).active = true;
      currentStep.active = false;
    }
  };

  this.getPrevStep = function () {
    return _this.getSteps()[_this.getSteps().findIndex(function (item) {
      return item.active;
    }) - 1];
  };

  this.removeStep = function (step) {
    for (var i = 0; i < _this.getSteps().length; i++) {
      if (_this.getSteps()[i] === step) {
        _this.getSteps().splice(i, 1);
      }
    }
  };

  this.nextStep = function (callback) {
    if (_this.getCurrentStepIndex() >= _this.getSteps().length - 1) {
      _this.getCurrentStep().active = false;
      _this.active = false;
    } else {
      var currentStep = _this.getCurrentStep();

      var value = _this.currentStepCheck(_this.getSteps()[_this.getCurrentStepIndex() + 1]);

      if (value) {
        value.active = true;
      } else {
        _this.active = false;
      }

      currentStep.active = false;
    }

    if (callback) {
      callback();
    }
  };

  this.goToPrevStep = function (callback) {
    var index = _this.getCurrentStepIndex();

    if (index >= 1) {
      _this.getCurrentStep().active = false;
      _this.currentStepCheck(_this.getSteps()[index - 1], true).active = true;
    }

    if (callback) {
      callback();
    }
  };

  this.currentStepCheck = function (step, back) {
    var stepToTest = step;

    while (stepToTest && document.getElementById(stepToTest.element) === null) {
      if (!stepToTest.dirty) {
        var dirtyStep = _this.getSteps().find(function (item) {
          return item === stepToTest;
        });

        dirtyStep.dirty = true;
        dirtyStep.active = false;
        alert("Element marked dirty: ".concat(dirtyStep.element));
        _this.active = false;
      }

      if (back) {
        stepToTest = _this.getSteps()[_this.getSteps().findIndex(function (item) {
          return item === stepToTest;
        }) - 1];
      } else {
        stepToTest = _this.getSteps()[_this.getSteps().findIndex(function (item) {
          return item === stepToTest;
        }) + 1];
      }
    }

    return stepToTest;
  };
} // function GuideRendererView() {
//     return require('./GuideRenderer');
// }


module.exports = {
  Step: Step,
  ContentPosition: ContentPosition,
  Guide: Guide,
  ToolTipPlacement: ToolTipPlacement
};

//# sourceMappingURL=Guide.js.map