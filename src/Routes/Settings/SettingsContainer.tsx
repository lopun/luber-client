import React from "react";
import { Mutation, Query } from "react-apollo";
import { USER_PROFILE } from "src/sharedQueries";
import { LOG_USER_OUT } from "src/locallysharedQueries";
import { userProfile } from "src/types/api";
import SettingsPresenter from "./SettingsPresenter";
class MiniProfileQuery extends Query<userProfile> {}
class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOut => (
          <MiniProfileQuery query={USER_PROFILE}>
            {({ data, loading: userDataLoading }) => (
              <SettingsPresenter
                userDataLoading={userDataLoading}
                userData={data}
                logUserOut={logUserOut}
              />
            )}
          </MiniProfileQuery>
        )}
      </Mutation>
    );
  }
}
export default SettingsContainer;