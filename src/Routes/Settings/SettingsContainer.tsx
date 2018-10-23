import React from "react";
import { Mutation, Query } from "react-apollo";
import { USER_PROFILE, GET_PLACES } from "src/sharedQueries";
import { LOG_USER_OUT } from "src/locallysharedQueries";
import { userProfile, getPlaces } from "src/types/api";
import SettingsPresenter from "./SettingsPresenter";

class MiniProfileQuery extends Query<userProfile> {}
class PlacesQuery extends Query<getPlaces> {}

class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOut => (
          <MiniProfileQuery query={USER_PROFILE}>
            {({ data: userData, loading: userDataLoading }) => (
              <PlacesQuery query={GET_PLACES}>
                {({ data: placesData, loading: placesLoading }) => (
                  <SettingsPresenter
                    userDataLoading={userDataLoading}
                    userData={userData}
                    logUserOut={logUserOut}
                    placesData={placesData}
                    placesLoading={placesLoading}
                  />
                )}
              </PlacesQuery>
            )}
          </MiniProfileQuery>
        )}
      </Mutation>
    );
  }
}
export default SettingsContainer;
