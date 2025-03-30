import React, { Component } from "react";
import { compose } from "redux";
import { connect, } from "react-redux";
import { getEvents } from "../actions/eventActions";
import { Container } from "reactstrap";
import EventListItem from "./EventListItem";
import { Row, Col } from "reactstrap";
import { withTranslation } from 'react-i18next';

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
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  }

  // helper function for checking if the date is in the past (yesterday or older)
  isPast(someDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return someDate.getTime() < today.getTime();
  }

  // helper function for checking if the date is in the future (tomorrow or more)
  isFuture(someDate) {
    const today = new Date();
    today.setHours(24, 0, 0, 0);
    return someDate.getTime() >= today.getTime();
  }

  // helper function for travelling the DOM tree to find the correct parent
  getClosest(elem, selector) {
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  }

  toggle(e) {
    let event;
    if (e.target.className === "card-header") {
      event = e.target.dataset.event;
    } else {
      event = this.getClosest(e.target, ".card-header").dataset.event;
    }
    this.setState({
      collapse: this.state.collapse === String(event) ? null : String(event),
    });
  }

  render() {
    const { collapse } = this.state;
    const { events } = this.props;
    const { t } = this.props;
    

    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    const pastEvents = events.filter((event) => {
      return this.isPast(new Date(event.date));
    });
    const currentEvents = events.filter((event) => {
      return this.isToday(new Date(event.date));
    });
    const futureEvents = events.filter((event) => {
      return this.isFuture(new Date(event.date));
    });

    return (
      <Container className="my-5 pt-5 eventlist-container">
        {window.location.href.indexOf("/admin") === -1 && (
          <>
            {/* <div class="language-div">
              <div class="language-left-text">Fix</div>
              <CustomInput className="language-toggle" type="switch" label="in_progress" id="in_progress" />
            </div> */}
            <h3 className="text-center my-3">Hauskaa Wappua eli Wapundeerusta!</h3>
            <Row>
              <Col sm={12} className="ohje-container">
                <p>
                  {t('main-info')}
                </p>
                <p>
                {t('info-channels')}
                  <br />
                  {t('telegram-name')}:&nbsp;
                  <a class="link-highlight" href={t('telegram-link')}>
                  {t('telegram-link')}
                  </a>
                  <br />
                  {t('instagram-name')}:&nbsp;
                  <a class="link-highlight" href={t('instagram-link')} >
                    {t('instagram-link')}
                  </a>
                </p>
                <p>
                  {t('wappupassi-info')}
                </p>
                <p>
                  {t('wappuputki-text')}
                </p>
                <p>
                {t('wappuputki-one')}
                {t('wappuputki-two')}
                {t('wappuputki-three')}
                {t('wappuputki-four')}
                </p>
                <p>
                  {t('wappupassi-price')}
                </p>
                <p>{t('wappu-greetings')}</p>
              </Col>
            </Row>
            <h3 className="text-center my-3">Ongelmatilannelomake</h3>
            <Row>
              <Col sm={12} className="harassment-form-container">
                <p>
                {t('problematic-situations-info')}&nbsp;
                <a class="link-highlight" href={t('problematic-situations-info-link')}>
                  {t('problematic-situations-info-link')}
                </a>
                {t('problematic-situations-info2')}
                </p>
                <p>
                  {t('problematic-situations-form-text')}:{" "}
                  <a class="link-highlight" href={t('problematic-situations-form')}>
                    {t('problematic-situations-form')}
                  </a>
                </p>
              </Col>
            </Row>
          </>
        )}
        {events.length === 0 && (
          <h3 className="text-center my-3">{t('no-events')}</h3>
        )}
        {currentEvents.length > 0 && (
          <h3 className="text-center my-3">{t('events-today')}</h3>
        )}
        {currentEvents.length > 0 &&
          currentEvents.map((event) => (
            <EventListItem
              key={event._id.toString()}
              event={event}
              collapse={collapse}
              toggle={this.toggle}
            />
          ))}
        {futureEvents.length > 0 && (
          <h3 className="text-center my-3">{t('upcoming-events')}</h3>
        )}
        {futureEvents.length > 0 &&
          futureEvents.map((event) => (
            <EventListItem
              key={event._id.toString()}
              event={event}
              collapse={collapse}
              toggle={this.toggle}
            />
          ))}
        {pastEvents.length > 0 && (
          <h3 className="text-center my-3">{t('past-events')}</h3>
        )}
        {pastEvents.length > 0 &&
          pastEvents.map((event) => (
            <EventListItem
              key={event._id.toString()}
              event={event}
              collapse={collapse}
              toggle={this.toggle}
            />
          ))}
        <br />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.event.events,
});

export default compose(
  connect(mapStateToProps, { getEvents }),
  withTranslation()
)(EventList);
