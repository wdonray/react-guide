"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

require("./GuideStyle.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

var GuideRenderer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GuideRenderer, _React$Component);

  function GuideRenderer(props) {
    var _this;

    _classCallCheck(this, GuideRenderer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GuideRenderer).call(this, props));
    _this.containerRef = _react.default.createRef();
    _this.state = {
      guide: props.guide,
      currentStep: null,
      active: true,
      fade: false
    };
    document.addEventListener('nextStep', function () {
      return _this.nextStep(_this.state.guide);
    });
    window.addEventListener('keydown', function (event) {
      return _this.escKeyPress(event, _this.state.guide);
    });
    _this.escKeyPress = _this.escKeyPress.bind(_assertThisInitialized(_this));
    _this.nextStep = _this.nextStep.bind(_assertThisInitialized(_this));
    _this.setCurrentStep = _this.setCurrentStep.bind(_assertThisInitialized(_this));
    _this.getKeyByValue = _this.getKeyByValue.bind(_assertThisInitialized(_this));
    _this.positionTop = _this.positionTop.bind(_assertThisInitialized(_this));
    _this.positionBottom = _this.positionBottom.bind(_assertThisInitialized(_this));
    _this.positionLeft = _this.positionLeft.bind(_assertThisInitialized(_this));
    _this.positionRight = _this.positionRight.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(GuideRenderer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //Init
      if (this.state.guide && this.state.guide.getActive()) {
        if (this.props.onStart) {
          this.props.onStart();
        }

        this.setCurrentStep();
        this.interval = setInterval(this.setCurrentStep, 1000);
        window.addEventListener('resize', this.setCurrentStep);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.setCurrentStep);
      window.removeEventListener('keydown', this.escKeyPress);
      document.removeEventListener('nextStep', this.nextStep);
      clearInterval(this.interval);
    }
  }, {
    key: "escKeyPress",
    value: function escKeyPress(event, guide) {
      if (event.key === 'Escape') {
        if (guide.getActive()) {
          guide.setActive(false);
        }
      }
    }
  }, {
    key: "nextStep",
    value: function nextStep(guide) {
      var _this2 = this;

      setTimeout(function () {
        guide.nextStep(_this2.props.onNextStep);

        _this2.setState({
          fade: true
        });

        setTimeout(function () {
          _this2.setState({
            fade: false
          });
        }, 500);
      }, 1000);
    }
  }, {
    key: "setCurrentStep",
    value: function setCurrentStep() {
      this.setState({
        currentStep: this.state.guide.getCurrentStep()
      });
    }
  }, {
    key: "getKeyByValue",
    value: function getKeyByValue(object, value) {
      return Object.keys(object).find(function (key) {
        return object[key] === value;
      });
    }
  }, {
    key: "positionTop",
    value: function positionTop(contentPosition, elementHeight) {
      if (this.getKeyByValue(ContentPosition(), contentPosition).includes('top')) {
        return '1%';
      } else if (this.getKeyByValue(ContentPosition(), contentPosition).includes('middle')) {
        return (window.innerHeight - elementHeight) / 2;
      }

      return 'auto';
    }
  }, {
    key: "positionBottom",
    value: function positionBottom(contentPosition) {
      if (this.getKeyByValue(ContentPosition(), contentPosition).includes('bottom')) {
        return '1%';
      }

      return 'auto';
    }
  }, {
    key: "positionLeft",
    value: function positionLeft(contentPosition, elementWidth) {
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
    }
  }, {
    key: "positionRight",
    value: function positionRight(contentPosition) {
      if (this.getKeyByValue(ContentPosition(), contentPosition).includes('Right')) {
        return '1%';
      }

      return 'auto';
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement("div", null, this.state.guide && this.state.guide.getActive() && this.state.currentStep && document.getElementById(this.state.currentStep.element) !== null ? _react.default.createElement("div", {
        className: 'parent'
      }, _react.default.createElement("div", {
        className: 'dimmer',
        onClick: function onClick() {
          return document.getElementById(_this3.state.currentStep.element).click();
        },
        onMouseEnter: function onMouseEnter(e) {
          document.getElementById(_this3.state.currentStep.element).focus();
        },
        onMouseLeave: function onMouseLeave(e) {
          document.getElementById(_this3.state.currentStep.element).blur();
        },
        style: {
          width: document.getElementById(this.state.currentStep.element).getBoundingClientRect().width + (this.state.guide.offset ? this.state.guide.offset : 0),
          height: document.getElementById(this.state.currentStep.element).getBoundingClientRect().height + (this.state.guide.offset ? this.state.guide.offset : 0),
          top: document.getElementById(this.state.currentStep.element).getBoundingClientRect().top - (this.state.guide.offset ? this.state.guide.offset : 0),
          left: document.getElementById(this.state.currentStep.element).getBoundingClientRect().left - (this.state.guide.offset ? this.state.guide.offset : 0),
          cursor: this.state.currentStep.clickable ? 'pointer' : 'default',
          animation: this.props.blink ? 'blink 2s step-end infinite alternate' : null
        }
      }), _react.default.createElement("div", {
        ref: this.containerRef,
        className: 'container',
        style: {
          display: this.state.fade ? 'none' : 'flex',
          right: this.positionRight(this.state.currentStep.contentPosition),
          left: this.positionLeft(this.state.currentStep.contentPosition, this.containerRef.current ? this.containerRef.current.offsetWidth : 0),
          bottom: this.positionBottom(this.state.currentStep.contentPosition),
          top: this.positionTop(this.state.currentStep.contentPosition, this.containerRef.current ? this.containerRef.current.offsetHeight : 0),
          backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : 'white'
        }
      }, _react.default.createElement("div", {
        style: {
          height: '25px'
        }
      }, _react.default.createElement("div", {
        style: {
          position: 'absolute',
          top: '0px',
          left: '0px',
          padding: '2px'
        }
      }, _react.default.createElement("div", {
        className: 'numberCircle'
      }, this.state.guide.getCurrentStepIndex() + 1)), _react.default.createElement(_core.IconButton, {
        style: {
          position: 'absolute',
          top: '0px',
          right: '0px'
        },
        size: 'small',
        onClick: function onClick() {
          _this3.state.guide.setActive(!_this3.state.guide.getActive(), _this3.props.onEnd);

          _this3.setState({
            active: _this3.state.guide.getActive()
          });
        }
      }, _react.default.createElement(_icons.Close, null))), _react.default.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: this.state.currentStep.content
        },
        style: {
          textAlign: 'center',
          maxWidth: '600px'
        }
      }), _react.default.createElement("div", {
        style: {
          display: 'flex',
          height: '35px',
          marginTop: '10px'
        }
      }, _react.default.createElement(_core.IconButton, {
        size: 'small',
        disabled: this.state.guide.disableBackNavigation || this.state.guide.getCurrentStepIndex() === 0,
        onClick: function onClick() {
          _this3.state.guide.goToPrevStep(_this3.props.onPrevStep);

          _this3.setState({
            fade: true
          });

          setTimeout(function () {
            _this3.setState({
              fade: false
            });
          }, 500);
        }
      }, _react.default.createElement(_icons.ArrowLeft, null)), _react.default.createElement(_core.Grid, {
        style: {
          margin: '0 auto',
          width: 'auto'
        },
        container: true,
        spacing: 2
      }, this.state.guide.getSteps().map(function (step) {
        if (step === _this3.state.currentStep) {
          return _react.default.createElement(_core.Grid, {
            item: true,
            key: step.element
          }, " ", _react.default.createElement(_icons.RadioButtonChecked, {
            color: 'primary'
          }), " ");
        }

        return _react.default.createElement(_core.Grid, {
          item: true,
          key: step.element
        }, " ", _react.default.createElement(_icons.RadioButtonUnchecked, {
          color: step.dirty ? 'disabled' : 'action',
          onClick: function onClick() {
            if (!_this3.state.guide.disableBackNavigation) {
              _this3.state.guide.gotToStep(step);

              _this3.setState({
                fade: true
              });

              setTimeout(function () {
                _this3.setState({
                  fade: false
                });
              }, 500);
            }
          }
        }), " ");
      })), _react.default.createElement(_core.IconButton, {
        style: {
          position: 'relative',
          right: '0px'
        },
        size: 'small',
        disabled: this.state.guide.getCurrentStep().disableNavigation,
        onClick: function onClick() {
          _this3.state.guide.nextStep(_this3.props.onNextStep);

          _this3.setState({
            fade: true
          });

          setTimeout(function () {
            _this3.setState({
              fade: false
            });
          }, 500);
        }
      }, _react.default.createElement(_icons.ArrowRight, null))))) : null);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      //TODO: IF on same step no need to do all of this again
      if (nextProps.guide.getActive() && nextProps.guide.getCurrentStep()) {
        //Get the current steps element
        var step = document.getElementById(nextProps.guide.getCurrentStep().element); //Check if we have actually moved to the next step and are not on same element

        if (prevState.currentStep && nextProps.guide.getCurrentStep() !== prevState.currentStep) {
          //Grab the prev element and remove the added styles
          var prevStep = document.getElementById(prevState.currentStep.element); //TODO: Only issue I see with this is if the element had one of these styles we have effectively overwritten it
          // prevStep.style.pointerEvents = null;

          prevStep.style.zIndex = null;
        } //Add styles to the current element to make it clickable


        if (step) {
          step.style.removeProperty('pointerEvents');
          step.style.removeProperty('zIndex'); //step.style.pointerEvents = 'auto';

          step.style.zIndex = '9999';
        } //Make entire page not clickable


        document.body.style.removeProperty('pointerEvents');
        document.body.style.pointerEvents = 'none';
      } else {
        document.body.style.pointerEvents = null;
      }

      return {
        active: nextProps.guide.getActive(),
        currentStep: nextProps.guide.getCurrentStep()
      };
    }
  }]);

  return GuideRenderer;
}(_react.default.Component);

var GuideWrapper = function GuideWrapper(WrappedComponent, guide, backgroundColor, blink, onNextStep, onPrevStep, onStart, onEnd) {
  var HOC =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(HOC, _React$Component2);

    function HOC() {
      _classCallCheck(this, HOC);

      return _possibleConstructorReturn(this, _getPrototypeOf(HOC).apply(this, arguments));
    }

    _createClass(HOC, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(GuideRenderer, {
          guide: guide,
          onNextStep: onNextStep,
          onPrevStep: onPrevStep,
          onStart: onStart,
          onEnd: onEnd,
          backgroundColor: backgroundColor,
          blink: blink
        }), _react.default.createElement(WrappedComponent, this.props));
      }
    }]);

    return HOC;
  }(_react.default.Component);

  return HOC;
};

var _default = GuideWrapper;
exports.default = _default;

//# sourceMappingURL=GuideRenderer.js.map