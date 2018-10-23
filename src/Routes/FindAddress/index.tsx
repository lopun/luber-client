import { GoogleApiWrapper } from "google-maps-react";
import FindAddressContainer from "./FindAddressContainer";

export default GoogleApiWrapper({
  apiKey: "AIzaSyAP4dColSUSSf6HPjKrAArcltfJ0cqHG68"
})(FindAddressContainer);
