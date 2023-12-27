<script>
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import HourlyWeatherButton from '$lib/components/HourlyWeatherButton.svelte';
    import DailyWeatherButton from '$lib/components/DailyWeatherButton.svelte';
    import { getWeatherData } from './server';


    let hourlyWeather;
    let dailyWeather;
    let showHourly = false;
    let showDaily = false;

    onMount(async () => {
        const myWeatherData = await getWeatherData();
        hourlyWeather = myWeatherData.hourly;
        dailyWeather = myWeatherData.daily;
    });

    function toggleHourly() {
        showHourly = !showHourly;
        if (showHourly) showDaily = false; 
    }

    function toggleDaily() {
        showDaily = !showDaily;
        if (showDaily) showHourly = false;
    }
</script>


<main>
<div class="center">
  <h1 class="text-3xl font-bold underline" style="margin-top: 150px; text-align: center; margin-bottom: 100px;">
	Challenge 21 
  </h1>
</div>

<div class="center">
    <div class="picture-div">
      <img src="https://t4.ftcdn.net/jpg/04/85/17/33/360_F_485173339_rHVWOWEwZneJpHqgFNiYJLSPQg7hNoAA.jpg" alt="Santa Picture" style="border-radius: 20%; margin-top: 80px; width: 500px; height: 170px;">
    </div>
</div>

<div class="center">
<h3 class="text-3xl font-bold underline center" style="margin-top: 200px;">
Weather Application
</h3>
</div>

<div class="button-container center">
    <HourlyWeatherButton on:click={toggleHourly}>Show Hourly Weather</HourlyWeatherButton>
    <DailyWeatherButton on:click={toggleDaily}>Show Daily Weather</DailyWeatherButton>
</div>

<!-- Hourly Weather -->
{#if showHourly && hourlyWeather}
    <div class="weather-section text-center" in:fade>
        <h4>Hourly Weather</h4>
        {#each hourlyWeather.time as time, index}
            <div class="weather-item" in:fly={{ x: 200, delay: 100 }}>
                <p>{time.toLocaleString()}</p>
                <p>Temp: {hourlyWeather.temperature2m[index].toFixed(2)}°C</p>
                <p>Rain: {hourlyWeather.rain[index].toFixed(2)}mm</p>
            </div>
        {/each}
    </div>
{/if}

<!-- Daily Weather -->
{#if showDaily && dailyWeather}
    <div class="weather-section text-center" in:fade>
        <h4>Daily Weather</h4>
        {#each dailyWeather.time as time, index}
            <div class="weather-item" in:fly={{ x: 200, delay: 100 }}>
                <p>{time.toDateString()}</p>
                <p>Max Temp: {dailyWeather.temperature2mMax[index].toFixed(2)}°C</p>
                <p>Min Temp: {dailyWeather.temperature2mMin[index].toFixed(2)}°C</p>
                <p>UV Index: {dailyWeather.uvIndexMax[index].toFixed(2)}</p>
                <p>Precipitation: {dailyWeather.precipitationSum[index].toFixed(2)}mm</p>
            </div>
        {/each}
    </div>
{/if}

<style>
    .center {
        display: grid;
        place-items: center;
    }
    .button-container {
        display: flex;
        justify-content: center;
        gap: 20px;
    }
    .weather-section {
        margin: 20px;
        padding: 10px;
        border: 1px solid #ccc;
    }
    .weather-item {
        margin-bottom: 10px;
    }
</style>
</main>