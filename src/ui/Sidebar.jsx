import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';


const SidebarContainer = styled.aside`
    /* background-color: lightgray; */
    padding: 3.2rem 2.4rem;
    grid-row: 1 / -1;
    border-right: 1px solid var(--color-grey-200);

    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

function Sidebar() {
    return (
        <SidebarContainer>
           <Logo/>
           <MainNav />
        </SidebarContainer>
    );
}

export default Sidebar;
