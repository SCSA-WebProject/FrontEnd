import styled from 'styled-components';

const Button = ({ text, width, disabled, onClick }) => {

    // 클릭 시 disabled가 false일 때만 onClick 이벤트 실행
    const handleClick = (e) => {
        if (!disabled && onClick) {
            onClick(e);
        }
    };

    return (
        <StyledButton 
            width={width}
            disabled={disabled}
            onClick={handleClick}
        >
            {text}
        </StyledButton>
    );
};

const StyledButton = styled.button`
    width: ${props => props.width || '100%'};
    height: 56px;
    border: none;
    border-radius: 8px;
    background-color: ${props => props.disabled ? '#DEDEDE' : '#0C4DA2'};
    color: white;
    font-size: 16px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: opacity 0.2s ease;
`;

export default Button;