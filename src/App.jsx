import { useState } from 'react'
import axios from 'axios'
import CurrentWeatherCard from './components/CurrentWeatherCard'
import HourlyWeatherCard from './components/HourlyWeatherCard'
import Map from './components/Map'

function App() {
  const [currentData, setCurrentData] = useState({})
  const [hourlyData, setHourlyData] = useState([])
  const [loading, setLoading] = useState(true)
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  })
  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  })

  async function handleLocationSearch(e) {
    e.preventDefault()

    let currentResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${process.env.API_KEY}`
    )

    setCurrentData(currentResponse.data)

    let hourlyResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${process.env.API_KEY}`
    )

    setHourlyData(hourlyResponse.data.list)
    setLoading(false)
    setMapCoordinates(coordinates)
  }

  function handleChange(e) {
    setCoordinates((prevState) => ({
      ...prevState,
      [e.target.name]: Number(e.target.value),
    }))
  }

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-blue-300 to-white py-4'>
      <h3 className='text-2xl font-semibold text-gray-800 text-center mt-16 mb-4'>
        Latitude/Longitude Search
      </h3>
      <div className='mx-auto p-6 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-semibold text-gray-800 text-center mb-4'>
          Find the weather, anywhere in the world!
        </h2>
        <form onSubmit={handleLocationSearch} className='space-y-4'>
          <input
            type='number'
            name='latitude'
            min={-90}
            max={90}
            step={0.01}
            value={coordinates.latitude || ''}
            placeholder='Latitude'
            onChange={handleChange}
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            required
          />
          <input
            type='number'
            name='longitude'
            min={-180}
            max={180}
            step={0.01}
            value={coordinates.longitude || ''}
            placeholder='Longitude'
            onChange={handleChange}
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            required
          />

          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 py-3 cursor-pointer'
          >
            Search
          </button>
        </form>
      </div>
      {!loading && (
        <>
          <div className='mt-16 flex flex-col xl:flex-row items-center justify-center space-y-12 xl:space-y-0 xl:space-x-12'>
            <div>
              <h3 className='text-2xl font-sembold text-gray-800 text-center mb-4'>
                Current Weather
              </h3>
              <CurrentWeatherCard weatherData={currentData} />
            </div>
            <div>
              <h3 className='text-2xl font-sembold text-gray-800 text-center mb-4'>
                Location Map
              </h3>
              <Map
                latitude={mapCoordinates.latitude}
                longitude={mapCoordinates.longitude}
              />
            </div>
          </div>
          <div className='flex justify-center space-x-4 mb-6 mt-24'>
            <h3 className='px-8 py-2 rounded-md bg-blue-500 text-white'>
              3-Hour Forecast
            </h3>
          </div>
          <div className='flex justify-center mb-48'>
            <div className='overflow-x-scroll flex w-10/12 space-x-4 p-4'>
              {hourlyData.map((hour, index) => (
                <HourlyWeatherCard key={index} hour={hour} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
