import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { facebookConnect, facebookConnectVariables } from "src/types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "src/locallysharedQueries";

class LoginMutation extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public facebookMutation: MutationFn;

  public render() {
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <LoginMutation
            mutation={FACEBOOK_CONNECT}
            onCompleted={data => {
              const { FacebookConnect } = data;
              if (FacebookConnect.ok) {
                logUserIn({
                  variables: {
                    token: FacebookConnect.token
                  }
                });
              } else {
                toast.error("Facebook Connect Error");
              }
            }}
          >
            {(facebookMutation, { loading }) => {
              this.facebookMutation = facebookMutation;
              return <SocialLoginPresenter loginCallback={this.callback} />;
            }}
          </LoginMutation>
        )}
      </Mutation>
    );
  }

  public callback = fbData => {
    const { email, name, first_name, last_name, id, accessToken } = fbData;
    if (accessToken) {
      toast.success(`Welcome ${name}`);
      this.facebookMutation({
        variables: {
          firstName: first_name,
          lastName: last_name,
          email,
          fbId: id
        }
      });
    } else {
      toast.error("Could not log you in :(");
    }
  };
}

export default SocialLoginContainer;
