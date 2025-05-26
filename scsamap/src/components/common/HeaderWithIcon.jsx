import styled from "styled-components";
import cookIcon from "../../assets/common/cookIcon.png";

const HeaderWithIcon = () => {
    return (
        <HeaderContainer>
            <IconImg src={cookIcon} alt="cook icon" />
            <HeaderText>슥슐랭 가이드</HeaderText>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: #fff;
`;

const IconImg = styled.img`
    width: 40px;
    height: 40px;
`;

const HeaderText = styled.span`
    font-size: 22px;
    font-weight: bold;
    color: #176BCE;
    font-family: 'Gugi', cursive;
    margin-left: 12px;
`;

export default HeaderWithIcon;