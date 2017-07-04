export const Forecast = {
  name: 'Forecast',
  primaryKey: 'id',
  properties: {
    id: 'int',
    date:  'date',

    city: 'string',
    weather: 'string',
    temperature: 'float',
    high: 'float',
    low: 'float',
    max_wind: 'float',
    avg_wind: 'float',
    pop: 'int',
    humidity: 'int',
    type: 'string' /* used for icon */
  }
};
