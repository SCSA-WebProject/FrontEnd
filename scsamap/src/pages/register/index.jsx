import styled from "styled-components";
import Button from "../../components/common/Button";
import HeaderWithBack from "../../components/common/HeaderWithBack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [comment, setComment] = useState("");

    const navigate = useNavigate();
    const handleRegister = () => {
        navigate("/main")
    };
    
    // 하나라도 빈 값이 있으면 false
    const isFormFilled = name && price && comment;

    return (
        <Container>
            <HeaderWithBack title="맛집 등록하기" />
            <Form>
                <Label>상호명</Label>
                <Row>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="예시) 넘버원 양꼬치 한남점" />
                </Row>
                <SubText>체인점일 경우 지점도 함께 작성해주세요.</SubText>

                <Label>지역 & 분류</Label>
                <Row>
                    <Select value={region} onChange={(e) => setRegion(e.target.value)}>
                        <option>경기</option>
                        <option>서울</option>
                        <option>부산</option>
                        {/* 지역 추가 */}
                    </Select>
                    <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option>중식</option>
                        <option>한식</option>
                        <option>일식</option>
                        {/* 분류 추가 */}
                    </Select>
                </Row>

                <Label>가격대 (숫자만 표기)</Label>
                <Row>
                    <InputSmall value={price} onChange={(e) => setPrice(e.target.value)} placeholder="예시) 1" />
                    <Unit>만원 대</Unit>
                </Row>

                <Label>한줄평</Label>
                <Row>
                    <Input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="예시) 여기는 옥수수전이 미쳤어요" />
                </Row>
            
                <Button text="등록" width="100%" disabled={!isFormFilled} onClick={handleRegister} style={{ marginTop: "32px" }} />
            </Form>
        </Container>
    );
};

const Container = styled.div`
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    padding: 0 24px;
    min-height: 100vh;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const Label = styled.label`
    font-size: 15px;
    font-weight: 500;
    margin-top: 10px;
    color: #0C4DA2;
`;

const Input = styled.input`
    width: 100%;
    height: 44px;
    border: 1.5px solid #D9D9D9;
    border-radius: 12px;
    padding: 0 16px;
    font-size: 15px;
    background: #fafbfc;
`;

const InputSmall = styled(Input)`
    width: 80px;
    margin-right: 8px;
`;

const SubText = styled.div`
    font-size: 12px;
    color: #ABABAB;
    margin-bottom: 8px;
    margin-top: -10px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

const Select = styled.select`
    width: 50%;
    height: 44px;
    border: 1.5px solid #D9D9D9;
    border-radius: 12px;
    padding: 0 16px;
    font-size: 15px;
    background: #fafbfc;
    margin-right: 8px;
    &:last-child {
        margin-right: 0;
    }
`;

const Unit = styled.span`
    font-size: 12px;
    color: #176BCE;
`;

export default RegisterPage;