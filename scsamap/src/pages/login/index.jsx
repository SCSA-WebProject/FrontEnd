import styled from "styled-components";
import scchelinIcon from "../../assets/common/cookIcon.png";
import Button from '../../components/common/Button';
import Input from "../../components/common/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Modal from "../../components/common/Modal";

const LoginPage = () => {
    const navigate = useNavigate();

    // ✅ 상태 정의
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);

    // ✅ 로그인 요청 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", {
                id,
                password
            }, {
                withCredentials: true
            });

            if (response.data.error) {
                setShowModal(true);
                return;
            }

            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            navigate('/main');
        } catch (error) {
            console.error("로그인 실패:", error);
            setShowModal(true);
        }
    };

    const handleModalConfirm = () => {
        setShowModal(false);
    };

    return (
        <Container>
            {showModal && (
                <Modal
                    title="로그인 실패"
                    content="아이디 또는 비밀번호가 일치하지 않습니다."
                    item1Label="확인"
                    item2Label=""
                    onItem1Click={handleModalConfirm}
                    onItem2Click={() => {}}
                />
            )}
            {/* 프로젝트 이름 + 로고 이미지 */}
            <LogoContainer>
                <Logo>슥슐랭 가이드</Logo>
                <LogoImage src={scchelinIcon} alt="logo" />
                <LogoDescription>슥사생 픽 맛집과 후기를 한 눈에!</LogoDescription>
            </LogoContainer>

            {/* 로그인 폼 */}
            <LoginForm onSubmit={handleSubmit}>
                <Input
                    placeholder="아이디"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <Input
                    placeholder="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button text="로그인" width="100%" style={{ marginTop: '16px' }} />
            </LoginForm>

            <SignUpText onClick={() => navigate('/signup')}>
                아직 회원이 아니신가요?
            </SignUpText>
            {showModal && (
                <Modal
                    title="로그인 실패"
                    content="아이디 또는 비밀번호가 일치하지 않습니다."
                    item1Label="확인"
                    item2Label=""
                    onItem1Click={handleModalConfirm}
                    onItem2Click={() => {}}
                />
            )}
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column; 
    align-items: center;
`;

const LogoContainer = styled.div`
    margin-top: 50px;
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
    margin-bottom: 10px;
`;

const LogoImage = styled.img`
    width: 30%;
    margin-bottom: 10px;
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
