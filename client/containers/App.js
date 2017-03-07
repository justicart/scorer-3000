import React from 'react';
import { Link } from 'react-router'
import Flash from '../components/Flash';

class App extends React.Component {
  componentDidMount() {
    $(".button-collapse").sideNav();
  }

  links = () => {
    return [
      { name: 'Home', path: '/' },
      { name: 'Settings', path: '/settings' },
    ].map( (link, i) => {
      let active = this.props.location.pathname === link.path ? 'active' : '';
      return (
        <li key={i} className={active}>
          <Link to={link.path}>{link.name}</Link>
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">Logo</a>
            <a href="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              { this.links() }
            </ul>
            <ul className="side-nav" id="mobile">
              { this.links() }
            </ul>
          </div>
        </nav>
        <Flash />
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

export default App;
