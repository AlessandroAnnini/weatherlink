[![https://nodei.co/npm/weatherlink.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/weatherlink.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/weatherlink)

# Weatherlink

Unofficial js wrapper library for [WeatherLink v2 API](https://weatherlink.github.io/v2-api/api-reference)

## Install

```bash
npm install weatherlink
```

or

```bash
yarn add weatherlink
```

## Usage

```bash
const Weatherlink = require('weatherlink');

const apiKey = '<replace with your api key>';
const apiSecret = '<replace with your api secret>';

const weatherLink = WeatherLink({apiKey, apiSecret});
```

## Methods

Metadata about the weather stations and sensors, as well as the different types of sensors

_GET_ ​`/stations` Get all weather stations associated with your API Key

```js
weatherLink.getAllStations().then(console.log).catch(console.error);
```

_GET_ `/stations​/{station-ids}` Get weather stations for one or more station IDs provided

```js
weatherLink
  .getStations({stationIds: ['102882']})
  .then(console.log)
  .catch(console.error);
```

_GET_ `/sensors` Get all sensors attached to all weather stations associated with your API Key

```js
weatherLink.getAllSensors().then(console.log).catch(console.error);
```

_GET_ `/sensors​/{sensor-ids}` Get sensors for one or more sensor IDs provided

```js
weatherLink
  .getSensors({sensorIds: ['371124', '371125']})
  .then(console.log)
  .catch(console.error);
```

_GET_ `/sensor-catalog` Get a catalog of all types of sensors

```js
weatherLink.getSensorCatalog().then(console.log).catch(console.error);
```

**This call is not in the official weatherlink documentation**

This returns all sensors attached to all weather stations associated with your API Key with their very own specs from sensor catalog. It's just a mix of `/sensors` + `/sensor-catalog`

```js
weatherLink
  .getAllSensorsWithSpecs()
  .then((data) => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
```

### Weather Data

Weather sensor observation data

_GET_ `/current​/{station-id}` Get current conditions data for one station

```js
weatherLink
  .getCurrent({stationId: '102882'})
  .then(console.log)
  .catch(console.error);
```

_GET_ `/historic​/{station-id}` Get historic data for one station ID within a given timerange

Using [date-fns](https://date-fns.org/)

```js
const subDays = require('date-fns/subDays');
const getUnixTime = require('date-fns/getUnixTime');

const now = new Date();
const yesterday = subDays(now, 1);
const startTimestamp = getUnixTime(yesterday);
const endTimestamp = getUnixTime(now);

weatherLink
  .getHistoric({stationId: '102882', startTimestamp, endTimestamp})
  .then((r) => console.log(JSON.stringify(r, null, 2)))
  .catch(console.log);
```

## Examples

[Here](/examples.js)
