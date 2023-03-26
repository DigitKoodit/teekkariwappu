import React, { Component } from "react";
import { connect } from "react-redux";
import { getEvents } from "../actions/eventActions";
import { Container } from "reactstrap";
import EventListItem from "./EventListItem";
import { Row, Col, Form, FormGroup, Label, CustomInput } from "reactstrap";

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
                  Tältä sivulta löydät kaikki tarvittavat tiedot vuoden 2023 Teekkariwapusta ja siitä
                  kunnialla selviämiseen. Wappu pärähtää käyntiin 12.4. Pönkelijulkkareilla ja
                  Wapunaloitusbileillä ja jatkuu läpi huhtikuun aina Wapunpäivään 1.5. asti.
                  Wapunajan jokaiselle päivälle on luvassa monipuolista ohjelmaa aina vuoden
                  railakkaimmista sitseistä terapeuttisiin hyvinvointipäiviin.
                </p>
                <p>
                  Tämän sivun lisäksi tapahtumista jaetaan myös ajankohtaista tietoa Telegramissa
                  ja Discordissa, ja näihin kanaviin kannattaa ehdottomasti liittyä samantien.
                  <br /> Wappu-Telegram:{" "}
                  <a
                    class="link-highlight"
                    href="https://t.me/+Q0-r0uzlZollM2M0"
                  >
                    https://t.me/+Q0-r0uzlZollM2M0
                  </a>
                  <br /> Wappu-Discord:{" "}
                  <a class="link-highlight" href="https://discord.gg/3A9QCEM6es">
                    https://discord.gg/3A9QCEM6es
                  </a>
                </p>
                <p>
                  Wapun aikana käytössä on perinteinen Wappupassi, johon passin haltija voi kerätä
                  leimoja wapputapahtumista hattupäisiltä Wappukomissaareilta. Täytettyä passia
                  vastaan saa lunastettua itselleen Wappuputki-haalarimerkkejä 1.5. pidettävältä
                  Wappupiknikiltä ja kasteessa. Mitä enemmän tapahtumaleimoja keräät, sitä enemmän
                  Wappuputkia ansaitset eli passia kannattaa höylätä ahkerasti!
                </p>
                <p>
                  Wappuputki-merkkejä voi ansaita seuraavanlaisesti:
                </p>
                <p>
                  6 leimaa: 1 merkki <br />
                  10 leimaa: 2 merkkiä <br />
                  14 leimaa: 3 merkkiä <br />
                  18 leimaa: 4 merkkiä <br />
                </p>
                <p>
                  Wappupassin saa hankittua itselleen 5€ hintaan kalastajahattuisilta
                  Wappukomissaareilta kaikissa wapputapahtumissa MobilePayllä.
                </p>
                <p>Loistokasta Wappua toivottaa,</p>
                <p>Wapputoimikunta</p>

              </Col>
            </Row>
          </>
        )}
        {events.length === 0 && (
          <h3 className="text-center my-3">Ei tapahtumia!</h3>
        )}
        {currentEvents.length > 0 && (
          <h3 className="text-center my-3">Tapahtuma(t) tänään</h3>
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
          <h3 className="text-center my-3">Tulevat tapahtumat</h3>
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
          <h3 className="text-center my-3">Menneet tapahtumat</h3>
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

export default connect(mapStateToProps, { getEvents })(EventList);
