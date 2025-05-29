import styled from "styled-components";
import Button from "../../components/common/Button";
import HeaderWithBack from "../../components/common/HeaderWithBack";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const RegisterPage = () => {
    const [title, setTitle] = useState("");
    const [region, setRegion] = useState("서울");
    const [category, setCategory] = useState("중식");
    const [price, setPrice] = useState("");
    const [content, setContent] = useState("");
    const [address, setAddress] = useState("");
    const [attach, setAttach] = useState(null)

    const navigate = useNavigate();
    
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                setAddress(data.address);
            }
        }).open();
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!isFormFilled) return;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("region", region);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("content", content);
        formData.append("address", address);

        if (attach) formData.append("attach", attach);

        try {
            await axios.post("http://localhost:8080/board/write", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            console.log(formData)
            alert("등록이 완료되었습니다!");
            navigate("/main");
        } catch (err) {
            alert("등록 실패: " + (err.response?.data?.error || err.message));
        }
    };


    // 하나라도 빈 값이 있으면 false
    const isFormFilled = title && price && content && address;

    return (
        <Container>
            <HeaderWithBack title="맛집 등록하기" />
            <Form onSubmit={handleRegister}>
                <Label>사진 첨부</Label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => setAttach(e.target.files[0])}
                />
                <Label>상호명</Label>
                <Row>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예시) 넘버원 양꼬치 한남점" />
                </Row>
                <SubText>체인점일 경우 지점도 함께 작성해주세요.</SubText>

                <Label>지역 & 분류</Label>
                <Row>
                    <Select value={region} onChange={(e) => setRegion(e.target.value)}>
					<option>서울</option>
					<option>경기</option>
					<option>인천</option>
					<option>부산</option>
					<option>대구</option>
					<option>광주</option>
					<option>대전</option>
					<option>울산</option>
					<option>세종</option>
					<option>강원</option>
					<option>충북</option>
					<option>충남</option>
					<option>전북</option>
					<option>전남</option>
					<option>경북</option>
					<option>경남</option>
					<option>제주</option>

                        {/* 지역 추가 */}
                    </Select>
                    <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option>중식</option>
                        <option>한식</option>
                        <option>양식</option>
                        <option>중식</option>
                        <option>일식</option>
                        <option>아시안</option>
                        <option>술집</option>
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
                    <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder="예시) 여기는 옥수수전이 미쳤어요" />
                </Row>

                <Label>주소</Label>
                <Row>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="주소를 검색해주세요" readOnly />
                    <AddressButton type="button" onClick={handleAddressSearch}>주소 검색</AddressButton>
                </Row>
            
                <Button text="등록" type="submit" width="100%" disabled={!isFormFilled} style={{ marginTop: "32px" }} />
            </Form>
        </Container>
    );
};

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    min-height: 100vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 40px;
    padding: 0 16px;
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

const AddressButton = styled.button`
    width: 40%;
    height: 44px;
    background: #0C4DA2;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    cursor: pointer;
    margin-left: 8px;
    &:hover {
        background: #0B3D82;
    }
`;

export default RegisterPage;