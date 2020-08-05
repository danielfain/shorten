import { Component } from 'react';

const GET_URL_API = 'https://am7jri8fi5.execute-api.us-east-1.amazonaws.com/default/geturl';

class GetURL extends Component {
  componentDidMount() {
    fetch(GET_URL_API + '?id=' + this.props.match.params.id)
      .then(data => data.json())
      .then(res => {
        const { url } = res;
        window.location = url;
      })
      .catch(err => {
        window.location = '/';
      });
  }

  render() {
    return null;
  }

}

export default GetURL;