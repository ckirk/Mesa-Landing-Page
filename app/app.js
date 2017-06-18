import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Component Imports
import Process from './components/Process';
import Contact from './components/Contact';
import Work from './components/Work';
import Services from './components/Services';
import Home from './components/Home';
import Menu from './components/Menu';
import MobileMenu from './components/MobileMenu';
import Slider from './components/Slider';


// 3D Shazz
import Inject3dModel from './ThreeStuff';

// REACT-ROUTER
class App extends Component {
  componentDidMount() {
    Inject3dModel();
  }

  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Base}>
          <IndexRoute component={Home} />
          <Route path='work' component={Work} />
          <Route path='process' component={Process} />
          <Route path='services' component={Services} />
          <Route path='contact' component={Contact} />
          <Route path='slider' component={Slider} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}

const ContentBox = (props) => (
  <div id="contentBoxContainer" className={ props.location == '/process' ? 'process' : '' }>
    <div id="contentBox">
      {props.pushChildren}
    </div>
  </div>
)

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false }
  };

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div id="app-container">

        <div id="background">
          <div id="threeBlur" className={ window.innerWidth < 768 || this.props.location.pathname != '/' ? 'blur' : '' }>
            <div id="3dInject"></div>
          </div>
          <div id="darken"></div>
        </div>

        <div id="content">
          <div id='top' className={this.props.location.pathname == '/process' ? 'process' : ''}></div>
          <div id='middle'>
            <div id='left'></div>
              { this.props.location.pathname == '/work' || this.props.location.pathname == '/' ?
                <ReactCSSTransitionGroup
                  transitionName="ourWork"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}>
                  {this.props.children}
                </ReactCSSTransitionGroup> :
                <ContentBox pushChildren={this.props.children} location={this.props.location.pathname}/>
              }
            <div id='right'></div>
          </div>
          <div id='bottom' className={ this.props.location.pathname == '/process' ? 'hide' : '' }></div>
        </div>

        <div id="overlay">
          <div id="header">
            <Link to='/'>
              <h1>
                JIST <span>Design</span>
              </h1>
            </Link>
            <h2><span>Industrial Design // Electronics // Prototyping // Manufacturing</span></h2>
          </div>
          <Menu pathName={this.props.location.pathname}/>
        </div>

        <div id="menu-btn" onClick={this.toggleOpen}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>

        <MobileMenu open={this.state.open} closeMenu={this.toggleOpen} />
      </div>
    )
  }
};

const NotFound = (props) => {
  return (
    <h1>Not Found</h1>
  )
}

export default App;
