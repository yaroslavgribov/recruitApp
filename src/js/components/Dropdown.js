import React, { PureComponent } from 'react';

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
    const { label, children } = this.props;
    const { expanded } = this.state;

    return (
      <div className="dropdown">
        <button type="button" onClick={this.handleClick}>
          {label}
        </button>
        {expanded && <div className="dropdown-content">{children}</div>}
      </div>
    );
  }
}

export default Dropdown;
