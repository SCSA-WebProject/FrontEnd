import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderWithBack = ({ title }) => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={handleBack}><IoIosArrowBack size={24} /></BackButton>
                <Title>{title}</Title>
            </Header>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Header = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const ButtonContainer = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
`;

const BackButton = styled.div`
    background: none;
    border: none;
    font-size: 28px;
    color: #223A4A;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 8px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    pointer-events: none; // 타이틀이 클릭 이벤트를 막지 않게!
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
`;

export default HeaderWithBack;