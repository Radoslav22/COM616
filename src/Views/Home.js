import React, { Component } from 'react';
import GoogleMap from "../Components/googlemap";
class Home extends Component {
    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <GoogleMap></GoogleMap>
            </div>
        );
    }
}

export default Home;
