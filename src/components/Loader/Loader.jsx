import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ type = 'ThreeDots', color = '#000', height = '50', width = '50' }) => {
  return <ThreeDots visible="true" type={type} color={color} height={height} width={width} />;
};

Loader.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
};

export default Loader;
