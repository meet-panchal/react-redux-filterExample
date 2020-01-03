import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faPlaneDeparture,
  faPlane,
  faHotel
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as actionsType from "./redux/actionConstants";
import "./App.css";

const App = props => {
  console.log(props.finalFilteredData);
  return (
    <div>
      <div>
        <ul className="filters">
          {props.luggageFilter.map((item, index) => (
            <li key={item.value}>
              <input
                type="checkbox"
                name={item.value}
                datatype="luggage"
                defaultChecked={props.luggageFilter[index].isSelected}
                onChange={event =>
                  props.checkboxChangeHandler(event, item, index)
                }
              />
              <FontAwesomeIcon icon={faSuitcase} className="mx-3" />
              {item.value}kg
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="filters">
          {props.stoppageFilter.map((item, index) => (
            <li key={item.value}>
              <input
                type="checkbox"
                name={item.value}
                datatype="stoppage"
                defaultChecked={props.stoppageFilter[index].isSelected}
                onChange={event =>
                  props.checkboxChangeHandler(event, item, index)
                }
              />
              <FontAwesomeIcon icon={faPlaneDeparture} className="mx-3" />
              {item.value} Stoppage
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="filters">
          {props.airlinesFilter.map((item, index) => (
            <li key={item.code}>
              <input
                type="checkbox"
                defaultChecked={props.airlinesFilter[index].isSelected}
                name={item.code}
                datatype="airline"
                onChange={event =>
                  props.checkboxChangeHandler(event, item, index)
                }
              />
              <FontAwesomeIcon icon={faPlane} className="mx-3" />
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="filters">
          {props.airportFilter.map((item, index) => (
            <li key={item.airport_code}>
              <input
                type="checkbox"
                name={item.airport_code}
                datatype="airport"
                defaultChecked={props.airportFilter[index].isSelected}
                onChange={event =>
                  props.checkboxChangeHandler(event, item, index)
                }
              />
              <FontAwesomeIcon icon={faHotel} className="mx-3" />
              {item.airport_name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mx-4">{props.finalFilteredData.length}</h2>
        <ol>
          {props.finalFilteredData.map((item, index) => (
            <li key={item.id}>{item.id}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    luggageFilter: state.luggageFilter,
    stoppageFilter: state.stoppageFilter,
    airlinesFilter: state.airlinesFilter,
    airportFilter: state.airportFilter,
    finalFilteredData: state.finalFilteredData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkboxChangeHandler: (event, item, index) =>
      dispatch({
        type: actionsType.CHKB_CLICKED,
        event: event,
        item: item,
        index: index
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
