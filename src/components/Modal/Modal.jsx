import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  clickBackdrop = evt => {
    if (evt.target.nodeName !== 'IMG') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage } = this.props;

    return (
      <div className={styles.backdrop} onClick={this.clickBackdrop}>
        <div className={styles.modal}>
          <img src={largeImage} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
