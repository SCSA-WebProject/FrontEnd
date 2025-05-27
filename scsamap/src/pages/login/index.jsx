import styled from "styled-components";
import scmapIcon from "../../assets/common/scmapIcon.png";
import Button from '../../components/common/Button';
import Input from "../../components/common/Input";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const LoginPage = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/main');
    };

    useEffect(() => {
        axios.get("http://localhost:8080/board/list")
            .then((res) => {
                console.log("연동 성공", res);
            })
            .catch((err) => {
                console.log("연동 실패", err);
            })
    }, []);

    return (
        <Container>

            {/* 프로젝트 이름 + 로고 이미지 */}
            <LogoContainer>
                <Logo>슥-맵</Logo>
                <LogoImage src={scmapIcon} alt="logo"/>
                <LogoDescription>슥사생 픽 맛집과 후기를 한 눈에!</LogoDescription>
            </LogoContainer>

            {/* 로그인 폼 */}
            <LoginForm onSubmit={handleSubmit}>
                <Input placeholder="아이디" />
                <Input placeholder="비밀번호" type="password" />
                <Button text="로그인" width="100%" style={{ marginTop: '16px' }} />
            </LoginForm>
            <SignUpText onClick={() => navigate('/signup')}>아직 회원이 아니신가요?</SignUpText>

        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column; 
    align-items: center;
`

const LogoContainer = styled.div`
    margin-top: 80px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.div`
    font-family: 'Gugi', cursive;
    font-size: 50px;
    font-weight: 600;
    color: #0C4DA2;
`

const LogoImage = styled.img`
    width: 40%;
`;

const LogoDescription = styled.div`
    font-size: 16px;
    color: #ABABAB;
`;

const LoginForm = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 32px;
    margin-bottom: 16px;
`;

const SignUpText = styled.div`
    color: #ABABAB;
    font-size: 16px;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
`;

export default LoginPage;