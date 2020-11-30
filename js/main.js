document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    //add listeners
    const itemCityInfo = document.getElementById("currentCityInfo");
    itemCityInfo.addEventListener("submit", (event) => {
        event.preventDefault();
        //processSubmission();
        testData();
    });
}

//test to see what data is returned from API call
const testData = async() => {
    
    const zipCode = getCurrentZipCode();
    const cityName = getCurrentCityName();
    const stateCode = getCurrentStateCode();
    const countryCode = "US";
    let getTestData = "";
    let jsonGetTestData = "";
    
    

    if(zipCode) {
        getTestData = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&units=imperial&appid=39fc93c2a4e618396ba3aa95200af967`);
        //jsonGetTestData = await getTestData.json();
    }
    else{
        getTestData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode},${countryCode}&units=imperial&appid=39fc93c2a4e618396ba3aa95200af967`);
        //jsonGetTestData = await getTestData.json();
    }

    
    //get 5 day forecast
   /*  if(zipCode) {
        getFiveDayTestData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},${countryCode}&units=imperial&appid=39fc93c2a4e618396ba3aa95200af967`);
        //jsonGetTestData = await getTestData.json();
    }
    else{
        getFiveDayTestData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${stateCode},${countryCode}&units=imperial&appid=39fc93c2a4e618396ba3aa95200af967`);
        //jsonGetTestData = await getTestData.json(); 
    }*/
    jsonGetTestData = await getTestData.json();
    const latitude = jsonGetTestData.coord.lat;
    const longitude = jsonGetTestData.coord.lon;
    const getFiveDayForecastTest = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=39fc93c2a4e618396ba3aa95200af967`)
    const jsonGetFiveDayForecastTest = await getFiveDayForecastTest.json();

    
    //jsonGetFiveDayTestData = await getFiveDayTestData.json();

    //allData = JSON.stringify(jsonGetTestData);
    let cityDesc = jsonGetTestData.weather[0].description;
    let weatherIcon = document.getElementById("currentCityWeatherIcon");
    let cityTemp = jsonGetTestData.main.temp;
    let cityFeelsLike = jsonGetTestData.main.feels_like;
    let tempHigh = jsonGetTestData.main.temp_max;
    let tempLow = jsonGetTestData.main.temp_min;
    let humidity = jsonGetTestData.main.humidity;
    let todayPlus1High = jsonGetFiveDayForecastTest.daily[0].temp.max;
    let todayPlus1Low = jsonGetFiveDayForecastTest.daily[0].temp.min;
    let todayPlus2High = jsonGetFiveDayForecastTest.daily[1].temp.max;
    let todayPlus2Low = jsonGetFiveDayForecastTest.daily[1].temp.min;
    let todayPlus3High = jsonGetFiveDayForecastTest.daily[2].temp.max;
    let todayPlus3Low = jsonGetFiveDayForecastTest.daily[2].temp.min;
    let todayPlus4High = jsonGetFiveDayForecastTest.daily[3].temp.max;
    let todayPlus4Low = jsonGetFiveDayForecastTest.daily[3].temp.min;
    let todayPlus5High = jsonGetFiveDayForecastTest.daily[4].temp.max;
    let todayPlus5Low = jsonGetFiveDayForecastTest.daily[4].temp.min;
    const todayPlus1Date = new Date(jsonGetFiveDayForecastTest.daily[0].dt);
    //todayPlus1Date.toUTCString();
    console.log(todayPlus1Date.toUTCString().substring(0,3));


    

    document.getElementById("currentCityName").textContent = cityName;
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${jsonGetTestData.weather[0].icon}.png" alt="icon for the local weather">`;
    document.getElementById("currentCityDescription").textContent = cityDesc;
    document.getElementById("currentCityTemp").textContent = `Temp: ` + cityTemp;
    document.getElementById("currentCityFeelsLike").textContent = 'Feels Like: ' + cityFeelsLike;
    document.getElementById("currentCityHigh").textContent = 'High: ' + tempHigh;
    document.getElementById("currentCityLow").textContent = 'Low: ' + tempLow;
    document.getElementById("currentCityHumidity").textContent = 'Humidity: ' + humidity;
    document.getElementById("todayPlus1Max").textContent = todayPlus1High;
    document.getElementById("todayPlus1Min").textContent = todayPlus1Low;
    document.getElementById("todayPlus2Max").textContent = todayPlus2High;
    document.getElementById("todayPlus2Min").textContent = todayPlus2Low;
    document.getElementById("todayPlus3Max").textContent = todayPlus3High;
    document.getElementById("todayPlus3Min").textContent = todayPlus3Low;
    document.getElementById("todayPlus4Max").textContent = todayPlus4High;
    document.getElementById("todayPlus4Min").textContent = todayPlus4Low;
    document.getElementById("todayPlus5Max").textContent = todayPlus5High;
    document.getElementById("todayPlus5Min").textContent = todayPlus5Low;
    
    //currentCityName.textContent = cityName;
    //const 

    //currentTemp = jsonGetTestData["main.temp"];
    //console.log(currentTemp);
    console.log(weatherIcon);
    console.log(currentCityName);
    console.log(cityDesc);
    console.log(getTestData);
    //console.log(getFiveDayTestData)
    console.log(jsonGetTestData);
    //console.log(jsonGetFiveDayTestData);
    console.log(jsonGetFiveDayForecastTest);
}

const getCurrentZipCode = () => {
   
    return document.getElementById("zipCode").value.trim();
}

const getCurrentCityName = () => {
   
    return document.getElementById("city").value.trim();
}

const getCurrentStateCode = () => {
   
    return document.getElementById("state").value.trim();
}

//testData("Columbus", "OH", "US");

//39fc93c2a4e618396ba3aa95200af967