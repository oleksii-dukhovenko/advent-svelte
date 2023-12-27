import { fetchWeatherApi } from 'openmeteo';

	
const params = {
	"latitude": 40.8612,
	"longitude": -79.8953,
	"hourly": ["temperature_2m", "rain", "showers", "snowfall"],
	"daily": ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "uv_index_max", "precipitation_sum"],
	"timezone": "auto"
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
export async function getWeatherData() { 
	
	const weatherData = {

	hourly: {
		time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		temperature2m: hourly.variables(0)!.valuesArray()!,
		rain: hourly.variables(1)!.valuesArray()!,
		showers: hourly.variables(2)!.valuesArray()!,
		snowfall: hourly.variables(3)!.valuesArray()!,
	},
	daily: {
		time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		temperature2mMax: daily.variables(0)!.valuesArray()!,
		temperature2mMin: daily.variables(1)!.valuesArray()!,
		sunrise: daily.variables(2)!.valuesArray()!,
		sunset: daily.variables(3)!.valuesArray()!,
		uvIndexMax: daily.variables(4)!.valuesArray()!,
		precipitationSum: daily.variables(5)!.valuesArray()!,
	},

};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
for (let i = 0; i < weatherData.hourly.time.length; i++) {
	console.log(
		weatherData.hourly.time[i].toISOString(),
		weatherData.hourly.temperature2m[i],
		weatherData.hourly.rain[i],
		weatherData.hourly.showers[i],
		weatherData.hourly.snowfall[i]
	);
}
for (let i = 0; i < weatherData.daily.time.length; i++) {
	console.log(
		//weatherData.daily.time[i].toISOString(),
		weatherData.daily.temperature2mMax[i],
		weatherData.daily.temperature2mMin[i],
		//weatherData.daily.sunrise[i],
		//weatherData.daily.sunset[i],
		weatherData.daily.uvIndexMax[i],
		weatherData.daily.precipitationSum[i]
	);
}
return weatherData;
}
