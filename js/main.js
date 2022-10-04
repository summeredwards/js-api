function displayWeather(json) {
	const temp = json.current_weather.temperature;
	const weathercode = json.current_weather.weathercode;

	// get times (unit: iso8601)
	const currentTime = json.current_weather.time;
	const sunrise = json.daily.sunrise[0];
	const sunset = json.daily.sunset[0];
	let daytime = false;

	// convert iso8601 to timestamp
	// https://bobbyhadz.com/blog/javascript-convert-iso-date-to-timestamp#:~:text=Use%20the%20getTime()%20method,uses%20UTC%20for%20time%20representation.
	const newCurrentTime = new Date(currentTime);
	const newSunrise = new Date(sunrise);
	const newSunset = new Date(sunset);

	// daytime or nighttime?
	if (newCurrentTime.getTime() >= newSunrise.getTime() && newCurrentTime.getTime() <= newSunset.getTime()){
		daytime = true;
		//console.log('it is day');
	}
	else{
		daytime = false;
		//console.log('it is night');
	}

	//console.log(temp);
	//console.log(weathercode);

	// display weather icon
	const weatherIcon = document.querySelector('#weather-icon');
	const imageInfo = codeToImage(weathercode, daytime);

	//console.log(imageInfo[0]);
	//console.log(imageInfo[1]);

	weatherIcon.src = imageInfo[0];
	weatherIcon.alt = imageInfo[1];

	// display temp
	document.querySelector('#temp').textContent = temp + '\xB0' + 'F';

	// display weather 
	const description = codeToDescription(weathercode);

	document.querySelector('#weather-code').textContent = description;
}


function codeToImage(weathercode, daytime) {
	// imageInfo[0] --> image file location
	// imageInfo[1] --> image alt text
	let imageInfo = ['',''];

	if (weathercode == 0){ // clear sky
		//console.log('inside 0');
		if (daytime === true){
			imageInfo[0] = 'img/sun.png';
			imageInfo[1] = 'sun';
		}
		else{
			imageInfo[0] = 'img/moon.png';
			imageInfo[1] = 'crescent moon';
		}
	}
	if (weathercode >= 1 && weathercode <= 2){ // partly cloudy
		//console.log('inside 1-2');
		if (daytime === true){
			imageInfo[0] = 'img/partly-cloudy-day.png';
			imageInfo[1] = 'sun with clouds';
		}
		else{
			imageInfo[0] = 'img/partly-cloudy-night.png';
			imageInfo[1] = 'moon with clouds';
		}
	}
	if (weathercode == 3){ // cloudy
		//console.log('inside 3');
		imageInfo[0] = 'img/cloudy.png';
		imageInfo[1] = 'cloud';
	}
	if (weathercode >= 45 && weathercode <= 48){ // fog
		//console.log('inside 45-48');
		if (daytime === true){
			imageInfo[0] = 'img/fog-day.png';
			imageInfo[1] = 'sun with fog';
		}
		else{
			imageInfo[0] = 'img/fod-night.png';
			imageInfo[1] = 'moon with fog';
		}
	}
	if(weathercode >= 51 && weathercode <= 67){ // rain
		//console.log('inside 51-67');
		imageInfo[0] = 'img/rain.png';
		imageInfo[1] = 'raining cloud';
		}
	if(weathercode >= 80 && weathercode <= 82){ // rain
		//console.log('inside 80-82');
		imageInfo[0] = 'img/rain.png';
		imageInfo[1] = 'raining cloud';
	}
	if(weathercode >= 71 && weathercode <= 77){ // snow
		//console.log('inside 71-77');
		imageInfo[0] = 'img/snow.png';
		imageInfo[1] = 'snowing cloud';
	}
	if(weathercode >= 85 && weathercode <= 86){ // snow
		//console.log('inside 85-86');
		imageInfo[0] = 'img/snow.png';
		imageInfo[1] = 'snowing cloud';
	}
	if(weathercode == 95){ // thunderstorm
		//console.log('inside 95');
		imageInfo[0] = 'img/thunderstorm.png';
		imageInfo[1] = 'thundercloud with lightning';
	}

	return imageInfo;
}


function codeToDescription(weathercode) {
	let description = '';

	if (weathercode == 0){ // clear sky
		//console.log('inside 0');
		description = 'Clear Skies';
	}
	if (weathercode >= 1 && weathercode <= 2){ // partly cloudy
		//console.log('inside 1-2');
		description = 'Partly Cloudy';
	}
	if (weathercode == 3){ // cloudy
		//console.log('inside 3');
		description = 'Cloudy';
	}
	if (weathercode >= 45 && weathercode <= 48){ // fog
		//console.log('inside 45-48');
		description = 'Fog';
	}
	if(weathercode >= 51 && weathercode <= 55){ // drizzle
		//console.log('inside 51-55');
		description = 'Drizzle';
	}
	if(weathercode >= 56 && weathercode <= 57){ // freezing drizzle
		//console.log('inside 56-57');
		description = 'Freezing Drizzle';
	}
	if(weathercode >= 61 && weathercode <= 65){ // rain
		//console.log('inside 61-65');
		description = 'Rain';
	}
	if(weathercode >= 66 && weathercode <= 67){ // freezing rain
		//console.log('inside 66-67');
		description = 'Freezing Rain';
	}
	if(weathercode >= 80 && weathercode <= 82){ // rain showers
		//console.log('inside 80-82');
		description = 'Rain Showers';
	}
	if(weathercode >= 71 && weathercode <= 77){ // snow fall
		//console.log('inside 71-77');
		description = 'Snow Fall';
	}
	if(weathercode >= 85 && weathercode <= 86){ // snow showers
		//console.log('inside 85-86');
		description = 'Snow Showers';
	}
	if(weathercode == 95){ // thunderstorms
		//console.log('inside 95');
		description = 'Thunderstorms';
	}

	return description;
}


fetch('https://api.open-meteo.com/v1/forecast?latitude=39.7392&longitude=-104.9903&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&daily=sunrise&daily=sunset&timezone=America%2FDenver')
	.then((response) => {
		return response.json();
	})
	// response returns another promise that will return a result so we need to add to the .then chain
	.then((json) => {
		displayWeather(json);
	})
	.catch((error) => {
		console.error(error);
	});


// API: https://open-meteo.com/en/docs#latitude=39.7392&longitude=-104.9903&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver


