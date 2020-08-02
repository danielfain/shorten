import React, { Component } from 'react';

class URLForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          url: '',
          invalidUrl: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {    
      this.setState({ url: event.target.value });  
    }

    handleSubmit(event) {
      // eslint-disable-next-line
      let expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
      let regex = new RegExp(expression);

      let url = this.state.url;

      if (url.match(regex)) {
        this.setState({ invalidUrl: false })

        fetch(process.env.SHORTEN_API_URL)
          .then(res => res.json())
          .then(data => {
            console.log(data);
          })
          .catch(err => console.log(err));
      } else {
        this.setState({ invalidUrl: true })
      }

      this.setState({ url: '' });
      
      event.preventDefault();
    }

    render() {
        return (
          <>
            <div style={{ display: 'flex', paddingTop: '4vh', paddingBottom: '2vh', justifyContent: 'center' }}>
              <form style={{ width: '50%' }} onSubmit={this.handleSubmit} > 
                <div style={{ alignItems: 'center' }} className="field is-horizontal">
                  <label style={{ paddingRight: '1vw' }} className="label">URL</label>

                  <input 
                    style={{ maxWidth: '100%' }} 
                    className="input is-large" 
                    type="text" 
                    placeholder="Enter your URL here..." 
                    value={this.state.url}
                    onChange={this.handleChange} 
                  />

                  <div style={{ paddingLeft: '1vw' }} className="shorten-button">
                    <button type="submit" className="button is-primary">Go!</button>
                  </div>
                </div>
              </form>
            </div>
            { this.state.invalidUrl && 
            <div style={{ width: '25%', margin: 'auto' }} className="notification is-danger">
              Please enter a valid URL.
            </div>
            }
          </>
        );
      }
}

export default URLForm;