import React, { Component } from 'react';

class URLForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          url: '' 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {    
      this.setState({ url: event.target.value });  
    }

    handleSubmit(event) {
      let expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
      let regex = new RegExp(expression);

      let url = this.state.url;

      if (url.match(regex)) {
        console.log('A URL was submitted: ' + url);
      } else {
        console.log('Bad URL format');
      }
      
      event.preventDefault();
    }

    render() {
        return (
          <div style={{ display: 'flex', paddingTop: '4vh', justifyContent: 'center' }}>
            <form style={{ width: '50vw' }} onSubmit={this.handleSubmit} > 
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
        );
      }
}

export default URLForm;