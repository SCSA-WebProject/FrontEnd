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
                <ButtonContainer onClick={handleBack}>
                    <BackButton><IoIosArrowBack size={24} /></BackButton>
                </ButtonContainer>
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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonContainer = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
`;

const BackButton = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    font-size: 28px;
    color: #223A4A;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
`;

export default HeaderWithBack;