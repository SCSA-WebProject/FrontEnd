import styled from 'styled-components';

const StyledInput = styled.input`
    width: 100%;
    height: 56px;
    border: 1.5px solid #C4C4C4;
    border-radius: 10px;
    padding: 0 16px;
    font-size: 18px;
    color: #222;
    background: #fff;
    box-sizing: border-box;

    &::placeholder {
        color: #C4C4C4;
        font-size: 16px;
    }

    &:focus {
        outline: none;
        border-color: #0C4DA2;
    }
`;

const Input = (props) => {
    return (
        <StyledInput {...props} />
    );
};

export default Input;