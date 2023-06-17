import { styled } from "styled-components";

export const Wrapper = styled.div`
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const Input = styled.input`
    width: 280px;
    height: 40px;
    padding-left: 10px;
    font-size: 18px;
    border-radius: 2px;

    border: none;
    background-color: #DEF5E5;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const Button = styled.button`
    width: 48px;
    height: 40px;
    margin-left: 10px;
    border-radius: 2px;
    border: none;
    font-weight: bold;
    background-color: #439A97;
    &:hover {
        opacity: 0.7;
    }
    &:disabled {
        cursor: auto;
        opacity: 1.0;
      }
`;