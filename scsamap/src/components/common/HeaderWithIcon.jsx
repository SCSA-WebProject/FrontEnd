import styled from "styled-components";
import cookIcon from "../../assets/common/cookIcon.png";
import { IoIosLogOut } from "react-icons/io";
import Modal from "./Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderWithIcon = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setShowModal(true);
    };

    const handleConfirm = () => {
        localStorage.clear();
        setShowModal(false);
        navigate("/");
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <HeaderContainer>
            <LogoContainer>
                <IconImg src={cookIcon} alt="cook icon" />
                <HeaderText>슥슐랭 가이드</HeaderText>
            </LogoContainer>
            <IoIosLogOut size={24} color="#176BCE" style={{ cursor: 'pointer' }} onClick={handleLogoutClick} />
            {showModal && (
                <Modal
                    title=""
                    content="로그아웃하시겠습니까?"
                    item1Label="취소"
                    item2Label="확인"
                    onItem1Click={handleCancel}
                    onItem2Click={handleConfirm}
                />
            )}
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: #fff;
    justify-content: space-between;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
`;

const IconImg = styled.img`
    width: 40px;
    height: 40px;
`;

const HeaderText = styled.span`
    font-size: 22px;
    font-weight: bold;
    color: #176BCE;
    font-family: 'Gugi', cursive;
    margin-left: 12px;
`;

export default HeaderWithIcon;