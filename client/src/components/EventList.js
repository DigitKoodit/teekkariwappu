import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../actions/eventActions';
import { Container } from 'reactstrap';
import EventListItem from './EventListItem';
import { Row, Col, Button } from 'reactstrap';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: null,
    };
  }

  componentDidMount() {
    this.props.getEvents();
  }

  // helper function for checking if the date is today
  isToday(someDate) {
    const today = new Date()
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }

  // helper function for checking if the date is in the past (yesterday or older)
  isPast(someDate) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return someDate.getTime() < today.getTime()
  }

  // helper function for checking if the date is in the future (tomorrow or more)
  isFuture(someDate) {
    const today = new Date()
    today.setHours(24, 0, 0, 0)
    return someDate.getTime() >= today.getTime()
  }

  // helper function for travelling the DOM tree to find the correct parent
  getClosest(elem, selector) {
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  };

  toggle(e) {
    let event;
    if (e.target.className === 'card-header') {
      event = e.target.dataset.event;
    } else {
      event = this.getClosest(e.target, '.card-header').dataset.event;
    }
    this.setState({ collapse: this.state.collapse === String(event) ? null : String(event) });
  }

  render() {
    const { collapse } = this.state;
    const { events } = this.props;

    events.sort((a, b) => new Date(a.date) - new Date(b.date))
    const pastEvents = events.filter(event => { return this.isPast(new Date(event.date)) })
    const currentEvents = events.filter(event => { return this.isToday(new Date(event.date)) })
    const futureEvents = events.filter(event => { return this.isFuture(new Date(event.date)) })

    return (
      <Container className="my-5 pt-5 eventlist-container">
        {window.location.href.indexOf('/admin') === -1 &&
          <>
            <h3 className="text-center my-3">Ohjeet</h3>
            <Row>
              <Col sm={12} className="ohje-container">
                <p>
                  Perinteiseen tapaan tästäkin Wapusta saa Wappuputkimerkkejä tapahtumiin osallistumalla. Seuraa itse osallistumistasi, ja kerro siitä Wapun jälkeen Digitin tai Nucleuksen hallituslaiselle saadaksesi merkit. Merkkien määrä riippuu osallistumistasi tapahtumissa seuraavasti:
                </p>
                <p>
                  3 tapahtumaa 1 merkki <br />
                  6 tapahtumaa 2 merkkiä <br />
                  9 tapahtumaa 3 merkkiä <br />
                  12 tapahtumaa 4 merkkiä <br />
                </p>
                <p>
                  Tapahtumien osallistujalistoja seurataan, joten olethan rehellinen noutaessasi merkkejä.
                </p>
                <p>
                  Wapun viettäjille tehdään oma Discord-kanava, jota käytämme eri tapahtumiin ja viestintään. Wappu-Discordia käytetään myös päiväkohtaisten haasteiden taltiointiin.
                </p>
                <p>
                  Koko Wapun ajan on käynnissä Wappuseikkailu. Seikkailuun kuuluu erilaisia rasteja, joiden avulla pääsee kulkemaan ympäri Turkua ja ratkaisemaan kiperiä pulmia ja visaisia vinkkejä. Wappuseikkailua voi suorittaa täysin omaan tahtiin koko Wapun ajan yksin tai maksimissaan 4 hengen ryhmissä.
                </p>
                <Button className="discord-button" onClick={() => window.location.href='https://discord.gg/hwWHsf8Wnn'}>Wappu-Discordiin pääset tästä!</Button>
              </Col>
            </Row>
          </>
        }
        {events.length === 0 &&
          <h3 className="text-center my-3">Ei tapahtumia!</h3>
        }
        {currentEvents.length > 0 &&
          <h3 className="text-center my-3">Tapahtuma(t) tänään</h3>
        }
        {currentEvents.length > 0 &&
          currentEvents.map((event) =>
            <EventListItem
              key={event._id.toString()}
              event={event}
              collapse={collapse}
              toggle={this.toggle}
            />)
        }
        {futureEvents.length > 0 &&
          <h3 className="text-center my-3">Tulevat tapahtumat</h3>
        }
        {futureEvents.length > 0 &&
          futureEvents.map((event) =>
            <EventListItem
              key={event._id.toString()}
              event={event}
              collapse={collapse}
              toggle={this.toggle}
            />)
        }
        {pastEvents.length > 0 &&
          <h3 className="text-center my-3">Menneet tapahtumat</h3>
        }
        {pastEvents.length > 0 &&
          pastEvents.map((event) =>
            <EventListItem
              key={event._id.toString()}
              event={event}
              collapse={collapse}
              toggle={this.toggle}
            />)
        }
        <br />
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  events: state.event.events,
});

export default connect(
  mapStateToProps,
  { getEvents }
)(EventList);
