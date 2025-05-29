import styled from "styled-components";
import HeaderWithIcon from "../../components/common/HeaderWithIcon";

const MyPage = () => {
    return (
        <Container>
            <HeaderContainer>
                <HeaderWithIcon />
            </HeaderContainer>
        </Container>
    );
};

export default MyPage;

const Container = styled.div`
    width: 100%;
    height: 100%
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HeaderContainer = styled.div`
    width: 100%;
    max-width: 600px;
    border-bottom: 1px solid #ABABAB;
`;