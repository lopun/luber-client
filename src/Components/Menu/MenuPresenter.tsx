import React from "react";
import { Link } from "react-router-dom";
import styled from "src/typed-components";
import { userProfile, toggleDriving } from "src/types/api";
import { MutationFn } from "react-apollo";

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  background-color: black;
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  background-color: grey;
  border-radius: 40px;
  overflow: hidden;
`;

const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.h5`
  font-size: 18px;
  color: white;
`;

const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 100%;
  align-items: center;
`;

interface IToggleProps {
  isDriving: boolean;
}

const ToggleDriving = styled<IToggleProps, any>("button")`
  -webkit-appearance: none;
  background-color: ${props =>
    props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
  width: 100%;
  color: white;
  font-size: 18px;
  border: 0;
  padding: 15px 0px;
  cursor: pointer;
`;

interface IProps {
  data?: userProfile;
  loading: boolean;
  toggleDrivingFn: MutationFn<toggleDriving>;
}

const MenuPresenter: React.SFC<IProps> = ({
  data: { GetMyProfile: { user = null } = {} } = {},
  loading,
  toggleDrivingFn
}) => (
  <Container>
    {!loading &&
      user &&
      user.fullName && (
        <>
          <Header>
            <Grid>
              <Link to={"/edit-account"}>
                <Image
                  src={
                    user.profilePhoto ||
                    "data:image/png;base64,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"
                  }
                />
              </Link>
              <Text>
                <Name>{user.fullName}</Name>
                <Rating>4.5</Rating>
              </Text>
            </Grid>
          </Header>
          <SLink to="/trips">Your Trips</SLink>
          <SLink to="/settings">Settings</SLink>
          <ToggleDriving onClick={toggleDrivingFn} isDriving={user.isDriving}>
            {user.isDriving ? "Stop driving" : "Start driving"}
          </ToggleDriving>
        </>
      )}
  </Container>
);

export default MenuPresenter;
