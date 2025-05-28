import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PlaceCard = ({ image, category, name, likes, path }) => {
    const navigate = useNavigate();

    return (
        <CardWrapper onClick={() => navigate(path)}>
            <ImageWrapper>
                <PlaceImg src={image} alt={name} />
            </ImageWrapper>
            <Category>{category}</Category>
            <PlaceName>{name}</PlaceName>
            <Likes>
                <span role="img" aria-label="like">👍</span>
                <LikesText>{likes}</LikesText>
            </Likes>
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
    border-radius: 12px;
    overflow: hidden;
`;

const PlaceImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const Likes = styled.div`
    color: #FFD36F;
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-top: 2px;
`;

const LikesText = styled.div`
    color: #ABABAB;
    margin-left: 4px;
`;

export default PlaceCard; 