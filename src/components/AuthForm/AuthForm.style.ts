import { styled } from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 400px;
    height: 400px;
    background-color: #9ED5C5;
    border-radius: 4px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const Title = styled.h1`
    font-size: 26px;
    color: #fff;
`;

export const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

export const Input = styled.input`
    width: 280px;
    height: 36px;
    border: none;
    background-color: #DEF5E5;
    padding-left: 10px;
    font-size: 18px;

`;

export const Label = styled.label`
    margin-bottom: 6px;
    font-weight: bold;
`;

export const Button = styled.button`
    width: 280px;
    height: 40px;
    border: none;
    background-color: #439A97;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-top: 20px;
    font-weight: bold;
    &:hover {
        opacity: 0.7;
    }
`;

