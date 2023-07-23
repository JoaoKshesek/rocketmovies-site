import { Container } from './styles'

export function Input({ icon: Icon,isNumber, ...rest }){
    return(
        <Container>
            {Icon && <Icon size={20} />}
            {isNumber ?<input {...rest} type='number' min="0" max="5" />:<input {...rest} /> }
        </Container>
    )
}