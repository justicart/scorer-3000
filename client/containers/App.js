import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Flash from '../components/Flash';
import { logout, refreshLogin } from '../actions/auth';

class App extends React.Component {
  componentDidMount() {
    $(".button-collapse").sideNav();
    this.props.dispatch(refreshLogin())
  }

  link = (i, name, path) => {
    let activeClass = this.props.location.pathname === path ? 'active' : '';
    return (
      <li key={i} className={activeClass}>
        <Link to={path}>{name}</Link>
      </li>
    )
  }

  links = () => {
    return [
      { name: 'Home', path: '/' },
      { name: 'Settings', path: '/settings' },
    ].map( (link, i) => {
      let active = this.props.location.pathname === link.path ? 'active' : '';
      return this.link(i, link.name, link.path);
    })
  }

  authLinks = () => {
    if (Object.keys(this.props.user).length) {
      let links = [
        { name: 'Dashboard', path: '/dashboard'}
      ].map( (link, i) => {
        return this.link(i, link.name, link.path)
      });
      links.push(
        <li key="logout">
          <a
            href="#"
            onClick={ e => {
              this.props.dispatch(logout(this.props.router))
            }}
          >
           Logout
          </a>
        </li>
      )
      return links;
    } else {
      return [
        { name: 'Sign In', path: '/login' },
        { name: 'Sign Up', path: '/signup' },
      ].map( (link, i) => {
        return this.link(i, link.name, link.path)
      })
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo"><img src="/images/scorer-logo-wh.svg" /></a>
            <a href="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              { this.links() }
              { this.authLinks() }
            </ul>
            <ul className="side-nav" id="mobile">
              { this.links() }
              { this.authLinks() }
            </ul>
          </div>
        </nav>
        <Flash />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(App);
