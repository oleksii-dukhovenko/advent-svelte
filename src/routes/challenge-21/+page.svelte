<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { getWeatherData } from "./server";

    let hourlyWeather;
    let dailyWeather;
    let hourlyWeatherByDay = {};
    let activeTab = "hourly";

    onMount(async () => {
        const myWeatherData = await getWeatherData();
        hourlyWeather = myWeatherData.hourly;
        dailyWeather = myWeatherData.daily;
        groupHourlyByDay();
    });

    function groupHourlyByDay() {
        if (
            !hourlyWeather ||
            !hourlyWeather.time ||
            !hourlyWeather.temperature2m ||
            !hourlyWeather.rain
        ) {
            console.error("Invalid hourlyWeather data structure");
            return;
        }

        hourlyWeatherByDay = hourlyWeather.time.reduce((acc, time, index) => {
            const day = new Date(time).toDateString();
            if (!acc[day]) {
                acc[day] = [];
            }
            acc[day].push({
                time: new Date(time),
                temperature: hourlyWeather.temperature2m[index],
                rain: hourlyWeather.rain[index],
            });
            return acc;
        }, {});
    }

    function getDayOfWeek(date) {
        return new Date(date).toLocaleDateString("en-US", { weekday: "long" });
    }

    function switchTab(tab) {
        activeTab = tab;
    }
</script>

<main>
    <div class="center">
        <h1 class="main-title">Challenge 21</h1>
    </div>

    <div class="center">
        <div class="picture-div">
            <img
                src="https://t4.ftcdn.net/jpg/04/85/17/33/360_F_485173339_rHVWOWEwZneJpHqgFNiYJLSPQg7hNoAA.jpg"
                alt="Santa Picture"
                class="santa-picture"
            />
        </div>
    </div>

    <div class="center">
        <h3 class="weather-title">Weather Application</h3>
    </div>

    <div class="tab-container center">
        <button on:click={() => switchTab("hourly")}>Hourly Weather</button>
        <button on:click={() => switchTab("daily")}>Daily Weather</button>
    </div>

    <!-- Hourly Weather -->
    {#if activeTab === "hourly" && hourlyWeather}
        {#each Object.keys(hourlyWeatherByDay) as day}
            <div class="day-section">
                <h3 class="day-title">{getDayOfWeek(day)}</h3>
                <div class="weather-grid" in:fade>
                    {#each hourlyWeatherByDay[day] as weather}
                        <div class="weather-card">
                            {#if weather.rain > 0}
                            <img
                                src={"https://cdn-icons-png.flaticon.com/128/3313/3313888.png"}
                                alt="Rain"
                                class="rain-icon"
                            />
                        
                        {:else if weather.rain === 0}
                            <img
                                src={"https://cdn-icons-png.flaticon.com/128/3313/3313896.png"}
                                alt="Sunny"
                                class="sunny-icon"
                            />
                            {/if}
                            <p class="weather-time">
                                {weather.time.toLocaleTimeString()}
                            </p>
                            <p class="weather-temp">
                                Temp: {weather.temperature.toFixed(2)}°C
                            </p>
                            <p class="weather-rain">
                                Rain: {weather.rain.toFixed(2)}mm
                            </p>
                         

                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    {/if}

    <!-- Daily Weather -->
    {#if activeTab === "daily" && dailyWeather}
        <div class="weather-grid" in:fade>
            {#each dailyWeather.time as time, index}
                <div class="weather-card">
                    <p class="weather-time">{time.toDateString()}</p>
                    <p class="weather-temp">
                        Max Temp: {dailyWeather.temperature2mMax[index].toFixed(
                            2,
                        )}°C
                    </p>
                    <p class="weather-temp">
                        Min Temp: {dailyWeather.temperature2mMin[index].toFixed(
                            2,
                        )}°C
                    </p>
                    <p class="weather-uv">
                        UV Index: {dailyWeather.uvIndexMax[index].toFixed(2)}
                    </p>
                    <p class="weather-precip">
                        Precipitation: {dailyWeather.precipitationSum[
                            index
                        ].toFixed(2)}mm
                    </p>
                </div>
            {/each}
        </div>
    {/if}

    <style>
        .main-title {
            font-size: 3em;
            font-weight: bold;
            text-decoration: underline;
            text-align: center;
            margin-top: 150px;
            margin-bottom: 100px;
            color: #2a9d8f;
        }
        .santa-picture {
            border-radius: 20%;
            margin-top: 80px;
            width: 500px;
            height: 170px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        .weather-title {
            font-size: 2.5em;
            font-weight: bold;
            text-align: center;
            margin-top: 200px;
            color: #264653;
        }
        .center {
            display: grid;
            place-items: center;
        }
        .tab-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        .weather-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        .weather-card {
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            background-color: #f3f3f3;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            transition:
                transform 0.3s,
                box-shadow 0.3s;
        }
        .weather-time {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .weather-temp,
        .weather-rain,
        .weather-uv,
        .weather-precip {
            font-size: 1em;
            margin: 5px 0;
        }
        .weather-card:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }
        .day-section {
            margin: 20px 0;
        }
        .day-title {
            font-size: 1.4em;
            margin-left: 20px;
        }
        .rain-icon {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 10px;
            right: 10px;
        }
        .sunny-icon {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 10px;
            right: 10px;
        }
    </style>
</main>
