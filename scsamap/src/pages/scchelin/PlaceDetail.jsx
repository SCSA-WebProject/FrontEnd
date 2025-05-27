import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PlaceImg from "../../assets/common/restaurantPic.jpg"; // 샘플 이미지
import HeaderWithBack from "../../components/common/HeaderWithBack";

const placeData = {
    1: {
        id: 1,
        writer: "김혜준",
        company: "DX",
        name: "넘버원 양꼬치",
        likes: 8,
        reviewCount: 3,
        category: "중식",
        location: "서울",
        description: "한남동에서 제일 맛있는 양꼬치 맛집",
        distance: "한남역에서 680m",
        address: "서울특별시 용산구 한남동 79-3",
        priceRange: "요리 1만원 ~ 3만원",
        openHours: "오늘(목) 16:00~03:00",
        menu: [
        { name: "넘버원 양꼬치", price: "16,000원" },
        { name: "넘버원 양갈비", price: "23,000원" },
        ],
        image: PlaceImg,
    },
    2: {
        id: 2,
        writer: "김혜준",
        company: "DX",
        name: "가츠시",
        likes: 9,
        reviewCount: 2,
        category: "일식",
        location: "서울",
        description: "서울에서 인기 많은 일식집",
        distance: "강남역에서 200m",
        address: "서울특별시 강남구 강남대로 123",
        priceRange: "요리 2만원 ~ 4만원",
        openHours: "오늘(목) 11:00~22:00",
        menu: [
        { name: "가츠동", price: "12,000원" },
        { name: "사케동", price: "15,000원" },
        ],
        image: PlaceImg,
    },
};

const PlaceDetailPage = () => {
    // const { placeId } = useParams();
    const placeId = 1;
    const navigate = useNavigate();
    const place = placeData[placeId];

    if (!place) return <div>존재하지 않는 가게입니다.</div>;

    return (
        <Container>
            <HeaderWithBack title={place.name} />
            <TopImageBox>
                <TopImage src={place.image} alt={place.name} />
                <ImageDots>
                    {[...Array(7)].map((_, i) => (
                        <Dot key={i} active={i === 0} />
                    ))}
                </ImageDots>
            </TopImageBox>
            <Content>
                <SubInfo>
                    {place.location} | {place.category}
                </SubInfo>
                <TitleRow>
                    <Title>{place.name}</Title>
                </TitleRow>
                <WriterRow>
                    <Writer>작성자 | {place.company} {place.writer}</Writer>
                </WriterRow>

                <Like>
                    <span role="img" aria-label="thumbs up">👍</span> {place.likes}
                </Like>
                <InfoRow>
                    <InfoIcon>💰</InfoIcon>
                    <span>{place.priceRange}</span>
                </InfoRow>
                <Desc>{place.description}</Desc>
            </Content>
        </Container>
    );
};

export default PlaceDetailPage;

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    min-height: 100vh;
`;
const TopImageBox = styled.div`
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
`;
const TopImage = styled.img`
    width: 100%;
    height: 220px;
    object-fit: cover;
`;

const ImageDots = styled.div`
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 4px;
`;
const Dot = styled.div`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${(props) => (props.active ? "#fff" : "#bbb")};
    opacity: 0.8;
`;
const Content = styled.div`
    padding: 20px 16px 32px 16px;
`;
const SubInfo = styled.div`
    color: #888;
    font-size: 15px;
    margin-bottom: 4px;
`;
const TitleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const WriterRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Writer = styled.div`
    font-size: 12px;
    color: #ABABAB;
`;
const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const Like = styled.div`
    font-size: 16px;
    margin: 8px 0 4px 0;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Desc = styled.div`
    color: #888;
    font-size: 15px;
    margin-bottom: 16px;
`;
const InfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #222;
    font-size: 15px;
    margin-bottom: 4px;
`;
const InfoIcon = styled.span`
    font-size: 18px;
`;