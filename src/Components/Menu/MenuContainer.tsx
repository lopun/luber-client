import React from "react";
import MenuPresenter from "./MenuPresenter";
import { Query, Mutation } from "react-apollo";
import { userProfile, toggleDriving } from "src/types/api";
import { USER_PROFILE } from "src/sharedQueries";
import { TOGGLE_DRIVING } from "./MenuQueries";
import { toast } from "react-toastify";

class ProfileQuery extends Query<userProfile> {}
class ToggleDrivingMutation extends Mutation<toggleDriving> {}

class MenuContainer extends React.Component {
  public render() {
    return (
      <ToggleDrivingMutation
        mutation={TOGGLE_DRIVING}
        // 정말 훌륭한 기능이지만 api를 다시 갔다온다. 아래의 방법이 Cache에서만 조작을 하기때문에 더 효율적이긴 함.
        // refetchQueries={[{ query: USER_PROFILE }]}
        update={(cache, { data }) => {
          console.log(data);
          if (data) {
            const { ToggleDrivingMode } = data;
            if (!ToggleDrivingMode.ok) {
              toast.error(ToggleDrivingMode.error);
              return;
            }
            const query: userProfile | null = cache.readQuery({
              query: USER_PROFILE
            });
            if (query) {
              const {
                GetMyProfile: { user }
              } = query;
              if (user) {
                user.isDriving = !user.isDriving;
              }
            }
            cache.writeQuery({ query: USER_PROFILE, data: query });
          }
        }}
      >
        {toggleDrivingFn => (
          <ProfileQuery query={USER_PROFILE}>
            {({ data, loading }) => (
              <MenuPresenter
                data={data}
                loading={loading}
                toggleDrivingFn={toggleDrivingFn}
              />
            )}
          </ProfileQuery>
        )}
      </ToggleDrivingMutation>
    );
  }
}

export default MenuContainer;
