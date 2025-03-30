import React, { Component } from 'react';
import EventList from './EventList';
import Header from './Header';
//import VideoComponent from './VideoComponent';
import Footer from './Footer';
import './i18n/i18n'

class MainView extends Component {
    render() {
        return (
            <div>
                <Header/>
                <EventList />
                <Footer />
            </div>
        );
    }
}

export default MainView;
