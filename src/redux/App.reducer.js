import * as actionTypes from "./actionConstants";
import wingieFilterJson from "../wingieFilter";
import airportFilter from "../airportFilter";
import airlinesFilter from "../airlinesFilter";
import luggageFilter from "../luggageFilter";
import stoppageFilter from "../stoppageFilter";

let arrayData = [];
for (let details in wingieFilterJson) {
  arrayData.push(wingieFilterJson[details]);
}

const initialState = {
  luggageFilter: luggageFilter,
  stoppageFilter: stoppageFilter,
  airlinesFilter: airlinesFilter,
  airportFilter: airportFilter,
  finalFilteredData: arrayData
};
const filterByLuggage = (mainArr, state) => {
  let activeObject = state.luggageFilter.filter(
    item => item.isSelected === true
  );

  if (activeObject.length > 0) {
    let tmpArray = [];
    activeObject.map(currentobj => {
      for (let details of mainArr) {
        if (
          details.infos.baggage_info.first_baggage_collection[0].allowance ===
          currentobj.value
        ) {
          tmpArray.push(details);
        }
      }
      return currentobj;
    });
    return tmpArray;
  } else {
    return mainArr;
  }
};

const filterByStoppage = (mainArr, state) => {
  let activeObject = state.stoppageFilter.filter(
    item => item.isSelected === true
  );
  if (activeObject.length > 0) {
    let tmpArray = [];
    activeObject.map(currentobj => {
      for (let details of mainArr) {
        if (details.segments.length === currentobj.value + 1) {
          tmpArray.push(details);
        }
      }
      return currentobj;
    });
    return tmpArray;
  } else {
    return mainArr;
  }
};

const filterByAirline = (mainArr, state) => {
  let activeObject = state.airlinesFilter.filter(
    item => item.isSelected === true
  );
  if (activeObject.length > 0) {
    let tmpArray = [];
    activeObject.map(currentobj => {
      for (let details of mainArr) {
        details.segments.forEach(airline => {
          if (airline["operating_airline"] === currentobj.code) {
            tmpArray.push(details);
          }
        });
      }
      return currentobj;
    });
    return tmpArray;
  } else {
    return mainArr;
  }
};
const filterByAirport = (mainArr, state) => {
  let activeObject = state.airportFilter.filter(
    item => item.isSelected === true
  );
  if (activeObject.length > 0) {
    let tmpArray = [];
    activeObject.map(currentobj => {
      for (let details of mainArr) {
        details.segments.forEach(airport => {
          if (
            airport["origin"] === currentobj.airport_code ||
            airport["destination"] === currentobj.airport_code
          ) {
            tmpArray.push(details);
          }
        });
      }
      return currentobj;
    });
    return tmpArray;
  } else {
    return mainArr;
  }
};

const getFilteredFlights = state => {
  const luggageFilteredArray = filterByLuggage(arrayData, state);

  const stoppageFilteredArray = filterByStoppage(luggageFilteredArray, state);

  const airlineFilteredArray = filterByAirline(stoppageFilteredArray, state);
  const airportFilteredArray = filterByAirport(airlineFilteredArray, state);

  let uniquefinalFilteredData = [...new Set(airportFilteredArray)];
  //   console.log(uniquefinalFilteredData);
  return uniquefinalFilteredData;
};

const appReducer = (state = initialState, action) => {
  if (action.type === actionTypes.CHKB_CLICKED) {
    switch (action.event.target.attributes.datatype.value) {
      case "luggage":
        let weight = action.item.value;
        let updatedLuggageState = state.luggageFilter.slice();
        updatedLuggageState.forEach(luggageState => {
          if (luggageState.value === weight) {
            luggageState.isSelected = !luggageState.isSelected;
          }
        });

        return {
          ...state,
          luggageFilter: updatedLuggageState,
          finalFilteredData: getFilteredFlights(state)
        };

      case "stoppage":
        let stoppage = action.item.value;
        let updatedStoppageState = state.stoppageFilter.slice();
        updatedStoppageState.forEach(stoppageState => {
          if (stoppageState.value === stoppage) {
            stoppageState.isSelected = !stoppageState.isSelected;
          }
        });

        return {
          ...state,
          stoppageFilter: updatedStoppageState,
          finalFilteredData: getFilteredFlights(state)
        };

      case "airline":
        let airlineCode = action.item.code;
        let updatedAirlineState = state.airlinesFilter.slice();
        updatedAirlineState.forEach(airlineState => {
          if (airlineState.code === airlineCode) {
            airlineState.isSelected = !airlineState.isSelected;
          }
        });

        return {
          ...state,
          airlinesFilter: updatedAirlineState,
          finalFilteredData: getFilteredFlights(state)
        };

      case "airport":
        let airportCode = action.item.airport_code;
        let updatedAirportState = state.airportFilter.slice();
        updatedAirportState.forEach(airportState => {
          if (airportState.airport_code === airportCode) {
            airportState.isSelected = !airportState.isSelected;
          }
        });

        return {
          ...state,
          airportFilter: updatedAirportState,
          finalFilteredData: getFilteredFlights(state)
        };

      default:
        return state;
    }
  } else {
    return state;
  }
};
export default appReducer;
