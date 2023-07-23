import styled from 'styled-components';
import backgroundImg from '../../assets/background.jpeg'

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Form = styled.form`
    padding: 0 136px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: center;

    > h1 {
        font-size: 48px;
        font-weight: 700;
        color: ${({ theme }) => theme.COLORS.ROSE};
    }

    > h2 {
        font-size: 24px;
        margin: 48px 0;
        font-weight: 500;
    }

    > p {
        font-size: 14px;
        font-weight: 400;
        color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    > a {
        color: ${({ theme }) => theme.COLORS.ROSE};
        margin: 42px auto 0;
        display: flex;
        align-items: center;   

        svg {
                width: 20px;
                height: 20px;
                color: ${({ theme }) => theme.COLORS.ROSE};
                margin-right: 8px;
            }
    }

`;

export const Background = styled.div`
    flex: 1;
    background: url(${backgroundImg}) no-repeat center center;
    background-size: cover;
`;