import React from "react";
import { getPlaces } from "src/types/api";
import styled from "styled-components";
import Helmet from "react-helmet";
import Header from "src/Components/Header";
import Place from "src/Components/Place";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 0 80px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  data?: getPlaces;
  loading: boolean;
}

const PlacesPresenter: React.SFC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading
}) => (
  <>
    <Helmet>
      <title>Places | Luber</title>
    </Helmet>
    <Header title={"Places"} backTo={"/"} />
    <Container>
      {!loading && places && places.length === 0 && "You have no place."}
      {!loading &&
        places &&
        places.map(place => (
          <Place
            key={place!.id}
            address={place!.address}
            name={place!.name}
            fav={place!.isFav}
            id={place!.id}
          />
        ))}
      <SLink to={"/add-place"}>Add some places!</SLink>
    </Container>
  </>
);

export default PlacesPresenter;
