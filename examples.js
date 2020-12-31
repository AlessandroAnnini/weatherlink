const subDays = require('date-fns/subDays');
const getUnixTime = require('date-fns/getUnixTime');
const WeatherLink = require('./index');

const apiKey = '<replace with your api key>';
const apiSecret = '<replace with your api secret>';

const weatherLink = WeatherLink({apiKey, apiSecret});

weatherLink.getAllStations().then(console.log).catch(console.error);

weatherLink
  .getStations({stationIds: ['102882']})
  .then(console.log)
  .catch(console.error);

weatherLink.getAllSensors().then(console.log).catch(console.error);

weatherLink
  .getSensors({sensorIds: ['371124', '371125']})
  .then(console.log)
  .catch(console.error);

weatherLink
  .getCurrent({stationId: '102882'})
  .then(console.log)
  .catch(console.error);

weatherLink.getSensorCatalog().then(console.log).catch(console.error);

weatherLink
  .getAllSensorsWithSpecs()
  .then((data) => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);

const now = new Date();
const yesterday = subDays(now, 1);
const startTimestamp = getUnixTime(yesterday);
const endTimestamp = getUnixTime(now);
weatherLink
  .getHistoric({stationId: '102882', startTimestamp, endTimestamp})
  .then((r) => console.log(JSON.stringify(r, null, 2)))
  .catch(console.log);
