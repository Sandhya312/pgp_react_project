import React, { useEffect, useState } from 'react';
import classes from './Wether.module.css';

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';

function WetherTime() {

    const [dateTime, setDateTime] = useState({
        date: "",
      
    })

    const [wether, setWether] = useState({
        rain: {
            speed: "",
            Icon: ""
        },
        temp: null,
        mbar: null,
        windSpeed: null,
        humadity: null,
    })



    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = 'b9141760499c4b0a9d5175433231602';
                const city = 'moradabad';
                const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
                const weatherData = await data.json();
                 console.log("weather data: ",weatherData);
                 console.log("weather data: ",weatherData.location.localtime);
               
          const dateTime = new Date(weatherData.location.localtime);
        const options = { timeZone: "Asia/Kolkata" };
        const ISTTime = dateTime.toLocaleString("en-US", options);
        console.log(ISTTime);

    
                 setDateTime({ date:ISTTime  })

                setWether({
                    rain: {
                        text: weatherData.current.condition.text,
                        Icon: weatherData.current.condition.icon,
                    },
                    temp: weatherData.current.temp_c,
                    mbar: weatherData.current.pressure_mb,
                    windSpeed: weatherData.current.wind_kph,
                    humadity: weatherData.current.humidity,
                });
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={classes.weatherTime}>
            <div className={classes.TimeDate}>
                <div className={classes.time}>{dateTime.date}</div>
                
            </div>
            <div className={classes.wether}>
                <div className={classes.rain}>
                    <img src={wether.rain.Icon} alt="icon" />
                    {
                        wether.rain.text && 
                        <div className={classes.rainSpeed}>{wether.rain.text}</div>
                    }
                </div>
                <div className={classes.separator}></div>

                <div className={classes.temp}>
                    <h1 className={classes.celcius}>{wether.temp}&deg;C</h1>
                    <div className={classes.mbar}>
                        <DeviceThermostatIcon className={classes.mbarIcon} />
                        {
                            wether.mbar &&
                            <p className={classes.text}>{wether.mbar} mbar pressure</p>
                        }
                    </div>
                </div>

                <div className={classes.separator}></div>

                <div className={classes.wind}>
                    <div className={classes.windSec}>
                        <AirIcon className={classes.icon} />
                        <p>{wether.windSpeed} k/m wind</p>
                    </div>
                    <div className={classes.humadity}>
                        <OpacityIcon className={classes.icon} />
                        <p>{wether.humadity}% humadity</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WetherTime