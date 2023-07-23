import { Container } from './styles';

export function Tag({ title,color, ...rest }) {
    return (
        <Container {...rest} style={{ background: color? color : '#312E38'}}>
            {title}
        </Container>
    )
}