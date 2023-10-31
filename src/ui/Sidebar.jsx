import React from "react";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { styled } from "styled-components";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.div`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      {/* <Uploader /> for developmemt */}
    </StyledSidebar>
  );
}

export default Sidebar;
