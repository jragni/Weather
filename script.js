



// wait for document to be loaded to run jQuery
$(document).ready(function()
    {
        // on startup,
            // get the user's geolocation
            // use latitude and longitude to make ajax call for their area
            // create divs from the data and append to area

        // on-lick of button
            //get value of search bar
            // append search bar value to list below the search bar
            // create div for ^ 
            // update the forecast view, create appropriate divs
        
        // save all this stuff to local storage.
    });

function updateForecast(event)
    {
        event.preventDefault();
        var city= $("#searchBar").val();
        var api = 'c90685aae6e4aa37f3e7a8f1e73df2e2';
        var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+api;
        $.ajax(
            {
                method:"get",
                url:queryURL
            }).done(function(data)
                {
                    console.log(data);
                    var temperature= data.main.temp;
                    var cityName = data.name;
                    alert(temperature);
                });

    };