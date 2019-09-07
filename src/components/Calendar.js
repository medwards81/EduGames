import React, { Component } from "react";
import ReactDOM from "react-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable as DraggableCalItem
} from "@fullcalendar/interaction";
import { storageTest } from "../utils/localStorage";
import birthdayCake from "../birthday-cake.svg";
import noSchool from "../no-school.svg";
import schoolBus from "../school-bus.svg";
import confetti from "../confetti.svg";
import star from "../star.svg";
import pumpkin from "../pumpkin.svg";
import turkey from "../turkey.svg";
import tree from "../tree.svg";
import rabbit from "../rabbit.svg";
import heart from "../heart.svg";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

class Calendar extends Component {
  calendarComponentRef = React.createRef();
  initState = {
    shouldShowExternalEvents: false,
    calendarWeekends: true,
    calendarEvents: [],
    externalEvents: [
      { title: "Birthday", id: "Birthday" },
      { title: "No School", id: "No School" },
      { title: "Field Trip", id: "Field Trip" },
      { title: "Party", id: "Party" },
      { title: "Special Event", id: "Special Event" },
      { title: "Halloween", id: "Halloween" },
      { title: "Thanksgiving", id: "Thanksgiving" },
      { title: "Christmas", id: "Christmas" },
      { title: "Easter", id: "Easter" },
      { title: "Valentine's Day", id: "Valentine's Day" }
    ],
    today: null,
    tomorrow: null,
    yesterday: null
  };

  state = this.initState;

  hasLocalStorageSupport = storageTest();

  componentDidMount() {
    let draggableEl = document.getElementById("external-events");
    new DraggableCalItem(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id
        };
      }
    });

    if (this.hasLocalStorageSupport) {
      const calendarEvents = localStorage.getItem("dailyCalendarEvents");
      if (calendarEvents) {
        const currentYear = new Date().getFullYear();
        const cachedEvents = JSON.parse(calendarEvents);
        const currentYearEvents = cachedEvents.filter(
          event =>
            event.id.indexOf(`${currentYear}`) > -1 ||
            event.id.indexOf(`${currentYear + 1}`) > -1
        );
        this.setState({ calendarEvents: currentYearEvents });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { calendarEvents } = this.state;

    if (this.hasLocalStorageSupport)
      localStorage.setItem(
        "dailyCalendarEvents",
        JSON.stringify(calendarEvents)
      );
  }

  toggleExternalEvents = () => {
    this.setState({
      shouldShowExternalEvents: !this.state.shouldShowExternalEvents
    });
  };

  handleDateClick = dateClick => {
    const { dateStr } = dateClick;
    const dateTdSelector = `td[data-date="${dateStr}"]`;
    const dateTdEle = document.querySelectorAll(dateTdSelector);
    if (dateTdEle) {
      const dateSpanEle = dateTdEle[1].querySelector(".fc-day-number");
      if (dateSpanEle) dateSpanEle.classList.toggle("invisible");
    }
  };

  eventClick = ({ event }) => {
    const { calendarEvents } = this.state;
    const eventId = event.id;
    const nonMatchingEvents = calendarEvents.filter(
      event => event.id !== eventId
    );
    event.remove();
    this.setState({
      calendarEvents: [...nonMatchingEvents]
    });
  };

  getEventImage = (title = "", widthPx = 20) => {
    let imgSrc;
    switch (title) {
      case "Birthday":
        imgSrc = birthdayCake;
        break;
      case "No School":
        imgSrc = noSchool;
        break;
      case "Field Trip":
        imgSrc = schoolBus;
        break;
      case "Party":
        imgSrc = confetti;
        break;
      case "Special Event":
        imgSrc = star;
        break;
      case "Halloween":
        imgSrc = pumpkin;
        break;
      case "Thanksgiving":
        imgSrc = turkey;
        break;
      case "Christmas":
        imgSrc = tree;
        break;
      case "Easter":
        imgSrc = rabbit;
        break;
      case "Valentine's Day":
        imgSrc = heart;
        break;
      default:
        return null;
    }

    return (
      <img
        src={imgSrc}
        alt=""
        style={{
          width: `${widthPx}px`,
          height: "auto",
          verticalAlign: "bottom",
          maxWidth: "100%"
        }}
      />
    );
  };

  getEventImages = (title = "", widthPx = 30) => {
    const titles = title.split(",");
    const images = titles.map((title, idx) => (
      <span
        key={`${title}-${idx}`}
        style={{
          marginRight: "2px",
          display: "inline-block",
          verticalAlign: "bottom"
        }}
      >
        {this.getEventImage(title, widthPx)}
      </span>
    ));
    return images;
  };

  eventDetail = ({ event, el }) => {
    const content = (
      <div
        className="text-center"
        style={{ marginTop: "0em", cursor: "pointer" }}
      >
        {this.getEventImages(event.title)}
      </div>
    );
    ReactDOM.render(content, el);
    return el;
  };

  drop = ({ draggedEl, date }) => {
    const { calendarEvents } = this.state;
    const eventType = draggedEl.getAttribute("data");
    const yearNum = date.getFullYear();
    const monthNum = date.getMonth();
    const dayNum = date.getDate();
    const eventId = `Event-${yearNum}-${monthNum}-${dayNum}`;
    const matchingEvents = calendarEvents.filter(event => event.id === eventId);
    const nonMatchingEvents = calendarEvents.filter(
      event => event.id !== eventId
    );

    let eventTitle = eventType;
    if (matchingEvents.length) {
      const prevEvent = matchingEvents[0];
      const prevTitle = prevEvent.title || "";
      eventTitle = `${prevTitle},${eventTitle}`;
    }

    this.setState({
      calendarEvents: [
        ...nonMatchingEvents,
        {
          title: eventTitle,
          id: eventId,
          start: date
        }
      ]
    });
  };

  eventReceive = ({ event }) => {
    event.remove();
  };

  datesRender = ({ view = {} }) => {
    const dayEls = document.querySelectorAll(".fc-day-number");
    if (dayEls) {
      const d = new Date();
      const currentMonth = d.getMonth();
      const currentDay = d.getDate();
      const currentViewMonth = view.currentStart.getMonth();
      if (currentMonth === currentViewMonth) {
        for (let i = 0; i < dayEls.length; i++) {
          const dayEl = dayEls[i];
          const dayNum = +dayEl.innerText;
          if (dayNum >= currentDay) dayEl.classList.add("invisible");
        }
      }
    }
  };

  addDropped = (id, source) => {
    this.setState({
      [source]: id
    });
  };

  onDragEnd = result => {
    const { destination, draggableId, source } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId) return;

    this.addDropped(draggableId, destination.droppableId);
  };

  setToday = e => this.setState({ today: e.target.id });
  clearToday = () => this.setState({ today: null });

  setTomorrow = e => this.setState({ tomorrow: e.target.id });
  clearTomorrow = () => this.setState({ tomorrow: null });

  setYesterday = e => this.setState({ yesterday: e.target.id });
  clearYesterday = () => this.setState({ yesterday: null });

  capitalizeFirst = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  render() {
    const { shouldShowExternalEvents, today, tomorrow, yesterday } = this.state;
    const colStyle = shouldShowExternalEvents ? {} : { display: "none" };

    return (
      <div className="Calendar" style={{ marginTop: "-1em" }}>
        <div className="text-right">
          <Link className="btn btn-sm btn-success" to="/weather-graph">
            Next Game >
          </Link>
        </div>
        <Row>
          <Col lg={3} sm={3} md={3} style={colStyle}>
            <div id="external-events">
              <p align="center">
                <strong> Events</strong>
              </p>
              {this.state.externalEvents.map(event => (
                <div
                  className="fc-event"
                  title={event.title}
                  data={event.id}
                  key={event.id}
                >
                  <span style={{ marginRight: "6px" }}>
                    {this.getEventImage(event.title)}
                  </span>
                  {event.title}
                </div>
              ))}
              <p className="text-center">
                {" "}
                <Button
                  variant="link"
                  style={{ paddingLeft: "0", marginLeft: "0" }}
                  onClick={this.toggleExternalEvents}
                >
                  hide events
                </Button>
              </p>
            </div>
          </Col>
          <Col>
            {!shouldShowExternalEvents && (
              <Button
                variant="link"
                style={{ paddingLeft: "0", marginLeft: "0" }}
                onClick={this.toggleExternalEvents}
              >
                show events
              </Button>
            )}
            <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: "prev,next",
                center: "title",
                right: ""
              }}
              columnHeaderFormat={{ weekday: "long" }}
              eventDurationEditable={false}
              editable={false}
              droppable={true}
              plugins={[dayGridPlugin, interactionPlugin]}
              ref={this.calendarComponentRef}
              weekends={this.state.calendarWeekends}
              events={this.state.calendarEvents}
              dateClick={this.handleDateClick}
              eventClick={this.eventClick}
              eventRender={this.eventDetail}
              showNonCurrentDates={false}
              drop={this.drop}
              eventReceive={this.eventReceive}
              datesRender={this.datesRender}
              contentHeight={500}
            />
          </Col>
        </Row>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <div
            className="text-center border rounded"
            style={{ padding: "8px", marginTop: "16px" }}
          >
            <h4>
              Today is{" "}
              <Droppable droppableId="today" type="day" isDragDisabled={true}>
                {(provided, snapshot) => (
                  <span
                    className="fill-in-the-blank"
                    style={{
                      width: "180px",
                      color: "#28a745"
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {today && (
                      <span
                        className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                        style={{ cursor: "pointer" }}
                        onDoubleClick={this.clearToday}
                      >
                        {` ${this.capitalizeFirst(today)}`}
                      </span>
                    )}
                    <div style={{ display: "none" }}>
                      {provided.placeholder}
                    </div>
                  </span>
                )}
              </Droppable>
            </h4>
            <h4 style={{ marginTop: "22px" }}>
              Tomorrow will be{" "}
              <Droppable
                droppableId="tomorrow"
                type="day"
                isDragDisabled={true}
              >
                {(provided, snapshot) => (
                  <span
                    className="fill-in-the-blank"
                    style={{
                      width: "180px",
                      color: "#28a745"
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tomorrow && (
                      <span
                        className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                        style={{ cursor: "pointer" }}
                        onDoubleClick={this.clearTomorrow}
                      >
                        {` ${this.capitalizeFirst(tomorrow)}`}
                      </span>
                    )}
                    <div style={{ display: "none" }}>
                      {provided.placeholder}
                    </div>
                  </span>
                )}
              </Droppable>
            </h4>
            <h4 style={{ marginTop: "22px" }}>
              Yesterday was{" "}
              <Droppable
                droppableId="yesterday"
                type="day"
                isDragDisabled={true}
              >
                {(provided, snapshot) => (
                  <span
                    className="fill-in-the-blank"
                    style={{
                      width: "180px",
                      color: "#28a745"
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {yesterday && (
                      <span
                        className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                        style={{ cursor: "pointer" }}
                        onDoubleClick={this.clearYesterday}
                      >
                        {` ${this.capitalizeFirst(yesterday)}`}
                      </span>
                    )}
                    <div style={{ display: "none" }}>
                      {provided.placeholder}
                    </div>
                  </span>
                )}
              </Droppable>
            </h4>
            <div
              className="mx-auto text-center"
              style={{ padding: "16px", marginTop: "22px" }}
            >
              <Droppable droppableId="day" type="day" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    className="day-droppable"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Draggable draggableId="sunday" index={0}>
                      {(provided, snapshot) => (
                        <span
                          id="sunday"
                          className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          Sunday
                        </span>
                      )}
                    </Draggable>
                    <Draggable draggableId="monday" index={1}>
                      {(provided, snapshot) => (
                        <span
                          id="monday"
                          className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          Monday
                        </span>
                      )}
                    </Draggable>
                    <Draggable draggableId="tuesday" index={2}>
                      {(provided, snapshot) => (
                        <span
                          id="tuesday"
                          className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          Tuesday
                        </span>
                      )}
                    </Draggable>
                    <Draggable draggableId="wednesday" index={3}>
                      {(provided, snapshot) => (
                        <span
                          id="wednesday"
                          className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          Wednesday
                        </span>
                      )}
                    </Draggable>
                    <Draggable draggableId="thursday" index={4}>
                      {(provided, snapshot) => (
                        <span
                          id="thursday"
                          className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          Thursday
                        </span>
                      )}
                    </Draggable>
                    <Draggable draggableId="friday" index={5}>
                      {(provided, snapshot) => (
                        <span
                          id="friday"
                          className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          Friday
                        </span>
                      )}
                    </Draggable>
                    <Draggable draggableId="saturday" index={6}>
                      {(provided, snapshot) => (
                        <span
                          id="saturday"
                          className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          Saturday
                        </span>
                      )}
                    </Draggable>
                    <div style={{ display: "none" }}>
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default Calendar;
