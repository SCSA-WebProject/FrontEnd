import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const onPage = (path) => location.pathname === path;

    const navItems = [
        { id: 1, name: '슥슐랭', path: '/placelist', icon: FaMapMarkerAlt },
        { id: 2, name: '홈', path: '/main', icon: AiFillHome },
        { id: 3, name: '마이페이지', path: '/mypage', icon: FaUser }
    ];

    return (
        <NavbarContainer>
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <NavItem key={item.id} onClick={() => navigate(item.path)}>
                        <IconWrapper isActive={onPage(item.path)}>
                            <Icon size={24} />
                        </IconWrapper>
                        <NavText isActive={onPage(item.path)}>{item.name}</NavText>
                    </NavItem>
                );
            })}
        </NavbarContainer>
    );
};

const NavbarContainer = styled.nav`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
    height:50px;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #eee;
    padding: 10px 0;
`;

const NavItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    position: relative;
`;

const IconWrapper = styled. div`
    position: relative;
    color: ${props => props.isActive ? '#000' : '#ABABAB'};
`;

const NavText = styled.span`
    font-size: 10px;
    color: ${props => props.isActive ? '#000' : '#ABABAB'};
`;

export default Navbar;