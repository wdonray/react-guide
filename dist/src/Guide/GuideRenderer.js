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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var CustomToolTip = (0, _core.withStyles)({
  popper: {
    zIndex: 9999
  },
  tooltip: {
    color: "white",
    backgroundColor: "black",
    zIndex: 9999,
    fontSize: "13px"
  },
  arrow: {
    color: "black",
    zIndex: 9999
  }
})(_core.Tooltip);

var GuideRenderer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GuideRenderer, _React$Component);

  function GuideRenderer(props) {
    var _this;

    _classCallCheck(this, GuideRenderer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GuideRenderer).call(this, props));
    _this.state = {
      guide: props.guide,
      currentStep: null,
      active: true,
      fade: false,
      toolTip: false
    };
    document.addEventListener('nextStep', function () {
      return _this.nextStep(_this.state.guide);
    });
    window.addEventListener('keydown', function (event) {
      return _this.escKeyPress(event, _this.state.guide);
    });
    _this.stepChanged = _this.stepChanged.bind(_assertThisInitialized(_this));
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
        this.interval = setInterval(this.setCurrentStep, 500);
        window.addEventListener('resize', this.setCurrentStep);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.guide.getActive() && prevState.active !== prevProps.guide.getActive()) {
        if (prevProps.onStart) {
          prevProps.onStart();
        }

        this.setCurrentStep();
        clearInterval(this.interval);
        this.interval = setInterval(this.setCurrentStep, 500);
        window.addEventListener('resize', this.setCurrentStep);
      } else if (!prevProps.guide.getActive() && prevState.active !== prevProps.guide.getActive()) {
        clearInterval(this.interval);

        if (prevProps.onEnd) {
          prevProps.onEnd();
        }
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

        _this2.stepChanged();
      }, 1000);
    }
  }, {
    key: "stepChanged",
    value: function stepChanged() {
      var _this3 = this;

      this.setState({
        fade: true
      });
      setTimeout(function () {
        _this3.setState({
          fade: false
        });
      }, 500);
    }
  }, {
    key: "setCurrentStep",
    value: function setCurrentStep() {
      this.setState({
        currentStep: this.props.guide.getCurrentStep()
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
      var _this4 = this;

      return _react.default.createElement("div", null, this.state.guide && this.state.active && this.state.currentStep && document.getElementById(this.state.currentStep.element) !== null ? _react.default.createElement("div", {
        className: 'parent'
      }, _react.default.createElement(CustomToolTip, {
        enterDelay: this.props.toolTipEnterDelay ? this.props.toolTipEnterDelay : 500,
        leaveDelay: this.props.toolTipLeaveDelay ? this.props.toolTipLeaveDelay : 0,
        placement: typeof this.state.currentStep.toolTipPlacement === "string" ? this.state.currentStep.toolTipPlacement : 'bottom',
        title: typeof this.state.currentStep.toolTip === "string" ? this.state.currentStep.toolTip : '',
        arrow: true
      }, _react.default.createElement("div", {
        className: 'dimmer',
        onClick: function onClick() {
          return document.getElementById(_this4.state.currentStep.element).click();
        },
        onMouseEnter: function onMouseEnter(e) {
          document.getElementById(_this4.state.currentStep.element).focus();
        },
        onMouseLeave: function onMouseLeave(e) {
          document.getElementById(_this4.state.currentStep.element).blur();
        },
        style: {
          width: document.getElementById(this.state.currentStep.element).getBoundingClientRect().width + (this.state.guide.offset ? this.state.guide.offset : 0),
          height: document.getElementById(this.state.currentStep.element).getBoundingClientRect().height + (this.state.guide.offset ? this.state.guide.offset : 0),
          top: document.getElementById(this.state.currentStep.element).getBoundingClientRect().top - (this.state.guide.offset ? this.state.guide.offset : 0),
          left: document.getElementById(this.state.currentStep.element).getBoundingClientRect().left - (this.state.guide.offset ? this.state.guide.offset : 0),
          cursor: this.state.currentStep.clickable ? 'pointer' : 'default',
          animation: this.props.blink ? 'blink 1s step-end infinite alternate' : null
        }
      })), _react.default.createElement("div", {
        id: 'container',
        className: 'container',
        style: {
          display: this.state.fade ? 'none' : 'flex',
          right: this.positionRight(this.state.currentStep.contentPosition),
          left: this.positionLeft(this.state.currentStep.contentPosition, document.getElementById('container') ? document.getElementById('container').offsetWidth : 0),
          bottom: this.positionBottom(this.state.currentStep.contentPosition),
          top: this.positionTop(this.state.currentStep.contentPosition, document.getElementById('container') ? document.getElementById('container').offsetHeight : 0),
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
          _this4.state.guide.setActive(!_this4.state.guide.getActive(), _this4.props.onEnd);

          _this4.setState({
            active: _this4.state.guide.getActive()
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
          _this4.state.guide.goToPrevStep(_this4.props.onPrevStep);

          _this4.stepChanged();
        }
      }, _react.default.createElement(_icons.ArrowLeft, null)), _react.default.createElement(_core.Grid, {
        style: {
          margin: '0 auto',
          width: 'auto'
        },
        container: true,
        spacing: 2
      }, this.state.guide.getSteps().map(function (step) {
        if (step === _this4.state.currentStep) {
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
            if (!_this4.state.guide.disableBackNavigation) {
              _this4.state.guide.gotToStep(step);

              _this4.stepChanged();
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
          _this4.state.guide.nextStep(_this4.props.onNextStep);

          _this4.stepChanged();
        }
      }, _react.default.createElement(_icons.ArrowRight, null))))) : null);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      //TODO: IF on same step no need to do all of this again
      if (props.guide.getActive() && props.guide.getCurrentStep()) {
        //Get the current steps element
        var step = document.getElementById(props.guide.getCurrentStep().element); //Check if we have actually moved to the next step and are not on same element

        if (state.currentStep && props.guide.getCurrentStep() !== state.currentStep) {
          //Grab the prev element and remove the added styles
          var prevStep = document.getElementById(state.currentStep.element); //TODO: Only issue I see with this is if the element had one of these styles we have effectively overwritten it
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
        active: props.guide.getActive(),
        currentStep: props.guide.getCurrentStep()
      };
    }
  }]);

  return GuideRenderer;
}(_react.default.Component);

var GuideWrapper = function GuideWrapper(WrappedComponent, props) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(_temp, _React$Component2);

    function _temp(_props) {
      var _this5;

      _classCallCheck(this, _temp);

      _this5 = _possibleConstructorReturn(this, _getPrototypeOf(_temp).call(this, _props));

      _defineProperty(_assertThisInitialized(_this5), "state", {
        backgroundColor: props.backgroundColor,
        guide: props.guide,
        blink: props.blink
      });

      _this5.setBackgroundColor = _this5.setBackgroundColor.bind(_assertThisInitialized(_this5));
      _this5.updateGuide = _this5.updateGuide.bind(_assertThisInitialized(_this5));
      _this5.setBlink = _this5.setBlink.bind(_assertThisInitialized(_this5));
      return _this5;
    }

    _createClass(_temp, [{
      key: "setBackgroundColor",
      value: function setBackgroundColor(color) {
        this.setState({
          backgroundColor: color
        });
      }
    }, {
      key: "updateGuide",
      value: function updateGuide(guide) {
        this.setState({
          guide: guide
        });
      }
    }, {
      key: "setBlink",
      value: function setBlink(blink) {
        this.setState({
          blink: blink
        });
      }
    }, {
      key: "render",
      value: function render() {
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(GuideRenderer, _extends({}, props, {
          blink: this.state.blink,
          guide: this.state.guide,
          backgroundColor: this.state.backgroundColor
        })), _react.default.createElement(WrappedComponent, _extends({}, this.props, props, {
          setBackgroundColor: this.setBackgroundColor,
          updateGuide: this.updateGuide,
          setBlink: this.setBlink
        })));
      }
    }]);

    return _temp;
  }(_react.default.Component), _temp;
};

var _default = GuideWrapper;
exports.default = _default;

//# sourceMappingURL=GuideRenderer.js.map