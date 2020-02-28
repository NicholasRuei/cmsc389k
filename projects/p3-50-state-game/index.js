// This is a subset of the states.
// Use this to actually run the game
// (assume this is the full set of states.
// This will make it easier to test.
var states = ["Idaho", "South Dakota", "Hawaii", "Alaska", "Alabama", "New York"];
var count = 20
document.getElementById("check").disabled = true; 
var checkMap = []
var stateMap = { 
  "alabama": "01",
  "alaska": "02",
  "arizona": "04",
  "arkansas": "05",
  "california": "06",
  "colorado": "08",
  "connecticut": "09",
  "delaware": "10",
  "district of columbia": "11",
  "florida": "12",
  "georgia": "13",
  "hawaii": "15",
  "idaho": "16",
  "illinois": "17",
  "indiana": "18",
  "iowa": "19",
  "kansas": "20",
  "kentucky": "21",
  "louisiana": "22",
  "maine": "23",
  "maryland": "24",
  "massachusetts": "25",
  "michigan": "26",
  "minnesota": "27",
  "mississippi": "28",
  "missouri": "29",
  "montana": "30",
  "nebraska": "31",
  "nevada": "32",
  "new hampshire": "33",
  "new jersey": "34",
  "new mexico": "35",
  "new york": "36",
  "north carolina": "37",
  "north dakota": "38",
  "ohio": "39",
  "oklahoma": "40",
  "oregon": "41",
  "pennsylvania": "42",
  "rhode island": "44",
  "south carolina": "45",
  "south dakota": "46",
  "tennessee": "47",
  "texas": "48",
  "utah": "49",
  "vermont": "50",
  "virginia": "51",
  "washington": "53",
  "west virginia": "54",
  "wisconsin": "55",
  "wyoming": "56"
}

// These are all the states. It maps the state name to the number which you'll
// want to use in your API call.
var abvMap = {
    "Alabama": "01",
    "Alaska": "02",
    "Arizona": "04",
    "Arkansas": "05",
    "California": "06",
    "Colorado": "08",
    "Connecticut": "09",
    "Delaware": "10",
    "District Of Columbia": "11",
    "Florida": "12",
    "Georgia": "13",
    "Hawaii": "15",
    "Idaho": "16",
    "Illinois": "17",
    "Indiana": "18",
    "Iowa": "19",
    "Kansas": "20",
    "Kentucky": "21",
    "Louisiana": "22",
    "Maine": "23",
    "Maryland": "24",
    "Massachusetts": "25",
    "Michigan": "26",
    "Minnesota": "27",
    "Mississippi": "28",
    "Missouri": "29",
    "Montana": "30",
    "Nebraska": "31",
    "Nevada": "32",
    "New Hampshire": "33",
    "New Jersey": "34",
    "New Mexico": "35",
    "New York": "36",
    "North Carolina": "37",
    "North Dakota": "38",
    "Ohio": "39",
    "Oklahoma": "40",
    "Oregon": "41",
    "Pennsylvania": "42",
    "Rhode Island": "44",
    "South Carolina": "45",
    "South Dakota": "46",
    "Tennessee": "47",
    "Texas": "48",
    "Utah": "49",
    "Vermont": "50",
    "Virginia": "51",
    "Washington": "53",
    "West Virginia": "54",
    "Wisconsin": "55",
    "Wyoming": "56",
}






/*
 * The majority of this project is done in JavaScript.
 *
 * 1. Start the timer when the click button is hit. Also, you must worry about
 *    how it will decrement (hint: setInterval).
 * 2. Check the input text with the group of states that has not already been
 *    entered. Note that this should only work if the game is currently in
 * 3. Realize when the user has entered all of the states, and let him/her know
 *    that he/she has won (also must handle the lose scenario). The timer must
 *    be stopped as well.
 *
 * There may be other tasks that must be completed, and everyone's implementation
 * will be different. Make sure you Google! We urge you to post in Piazza if
 * you are stuck.
 */

 
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
function startTimer() {
  var x = setInterval(function() {

    document.getElementById("timer").innerHTML = "TIME LEFT:" + count + "s ";

    if (checkMap.length == Object.keys(stateMap).length) {
      document.getElementById("score").innerHTML = "Your score is: " + checkMap.length + "/" + Object.keys(stateMap).length
      document.getElementById("check").disabled = true; 
      document.getElementById("timer").innerHTML = "YOU WIN";
      clearInterval(x)
      count = 20
      checkMap = []
    }

    count -= 1

    // If the count down is finished, write some text
    if (count == 0) {
      console.log("hi")
      document.getElementById("score").innerHTML = "Your score is: " + checkMap.length + "/" + Object.keys(stateMap).length
      document.getElementById("check").disabled = true; 
      count = 20
      clearInterval(x);
      document.getElementById("timer").innerHTML = "YOU LOSE";
      checkMap = []

      Object.keys(stateMap).forEach((state) => {
        if (!(checkMap.includes(state.toLowerCase()))) {
          $(missed_list).append("<br>" + toTitleCase(state))
        }
      })
    }
  }, 1000);
}
  


