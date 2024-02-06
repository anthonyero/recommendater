var submitBtn = document.querySelector(".submit-button");
var boxes = document.querySelectorAll(".box")

/*
var americanInput = document.getElementById("American");
var chineseInput = document.getElementById("Chinese");
var mexicanInput = document.getElementById("Mexican");
var italianInput = document.getElementById("Italian");
var mediterraneanInput = document.getElementById("Mediterranean")
*/
// var restaurantCategoryInput = document.getElementsByName("restaurant").checked;
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
  price: [],
  categories: ""
}
var returnedJSONObjectData;

var filteredResults = [];

submitBtn.addEventListener("click", formRetrieval);

// User Criteria Retrieval and url request string formation
function formRetrieval () {
  event.preventDefault();

    // Pull values from form 
      /* FOR CHECKBOX
        if (americanInput.checked) {
          userCriteria["categories"] = (americanInput.value);
        }
        if (chineseInput.checked) {
          userCriteria["categories"] = (chineseInput.value);
        }
        if (mexicanInput.checked) {
          userCriteria["categories"] = (mexicanInput.value);
        }
        if (italianInput.checked) {
          userCriteria["categories"] = (italianInput.value);
        }
        if (mediterraneanInput.checked) {
          userCriteria["categories"].push(mediterraneanInput.value);
        }
        */
      
        userCriteria["categories"] = document.querySelector('input[name="restaurant"]:checked').value;
       

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
		'X-RapidAPI-Key': 'a404c68f68msh0b4f4d1ac118231p1ff281jsn93d59b2b3121',
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
      returnedJSONObjectData = data["data"]["data"];
      if (userCriteria["categories"] === "") {
        renderResult(returnedJSONObjectData);
      } else {
        // filterResults(data); // Uncomment out and relink to filterResults() once functional
        filterResults(returnedJSONObjectData);
      }
    }) 
    
}
function filterResults(returnedObject) {
  filteredResults = [];
  // We want to conclude with a list that satisfies the following condition 
    // (list of acceptable prices) & (list of categories)
  // filteredResults = returnedJSONObject["data"]["data"].filter((restaurant) => returnedJSONObject[restaurant]["priceTag"].includes(userCriteria["price"]))
  
  for (var i = 0; i < returnedObject.length; i++) {
    if (returnedObject[i]["establishmentTypeAndCuisineTags"].includes(userCriteria["categories"])) {
      filteredResults.push(returnedObject[i]);
    }
  }
  
  if (filteredResults.length == 0) {
    retrieveTravelAdvisorAPI();
  } else {
    renderResult(filteredResults);
  }

  // Define criteria and append objects from returnedObject that satisfy our filtered criteria
  // if filteredResults develops an an array with 0 results, call retrieveTravelAdvisorAPI again
 
  // if filteredResults.length > 0
    // Call renderResult() function
}

function renderResult(returnedObject) {
  /* For use with functioning filterResult function
  randomIndex = Math.floor(Math.random() * filteredResults.length);
  document.querySelector(".content").textContent = filteredResults[randomIndex]["name"];
  */

  randomIndex = Math.floor(Math.random() * returnedObject.length);
  console.log(randomIndex);
  restaurantNameElement.textContent = returnedObject[randomIndex]["name"];
  if (returnedObject[randomIndex]["squareImgUrl"] != null) {
    locationImageElement.setAttribute("src", returnedObject[randomIndex]["squareImgUrl"]);
  }

  if (returnedObject[randomIndex]["hasMenu"]){
    menuElement.innerHTML = "Online Menu";
    menuElement.setAttribute("href", returnedObject[randomIndex]["menuUrl"]);
  } else {
    menuElement.innerHTML = "No online menu provided";
    menuElement.setAttribute("href", "")
  }

  openStatusElement.textContent = "Open Status: " + returnedObject[randomIndex]["currentOpenStatusCategory"];
  averageRatingElement.textContent = "Average Rating: " + returnedObject[randomIndex]["averageRating"] + " (" + returnedObject[randomIndex]["userReviewCount"] + " reviews)";
  
  if (returnedObject[randomIndex]["priceTag"]) {
    priceTagElement.textContent = "Price Tag: " + returnedObject[randomIndex]["priceTag"];
  } else {
    priceTagElement.textContent = "No price information was located"
  }
  
  if (returnedObject[randomIndex]["establishmentTypeAndCuisineTags"] == []) {
    cuisineTagsElement.textContent = "No cuisine tags were located"
  } else {
    cuisineTagsElement.textContent = "Cuisine Tags: " + returnedObject[randomIndex]["establishmentTypeAndCuisineTags"].join(" | ");;
  }
 
  // Start adding new elements adding text content modifiers to reflect the randomly selected option
  boxes.forEach(box => {
    box.style.display = 'none';
  })

  if (tailWindResultsElement.hasAttribute("style", "display: none;")) {
    tailWindResultsElement.removeAttribute("style", "display: none; ");
  }

}

