# home-assignment

Implement an Image Gallery from Scratch:

Frameworks used: HTML, CSS, JavaScript

Run: Launch the html file into a browser of your choice

The files:
GalleryPage.html : content of the web page. When launched for the first time, 
there's only a title, a box for entering the search and a button for saving this 
search. 
We'll append the results of the search (images) to this file in order to display it.

style.css: 
The style of the elements present in the Html page e.g the size of the images to 
display, the alignement of the elements and so on 

myScript.js: the behaviour of the Html actions
typewatch function: set a timer when a the user types and call executeQuery to 
start the search for the user's input after 500ms

executeQuery: by default, the argument is the content of the input box. It creates a
new Http request with the given url and the query input and get a response as a json 
file. If there's matching images for this input, we'll display all the images of the 
first page from the json file.

createImage: create a new image element when the source is a url composed by different
fields in the each photo object in the json file and is part of the FlickrAPI

clearElements: clear past images and text when searching for a new input

saveUserSearch: function called when the button "Save my search" is clicked. We 
update the localStorage item and add the user's input as new value into the array

displayUserSearch: display every search saved by the user as labeled checkboxes
It also displays a button "Merge all search" in order to search for many past
searches a new one

mergeSearches: when the button "Merge all search" is clicked, create a new query 
composed by all the checked checkboxes are concatened as a new query and is comma 
separated (FlickrAPI tags requirements)
