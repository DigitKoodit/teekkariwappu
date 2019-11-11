import React, { Component } from 'react';
import EventModal from './EventModal'
import EventList from './EventList'

class AdminEventView extends Component {

    render() {
        return (
            <div>
                <EventModal
                    type="add"
                 />
                <EventList />
            </div>
        );
    }
}


export default AdminEventView;
