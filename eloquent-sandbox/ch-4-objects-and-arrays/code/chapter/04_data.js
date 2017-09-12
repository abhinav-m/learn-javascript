var journal = [];

function addEntry(events, didITurnIntoASquirrel) {
    journal.push({
        events: events,
        squirrel: didITurnIntoASquirrel
    });
}

//The table is an array with 4 elements,  thus index 0 -> 3.
//Each index's binary representation represents the coefficient therefore 0 -> 00 , 1 -> 01, 2 -> 10, 3 -> 11
//Therefore formula:
function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt((table[2] + table[3]) *
            (table[0] + table[1]) *
            (table[1] + table[3]) *
            (table[0] + table[2]));
}

//Helper function to check if the event is included in the current entry.
function hasEvent(event, entry) {
    return entry.events.includes(event);
}

//Makes the table for the current event by looping through the journal entries.
//Note: table has 4 indexes : 0 , 1 , 2 , 3 , binary: 00, 01, 10, 11 
//LSB (rightmost) represents event occurred (1 if true, 0 if false) MSB(leftmost) represents whether turned into squirrel.
function tableFor(event, journal) {
    var table = [0, 0, 0, 0];
    for (var i = 0; i < journal.length; i++) {
        var entry = journal[i];
        index = 0;
        if (hasEvent(event, entry)) index++; // if event occurs, assign index 1 (01 in binary)
        if (entry.squirrel) index += 2; //if turned to squirrel add 2 to index therefore, if already 1 -> 11 , else 01
        table[index] += 1; //Add 1 to the corresponding correct value in the journal entry.
    }

    return table;
}


function gatherCorrelations(journal) {
    var phis = {};
    for (var entry = 0; entry < journal.length; entry++) {
        var events = journal[entry].events;
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if (!(event in phis)) // Make sure the phi coefficient is calculated once per event, no need to calculate again for same event.
                phis[event] = phi(tableFor(event, journal))
        }
    }
    return phis; //Object mapped to phi coeficients as it's keys.
}

var correlations = gatherCorrelations(JOURNAL);

for (var i = 0; i < JOURNAL.length; i++) {
    var entry = JOURNAL[i];
    if (hasEvent("peanuts", entry) &&
        !hasEvent("brushed teeth", entry))
        entry.events.push("peanut teeth");
}


console.log(phi(tableFor("peanut teeth", JOURNAL)));

var list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
};