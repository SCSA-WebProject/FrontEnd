import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PlaceCard = ({ image, category, name, likes, liked, onLikeClick, path }) => {
    const navigate = useNavigate();

    return (
        <CardWrapper onClick={() => navigate(path)}>
            <ImageWrapper>
                <PlaceImg src={image} alt={name} />
            </ImageWrapper>
            <Category>{category}</Category>
            <PlaceName>{name}</PlaceName>
            <LikeButton onClick={onLikeClick}>
                <span role="img" aria-label={liked ? "heart" : "heart-outline"}>
                    {liked ? '❤️' : '🤍'}
                </span>
                {likes}
            </LikeButton>
        </CardWrapper>
    );
};

const CardWrapper = styled.div`
    width: 30%;
    background: #fff;
    border: 1.5px solid #D9D9D9;
    border-radius: 16px;
    box-sizing: border-box;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
`;

const ImageWrapper = styled.div`
    width: 100%;
    aspect-ratio: 4/3;      // 160:120 비율 유지 (지원 안되면 height: 120px 사용)
    border-radius: 12px;
    overflow: hidden;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlaceImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;


const Category = styled.div`
    background: #191847;
    color: #fff;
    border-radius: 8px;
    font-size: 12px;
    padding: 2px 10px;
    margin-top: 8px;
    font-weight: 500;
    margin-bottom: 4px;
`;

const PlaceName = styled.div`
    font-size: 16px;
    font-weight: 800;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
`;

const LikeButton = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    cursor: pointer;
    user-select: none;
`;

export default PlaceCard; 