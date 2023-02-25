import { RotatingLines } from 'react-loader-spinner';
import { Container } from './Loader.styled';

export default function Loader() {
  return (
    <Container>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </Container>
  );
}
