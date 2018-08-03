import utils from '../utils';

class Person {

  constructor(host, axios) {
    if (!host) {
      throw new Error('host is not specified');
    }

    if (!axios) {
      throw new Error('axios is not specified');
    }

    this.axios = axios;
    this.api = `${host}persons/`;
  }

  create(data) {
    if (!data) {
      throw new Error('No person\'s parameters passed');
    }

    if (!data.gender) {
      throw new Error('gender is not specified');
    }

    if (!data.height) {
      throw new Error('height is not specified');
    }

    return this.axios({
        url: this.api,
        method: 'post',
        data: {
          height: data.height,
          gender: data.gender,
          front_image: data.frontImage,
          side_image: data.sideImage,
        },
      })
      .then((response) => {
        if (!data.frontImage && !data.sideImage) {
          return response.data.id;
        }

        const taskSetUrl = response.headers.location;
        const taskSetId = /\/queue\/(.*)\//g.exec(taskSetUrl)[1];
        return taskSetId;
      });
  }

  get(id) {
    if (!id) {
      throw new Error('id is not specified');
    }

    return this.axios({
      url: `${this.api}${id}/`,
      headers: this.headers,
      method: 'get',
    })
      .then((response) => {
        return response.data;
      });
  }

  update(id, data) {
    if (!id) {
      throw new Error('id is not specified');
    }

    return this.axios({
      url: `${this.api}${id}/`,
      method: 'patch',
      data: {
        height: data.height,
        gender: data.gender,
        front_image: data.frontImage,
        side_image: data.sideImage,
      },
    })
      .then((response) => {
        return response.data;
      });
  }

  calculate(id) {
    if (!id) {
      throw new Error('id is not specified');
    }

    return this.axios({
      url: `${this.api}${id}/calculate/`,
      headers: this.headers,
      method: 'get',
    })
      .then((response) => {
        const taskSetUrl = response.headers.location;
        const taskSetId = /\/queue\/(.*)\//g.exec(taskSetUrl)[1];
        return taskSetId;
      });
  }
}

export default Person;
