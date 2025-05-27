import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderWithBack from "../../components/common/HeaderWithBack";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import axios from "axios";

const SignUpPage = () => {

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('DX');

    // 모든 input 태그에 값이 채워질 경우 '회원가입' 버튼 활성화
    const isFormFilled = id && password && name && phone && company;

    // 회원가입 버튼 클릭 시 메인 페이지로 이동
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!isFormFilled) return;
    
        const data = {
            id,
            password,
            name,
            phone,
            classNum: 1, // 실제 입력값으로 대체
            companyCode: 200, // 실제 입력값으로 대체 (100 : DX, 200 : DS, 300 : SDS)
            companyName: "dx",
        };
    
        try {
            const response = await axios.post(
                "http://localhost:8080/signup",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log(response);
            alert("회원가입이 완료되었습니다!");

            sessionStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/main");
            
        } catch (error) {
            alert("회원가입 실패: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <Container>
            <HeaderWithBack title="회원가입" />
            <Form onSubmit={handleSignUp}>
                <Label>아이디</Label>
                <Row>
                    <Input placeholder="아이디를 입력해주세요." style={{flex: 1}} value={id} onChange={(e) => setId(e.target.value)} />
                    <CheckButton type="button">중복확인</CheckButton>
                </Row>
                <Label>비밀번호</Label>
                <Input placeholder="비밀번호를 입력해주세요." type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Label>이름</Label>
                <Input placeholder="예시) 이준영" value={name} onChange={(e) => setName(e.target.value)} />
                <Label>연락처</Label>
                <Input placeholder="예시) 010-1234-5678" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Label>계열사</Label>
                <SelectWrapper>
                    <StyledSelect value={company} onChange={(e) => setCompany(e.target.value)}>
                        <option>DX</option>
                        <option>DS</option>
                        <option>SDS</option>
                    </StyledSelect>
                    <ArrowIcon />
                </SelectWrapper>
                <Button text="회원가입" type="submit" width="100%" disabled={!isFormFilled} style={{ marginTop: "32px" }} />
            </Form>
        </Container>
    );

};

const Container = styled.div`
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 24px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const Label = styled.label`
    color: #0C4DA2;
    font-size: 15px;
    font-weight: 500;
    margin-top: 10px;
`;

const Row = styled.div`
    display: flex;
    gap: 8px;
`;

const SelectWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 20px;
`;

const StyledSelect = styled.select`
    width: 100%;
    height: 56px;
    border: 1.5px solid #C4C4C4;
    border-radius: 10px;
    padding: 0 40px 0 16px; /* 오른쪽에 아이콘 공간 확보 */
    font-size: 18px;
    color: #222;
    background: #fff;
    appearance: none;
`;

const ArrowIcon = styled(IoIosArrowDown)`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #888;
    font-size: 24px;
`;

const CheckButton = styled.button`
    background: #0C4DA2;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    padding: 0 18px;
    height: 56px;
    cursor: pointer;
    white-space: nowrap;
`;

export default SignUpPage;