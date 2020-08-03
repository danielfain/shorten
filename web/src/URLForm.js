import React, { Component } from 'react';

import './URLForm.scss';

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
            <div className='formContainer'>
              <form onSubmit={this.handleSubmit} > 
                <div className="field is-horizontal">
                  <label className="label">URL</label>

                  <input 
                    className="input is-large" 
                    type="text" 
                    placeholder="Enter your URL here..." 
                    value={this.state.url}
                    onChange={this.handleChange} 
                  />

                  <div className="buttonContainer">
                    <button type="submit" className="button is-primary">Go!</button>
                  </div>
                </div>
              </form>
            </div>
            { this.state.invalidUrl && 
            <div className="notification is-danger">
              Please enter a valid URL.
            </div>
            }
          </>
        );
      }
}

export default URLForm;