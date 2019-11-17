import React from "react";
import fetchJsonp from "fetch-jsonp";
import 'normalize.css'
import './App.css';

class App extends React.Component {

  state = {
    disableForm: false,
    query: "",
    pictures: []
  };

  enterLoading() {
    const encodedQuery = encodeURIComponent(this.state.query)

    setTimeout(() => {
      fetchJsonp(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6b3575d10435de5f010fc941f5eff94a&per_page=15&tags=${encodedQuery}&format=json`,
        { jsonpCallback: "jsoncallback" }
      )
        .then(res => res.json())
        .then(j => {
          let picArray = j.photos.photo.map((pic, i) => {
            let srcPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
            return (
              <div key={pic.id}>
                <img
                  className=".ui-photo"
                  alt="carts"
                  src={srcPath}
                  style={{ "--i": i }}
                />
                <p className=".ui-photo-detail">{pic.title}</p>
              </div>
            )
          })
          this.setState({ pictures: picArray });
        })
        .catch(e => console.log(e))
    }, 1000)
  };

  handleChangeQuery = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.enterLoading();
  }

  render() {
    return (
      <div className="ui-app">
        <form className="ui-form" onSubmit={this.handleSubmit}>
          <input
            className="ui-input"
            disabled={this.state.disableForm}
            placeholder="Search Flickr for images..."
            type="search"
            value={this.state.query}
            onChange={this.handleChangeQuery}
          />
          <button
            className="ui-button"
            type="submit"
          >Search</button>
        </form>

        <section className="ui-items">
          {this.state.pictures}
        </section>
      </div>
    );
  }
}

export default App;
