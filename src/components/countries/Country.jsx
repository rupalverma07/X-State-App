import React, { useEffect, useState } from 'react'
import './country.css'

const Country = () => {
    const[country,setCountry] = useState('')
    const[state,setState] = useState('')
    const[city,setCity] = useState('')
    const[countriesData, setCountriesData] = useState([])
    const[statesData, setStatesData] = useState([])
    const[citiesData, setCitiesData] = useState([])
    const[showMsg, setShowMsg] = useState(false)
    const getCountriesData = async() =>{
        const res = await fetch("https://crio-location-selector.onrender.com/countries");
        const data =await res.json();
        setCountriesData(data)
        console.log(data)
    }
    // https://crio-location-selector.onrender.com/country={countryName}/states
    const getStateData = async(countryName) =>{
        const res = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
        const data =await res.json();
        setStatesData(data)
        console.log(data)
    }
    const getCityData = async(countryName,stateName) =>{
        const res = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
        const data =await res.json();
        setCitiesData(data)
        console.log(data)
    }
    const countryHandler = (e) =>{
        let country = e.target.value;
        setCountry(country)
        getStateData(country);
    }
    const stateHandler = (e) =>{
        let state = e.target.value;
        setState(state)
        getCityData(country,state);
    }

    const cityHandler = (e) =>{
        let city = e.target.value;
        setCity(city)
        setShowMsg(true)
    }
    useEffect(() =>{
        getCountriesData()
    },[])
  return (
    <div>
      <h1>Select Location</h1>
      <div className='container'>
        <div>
            <select value={country} onChange={countryHandler} className='formInput'>
                <option value="">Select Country</option>
                {countriesData.length>0 ? (countriesData.map((item,i) => <option key={i} value={item}>{item}</option>)) : (null)}
            </select>
        </div>
        <div>
        <select value={state} onChange={stateHandler} className='formInput' disabled={statesData.length === 0}>
        <option value="">Select State</option>
                {statesData.length>0 ? (statesData.map((item,i) => <option key={i} value={item}>{item}</option>)) : (null)}
        </select>
        </div>
        <div>
        <select value={city} onChange={cityHandler} className='formInput' disabled={citiesData.length === 0}>
        <option value="">Select City</option>
                {citiesData.length>0 ? (citiesData.map((item,i) => <option key={i} value={item}>{item}</option>)) : (null)}
            </select>
        </div>
        
      </div>
      <div>
            {showMsg ? (<h3>You selected {city} {state} {country}</h3>) : (null)}
        </div>
    </div>
  )
}

export default Country
