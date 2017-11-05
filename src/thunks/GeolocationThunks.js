import {
    requestGeolocation,
    geolocationRequestError,
    geolocationRequestSuccess
} from '../actions/GeolocationActions';

export const getGeolocation = () => {
    return (dispatch) => {
        dispatch(requestGeolocation());

        navigator.geolocation.getCurrentPosition(
            (gps_data) => {
                var position = {
                    longitude: gps_data["coords"]["longitude"],
                    latitude: gps_data["coords"]["latitude"]
                };

                dispatch(geolocationRequestSuccess(position));
            },
            (error) => {
                dispatch(geolocationRequestError(error.message));
            },
            {enableHighAccuracy: false, timeout: 5000, maximumAge: 1000}
        );
    }
}