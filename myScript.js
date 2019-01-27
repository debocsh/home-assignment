var savedSearches = [];

var typewatch = function(){

	var timer = 0;
    return function(callback, ms){
        console.log(callback);
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
}();

executeQuery = (search = document.getElementById("userQuery").value) => {
	
	console.log("executeQuery timer");
    console.log(search)
	clearElements();
	
	var Http = new XMLHttpRequest();
	Http.responseType = "json";
	const url =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1";

	Http.open("GET", url + "&format=json&tags=" + search);
	Http.send();
	
	Http.onreadystatechange = () => {
    // readyState = response is ready and status = OK
    if (Http.readyState == 4 && Http.status == 200) {
      num_of_photos = Http.response.photos.total;
      if (num_of_photos == 0) {
        document.getElementById("none").innerHTML =
          "No images found for this search";
        return;
      }

      const length = Http.response.photos.photo.length;
      var div = document.getElementById("pictures");

      for (var i = 0; i < length; i++) {
        current_picture = Http.response.photos.photo[i];
        var img = createImage(current_picture);
        document.getElementById("pictures").appendChild(img);
      }
    }
  };
};

const createImage = current_picture => {
  var img = new Image();
  img.src =
    "https://farm" +
    current_picture.farm +
    ".staticflickr.com/" +
    current_picture.server +
    "/" +
    current_picture.id +
    "_" +
    current_picture.secret +
    ".jpg";
  return img;
};

const clearElements = () => {
  document.getElementById("pictures").innerHTML = "";
  document.getElementById("none").innerHTML = "";
};


const saveUserSearch = () => {
  
  var search = document.getElementById("userQuery").value;
  const storedValue = JSON.parse(window.localStorage.getItem("userSearch"));
  
  if (storedValue == null) {
	window.localStorage.setItem("userSearch", JSON.stringify([search]));
  } 
  
  else {
    storedValue.push(search);
    window.localStorage.setItem("userSearch", JSON.stringify(storedValue));
	}

	displayUserSearch(search);
};

const displayUserSearch = search =>
{

    var checkboxSearch = document.createElement("input");
    var labelSearch = document.createElement("label");
    var labelText = document.createTextNode(search);
    var selectButton = document.createElement("button");
    var textButton = document.createTextNode("Merge searches");

    checkboxSearch.setAttribute("type", "checkbox");
    checkboxSearch.setAttribute("name",search);
    checkboxSearch.setAttribute("id", search);
  
    labelSearch.appendChild(checkboxSearch);
    labelSearch.appendChild(labelText);
   
    selectButton.appendChild(textButton);
    savedSearches.push(search); 
    
    document.getElementById("text").innerHTML = "<ins>" + "Recently searched: " + "</ins>";
    document.getElementById("checkboxes").appendChild(labelSearch);
    document.getElementById("searchButton").style.visibility = "visible";
	
    console.log(savedSearches)
}; 

const mergeSearches = () => {
    
    var newQuery = ""
    savedSearches.forEach(function(element)
    {
        currentCheckbox = document.getElementById(element);
        if (currentCheckbox.checked) {
            newQuery += element + ",";
        }
        
    });
    newQuery = newQuery.slice(",", -1);
    console.log(newQuery);
    executeQuery(newQuery);
}
