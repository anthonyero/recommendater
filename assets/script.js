submitBtn = document.querySelector(".submit-button");

locationInput = document.getElementById("location");
termInput = document.getElementById("term");
artmuseumInput = document.getElementById("artmuseum");
movietheatersInput = document.getElementById("movietheaters");
price1Input = document.getElementById("price1");
price2Input = document.getElementById("price2");
price3Input = document.getElementById("price3");
price4Input = document.getElementById("price4");




// Yelp Fusion API options
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer gURzSb_9lyXhmQBVYtv-Njps7SHI1MkUcEy47hSvOYIpeJciX4QKno-UuHEBMo3BLTCbLGU46HFPCMrGQ5q2TbKmgkGFr6wcAGPZ1TKDQ_uwiN9vTAJtjoU6WEe4ZXYx'
    }
  };

submitBtn.addEventListener("click", formRetrieval);

// User Criteria Retrieval and url request string formation
function formRetrieval () {
  event.preventDefault();
    // RequestURL template 'https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20'

    const userCriteria = [];

    // Pull values from form 
        // location
        if (locationInput.value != "") {
          var location = "location=" + locationInput.value;
          userCriteria.push(location);
        }
        // term
        if (termInput.value != ""){
          var termInputString = termInput.value;
          if (termInputString.includes(" ")) {
            termInputString = termInputString.replaceAll(" ", "%20")
          }
          termInputString = "term=" + termInputString;
          userCriteria.push(termInputString);
        }
        // radius
        // categories
        if (artmuseumInput.checked) {
          userCriteria.push(artmuseumInput.value);
        }
        if (movietheatersInput.checked) {
          userCriteria.push(artmuseumInput.value);
        }

        if (movietheatersInput.checked) {
          userCriteria.push(artmusmInput.value);
        }




        // price

        price1Input

        if (price1Input.checked) {
          userCriteria.push(price1Input.value);
        }
        if (price2Input.checked) {
          userCriteria.push(price2Input.value);
        }

        if (price3Input.checked) {
          userCriteria.push(price3Input.value);
        }

        if (price4Input.checked) {
          userCriteria.push(price4Input.value);
        }
        
        /*
        for (var i = 1; i < 5; i++) {
          if (price + i  Input)
        }
       */
      
      console.log(userCriteria)
      
      queryStringConstructor(userCriteria)

}

function queryStringConstructor (array) {
  // Attach values into a query string
  var queryString = array.join("&");
  console.log(queryString);

  retrieveYelpAPI(queryString);
  
}


function retrieveYelpAPI (string) {
  // Insert query string into request URL

  var requestURL = "https://api.yelp.com/v3/businesses/search?" + string + "&sort_by=best_match&limit=20";

  fetch(requestURL, options) 
    .then(function (response) {
      return response.json();
    })
    .then (function (data){
      console.log(data)
    }) 


    // Returned object
        // Formatting returnedObject["businesses"][index]["name"]



}

//fetch('https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20', options)

fetch('https://api.yelp.com/v3/businesses/search?term=Art%20museums&sort_by=best_match&limit=20', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));