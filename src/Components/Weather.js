import axios from 'axios';
import { useEffect } from 'react';
const Weather=()=>{
    // const fetchApi=async()=>{
    //  const res=await axios.post("https://api.m3o.com/v1/weather/Forecast");
    //  console.log(res);
    // }
    try{
    useEffect(()=>{
        const fetchData=async()=>{
            const res=await axios.("https://api.m3o.com/v1/weather/Forecast");
            // console.log(res);
        }
        fetchData();
    },[]);
}
catch(err)
{
    console.log(err);
}
    return(
    <>
    <h1>Weather Viewer</h1>
    <button>View Weather</button>
    </>);
}
export default Weather;