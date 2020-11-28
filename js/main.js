//test to see what data is returned from API call
const testData = async(cityName, stateCode, countryCode) => {
    
    const getTestData = await fetch(`api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode}, ${countryCode}&units=imperial&appid=39fc93c2a4e618396ba3aa95200af967`);
    
    const jsonGetTestData = await getTestData.json();
    console.log(getTestData);
    console.log(jsonGetTestData);
}
testData("Columbus", "OH", "US");

//39fc93c2a4e618396ba3aa95200af967