import { styled } from "styled-components";

export const Wrapper = styled.li`
    width: 600px;
    min-height: 46px;
    background-color: #DEF5E5;

    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 2px;
    padding: 0 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const Label = styled.label``;

export const Span = styled.span``;

export const CheckBox = styled.input`
    margin-right:10px;
    accent-color: #9ED5C5;
    transform : scale(1.5);
`;

export const ButtonWrapper = styled.div``;

export const Button = styled.button`
    width: 48px;
    height: 34px;
    margin-left: 10px;
    border-radius: 6px;
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

export const Input = styled.input`
    width: 280px;  
    height: 34px;
    font-size: 18px;

`;