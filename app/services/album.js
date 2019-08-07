const axios = require('axios');
const { url } = require('../../config').common.api;
const errors = require('../errors');

exports.getAlbum = id => {
  const endpoint = `${url}albums/${id}`;
  return axios
    .get(endpoint)
    .then(response => response.data)
    .catch(e => {
      throw errors.conectionError(e.message);
    });
};

exports.getPhotosOfAlbum = albumId => {
  const query = `?albumId=${albumId}`;
  const endpoint = `${url}photos${query}`;
  return axios
    .get(endpoint)
    .then(response => response.data)
    .catch(e => {
      throw errors.conectionError(e.message);
    });
};

exports.getAllAlbums = (offset, limit, filter, orderBy) => {
  const endpoint = `${url}albums`;
  return axios
    .get(endpoint)
    .then(response => response.data)
    .catch(e => {
      throw errors.conectionError(e.message);
    })
    .then(albums => {
      const sortedAlbums = albums.slice();
      if (filter) {
        return sortedAlbums.filter(album => album.title === filter);
      }
      if (orderBy) {
        sortedAlbums.sort((a, b) => {
          if (!a[orderBy] || !b[orderBy]) {
            throw errors.badRequest('The orderBy parameter do not exist');
          }
          if (a[orderBy] < b[orderBy]) {
            return -1;
          }
          if (a[orderBy] > b[orderBy]) {
            return 1;
          }
          return 0;
        });
      }
      return sortedAlbums.slice(offset, limit);
    });
};
