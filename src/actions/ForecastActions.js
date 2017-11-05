export const requestForecast = () => {
    return {
        type: 'REQUEST_FORECAST'
    }
}

export const forecastRequestError = (message) => {
    return {
        type: 'FORECAST_REQUEST_ERROR',
        error: message
    }
}

export const forecastRequestSuccess = (forecast) => {
    return {
        type: 'FORECAST_REQUEST_SUCCESS',
        forecast: forecast
    }
}

export const addForecast = () => {
    return {
        type: 'ADD_FORECAST'
    }
}