var submitBtn = document.querySelector(".submit-button");

var americanInput = document.getElementById("American");
var chineseInput = document.getElementById("Chinese");
var mexicanInput = document.getElementById("Mexican");
var italianInput = document.getElementById("Italian");
var mediterraneanInput = document.getElementById("Mediterranean")
var price1Input = document.getElementById("price1");
var price2Input = document.getElementById("price2");
var price3Input = document.getElementById("price3");
var price4Input = document.getElementById("price4");
var resultsElement = document.querySelector(".results");

var randomIndex = 0;

var userCriteria = {
  categories: [],
  price: []
}

var filteredResults = [];

submitBtn.addEventListener("click", formRetrieval);

// User Criteria Retrieval and url request string formation
function formRetrieval () {
  event.preventDefault();

    // Pull values from form 
        // categories (TO DO UPDATE)
        if (americanInput.checked) {
          userCriteria["categories"].push(americanInput.value);
        }
        if (chineseInput.checked) {
          userCriteria["categories"].push(chineseInput.value);
        }
        if (mexicanInput.checked) {
          userCriteria["categories"].push(mexicanInput.value);
        }
        if (italianInput.checked) {
          userCriteria["categories"].push(italianInput.value);
        }
        if (mediterraneanInput.checked) {
          userCriteria["categories"].push(mediterraneanInput.value);
        }

        // price (TO DO UPDATE VALUES IN HTML)

        if (price1Input.checked) {
          userCriteria["price"].push(price1Input.value);
        }
        if (price2Input.checked) {
          userCriteria["price"].push(price2Input.value);
        }

        if (price3Input.checked) {
          userCriteria["price"].push(price3Input.value);
        }

        if (price4Input.checked) {
          userCriteria["price"].push(price4Input.value);
        }
      
      console.log(userCriteria)
      
      retrieveTravelAdvisorAPI()
}



function retrieveTravelAdvisorAPI () {
  var randomPage = Math.floor(Math.random() * 298) // The API indicates it has 298 pages of data for Chicago
  const requestURL = 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=35805&page=' + randomPage;
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '93e394b762msh5ff717525639df9p1be66djsn66e4b499732d',
		'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
	}
  };
  /* UNCOMMENT FOR TESTING AND FOR DEPLOYMENT
  fetch(requestURL, options) 
    .then(function (response) {
      return response.json();
    })
    .then (function (data){
      console.log(data)
      filterResults(data);
    }) */
}

function filterResults(returnedObject) {
  filteredResults = [];
  // Define criteria and append objects from returnedObject that satisfy our filtered criteria
  // if filteredResults develops an an array with 0 results, call retrieveTravelAdivsorAPI again
 
  // if filteredResults.length > 0
    // Call renderResult() function
}

function renderResult(returnedObject) {
  randomIndex = Math.floor(Math.random() * filteredResults.length);
  document.querySelector(".content").textContent = filteredResults[randomIndex]["name"];
 
  // Start adding new elements adding text content modifiers to reflect the randomly selected option

  if (resultsElement.hasAttribute("style", ".hidden")) {
    resultsElement.removeAttribute("style", ".hidden");
  }

 
}


//Defining variables for search input and button
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
//Adding event listener to the search button
searchBtn.addEventListener("click",() => {
  map.entities.clear();
  geocodeQuery(searchInput.value);
});
//Initializing the map when the Bing Maps API script has loaded
function GetMap(){
    var map = new Microsoft.Maps.Map(document.getElementById('map'), {
        credentials: 'AjQ8v1fLaRDzfwJA4pse-nM0Aps6r1IOWRWI9xTHKoFMAct7GaMo-3xaZxsxJoaZ',
        center: new Microsoft.Maps.Location(41.8781, -87.6298),
        zoom: 12
    });
}
//ensures maps API has loaded before calling GetMap
if(typeof Microsoft !== 'undefined')
    Microsoft.Maps.loadModule('Microsoft.Maps.Map', {
        callback: GetMap
});
//handles the search
function geocodeQuery(query){
    Microsoft.Maps.loadModule('Microsoft.Maps.Search',function (){
        var searchManager = new Microsoft.Maps.Search.SearchManager();
        var searchRequest = {
            where: query,
            callback: function (results, userData) {
            //process results
            if(results && results.length > 0) {
                var location = results[0].location;
                map.setView({ center: location, zoom: 12});
            } else{
                alert('Location not found.');
            }
        }
    }
            searchManager.geocode(searchRequest);
        });
    }

