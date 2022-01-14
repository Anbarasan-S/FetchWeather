import React,{useEffect,useState} from 'react'
import axios from 'axios'
const IndexPage = () => {
    const[data,setData]=useState([]);
    const[stateData,setStateData]=useState([]);
    const[option,setOption]=useState("Afghanistan");
    const[stateOption,setStateOption]=useState("Badakhshan");
    const[ok,setOk]=useState(false);
    const[stateok,setStateOk]=useState(false);

    useEffect(()=>{
        const fetchData=async()=>{
            const res=await axios.get("https://countriesnow.space/api/v0.1/countries/states");
            const values=res.data.data;
            const countries=[];
            values.forEach((item)=>{
                    countries.push({name:item.name,states:item.states});
            });
            setData(countries);
            const tempstate=[];
            countries.find(item=>item.name==="Afghanistan").states.map(item=>tempstate.push(item.name));
            setOk(true);
            setStateOk(true);
            setStateData(tempstate);
        }
        fetchData();
    },[])

      const changeState=(e)=>{
        setStateOption(e.target.value);
    }

    const changeCountry=(e)=>{
        const tempstate=[];
        setOption(e.target.value);
        data.find(item=>item.name===e.target.value).states.map(item=>tempstate.push(item.name));
        setStateOk(false);
        setStateOk(true);
        setStateData(tempstate);
        setStateOption(tempstate[0]);
        console.log(tempstate);
        if(tempstate.length===0)
        {
            setStateOk(false);
            setStateOption("");
        }
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        if(stateOption!=="")
        window.location.href=`/fetchweather/${stateOption}`
        else
        window.location.href=`/fetchweather/${option}`
    }
    return (
        <>
        <h1 className='head'>Weather Viewer</h1>
        <div className='container'>
            <form onSubmit={onSubmit}>
            {ok&&<label>Select Country</label>}
            {ok&&<select value={option} onChange={changeCountry} className="dropdown">
        {data.map((item,ind)=>(<option value={item.name} key={ind}>{item.name}</option>))}
        </select>}
            <br /> <br />
        {stateok&&<label>Select State</label>}
        {stateok&&<select  onChange={changeState} className="dropdown dropdown2">
        {stateData.map((item,ind)=>(<option value={item} key={ind} className="dropdown">{item}</option>))}
        </select>}
        <br /> <br /> <br />
        <button className="weatherbtn">Get Weather</button>
        </form>
        </div>
        </>
    )
}   

export default IndexPage
