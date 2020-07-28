import React from 'react';

const App = () => (
  <div className="App">
    <section class="hero is-medium is-primary is-bold">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">shortener</h1>
          </div>
        </div>
    </section>
    <main>
      <div style={{ display: 'flex', paddingTop: '4vh', justifyContent: 'center' }}>
        <form style={{ width: '50vw' }}>
          <div style={{ alignItems: 'center' }} class="field is-horizontal">
            <label style={{ paddingRight: '1vw' }} class="label">URL</label>
            <input style={{ maxWidth: '100%' }} class="input is-large" type="text" placeholder="Enter your URL here..." />
            <div style={{ paddingLeft: '1vw' }} class="shorten-button">
              <button type="submit" class="button is-primary">Go!</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  </div>
);

export default App;
