import React from "react";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import Menu from "src/Components/Menu";

const Container = styled.div``;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading
}) => (
  <Container>
    <Helmet>
      <title>Home | Luber</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
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
      {!loading && <button onClick={() => toggleMenu()}>Open sidebar</button>}
    </Sidebar>
  </Container>
);

export default HomePresenter;
