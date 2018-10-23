import React from "react";
import AddPlacePresenter from "./AddPlacePresenter";
import { RouteComponentProps } from "react-router";
import { Mutation } from "react-apollo";
import { addPlace } from "src/types/api";
import { ADD_PLACE } from "./AddPlaceQueries";
import { toast } from "react-toastify";

interface IState {
  address: string;
  name: string;
  lat: number;
  lng: number;
  isFav: boolean;
}

interface IProps extends RouteComponentProps<any> {}

class AddPlaceQuery extends Mutation<addPlace> {}

class AddPlaceContainer extends React.Component<IProps, IState> {
  public state = {
    address: "",
    name: "",
    lat: 1.3231,
    lng: 1.4325,
    isFav: false
  };

  public render() {
    const { address, name, lat, lng, isFav } = this.state;
    const { history } = this.props;
    return (
      <AddPlaceQuery
        mutation={ADD_PLACE}
        refetchQueries={[{ query: ADD_PLACE }]}
        onCompleted={data => {
          const { AddPlace } = data;
          if (AddPlace.ok) {
            toast.success("Place Added");
            setTimeout(() => {
              history.push({
                pathname: "/places"
              });
            }, 2000);
          } else {
            toast.error(AddPlace.error);
          }
        }}
        variables={{
          name,
          address,
          lat,
          lng,
          isFav
        }}
      >
        {(addPlaceFn, { loading }) => (
          <AddPlacePresenter
            address={address}
            name={name}
            isFav={isFav}
            onInputChange={this.onInputChange}
            onSubmit={addPlaceFn}
            loading={loading}
          />
        )}
      </AddPlaceQuery>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };
}

export default AddPlaceContainer;
