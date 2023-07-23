import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 1120px;
  margin-top: 40px !important;
  margin: 0 auto;
  > main {
    overflow-y: auto;
    padding-right: 8px;
  }

  > Link {
    display: flex !important;
    ButtonBack {
    }
  }
  main::-webkit-scrollbar {
    width: 8px; /* width of the entire scrollbar */
  }

  main::-webkit-scrollbar-track {
    background: transparent; /* color of the tracking area */
  }

  main::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.COLORS.ROSE}; /* color of the scroll thumb */
    border-radius: 9999px;
    border: none; /* creates padding around scroll thumb */
  }
`;

export const Rating = styled.div`
  display: flex;
  gap: 6px;
`;

export const MovieHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Info = styled.div`
  display: flex;
  gap: 8px;
`;
export const InfoContent = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
export const Avatar = styled.div`
  > img {
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
`;
export const Tags = styled.div`
  margin-top: 40px;
`;

export const Description = styled.div`
  margin-top: 48px;
  text-align: justify;
`;

export const MovieHeaderInfo = styled.div`
display: flex;
  gap: 20px;
`;


export const Buttons = styled.div`
  margin-right: 50px;
`;