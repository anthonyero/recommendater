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

        // price

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
    }) */
}







function renderResult(returnedObject) {
  document.querySelector(".content").textContent = returnedObject["businesses"][randomIndex]["name"];

  if (resultsElement.hasAttribute("style", ".hidden")) {
    resultsElement.removeAttribute("style", ".hidden");
  }

}

/*


try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
*/
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

