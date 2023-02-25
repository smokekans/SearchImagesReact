import { BtnLoad } from './Button.styled';
import PropTypes from 'prop-types';

export default function Button({ handleClick }) {
  return (
    <BtnLoad type="button" onClick={handleClick}>
      Load more
    </BtnLoad>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
