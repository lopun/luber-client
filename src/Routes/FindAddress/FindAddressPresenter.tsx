import Helmet from "react-helmet";
import React from "react";
import styled from "src/typed-components";

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const Center = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  font-size: 20px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;

interface IProps {
  mapRef: any;
}

class FindAddressPresenter extends React.Component<IProps> {
  public render() {
    const { mapRef } = this.props;
    return (
      <div>
        <Helmet>
          <title>Find Address | Luber</title>
        </Helmet>
        <Center>📍</Center>
        <Map ref={mapRef} />
      </div>
    );
  }
}

export default FindAddressPresenter;
