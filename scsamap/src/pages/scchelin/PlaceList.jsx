import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PlaceImg from "../../assets/common/restaurantPic.jpg";
import HeaderWithBack from "../../components/common/HeaderWithBack";

const categories = ["전체", "한식", "중식", "일식", "양식", "아시안", "술집"];
const filters = ["좋아요 순", "최근 등록 순", "가격 높은 순", "가격 낮은 순"];

const placeList = [
    {
        id: 1,
        name: "길이식당 건대점",
        likes: 7,
        location: "서울",
        category: "중식",
        price: 30000,
        image: PlaceImg, // 샘플 이미지
    },
    {
        id: 2,
        name: "가츠시",
        likes: 9,
        location: "서울",
        category: "일식",
        price: 30000,
        image: PlaceImg, // 샘플 이미지
    },
];

const PlaceListPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [selectedFilter, setSelectedFilter] = useState("내 주변");
    const navigate = useNavigate();

    return (
        <Container>
        <HeaderWithBack title="24기 맛집" />
        <CategoryBar>
            {categories.map((cat) => (
            <CategoryBtn
                key={cat}
                selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
            >
                {cat}
            </CategoryBtn>
            ))}
        </CategoryBar>
        <FilterBar>
            <Select>
            {filters.map((f) => (
                <option key={f}>{f}</option>
            ))}
            </Select>
            <FilterBtn selected={selectedFilter === "내 주변"} onClick={() => setSelectedFilter("내 주변")}>
            내 주변
            </FilterBtn>
            <FilterBtn selected={selectedFilter === "지역"} onClick={() => setSelectedFilter("지역")}>
            지역
            </FilterBtn>
        </FilterBar>
        <List>
            {placeList
            .filter(
                (p) =>
                selectedCategory === "전체" || p.category === selectedCategory
            )
            .map((place) => (
                <PlaceCard key={place.id} onClick={() => navigate(`/place/${place.id}`)}>
                <PlaceName>{place.name}</PlaceName>
                <PlaceTitle>
                    <span role="img" aria-label="thumbs up">👍</span> {place.likes} &nbsp; {place.location} | {place.category}
                </PlaceTitle>
                <PlaceImage src={place.image} alt={place.name} />
                <Price>평균 가격대 {place.price.toLocaleString()}원</Price>
                </PlaceCard>
            ))}
        </List>
        <FixedMapButton>지도보기</FixedMapButton>
        </Container>
    );
};

export default PlaceListPage;

// Styled Components
const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    min-height: 100vh;
`;

const CategoryBar = styled.div`
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 0 16px;
    margin-bottom: 8px;
`;
const CategoryBtn = styled.button`
    background: none;
    font-size: 16px;
    margin-right: 16px;
    padding: 8px 0;
    color: ${(props) => (props.selected ? "#176BCE" : "#888")};
    border-bottom: ${(props) => (props.selected ? "2px solid #176BCE" : "none")};
    font-weight: ${(props) => (props.selected ? "bold" : "normal")};
    cursor: pointer;
`;
const FilterBar = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 16px;
    margin-bottom: 8px;
    gap: 8px;
`;
const Select = styled.select`
    padding: 4px 8px;
    border-radius: 8px;
    border: 1px solid #ddd;
`;
const FilterBtn = styled.button`
    background: ${(props) => (props.selected ? "#BFDBFF" : "#f5f5f5")};
    font-weight: ${(props) => (props.selected ? "bold" : "normal")};
    color: ${(props) => (props.selected ? "#0C4DA2" : "#176BCE")};
    border: none;
    padding: 4px 16px;
    font-size: 15px;
    cursor: pointer;
`;

const List = styled.div`
    padding: 0 16px;
`;

const PlaceCard = styled.div`
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 8px #eee;
    margin-bottom: 24px;
    padding: 16px;
    cursor: pointer;
`;
const PlaceTitle = styled.div`
    font-size: 14px;
    color: #888;
    margin-bottom: 8px;
`;
const PlaceName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;
const PlaceImage = styled.img`
    width: 100%;
    border-radius: 12px;
    margin-bottom: 8px;
`;
const Price = styled.div`
    font-size: 13px;
    color: #888;
    margin-bottom: 8px;
`;
const FixedMapButton = styled.button`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 15%;
    margin: 0 auto;
    background:rgb(255, 255, 255);
    color: #0C4DA2;
    border: 1px solid #0C4DA2;
    border-radius: 30px;
    font-size: 15px;
    font-weight: bold;
    z-index: 100;
    cursor: pointer;
    left: 50%;
    transform: translateX(-50%);
`;
