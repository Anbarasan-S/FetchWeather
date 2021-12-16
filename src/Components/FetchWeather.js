import React, { useEffect, useState } from 'react'
import axios from 'axios'
import image from '../cloud_weather_clouds_evercast_cloudy_icon_148925.png'
import image2 from '../clear-sky.png'
import image3 from '../keepdry_weather_rain_umbrella_4568.png'
const FetchWeather = (props) => {
    const [ok, setOk] = useState(false);
    const [data, setData] = useState({});
    const [err, setErr] = useState(false);
    const[time,setTime]=useState(new Date());
    const[days]=useState(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]);
    useEffect((prop) => {
        const fetchData = async () => {
            const apiKey = "81cdb192860eb4ba0420c600cfede6de";
            const options = {
                method: 'GET',
                url: "http://api.openweathermap.org/data/2.5/weather",
                params: { q: props.match.params.id, appid: apiKey },
            };
            try {
                const res = await axios.request(options);
                setData(res);
                setOk(true);
            }
            catch (err) {
                setErr(true);
            }
        }
        fetchData();
    }, []);
    const toCels = (data) => {
        const value = data - 273.15;
        return value.toFixed(2);
    }
    setInterval(()=>{
        setTime(new Date());
    },1*1000)
    return (
        <div className="fetchweather">
            {ok && <h1 className="countryname">{data.data.name}</h1>}
            {ok && <h2 className="temp">{`Temperature: ${toCels(data.data.main.temp)} °C`}</h2>}
            {ok && <h2 className="feels_like">{`Feels Like: ${toCels(data.data.main.feels_like)} °C`}</h2>}
            {ok && data.data.weather[0].description === "clear sky" && <img src={image2} className="img" alt=""></img>}
            {ok && ((data.data.weather[0].description === "overcast clouds") || (data.data.weather[0].description.toLowerCase().indexOf("clouds") !== -1)) && <img src={image} className="img" alt=""></img>}
            {ok && data.data.weather[0].description.toLowerCase().indexOf("rain") !== -1 && <img className="img" src={image3} alt=""></img>}
            {ok && <h2 className="weather">{`${data.data.weather[0].description.toUpperCase()}`}</h2>}
            {err && <h1 className="err">Sorry We couldn't fetch the Weather for the given State/Country</h1>}
            {<h1 className="date    time">{ `${days[time.getDay()]} ${time.getHours()}:${time.getMinutes() <= "9" ? "0" + time.getMinutes() :time.getMinutes()}`}</h1>}
            {<h1 className="date">{`${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()}`}</h1>}
        </div>
    )
}

export default FetchWeather;
