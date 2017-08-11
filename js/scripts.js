$(document).ready(function() {
	
	var celsius;
	var newval = celsius;
	var far;

	function getLocation() {
		var position = {};
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getPosition);
		}
		else {
			console.log("Not getting the position");
		}
	}
	
	
	function getPosition(position) {
		console.log("Latitude: " + Math.round(position.coords.latitude*100)/100 + " Longitude: " + Math.round(position.coords.longitude*100)/100);
		var owmUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + Math.floor(position.coords.latitude*100)/100  + "&lon=" + 
                      Math.floor(position.coords.longitude*100)/100 + "&units=metric&appid=fbf3173943619ed6f607c76eb92e5b72";
        fetchWeather(owmUrl);
	}


	function fetchWeather(ourl) {
		$.getJSON(ourl, function(json) {
			$("#wind").html("<p>" + json.wind.speed + " m/s</p>");
			$("#sky").html("<p>" + json.weather[0].main + "</p>");
			$("#press").html("<p>" + json.main.pressure + "</p>");
			$("#humid").html("<p>" + json.main.humidity + "%</p>");
			$("#city").html("<p>" + json.name + ", " + json.sys.country + "</p>");
			console.log(json.weather[0].icon);
			$("#icon").html("<img src='https://openweathermap.org/img/w/" + json.weather[0].icon + ".png'/>");
			
			$("#temp").html("<p>" + Math.floor(json.main.temp) + " &#8451</p>");
			celsius =  Math.floor(json.main.temp);
			newval = celsius;
			far = Math.floor(FCconvert(celsius));
			
			

		});
	}

	$("#temp").click(function() {
		if(newval==celsius) {
			$("#temp").html("<p>" + far + " &#8457</p>");
			newval = far;
		}
		else {
			$("#temp").html("<p>" + celsius + " &#8451</p>");
			newval = celsius;
		}

	});

	function FCconvert(temperature) {
		return temperature * 9 / 5 + 32;

	}
	getLocation();
	
});