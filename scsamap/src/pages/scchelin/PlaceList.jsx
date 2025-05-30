import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeaderWithBack from "../../components/common/HeaderWithBack";
import axios from "axios";

const categories = ["전체", "한식", "중식", "일식", "양식", "아시안", "술집"];
const filters = ["최근 등록 순", "좋아요 순", "가격 높은 순", "가격 낮은 순"];


const PlaceListPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [selectedFilter, setSelectedFilter] = useState("최근 등록 순");
    const [places, setPlaces] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observer = useRef();
    const navigate = useNavigate();

    const IMG_BASE_PATH = "http://localhost:8080/img";

    const fetchPlaces = useCallback(async (isRefresh = false) => {
        setLoading(true);
        try {
            let orderBy = "id"; // 기본값: 최근 등록 순
            switch(selectedFilter) {
                case "좋아요 순":
                    orderBy = "like_count";
                    break;
                case "가격 높은 순":
                    orderBy = "price_desc";
                    break;
                case "가격 낮은 순":
                    orderBy = "price_asc";
                    break;
                default:
                    orderBy = "id";
            }

            const res = await axios.get("http://localhost:8080/board/search", {
                params: { 
                    page, 
                    listSize: 5,
                    orderBy: orderBy
                },
                withCredentials: true  // 쿠키를 포함하여 요청
            });
            const newBoards = res.data.boards || [];
            setPlaces((prev) => isRefresh ? newBoards : [...prev, ...newBoards]);
            setHasMore(newBoards.length === 5);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    }, [page, selectedFilter]);

    useEffect(() => {
        setPage(1);
    }, [selectedFilter]);

    useEffect(() => {
        if (page === 1) {
            setPlaces([]);
            fetchPlaces(true); // 새로고침 플래그
        } else {
            fetchPlaces(false);
        }
        // eslint-disable-next-line
    }, [page]);

    // IntersectionObserver 설정
    const lastItemRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prev) => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const handleLikeToggle = async (boardId, e) => {
        e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
        try {
            const response = await axios.post('http://localhost:8080/board/like', 
                null,
                { 
                    params: { boardId: boardId },
                    withCredentials: true 
                }
            );
            
            if (response.data.success) {
                setPlaces(prev => prev.map(place => 
                    place.id === boardId 
                        ? { ...place, liked: response.data.liked, likeCount: response.data.likeCount }
                        : place
                ));
            } else {
                alert(response.data.error || '좋아요 처리에 실패했습니다.');
            }
        } catch (error) {
            console.error('좋아요 처리 중 오류:', error);
            alert('좋아요 처리 중 오류가 발생했습니다.');
        }
    };

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
            <Select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
                {filters.map((f) => (
                    <option key={f}>{f}</option>
                ))}
            </Select>
            <FilterBtn selected={selectedFilter === "지역"} onClick={() => setSelectedFilter("지역")}>
                지역
            </FilterBtn>
        </FilterBar>
        <List>
            {places
            .filter(
                (p) =>
                selectedCategory === "전체" || p.category === selectedCategory
            )
            .map((place, idx, arr) => {
                // IntersectionObserver ref는 필터링된 마지막 아이템에만!
                const isLast = idx === arr.length - 1;
                return (
                    <PlaceCard
                        key={place.id + '-' + idx} // key 중복 방지
                        ref={isLast ? lastItemRef : null}
                        onClick={() => navigate(`/place/${place.id}`)}
                    >
                        <PlaceName>{place.title}</PlaceName>
                        <PlaceTitle>
                            <LikeButton onClick={(e) => handleLikeToggle(place.id, e)}>
                                <span role="img" aria-label="heart">
                                    {place.liked ? '❤️' : '🤍'}
                                </span> {place.likeCount}
                            </LikeButton>
                            &nbsp; {place.region} | {place.category}
                        </PlaceTitle>
                        <PlaceImage src={place.boardFile?.filePath ? IMG_BASE_PATH + place.boardFile.filePath + "/" + place.boardFile.systemName : ""} alt={place.title} />
                        <Price>평균 가격대 {place.price?.toLocaleString()}만원</Price>
                    </PlaceCard>
                );
            })}
            {loading && <div>로딩중...</div>}
        </List>
        <FixedMapButton onClick={() => navigate('/placemap')}>지도보기</FixedMapButton>
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
    border: 1px solid #ABABAB;
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
    bottom: 20px;
    width: 10%;
    margin: 0 auto;
    background:rgb(255, 255, 255);
    color: #0C4DA2;
    border: 1px solid #0C4DA2;
    border-radius: 30px;
    font-size: 12px;
    font-weight: bold;
    z-index: 100;
    cursor: pointer;
    left: 50%;
    transform: translateX(-50%);
`;

const LikeButton = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    user-select: none;
    font-size: 14px;
`;
