import styled from "styled-components";
import HeaderWithBack from "../../components/common/HeaderWithBack";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../components/common/Modal";

const PlaceEditPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [region, setRegion] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [content, setContent] = useState("");
    const [address, setAddress] = useState("");
    const [attach, setAttach] = useState(null);
    const [loading, setLoading] = useState(true);
    const [systemName, setSystemName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 주소 검색 스크립트 로드
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); };
    }, []);

    useEffect(() => {
        // 기존 게시글 정보 불러오기
        axios.get("http://localhost:8080/board/detail", {
            params: { id },
            withCredentials: true
        })
        .then(res => {
            const board = res.data.board;
            setTitle(board.title || "");
            setRegion(board.region || "");
            setCategory(board.category || "");
            setPrice(board.price || "");
            setContent(board.content || "");
            setAddress(board.address || "");
            setLoading(false);
            setSystemName(board.boardFile?.systemName || "");
        })
        .catch(() => setLoading(false));
    }, [id]);

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                setAddress(data.address);
            }
        }).open();
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!isFormFilled) return;
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", title);
        formData.append("region", region);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("content", content);
        formData.append("address", address);
        if (attach) formData.append("attach", attach);
        try {
            await axios.post("http://localhost:8080/board/update", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            setShowModal(true);
        } catch (err) {
            alert("수정 실패: " + (err.response?.data?.error || err.message));
        }
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        navigate(-1);
    };

    const isFormFilled = title && price && content && address;

    if (loading) return <div>로딩중...</div>;

    return (
        <Container>
            <HeaderWithBack title="정보 수정" />
            {showModal && (
                <Modal
                    title="알림"
                    content="수정이 완료되었습니다!"
                    item1Label="확인"
                    item2Label=""
                    onItem1Click={handleModalConfirm}
                    onItem2Click={() => {}}
                />
            )}
            <Form onSubmit={handleEdit}>
                <Label>사진 첨부</Label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => setAttach(e.target.files[0])}
                />
                {systemName && (
                    <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>
                        기존 첨부 파일: {systemName}
                    </div>
                )}
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
                    </Select>
                    <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option>중식</option>
                        <option>한식</option>
                        <option>양식</option>
                        <option>일식</option>
                        <option>아시안</option>
                        <option>술집</option>
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
                <Button type="submit" disabled={!isFormFilled} style={{ marginTop: "32px" }}>수정하기</Button>
            </Form>
        </Container>
    );
};

export default PlaceEditPage;

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    padding: 0 16px;
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

const Button = styled.button`
    width: 100%;
    height: 44px;
    background: #0C4DA2;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 16px;
    &:disabled {
        background: #DEDEDE;
        color: #fff;
        cursor: not-allowed;
    }
`;