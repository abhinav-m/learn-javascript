
main(-2,5);


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function populateWorld(numOfEvents) {
  const max = 10;
  const min = -10;
  var events = [],usedCoords = [];
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

function calcManhattanDistance(x1,x2,y1,y2) {
  return Math.abs(x1-x2) + Math.abs(y1-y2);
}


function getSortedDistances(x,y,events) {
let distances=[];
events.forEach( e => distances.push( { eventNum:e.eventNum,
                                       coords:[e.x,e.y],
                                       distance:calcManhattanDistance(x,e.x,y,e.y),
                                       minTicket: e.tickets.length === 0 ? 0:Math.min(...e.tickets)
                                     })
                                   );

distances.sort( (a,b) => a.distance - b.distance );
return distances;

}


function main(x,y) {
let events = populateWorld(20);

let distances = getSortedDistances(x,y,events);
console.log('5 closes events are:');

for(let i = 0;i<5;i++) {
console.log("Event:"+ distances[i].eventNum+' Coordinates: ['+distances[i].coords[0]+','+distances[i].coords[1]+'] Cheapest ticket:'+distances[i].minTicket);
}

}
