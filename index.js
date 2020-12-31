const getUnixTime = require('date-fns/getUnixTime');
const crypto = require('crypto');
const fetch = require('node-fetch');

const baseUrl = 'https://api.weatherlink.com/v2';

const createApiSignature = (apiSecret, params) => {
  const stringToHash = Object.keys(params)
    .sort()
    .reduce((res, curr) => `${res}${curr}${params[curr]}`, '');

  return crypto
    .createHmac('sha256', apiSecret)
    .update(stringToHash)
    .digest('hex');
};

const WeatherLink = ({apiKey, apiSecret}) => {
  const getAllStations = () => {
    const params = {
      'api-key': apiKey,
      t: getUnixTime(Date.now()),
    };
    const apiSignature = createApiSignature(apiSecret, params);
    const url = `${baseUrl}/stations?api-key=${apiKey}&api-signature=${apiSignature}&t=${params.t}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((r) => r.json())
        .then(resolve)
        .catch(reject);
    });
  };

  const getStations = ({stationIds}) => {
    const params = {
      'api-key': apiKey,
      t: getUnixTime(Date.now()),
      'station-ids': stationIds.join(','),
    };
    const apiSignature = createApiSignature(apiSecret, params);
    const url = `${baseUrl}/stations/${params['station-ids']}?api-key=${apiKey}&api-signature=${apiSignature}&t=${params.t}`;

    return fetch(url).then((r) => r.json());
  };

  const getAllSensors = () => {
    const params = {
      'api-key': apiKey,
      t: getUnixTime(Date.now()),
    };
    const apiSignature = createApiSignature(apiSecret, params);
    const url = `${baseUrl}/sensors?api-key=${apiKey}&api-signature=${apiSignature}&t=${params.t}`;

    return fetch(url).then((r) => r.json());
  };

  const getSensors = ({sensorIds}) => {
    const params = {
      'api-key': apiKey,
      t: getUnixTime(Date.now()),
      'sensor-ids': sensorIds.join(','),
    };
    const apiSignature = createApiSignature(apiSecret, params);
    const url = `${baseUrl}/sensors/${params['sensor-ids']}?api-key=${apiKey}&api-signature=${apiSignature}&t=${params.t}`;

    return fetch(url).then((r) => r.json());
  };

  const getSensorCatalog = () => {
    const params = {
      'api-key': apiKey,
      t: getUnixTime(Date.now()),
    };
    const apiSignature = createApiSignature(apiSecret, params);
    const url = `${baseUrl}/sensor-catalog?api-key=${apiKey}&api-signature=${apiSignature}&t=${params.t}`;

    return fetch(url).then((r) => r.json());
  };

  const getAllSensorsWithSpecs = async () => {
    const {sensor_types} = await getSensorCatalog();

    const params = {
      'api-key': apiKey,
      t: getUnixTime(Date.now()),
    };
    const apiSignature = createApiSignature(apiSecret, params);
    const url = `${baseUrl}/sensors?api-key=${apiKey}&api-signature=${apiSignature}&t=${params.t}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((r) => r.json())
        .then((result) => {
          const items = result.sensors.map((s) => {
            const specs = sensor_types.find((st) => st.type === s.type);
            return {...s, specs};
          });
          resolve(items);
        })
        .catch(reject);
    });
  };

  const getCurrent = ({stationId}) => {
    const params = {
      'api-key': apiKey,
      t: getUnixTime(Date.now()),
      'station-id': stationId,
    };
    const apiSignature = createApiSignature(apiSecret, params);
    const url = `${baseUrl}/current/${stationId}?api-key=${apiKey}&api-signature=${apiSignature}&t=${params.t}`;

    return fetch(url).then((r) => r.json());
  };

  const getHistoric = ({stationId, startTimestamp, endTimestamp}) => {
    const params = {
      'api-key': apiKey,
      t: getUnixTime(Date.now()),
      'station-id': stationId,
      'start-timestamp': startTimestamp,
      'end-timestamp': endTimestamp,
    };
    const apiSignature = createApiSignature(apiSecret, params);
    const url = `${baseUrl}/historic/${stationId}?api-key=${apiKey}&api-signature=${apiSignature}&t=${params.t}&start-timestamp=${startTimestamp}&end-timestamp=${endTimestamp}`;

    return fetch(url).then((r) => r.json());
  };

  return {
    getAllStations,
    getStations,
    getAllSensors,
    getSensors,
    getSensorCatalog,
    getAllSensorsWithSpecs,
    getCurrent,
    getHistoric,
  };
};

module.exports = WeatherLink;
