import React from "react";
import ReactDOM from "react-dom";
import FindAddressPresenter from "./FindAddressPresenter";
import { reverseGeoCode, geoCode } from "src/mapHelpers";

interface IState {
  lat: number;
  lng: number;
  address: string;
}

class FindAddressContainer extends React.Component<any, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public state = {
    lat: 0,
    lng: 0,
    address: ""
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }
  public render() {
    return (
      <FindAddressPresenter
        onInputChange={this.onInputChange}
        onInputBlur={this.onInputBlur}
        mapRef={this.mapRef}
        address={this.state.address}
      />
    );
  }

  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude: lat, longitude: lng }
    } = position;
    this.setState({
      lat,
      lng
    });
    this.loadMap(lat, lng);
    this.reverseGeocodeAddress(lat, lng);
  };

  public handleGeoError = () => {
    return;
  };

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      zoom: 11,
      center: { lat, lng },
      disableDefaultUI: true,
      minZoom: 8
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener("dragend", this.handleDragEnd);
  };

  public handleDragEnd = () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    this.setState({
      lat,
      lng
    });
    this.reverseGeocodeAddress(lat, lng);
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
  public onInputBlur = async () => {
    const { address } = this.state;
    const result = await geoCode(address);
    if (result !== false) {
      const { lat, lng, formatted_address } = result;
      this.setState({ lat, lng, address: formatted_address });
      this.map.panTo({ lat, lng });
    }
  };
  public reverseGeocodeAddress = async (lat: number, lng: number) => {
    const reversedAddres = await reverseGeoCode(lat, lng);
    if (reversedAddres !== false) {
      this.setState({ lat, lng, address: reversedAddres });
    }
  };
}

export default FindAddressContainer;
