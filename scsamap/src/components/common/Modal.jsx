import React from "react";
import styled from "styled-components";

const Modal = ({
    title,
    content,
    item1Label,
    item2Label,
    onItem1Click,
    onItem2Click,
    }) => {
    return (
        <ModalOverlay>
        <ModalContainer>
            <ModalTitle>{title}</ModalTitle>
            <ModalContent>{content}</ModalContent>
            <ButtonRow>
            <ModalButtonGray onClick={onItem1Click}>{item1Label}</ModalButtonGray>
            <ModalButtonBlue onClick={onItem2Click}>{item2Label}</ModalButtonBlue>
            </ButtonRow>
        </ModalContainer>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(44, 44, 44, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
    padding: 40px 24px 24px 24px;
    min-width: 320px;
    max-width: 90vw;
    text-align: center;
`;

const ModalTitle = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 24px;
`;

const ModalContent = styled.div`
    font-size: 1.25rem;
    color: #444;
    margin-bottom: 40px;
`;

const ButtonRow = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
`;

const ModalButtonGray = styled.button`
    flex: 1;
    background: #dedede;
    color: #fff;
    font-size: 1.25rem;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    padding: 16px 0;
    cursor: pointer;
    transition: background 0.15s;
`;

const ModalButtonBlue = styled.button`
    flex: 1;
    background: #0C4DA2;
    color: #fff;
    font-size: 1.25rem;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    padding: 16px 0;
    cursor: pointer;
    transition: background 0.15s;
`;

export default Modal; 