//this calls the function processSearch upon window load
window.onload = processSearch;
//this is a global variable
var searchNumber = 0;

//this is function processSearch
function processSearch() {
    //this calls the function storageSearch upon click of the magnifying glass or when pressing the enter key after entering something into the search field
    var searchButton = document.getElementById("magnifying-glass");
    searchButton.onclick = storageSearch;
    //this makes the section that shows the number of searches and most recent search hidden
    document.getElementById("resultsSection").style.visibility = "hidden";
    
}

//this is the function storageSearch
function storageSearch() {
    //this saves the value entered into the search bar to local storage
    var search = document.getElementById("bar");
    localStorage.recentSearch = search.value;
    //this changes the innerHTML of the most recent search to what is in local storage for recentSearch
    var searchInfo = document.getElementById("browserRecentSearch");
    searchInfo.innerHTML = localStorage.recentSearch;
    //this line makes it so the number of searches increases by one each time the magnifying glass is clicked
    searchNumber = searchNumber +1;
    //this stores the new number to local storage
    localStorage.totalSearches = searchNumber;
    //this changes the inner HTML of the totalSearch to what is in local storage
    document.getElementById("browserSearchNumber").innerHTML = localStorage.totalSearches;
    //this makes the section that shows the number of searches and most recent search visible
    document.getElementById("resultsSection").style.visibility = "visible";
}