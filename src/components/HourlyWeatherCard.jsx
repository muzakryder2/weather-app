function HourlyWeatherCard({ hour }) {
  const date = new Date(hour.dt * 1000).toLocaleDateString([], {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
  const time = new Date(hour.dt * 1000).toLocaleDateString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className='bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center min-w-56'>
      <p className='text-lg font-semibold text-black'>{date}</p>
      <p className='text-lg font-semibold text-black'>{time.split(', ')[1]}</p>
      <div className='flex justify-center mb-4'>
        <div className='bg-blue-100 rounded-full p-2'>
          <img
            src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
            alt={hour.weather[0].description}
            className='w-12 h-12 mb-2'
          />
        </div>
      </div>
      <p className='text-2xl font-bold my-4'>{Math.round(hour.main.temp)}°F</p>
      <p className='text-sm text-gray-600'>
        Feels Like: {Math.round(hour.main.feels_like)}°F
      </p>
      <p className='text-sm text-gray-600 capitalize'>
        {hour.weather[0].description}
      </p>
    </div>
  )
}
export default HourlyWeatherCard
