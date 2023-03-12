import React, { Component } from "react";
import { Container } from "reactstrap";

class VideoComponent extends Component {
  render() {
    return (
      <div className="video-component-container py-5">
        <Container>
          <div className="wappuvideo-container">
            {/* <iframe
              src="https://www.youtube.com/embed/UNLPQWieA2k"
              title="Wappuvideo"
              className="wappuvideo"
              allowFullScreen
            ></iframe> */}
            <h3 className="text-center my-4">Vuoden 2023 Wappuvideo: Tulossa pian!</h3>
          </div>
        </Container>
      </div>
    );
  }
}

export default VideoComponent;
