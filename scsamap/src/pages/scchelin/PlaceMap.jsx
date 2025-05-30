import styled from "styled-components";
import HeaderWithBack from "../../components/common/HeaderWithBack";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// axios 기본 설정
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

const PlaceMapPage = () => {
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);
    const [boards, setBoards] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const navigate = useNavigate();

    const mapStyles = {
        height: "calc(100vh - 60px)",
        width: "100%"
    };

    const defaultCenter = {
        lat: 37.54813240071675,
        lng: 127.07340271976555
    };

    // 게시판 목록 가져오기
    const fetchBoards = async () => {
        try {
            const response = await axios.get('/board/list');
            console.log('API Response:', response.data);
            
            const boardsData = response.data?.boards || [];
            if (!Array.isArray(boardsData)) {
                console.error('Invalid response format:', response.data);
                return;
            }
            
            setBoards(boardsData);
            return boardsData;
        } catch (error) {
            console.error('Error fetching boards:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            return [];
        }
    };

    // Google Maps API 로드 완료 후 실행
    const onLoad = async () => {
        console.log('Google Maps API loaded');
        
        let boardsData = boards;
        if (boardsData.length === 0) {
            boardsData = await fetchBoards();
        }

        if (!boardsData || boardsData.length === 0) {
            console.error('No boards data available');
            return;
        }

        console.log('Processing boards:', boardsData);

        try {
            const geocoder = new window.google.maps.Geocoder();
            console.log('Geocoder created');

            // 주소별로 게시글을 그룹화
            const addressGroups = {};
            boardsData.forEach(board => {
                if (!board?.address) return;
                if (!addressGroups[board.address]) {
                    addressGroups[board.address] = [];
                }
                addressGroups[board.address].push(board);
            });

            const markers = await Promise.all(
                Object.entries(addressGroups).map(async ([address, boards]) => {
                    try {
                        const result = await new Promise((resolve, reject) => {
                            geocoder.geocode({ 
                                address: address,
                                region: 'kr'
                            }, (results, status) => {
                                if (status === 'OK' && results && results.length > 0) {
                                    resolve(results[0].geometry.location);
                                } else {
                                    reject(new Error(`Geocoding failed: ${status}`));
                                }
                            });
                        });
                        
                        return {
                            position: {
                                lat: result.lat(),
                                lng: result.lng()
                            },
                            address: address,
                            boards: boards.map(board => ({
                                id: board.id,
                                title: board.title || '제목 없음'
                            }))
                        };
                    } catch (error) {
                        console.error('Geocoding error for address:', address, error);
                        return null;
                    }
                })
            );
            
            const validMarkers = markers.filter(marker => marker !== null);
            console.log('Valid markers:', validMarkers);
            setMarkers(validMarkers);
        } catch (error) {
            console.error('Error in geocoding process:', error);
        }
    };

    return (
        <Container>
            <HeaderWithBack title="24기 맛집" />
            <LoadScript 
                googleMapsApiKey="AIzaSyDYXffkmjbxrESgfErWK0UZ7FshBLinnI4"
                onLoad={onLoad}
            >
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={defaultCenter}
                    onLoad={setMap}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker.position}
                            onClick={() => setSelectedLocation(marker)}
                        />
                    ))}
                    {selectedLocation && (
                        <InfoWindow
                            position={selectedLocation.position}
                            onCloseClick={() => setSelectedLocation(null)}
                        >
                            <InfoWindowContent>
                             
                                {selectedLocation.boards.map((board, idx) => (
                                    <RestaurantItem 
                                        key={idx}
                                        onClick={() => {
                                            navigate(`/place/${board.id}`);
                                            setSelectedLocation(null);
                                        }}
                                    >
                                        {board.title}
                                    </RestaurantItem>
                                ))}
                            </InfoWindowContent>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
            <FixedListButton onClick={() => navigate('/placelist')}>맛집 목록</FixedListButton>
        </Container>
    );
};

export default PlaceMapPage;

const Container = styled.div`
    width: 100%;
    height: 100vh;
`;

const FixedListButton = styled.button`
    position: fixed;
    left: 0;
    bottom: 20px;
    width: 10%;
    margin: 0 auto;
    background: rgb(255, 255, 255);
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

const InfoWindowContent = styled.div`
    padding: 8px;
    max-width: 200px;
`;

const InfoWindowTitle = styled.div`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #666;
`;

const RestaurantItem = styled.div`
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 13px;
    
    &:hover {
        background-color: #f5f5f5;
    }
`;