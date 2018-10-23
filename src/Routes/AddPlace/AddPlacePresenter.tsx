import React from "react";
import Helmet from "react-helmet";
import Header from "src/Components/Header";
import styled from "src/typed-components";
import Form from "src/Components/Form";
import Input from "src/Components/Input";
import Button from "src/Components/Button";
import { Link } from "react-router-dom";
import { MutationFn } from "react-apollo";

const Container = styled.div`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 40px;
  display: block;
`;

interface IProps {
  name: string;
  address: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFav: boolean;
  loading: boolean;
  onSubmit: MutationFn;
  pickedAddress: boolean;
}

const AddPlacePresenter: React.SFC<IProps> = ({
  name,
  address,
  onInputChange,
  isFav,
  onSubmit,
  loading,
  pickedAddress
}) => (
  <>
    <Helmet>
      <title>Add Place | Luber</title>
    </Helmet>
    <Header title={"Add Place"} backTo={"/"} />
    <Container>
      <Form submitFn={onSubmit}>
        <ExtendedInput
          type={"text"}
          value={name}
          name={"name"}
          onChange={onInputChange}
          placeholder={"Name"}
        />
        <ExtendedInput
          type={"text"}
          value={address}
          name={"address"}
          onChange={onInputChange}
          placeholder={"Address"}
        />
        <ExtendedLink to={"/find-address"}>Pick place from map</ExtendedLink>
        {pickedAddress && (
          <Button
            onClick={null}
            value={loading ? "Adding a Place" : "Add Place"}
          />
        )}
      </Form>
    </Container>
  </>
);

export default AddPlacePresenter;
