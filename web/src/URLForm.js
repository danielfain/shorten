import React, { Component } from 'react'; 

class URLForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          url: '' 
        };
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {    
      this.setState({ url: event.target.value });  
    }

    render() {
        return (
          <div style={{ display: 'flex', paddingTop: '4vh', justifyContent: 'center' }}>
            <form style={{ width: '50vw' }} onSubmit={e => e.preventDefault()} > 
              <div style={{ alignItems: 'center' }} class="field is-horizontal">
                <label style={{ paddingRight: '1vw' }} class="label">URL</label>

                <input 
                  style={{ maxWidth: '100%' }} 
                  class="input is-large" 
                  type="text" 
                  placeholder="Enter your URL here..." 
                  value={this.state.url}
                  onChange={this.handleChange} 
                />

                <div style={{ paddingLeft: '1vw' }} class="shorten-button">
                  <button type="submit" class="button is-primary">Go!</button>
                </div>
              </div>
            </form>
          </div>
        );
      }
}

export default URLForm;