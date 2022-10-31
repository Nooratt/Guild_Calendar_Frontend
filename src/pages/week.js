import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import '../components/Navbar/NavStyles.css';
import swal from 'sweetalert';

const Week = () => {

  const [error, setError] = React.useState(false);
  const [response, setResponse] = React.useState([]);
  const guilds = ['AK', 'AS', 'Athene', 'IK', 'Inkubio', 'KIK', 'MK', 'PJK', 'PT', 'TIK', 'TF', 'VK', 'Prodeko', 'FK'];
  const [filtered, setFiltered] = React.useState([]);
  const [checkedState, setCheckedState] = React.useState(new Array(guilds.length).fill(true));

  const guildQuery = guilds.map(g => `guildNames=${g}`).join('&');
  const startDateTimeQuery = `startDateTimeFrame=${get10DaysFromNowEvents()}`;
  const endDateTimeQuery = `endDateTimeFrame=${getNext4MonthsEvents()}`;
  async function fetchData(guilds) {
    try {
      await Promise.all([
        (
          await fetch(`https://apim-whatsthehaps.azure-api.net/v1/events?${guildQuery}&${startDateTimeQuery}&${endDateTimeQuery}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
          }).then((res) => res.json())
            .then((data) => {
              var dataString = JSON.stringify(data.response);
              var result = JSON.parse(dataString);
              var array = [];
              for (let i of result) {
                array = array.concat(Object.values(i)[0]);
              }
              setResponse(array);
              setFiltered(array);
            }))
      ]);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  React.useEffect(() => {
    fetchData(guilds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getNext4MonthsEvents() {
    var date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setMonth(date.getMonth() + 4);
    return date.toISOString();
  }

  function get10DaysFromNowEvents() {
    var date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setDate(date.getDate() - 10);
    return date.toISOString();
  }

  function setToMonday(date) {
    var day = date.getDay() || 7;
    if (day !== 1)
      date.setHours(-24 * (day - 1));
    return date;
  }

  if (error) {
    return (
      <h1> Oops.. something went wrong! </h1>
    )
  }

  const handleChange = (position, name) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    if (checkedState[position] === true) {
      const filteredEvents = filtered.filter(value => value.guild !== name);
      setFiltered(filteredEvents);
    } else {
      const toBeAppliedEvents = response.filter(x => x.guild === name);
      const applied = [...filtered, ...toBeAppliedEvents];
      setFiltered(applied);
    }
  };

  return (

    <div className='container2'>
      <div>
        <ul className="sorting-list">
          {guilds.map((name, index) => {
            return (
              <li key={index}>
                <div className="sorting-list-item">
                  <div>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      checked={checkedState[index]}
                      onChange={() => handleChange(index, name)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <FullCalendar
        customButtons={{
          filterDropdown: {
            text: 'Filter',
            click: function(){
              alert('clicked the custom button!');
            }
        }
        }}
        headerToolbar={{start: 'title',end:'filterDropdown today prev,next'}}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentTimezonePlugin]}
        initialView="timeGridWeek"
        slotMinTime={"08:00:00"}
        slotMaxTime={"24:00:00"}
        eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
        eventMinHeight='50'
        firstDay={1}
        weekNumbers={true}
        weekText={"Week"}
        dayHeaderFormat={{ weekday: 'short', day: 'numeric', month: 'numeric' }}
        validRange={{
          start: setToMonday(new Date()),
          end: setToMonday(new Date(getNext4MonthsEvents())).toISOString()
        }}
        eventOverlap={false}
        //headerToolbar={false}
        //dayHeaders={false}
      
        dayHeaderClassNames={"weekDay"}
        events={filtered}
        eventDisplay={"block"}

        nowIndicator={true}
        eventClick={(e) => {
          swal({
            title: e.event.title,
            text: "Starting from: " + e.event.start +
            "\n Description: " + e.event.extendedProps.description +
            "\n Location: " + e.event.extendedProps.location +
            "\n Organizer: " + e.event.extendedProps.guild
          })               
        }}
        timeZone="Europe/Helsinki"
      />

    </div>
  );



};


export default Week;