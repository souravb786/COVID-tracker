// import React,{useState, useEffect} from "react";
// import './App.css';
// import { MenuItem, FormControl, Select, CardContent, Card } from "@material-ui/core";
// import InfoBox from "./InfoBox";
// import Map from "./Map";
// import Table from "./Table";
// import {sortData} from "./util";
// import LineGraph from "./LineGraph";
// import "leaflet/dist/leaflet.css";
// import {prettyPrintStat} from "./util";

// function App() {

//   const [countries, setCountries] = useState([]);
//   const [country, setCountry ] = useState("worldwide");
//   const [countryInfo, setCountryInfo] = useState({});
//   const [tableData, setTableData] = useState([]);
//   const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
//   const [mapZoom, setMapZoom] = useState(3);
//   const [mapCountries, setMapCountries] = useState([]);
//   const [casesType, setCasesType] = useState("cases");
//   // STATE = How to write a variable in React
//   // inside the useState we have to pass the initialState

//   // making request to this api "https://disease.sh/v3/covid-19/countries"
  
//   // USEEFFECT = Runs a piece of code 
//   // based on the condition
//   useEffect(()=>{
//     console.log("caseType", casesType);
//   },[casesType]);

//   useEffect(() => {
//     fetch("https://disease.sh/v3/covid-19/all")
//     .then(response => response.json())
//     .then(data => {
//       setCountryInfo(data)
//     });
//   },[]);

//   useEffect(()=>{
//     // the code inside here will run once
//     // when the component loads and not again
//     // if we pass the variable then it will also
//     // runs when variable changes

//     //async--> send a request, wait for it, do something

//     const getCountriesData = async() => {
//       await fetch("https://disease.sh/v3/covid-19/countries")
//       .then((response) => response.json())
//       .then((data) => {
//         const countries = data.map((country) => (
//           {
//           name: country.country, //United States, United Kingdom
//           value: country.countryInfo.iso2 // UK, USA
//           }
//         ));
//           const sortedData = sortData(data);
//           setTableData(sortedData);
//           setCountries(countries);
//           setMapCountries(data);
//       });
//     }
//     getCountriesData();
//   },[]);

//   const onCountryChange = async (event) => {
//     const countryCode = event.target.value;
//     const url = countryCode === "worldwide" 
//     ? 'https://disease.sh/v3/covid-19/all' 
//     : `https://disease.sh/v3/covid-19/countries/${countryCode}`

//     await fetch(url).then(response => response.json())
//       .then(data => {
//         setCountry(countryCode);

//       // All of the data from the country response
//         setCountryInfo(data);
//         setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
//         setMapZoom(4);
//       })
  
//   };

  
//   return (
//     <div className="app">
      
//       <div className="app__left">
//         {/* Header */}
//         <div className="app__header">
//           <h1>COVID-19 TRACKER</h1>
//           <FormControl className="app__dropdown">
//             <Select variant="outlined" value={country} onChange={onCountryChange}>
//               <MenuItem value="worldwide">Worldwide</MenuItem>
//               {countries.map((country) => (
//                   <MenuItem value={country.value}>{country.name}</MenuItem>))}
//             </Select>
//           </FormControl>
//         </div>
//         <div className="app__stats">
//           <InfoBox
//           onClick={(e) => setCasesType("cases")} 
//           title="Coronavirus Cases" 
//           cases={prettyPrintStat(countryInfo.todayCases)}
//           total={prettyPrintStat(countryInfo.cases)}
//           />
//           <InfoBox 
//           onClick={(e) => setCasesType("recovered")}
//           title="Recoverd"
//           cases={prettyPrintStat(countryInfo.todayRecovered)} 
//           total={prettyPrintStat(countryInfo.recovered)}
//           />
//           <InfoBox 
//           onClick={(e) => setCasesType("deaths")}
//           title="Deaths" 
//           cases={prettyPrintStat(countryInfo.todayDeaths)}
//           total={prettyPrintStat(countryInfo.deaths)}
//           />     
//         </div>
 
//         <Map
//           casesType={casesType}
//           countries = {mapCountries}
//           center = {mapCenter}
//           zoom = {mapZoom}
//         />
//       </div>
      
//       <Card className="app__right">
//         <CardContent>
//           <h3>Live Cases by Country</h3>
//           <Table countries={tableData}/>
//           <h3>Worldwide new cases</h3>
//           <LineGraph />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;