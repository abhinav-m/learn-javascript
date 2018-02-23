
main();

//Function to compute value within a random range.
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Populating world with events
function populateWorld(numOfEvents) {
  //Maximum and minimum x and y coordinates.
  const max = 10;
  const min = -10;
  //Array to hold event objects.
  var events = [],
  usedCoords = [];
  //Tickets values.
  let x,y,numTickets,tickets,ticketPrice;

  for(let i = 0; i < numOfEvents; i++) {
    x = getRandomIntInclusive(min,max);
    y = getRandomIntInclusive(min,max);

    //Make sure two events aren't in the same spot.
    while(usedCoords.includes(x+','+y)) {
        x = getRandomIntInclusive(min,max);
        y = getRandomIntInclusive(min,max);
      }

     usedCoords.push(x+','+y);

     //Generate random ticket data.
     tickets = [];
     numTickets = getRandomIntInclusive(0,5);
     for(let j = 0; j< numTickets ;j++) {
     ticketPrice = getRandomIntInclusive(5,40);
     tickets.push(ticketPrice)
     }

     //Add data to events array.
     events[i] = {
       'eventNum':i+1,
       'x':x,
       'y':y,
       'tickets':tickets
     };


  }

//Return events array.
return events;
}

//Helper function to calculate manhattan distance.
function calcManhattanDistance(x1,x2,y1,y2) {
  return Math.abs(x1-x2) + Math.abs(y1-y2);
}


//Helper function which calculates distances according to user input, and sorts the events
function getNearestEvents(x,y,events) {
let distances=[];
//Calculate manhattan distance for each event, also get the minimum ticket IF tickets are available(since tickets can be 0)
events.forEach( e => distances.push( { eventNum:e.eventNum,
                                       coords:[e.x,e.y],
                                       distance:calcManhattanDistance(x,e.x,y,e.y),
                                       minTicket: e.tickets.length === 0 ? 'Tickets unavailable': Math.min(...e.tickets) +'$'
                                     })
                                   );
//Sort distances and return.
distances.sort( (a,b) => a.distance - b.distance );
return distances;

}


function main() {
  //Populate world with 20 events.
let events = populateWorld(20);

  let distances = getNearestEvents(4,3,events);
  console.log('5 closes events are:');

  for(let i = 0;i<5;i++) {
  console.log("Event:"+ distances[i].eventNum+' Distance: '+distances[i].distance+' Coordinates: ['+distances[i].coords[0]+','+distances[i].coords[1]+'] Cheapest ticket:'+distances[i].minTicket);
  }


}
