import fetch from "isomorphic-unfetch";
import React from "react";
import Description from "./components/description";
import Photos from "./components/photos";
import Head from "next/head";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      photos: [
        "https://cdn.makeawebsitehub.com/wp-content/uploads/2016/03/error-with-wordpress.png"
      ]
    };
  }

  static async getInitialProps(props) {
    let result = await fetch(`http://localhost:4000/${props.query.post}`)
    let state = await result.json();
	console.log(state);
    return {
      details: state.details,
      photos: state.photos
    };
  }

  render() {
    return (
      <div>
        <div className="eventDetailsContainer">
          <Photos photos={this.props.photos} />
          <div className="sectionTitle">
            <h3>Details</h3>
          </div>
          <Description details={this.props.details} />
        </div>
        <style jsx="true">
          {`
            .eventDetailsContainer {
              background: #f6f7f8;
              color: #2e3e48;
              font-family: Graphik Meetup, -apple-system, BlinkMacSystemFont,
                Roboto, Helvetica, Arial, sans-serif;
              text-rendering: optimizeLegibility;
              -webkit-font-feature-settings: "liga", "kern";
              max-width: 600px;
            }
            .sectionTitle h3 {
              font-size: 1.25rem;
              line-height: 1.45;
              font-weight: 600 !important;
              display: inline;
            }
          `}
        </style>
      </div>
    );
  }
}

export default App;
