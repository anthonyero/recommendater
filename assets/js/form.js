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
var tailWindResultsElement = document.querySelector(".tailwind-results");
var locationImageElement = document.querySelector(".locationImage");
var restaurantNameElement = document.querySelector(".restaurantName");
var menuElement = document.querySelector(".menu")
var openStatusElement = document.querySelector(".open-status");
var averageRatingElement = document.querySelector(".average-rating");
var priceTagElement = document.querySelector(".price-tag");
var cuisineTagsElement = document.querySelector(".cuisine-tags")

var randomIndex = 0;

var userCriteria = {
  categories: [],
  price: []
}

var filteredResults = [];

var returnedJSONObject;

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



async function retrieveTravelAdvisorAPI () {
  var randomPage = Math.floor(Math.random() * 30) // The API indicates it has 298 pages of data for Chicago but I was getting restaurants with terrible ratings. Lowering to 30 t
  const requestURL = 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=35805&page=' + randomPage;
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '93e394b762msh5ff717525639df9p1be66djsn66e4b499732d',
		'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
	}
  };
  //UNCOMMENT FOR TESTING AND FOR DEPLOYMENT

  await fetch(requestURL, options) 
    .then(function (response) {
      return response.json();
    })
    .then (function (data){
      console.log(data)
      returnedJSONObject = data;
      // filterResults(data); // Uncomment out and relink to filterResults() once functional
      renderResult(returnedJSONObject)
    }) 
    
}

function filterResults(returnedObject) {
  filteredResults = [];
  // Define criteria and append objects from returnedObject that satisfy our filtered criteria
  // if filteredResults develops an an array with 0 results, call retrieveTravelAdivsorAPI again
 
  // if filteredResults.length > 0
    // Call renderResult() function
}

function renderResult(returnedObject) {
  /* For use with functioning filterResult function
  randomIndex = Math.floor(Math.random() * filteredResults.length);
  document.querySelector(".content").textContent = filteredResults[randomIndex]["name"];
  */

  randomIndex = Math.floor(Math.random() * returnedObject["data"]["data"].length);
  console.log(randomIndex);
  restaurantNameElement.textContent = returnedObject["data"]["data"][randomIndex]["name"];
  if (returnedObject["data"]["data"][randomIndex]["squareImgUrl"] != null) {
    locationImageElement.setAttribute("src", returnedObject["data"]["data"][randomIndex]["squareImgUrl"]);
  }

  if (returnedObject["data"]["data"][randomIndex]["hasMenu"]){
    menuElement.innerHTML = "Online Menu";
    menuElement.setAttribute("href", returnedObject["data"]["data"][randomIndex]["menuUrl"]);
  } else {
    menuElement.innerHTML = "No online menu provided";
    menuElement.setAttribute("href", "")
  }

  openStatusElement.textContent = "Open Status: " + returnedObject["data"]["data"][randomIndex]["currentOpenStatusCategory"];
  averageRatingElement.textContent = "Average Rating: " + returnedObject["data"]["data"][randomIndex]["averageRating"] + " (" + returnedObject["data"]["data"][randomIndex]["userReviewCount"] + " reviews)";
  
  if (returnedObject["data"]["data"][randomIndex]["priceTag"]) {
    priceTagElement.textContent = "Price Tag: " + returnedObject["data"]["data"][randomIndex]["priceTag"];
  } else {
    priceTagElement.textContent = "No price information was located"
  }
  
  if (returnedObject["data"]["data"][randomIndex]["establishmentTypeAndCuisineTags"] = []) {
    cuisineTagsElement.textContent = "No cuisine tags were located"
  } else {
    cuisineTagsElement.textContent = "Cuisine Tags: " + returnedObject["data"]["data"][randomIndex]["establishmentTypeAndCuisineTags"].join(" | ");;
  }
 
  // Start adding new elements adding text content modifiers to reflect the randomly selected option

  if (resultsElement.hasAttribute("style", ".hidden")) {
    resultsElement.removeAttribute("style", ".hidden");
  }

}

