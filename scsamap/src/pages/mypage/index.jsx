import styled from "styled-components";
import HeaderWithIcon from "../../components/common/HeaderWithIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const [myBoards, setMyBoards] = useState([]);
    const [likedBoards, setLikedBoards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userStr = sessionStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;

        // 내가 등록한 맛집 목록 가져오기
        axios.get("http://localhost:8080/mypage/boards", {
            params: {
                userId: user ? user.id : undefined
            }
        })
        .then(res => {
            setMyBoards(res.data && Array.isArray(res.data.boards) ? res.data.boards : []);
        })
        .catch(err => {
            setMyBoards([]);
            console.error("내가 등록한 맛집 불러오기 실패:", err);
        });

        // 내가 좋아요 누른 맛집 목록 가져오기
        axios.get("http://localhost:8080/mypage/liked-boards", {
            params: {
                userId: user ? user.id : undefined
            }
        })
        .then(res => {
            setLikedBoards(res.data && Array.isArray(res.data.boards) ? res.data.boards : []);
        })
        .catch(err => {
            setLikedBoards([]);
            console.error("좋아요 누른 맛집 불러오기 실패:", err);
        });
    }, []);

    return (
        <Container>
            <HeaderContainer>
                <HeaderWithIcon />
            </HeaderContainer>
            <RecentRegisterContainer>
                <RecentRegisterTitle>내가 등록한 맛집</RecentRegisterTitle>
                {myBoards.length === 0 ? (
                    <div>등록한 맛집이 없습니다.</div>
                ) : (
                    myBoards.map((board) => (
                        <BoardCard key={board.id} onClick={() => navigate(`/place/${board.id}`)}>
                            <BoardTitle>{board.title}</BoardTitle>
                            <BoardAddress>{board.address}</BoardAddress>
                        </BoardCard>
                    ))
                )}
            </RecentRegisterContainer>
            <LikedBoardsContainer>
                <LikedBoardsTitle>내가 좋아요 누른 맛집</LikedBoardsTitle>
                {likedBoards.length === 0 ? (
                    <div>좋아요 누른 맛집이 없습니다.</div>
                ) : (
                    likedBoards.map((board) => (
                        <BoardCard key={board.id} onClick={() => navigate(`/place/${board.id}`)}>
                            <BoardTitle>{board.title}</BoardTitle>
                            <BoardAddress>{board.address}</BoardAddress>
                        </BoardCard>
                    ))
                )}
            </LikedBoardsContainer>
        </Container>
    );
};

export default MyPage;

const Container = styled.div`
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
    border-bottom: 1px solid #ABABAB;
`;

const RecentRegisterContainer = styled.div`
    width: 90%;
    margin-top: 20px;
`;

const LikedBoardsContainer = styled.div`
    width: 90%;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const RecentRegisterTitle = styled.div`
    font-size: 16px;
    color: #0C4DA2;
    font-weight: 600;
    margin-bottom: 16px;
`;

const LikedBoardsTitle = styled(RecentRegisterTitle)``;

const BoardCard = styled.div`
    border: 1px solid #eee;
    border-radius: 12px;    
    padding: 16px;
    margin-bottom: 16px;
    background: #fff;
    cursor: pointer;
`;

const BoardTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
`;

const BoardAddress = styled.div`
    font-size: 14px;
    color: #888;
    margin-bottom: 8px;
`;

