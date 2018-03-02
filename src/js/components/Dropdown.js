import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends PureComponent {
  state = {
    expanded: false
  };

  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const { children, renderControl } = this.props;
    const { expanded } = this.state;

    return (
      <div className="dropdown">
        <button
          className="button button-link"
          type="button"
          onClick={this.handleClick}
        >
          {renderControl()}
        </button>
        {expanded && <div className="dropdown-content">{children}</div>}
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.node,

  renderControl: PropTypes.func
};

export default Dropdown;
