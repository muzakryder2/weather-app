import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect } from 'react'

function MapUpdater({ latitude, longitude }) {
  const map = useMap()

  useEffect(() => {
    map.setView([latitude, longitude], 10)
  }, [map, latitude, longitude])

  return <div>Map</div>
}

function Map({ latitude, longitude }) {
  return (
    <div>
      <MapContainer
        center={[latitude, longitude]}
        zoom={10}
        style={{ height: '500px', width: '600px' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            A marker at latitude {latitude} and longitude {longitude}
          </Popup>
        </Marker>
        <MapUpdater latitude={latitude} longitude={longitude} />
      </MapContainer>
    </div>
  )
}
export default Map
