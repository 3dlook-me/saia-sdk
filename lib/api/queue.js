class Queue {

  constructor(host, axios) {
    if (!host) {
      throw new Error('host is not specified');
    }

    if (!axios) {
      throw new Error('axios is not specified');
    }

    this.axios = axios;
    this.api = `${host}queue/`;
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
}

export default Queue;
