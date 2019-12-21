

// if searchObj is not null

var searchList = [];
var searchObj = {searchList}
if(JSON.parse(localStorage.getItem("city"))!= null)
    {
        searchObj = JSON.parse(localStorage.getItem("city"));
        searchList = searchObj.searchList;
        searchList = removeEmptyString(searchList);
        searchList = removeDoubles(searchList);
    }
// wait for document to be loaded to run jQuery
$(document).ready(function(){

    $("#undefined").remove()
    //--------------- on startup--------------------
         
    navigator.geolocation.getCurrentPosition(function(position){
        var currentLatitude = position.coords.latitude;
        var currentLongitude = position.coords.longitude;
        currentLocationForecast(currentLatitude,currentLongitude);
    });
    //---------------End on startup-----------------
    
    //------------- on-lick Search button-------------
    $("#searchButton").on("click",function (event){   
        event.preventDefault();
        $("#undefined").remove()
        let city = $("#searchBar").val().trim();
        console.log(city);
        
        if(city !== null || city !== undefined ){
        $("#startList").empty();
        searchList.push(city);
               
                //////////// add city to list, 
                searchList.push(city);
                searchList = removeEmptyString(searchList)
                searchList = removeDoubles(searchList);
                localStorage.setItem( 'city',JSON.stringify(searchObj))
                for(let i=searchList.length;  i>= 0;i--){
                    console.log(searchList[i])
                    if(searchList[i] !== "" && searchList[i]!== undefined){
                        $("<div class='cityList' id='"+ searchList[i]+ "'>").html(searchList[i]).appendTo("#startList");
                    }
                }
                var api = 'c90685aae6e4aa37f3e7a8f1e73df2e2';
                var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&APPID='+api;
                $.ajax({
                    method:"get",
                    url:queryURL})
                    .done(function(data){
                        var temperature= data.list[0].main.temp;
                        temperature = Math.ceil(((temperature-273.15) * 9 / 5 ) + 32);
                        var Humidity = data.list[0].main.humidity; 
                        var windSpeed = data.list[0].wind.speed;
                        var cityName = data.city.name;
                        var iconWeather = data.list[0].weather[0].icon 
                        var imgURL = 'https://openweathermap.org/img/wn/'+ iconWeather +'.png'
                        var rawDate = data.list[0].dt_txt;
                        var formattedDate = dateFormatter(rawDate)
                        // City Title
                        var obj = $("#cityTitle").html(cityName + " ("+ formattedDate + ")" );
                        $('<div>').html("<img height='45px' width='45px' src="+ imgURL+'>').appendTo(obj);
                        // Temperature
                        $("#mainTemp").html( "Temperature: " + temperature + String.fromCharCode(176)+'F')        
                        // Humidity 
                        $("#mainHumidity").html("Humidity: " + Humidity + '%');
                        // Wind Speed
                        $("#mainWS").html("Wind Speed: " + windSpeed + 'meter/sec')
            
                        // remove previous
                        $("#fiveDayForecast").empty();
                        // Make the next 5 day forecast
                        for(var i = 1; i < 40; i+=8){
                            var temperature= data.list[i].main.temp;
                            temperature = Math.ceil(((temperature-273.15) * 9 / 5 ) + 32);
                            var Humidity = data.list[i].main.humidity; 
                            var rawDate = data.list[i].dt_txt;
                            var iconWeather = data.list[i].weather[0].icon 
                            var imgURL = 'https://openweathermap.org/img/wn/'+ iconWeather +'.png'
                            var formattedDate = dateFormatter(rawDate);
                            var divObj = $("<div class='col fork'>").html("<h5>"+formattedDate+"</h5>").css({ fontFamily:"'Pacifico', cursive",
                            margin:'15px',background:'#def2f1', padding:'15px', border:':#2b7a78 solid .5px;'}).appendTo("#fiveDayForecast");
                            $("<div>").html("<img height='45px' width='45px' src="+ imgURL+'>').appendTo(divObj);
                            $("<div>").html( "Temperature: " + temperature + String.fromCharCode(176)+'F').appendTo(divObj);
                            $("<div>").html("Humidity: " + Humidity + '%').appendTo(divObj);               
                        }

                    });      
                    var queryURL = 'https://api.openweathermap.org/data/2.5/uvi?q='+city +'&APPID='+api;
                    $.ajax({
                            method:"get",   
                        url:queryURL}).done(function(data){
                            
                                var uvIndex = data.value;
                                $("#uvIndex").html("UV Index: " + uvIndex);            
                            });
        }    
    });
//--------------End ON-CLICK Search-------------------- 
        
//------- on cityfrom list click --------------
    $("#startList").on("click",function(event){
        $("#undefined").remove()

        event.preventDefault();
    
        let city= event.target.id
        var flag = false; 
        // check if click on city 
        for(let i = 0; i< searchList.length; i++){
            if(city == searchList[i]){
                var flag = true;}
        } 

        if( flag == true){
            var api = 'c90685aae6e4aa37f3e7a8f1e73df2e2';
                var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&APPID='+api;
                $.ajax(
                    {
                    method:"get",
                    url:queryURL}).done(function(data)
                        {
                            var temperature= data.list[0].main.temp;
                            temperature = Math.ceil(((temperature-273.15) * 9 / 5 ) + 32);
                            var Humidity = data.list[0].main.humidity; 
                            var windSpeed = data.list[0].wind.speed;
                            var cityName = data.city.name;
                            var iconWeather = data.list[0].weather[0].icon 
                            var imgURL = 'https://openweathermap.org/img/wn/'+ iconWeather +'.png'
                            var rawDate = data.list[0].dt_txt;
                            var formattedDate = dateFormatter(rawDate)
                            // City Title
                            var obj = $("#cityTitle").html(cityName + " ("+ formattedDate + ")" );
                            $('<div>').html("<img height='45px' width='45px' src="+ imgURL+'>').appendTo(obj);
                            // Temperature
                            $("#mainTemp").html( "Temperature: " + temperature + String.fromCharCode(176)+'F')
            
                            // Humidity 
                            $("#mainHumidity").html("Humidity: " + Humidity + '%');
                            // Wind Speed
                            $("#mainWS").html("Wind Speed: " + windSpeed + 'meter/sec')
            
                        // remove previous
                            $("#fiveDayForecast").empty();
                            // Make the next 5 day forecast
                            for(var i = 1; i < 40; i+=8){
                                    var temperature= data.list[i].main.temp;
                                    temperature = Math.ceil(((temperature-273.15) * 9 / 5 ) + 32);
                                    var Humidity = data.list[i].main.humidity; 
                                    var rawDate = data.list[i].dt_txt;
                                    var iconWeather = data.list[i].weather[0].icon 
                                    var imgURL = 'https://openweathermap.org/img/wn/'+ iconWeather +'.png'
                                    var formattedDate = dateFormatter(rawDate);
            
                                    var divObj = $("<div class='col fork'>").html("<h5>"+formattedDate+"</h5>").css({ fontFamily:"'Pacifico', cursive",
                                    margin:'15px',background:'#def2f1', padding:'15px', border:':#2b7a78 solid .5px;'}).appendTo("#fiveDayForecast");
                                    $("<div>").html("<img height='45px' width='45px' src="+ imgURL+'>').appendTo(divObj);
                                    $("<div>").html( "Temperature: " + temperature + String.fromCharCode(176)+'F').appendTo(divObj);
                                    $("<div>").html("Humidity: " + Humidity + '%').appendTo(divObj);
                                    
                                }

                });
        }

    });
//------- End on city from list click
        
});



//--------------- Functions ----------------
function currentLocationForecast(lat,long){
    $("#undefined").remove()
   
        if(searchList != null){
            searchList = removeEmptyString(searchList);
            searchList = removeDoubles(searchList);
            for(var i=searchList.length;  i>= 0;i--){
                if( searchList[i]!== "" && searchList[i] !== undefined){
                    $("<div class='cityList' id='"+ searchList[i]+ "'>").html(searchList[i]).appendTo("#startList");
                }
            }
        }
        // Latitude
        // Longitude
        console.log(searchList);   
    var api = 'c90685aae6e4aa37f3e7a8f1e73df2e2';
    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+ '&lon='+ long+'&APPID='+api;
    $.ajax({
                method:"get",
                url:queryURL
            }).done(function(data){
                var temperature= data.list[0].main.temp;
                temperature = Math.ceil(((temperature-273.15) * 9 / 5 ) + 32);
                var Humidity = data.list[0].main.humidity; 
                var windSpeed = data.list[0].wind.speed;
                var cityName = data.city.name;
                searchList.push(cityName);
                var iconWeather = data.list[0].weather[0].icon 
                var imgURL = 'https://openweathermap.org/img/wn/'+ iconWeather +'.png'
                var rawDate = data.list[0].dt_txt;
                var formattedDate = dateFormatter(rawDate)
                // City Title
                var obj = $("#cityTitle").html(cityName + " ("+ formattedDate + ")" );
                $('<div>').html("<img height='45px' width='45px' src="+ imgURL+'>').appendTo(obj);
                // Temperature
                $("#mainTemp").html( "Temperature: " + temperature + String.fromCharCode(176)+'F')
                // Humidity 
                $("#mainHumidity").html("Humidity: " + Humidity + '%');
                // Wind Speed
                $("#mainWS").html("Wind Speed: " + windSpeed + 'meter/sec')
                // Make the next 5 day forecast
                for(var i = 1; i < 40; i+=8){
                    var temperature= data.list[i].main.temp;
                    temperature = Math.ceil(((temperature-273.15) * 9 / 5 ) + 32);
                    var Humidity = data.list[i].main.humidity; 
                        var rawDate = data.list[i].dt_txt;
                        var iconWeather = data.list[i].weather[0].icon 
                        var imgURL = 'https://openweathermap.org/img/wn/'+ iconWeather +'.png'
                        var rawDate = data.list[i].dt_txt;

                        var formattedDate = dateFormatter(rawDate);
                        //console.log(formattedDate);
                        var divObj = $("<div class='col fork'>").html("<h5>"+formattedDate+"</h5>").css({ fontFamily:"'Pacifico', cursive",
                        margin:'15px',background:'#def2f1', padding:'15px', border:':#2b7a78 solid .5px;'}).appendTo("#fiveDayForecast");
                        $("<div>").html("<img height='45px' width='45px' src="+ imgURL+'>').appendTo(divObj);
                        $("<div>").html( "Temperature: " + temperature + String.fromCharCode(176)+'F').appendTo(divObj);
                        $("<div>").html("Humidity: " + Humidity + '%').appendTo(divObj);
                           
                }
            }); 


            // UV api
            var queryURL = 'https://api.openweathermap.org/data/2.5/uvi?lat='+lat+ '&lon='+ long+'&APPID='+api;
        $.ajax({
                method:"get",
                url:queryURL
                }).done(function(data){
                    var uvIndex = data.value;
                    $("#uvIndex").html("UV Index: " + uvIndex);
                });

};

function dateFormatter(dateString){   
    var year ='';
    var month ='';
    var day = ''; 
        for(var i = 0; i< dateString.length; i++){   
            if(i < 4){
                year += dateString[i];
            } 
            if(i > 4 && i < 7){
                month += (dateString[i]);
            }
            if(i > 7 && i < 10){
                day += (dateString[i]);
            }
        }
    return(month + '-'+ day + '-' + year);
}

function removeEmptyString(array){
    $("#undefined").remove()

    while(array.indexOf("") > -1){
        
        array.splice(array.indexOf(""),1)
    }
    return array
}

function removeDoubles(array){
    for(let i = 0; i<array.length; i++){
        var curr = array[i];
        for(let j = i + 1; j<array.length; j++ ){
            var next = array[j];
            if(next === curr){
                array.splice(array.indexOf(curr),1);
                i--;
            }
        }

    }
    return array;
}