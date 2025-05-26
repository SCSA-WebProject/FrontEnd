import HeaderWithIcon from "../../components/common/HeaderWithIcon";
import styled from "styled-components";
import BannerImg from "../../assets/main/Banner.svg";
import PlaceCard from "../../components/common/PlaceCard";
import PlaceImg from "../../assets/common/restaurantPic.jpg";
import { FaUtensils } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const placeList = [
    { image: PlaceImg, category: "한식", name: "샤브온당", likes: 3, path: "/place/1" },
    { image: PlaceImg, category: "일식", name: "긴자료코 신사점", likes: 5, path: "/place/2" },
    { image: PlaceImg, category: "중식", name: "매운향솥", likes: 3, path: "/place/3" },
    { image: PlaceImg, category: "중식", name: "넘버원 양꼬치 한남점", likes: 12, path: "/place/4" },
    { image: PlaceImg, category: "일식", name: "가츠시", likes: 9, path: "/place/5" },
];

const MainPage = () => {

    const navigate = useNavigate();
    return (
        <MainWrapper>
            <HeaderContainer>
                <HeaderWithIcon />
            </HeaderContainer>
            <BannerWrapper>
                <BannerImage src={BannerImg} alt="광고 배너" />
            </BannerWrapper>

            {/* 버튼 2개 배치 */}
            <ButtonWrapper>
                <ActionButton onClick={() => navigate("/register")}>
                    <FaUtensils size={18} style={{ marginRight: 8 }} />
                    내 맛집 등록하기
                </ActionButton>
                <ActionButton onClick={() => navigate("/placelist")}>
                    <BiSearch size={18} style={{ marginRight: 8 }} />
                    슥사핏 맛집 살펴보기
                </ActionButton>
            </ButtonWrapper>

            {/* 최근 동기들이 등록한 맛집 */}
            <SectionWrapper>
                <SectionTitle>
                    <BlueText>최근</BlueText>
                    <BlackText> 등록된 맛집</BlackText>
                </SectionTitle>
                <CardList>
                    {placeList.slice(0, 5).map((place, idx) => (
                        <PlaceCard key={idx} {...place} path={place.path} />
                    ))}
                </CardList>
            </SectionWrapper>

            {/* 좋아요를 가장 많이 받은 맛집 */}
            <SectionWrapper>
                <SectionTitle>
                    <BlueText>좋아요를 가장 많이 받은</BlueText>
                    <BlackText> 맛집</BlackText>
                </SectionTitle>
                <CardList>
                    {placeList.slice(0, 5).map((place, idx) => (
                        <PlaceCard key={idx} {...place} path={place.path} />
                    ))}
                </CardList>
            </SectionWrapper>

        </MainWrapper>
    );
};

const MainWrapper = styled.div`
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
`;

const BannerWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: center;
`;

const BannerImage = styled.img`
    width: 100%;
    object-fit: cover;
`;

const ButtonWrapper = styled.div`
    width: 80%;
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 24px;
`;

const ActionButton = styled.button`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #0C4DA2;
    background: #fff;
    color: #176BCE;
    font-size: 14px;
    font-weight: 600;
    border-radius: 12px;
    padding: 12px 0;
    cursor: pointer;
    transition: background 0.15s;
    &:hover {
        background: #0C4DA2;
        color: #fff;
    }
`;

const SectionWrapper = styled.section`
    width: 100%;
    max-width: 600px;
    padding: 0 16px;
    margin-top: 24px;
    box-sizing: border-box;
`;

const SectionTitle = styled.div`
    font-size: 16px;
    font-weight: 900;
    margin-bottom: 12px;
`;

const BlueText = styled.span`
    color: #176BCE;
`;

const BlackText = styled.span`
    color: #000000;
`;

const CardList = styled.div`
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 8px;
    width: 100%;
    max-width: 100%;
    & > * {
        flex: 0 0 auto;
        min-width: 160px;
    }
`;

export default MainPage;