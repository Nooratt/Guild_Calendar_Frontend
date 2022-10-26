import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import swal from 'sweetalert';



const Home = () => {

  const [error, setError] = React.useState(false);
  const [response, setResponse] = React.useState([]);

 
  async function fetchData() {
    try {
      const guilds = ['AK', 'AS', 'Athene', 'IK', 'Inkubio', 'KIK', 'MK', 'PJK', 'PT', 'TIK', 'TF', 'VK', 'Prodeko', 'FK'];
      await Promise.all([
       (
         await fetch("/events", {
          method: 'POST',
          body: JSON.stringify({
            guildNames: guilds,
            startDateTimeFrame : new Date(),
            endDateTimeFrame : getNext4MonthsEvents()
          }),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        }).then((res) => res.json())
        .then((data) => {
          var dataString = JSON.stringify(data.response);
          var result = JSON.parse(dataString);    
          setResponse(result);
        }))
     ]);
   } catch (error) {
     console.log(error);
     setError(true);
   }
 }
 
 React.useEffect(() => {
   fetchData();
 }, []);

 function getNext4MonthsEvents(){
  var date = new Date();
  date.setMonth(date.getMonth() + 4);
  return date.toISOString();
}

 if(error) {
  return (
  <h1> Oops.. something went wrong! </h1>
  )
}

return (  
  
  <div className='container'>
    {response.length > 0 && response.map((list) =>  (
      
     <FullCalendar     
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentTimezonePlugin]}
        initialView="timeGridDay"
        contentHeight={"auto"}
        validRange={{
        start: new Date(),
        end: getNext4MonthsEvents()
        }}
        eventTimeFormat={{hour:'2-digit', minute: '2-digit', hour12: false}}
        //headerToolbar={false}
        //dayHeaders={false}
        dayHeaderContent={Object.keys(list)[0]}
        dayHeaderClassNames={"guild-name " + Object.keys(list)[0] }
        slotMinTime={"08:00:00"}
        slotMaxTime={"24:00:00"}
        key={Object.keys(list)[0]}
        events={Object.values(list)[0]}
        //eventColor="#CF9FFF"
        eventColor={list.color}
        nowIndicator
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
    
    ))}
    </div>      
  );



};

export default Home;