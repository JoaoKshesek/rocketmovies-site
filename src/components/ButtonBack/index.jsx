import { Container } from './styles';
import { FiArrowLeft} from 'react-icons/fi';

export function ButtonBack(){
    return (
        <Container 
        type="button">
            <FiArrowLeft />
            Voltar
        </Container>
    )
}