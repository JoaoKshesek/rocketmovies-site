import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
  grid-area: header;

  height: 116px;
  width: 100%;
  gap: 64px;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.GRAY_600};

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 30px 123px;

  > h1 {
    font-size: 24px !important;
    color: ${({ theme }) => theme.COLORS.ROSE};
  }
`;
export const Content = styled.div`
  width: 1120px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  gap: 64px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_600}; cursor: pointer;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 9px;
    line-height: 24px;
    width: 140px;

    span {
      font-size: 14px;
      color: ${({ theme }) => theme.COLORS.GRAY_300};
      cursor: pointer;
    }

    strong {
      font-size: 14px;
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  }
`;

