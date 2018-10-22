import React from "react";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";

const Container = styled.div``;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const HomePresenter: React.SFC<IProps> = ({ isMenuOpen, toggleMenu }) => (
  <Container>
    <Helmet>
      <title>Home | Luber</title>
    </Helmet>
    <Sidebar
      sidebar={<b>Sidebar contentdsavasdvasdvsvdas</b>}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          width: "80%",
          backgroundColor: "white",
          zIndex: "10"
        }
      }}
    >
      <button onClick={() => toggleMenu()}>Open sidebar</button>
    </Sidebar>
  </Container>
);

export default HomePresenter;
