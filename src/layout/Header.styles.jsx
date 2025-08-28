import styled from "styled-components";

export const HeaderMenu = styled.div`
    position: fixed;
    top: 15px;
    left: 15px;
    display: flex;
    align-items: center;
    gap:20px;
    height: 60px;
    .nav-link{
        padding: 10px 15px;
        text-decoration: unset;
        margin-right: 10px;
        border: unset;
        color: var(--dark-color);
        font-weight: 400;
        &:hover{
            color: var(--secondary-color);
        }
    }
    .nav-link.active{
        background-color: var(--secondary-color);
        border-radius: 30px;
        color: var(--white-color);
    }
`