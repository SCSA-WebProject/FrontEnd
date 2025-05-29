import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import PlaceImg from "../../assets/common/restaurantPic.jpg";
import HeaderWithBack from "../../components/common/HeaderWithBack";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MdMoreVert } from "react-icons/md";

const PlaceDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [marker, setMarker] = useState(null);
    const [map, setMap] = useState(null);
    const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
    const IMG_BASE_PATH = "http://localhost:8080/img";

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const userStr = sessionStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const myId = user ? user.id : null;
    
    useEffect(() => {
        if (!menuOpen) return;
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [menuOpen]);

    const mapStyles = {
        height: "300px",
        width: "100%"
    };

    const defaultCenter = {
        lat: 37.54813240071675,
        lng: 127.07340271976555
    };

    const handleDelete = () => {
        axios.post("http://localhost:8080/board/delete", null, {
            params: { id: id },
            withCredentials: true
        })
        .then(() => {
            navigate("/placelist");
        })
        .catch((err) => {
            console.error("삭제 실패:", err);
        });
    };

    useEffect(() => {
        const fetchPlaceDetail = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/board/detail`, {
                    params: { id: id },
                    withCredentials: true
                });
                if (response.data.success) {
                    setPlace(response.data.board);
                    // 주소가 있으면 지도 마커 설정
                    if (response.data.board.address && window.google) {
                        const geocoder = new window.google.maps.Geocoder();
                        geocoder.geocode({ 
                            address: response.data.board.address,
                            region: 'kr'
                        }, (results, status) => {
                            if (status === 'OK' && results && results.length > 0) {
                                const location = results[0].geometry.location;
                                setMarker({
                                    position: {
                                        lat: location.lat(),
                                        lng: location.lng()
                                    },
                                    title: response.data.board.title
                                });
                            }
                        });
                    }
                }
            } catch (error) {
                console.error("상세 정보 불러오기 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaceDetail();
    }, [id]);

    useEffect(() => {
        // Google Maps API 로드 상태 확인
        if (window.google) {
            setIsGoogleMapsLoaded(true);
        } else {
            const checkGoogleMaps = setInterval(() => {
                if (window.google) {
                    setIsGoogleMapsLoaded(true);
                    clearInterval(checkGoogleMaps);
                }
            }, 100);

            // 5초 후에도 로드되지 않으면 인터벌 제거
            setTimeout(() => {
                clearInterval(checkGoogleMaps);
            }, 5000);
        }
    }, []);

    if (loading) return <div>로딩중...</div>;
    if (!id || !place) return <div>존재하지 않는 가게입니다.</div>;

    return (
        <Container>
            <HeaderWithBack title={place.title} />
            <TopImageBox>
                <TopImage 
                    src={place.boardFile?.filePath ? IMG_BASE_PATH + place.boardFile.filePath + "/" + place.boardFile.systemName : PlaceImg} 
                    alt={place.title} 
                />
                
                <ImageDots>
                    {[...Array(1)].map((_, i) => (
                        <Dot key={i} $active={true} />
                    ))}
                </ImageDots>
            </TopImageBox>
            <Content>
                <RowContainer>
                    <div>
                        <SubInfo>
                            {place.region} | {place.category}
                        </SubInfo>
                        <Title>{place.title}</Title>
                    </div>    
                    {myId === place.userId && (
                    <MenuIconBox>
                        <MdMoreVert size={24} onClick={() => setMenuOpen((v) => !v)} style={{ cursor: "pointer" }} />
                        {menuOpen && (
                            <MenuBox ref={menuRef}>
                                <MenuItem onClick={() => navigate(`/place/edit/${id}`)}>수정</MenuItem>
                                <MenuItem onClick={handleDelete}>삭제</MenuItem>
                            </MenuBox>
                        )}
                    </MenuIconBox>
                    )}
                </RowContainer>
                <WriterRow>
                    <Writer>작성자 | {place.userId}</Writer>
                </WriterRow>

                <Like>
                    <span role="img" aria-label="thumbs up">👍</span> {place.likeCount}
                </Like>
                <InfoRow>
                    <InfoIcon>💰</InfoIcon>
                    <span>평균 가격대 {place.price?.toLocaleString()}만원</span>
                </InfoRow>
                <Desc>{place.content}</Desc>

                {place.address && (
                    <MapContainer>
                        <MapTitle>위치</MapTitle>
                        {!isGoogleMapsLoaded ? (
                            <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                지도를 불러오는 중...
                            </div>
                        ) : (
                            <GoogleMap
                                mapContainerStyle={mapStyles}
                                zoom={15}
                                center={marker?.position || defaultCenter}
                                onLoad={setMap}
                            >
                                {marker && (
                                    <Marker
                                        position={marker.position}
                                        title={marker.title}
                                    />
                                )}
                            </GoogleMap>
                        )}
                        <AddressText>{place.address}</AddressText>
                    </MapContainer>
                )}
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
    background: ${(props) => (props.$active ? "#fff" : "#bbb")};
    opacity: 0.8;
`;
const Content = styled.div`
    padding: 20px 16px 32px 16px;
`;

const RowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
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

const MapContainer = styled.div`
    margin-top: 24px;
    border: 1px solid #eee;
    border-radius: 12px;
    overflow: hidden;
`;

const MapTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
`;

const AddressText = styled.div`
    padding: 12px;
    font-size: 14px;
    color: #666;
    background: #f8f8f8;
`;

const MenuIconBox = styled.div`
    position: relative;  // 반드시 추가!
    display: flex;
    align-items: center;
    height: 100%;
`;

const MenuBox = styled.div`
    position: absolute;  // 반드시 추가!
    top: 36px;           // 아이콘 아래로 띄우고 싶으면 top 조절
    right: 0;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    min-width: 80px;
    padding: 8px 0;
    display: flex;
    flex-direction: column;
    z-index: 100;
`;

const MenuItem = styled.button`
    background: none;
    border: none;
    text-align: left;
    padding: 10px 20px;
    font-size: 16px;
    color: #222;
    cursor: pointer;
    &:hover {
        background: #f5f5f5;
    }
`;