import React from 'react'
import PropTypes from 'prop-types'
import DateSelect from 'react-icons/lib/fa/caret-square-o-down'


class StartDateButton extends React.Component {
  render () {
  	const {value} = this.props;
    return (
      <button
        className="set-date-button"
        onClick={this.props.onClick}
        title={value !== '' ? value : "Set starting date"}>
        <DateSelect size={16} />
      </button>
    )
  }
}

StartDateButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

export default StartDateButton;