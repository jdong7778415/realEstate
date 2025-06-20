import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Calculate the center of all properties
function getCenter(properties) {
  if (!properties.length) return { longitude: -75.695, latitude: 45.414 };
  const lng = properties.reduce((sum, p) => sum + p.longitude, 0) / properties.length;
  const lat = properties.reduce((sum, p) => sum + p.latitude, 0) / properties.length;
  return { longitude: lng, latitude: lat };
}

const MAP_STYLES = {
  street: "mapbox://styles/mapbox/streets-v11",
  satellite: "mapbox://styles/mapbox/satellite-streets-v11",
};

export default function PropertyMap({ properties, userLocation, setUserLocation, allowMapClick }) {
  const center = getCenter(properties);

  const [viewport, setViewport] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 5.5,
    width: "100%",
    height: "100%",
  });

  const [mapStyle, setMapStyle] = useState(MAP_STYLES.street);

  // Center on user location if available
  useEffect(() => {
    if (userLocation) {
      setViewport((v) => ({
        ...v,
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
        zoom: 13,
      }));
    }
  }, [userLocation]);

  // Handle map click for user location
  const handleMapClick = allowMapClick
    ? (event) => {
        const [longitude, latitude] = event.lngLat;
        setUserLocation && setUserLocation({ longitude, latitude });
      }
    : undefined;

  const [selected, setSelected] = useState(null);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Map style switch buttons */}
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          top: 20,
          left: 20,
          background: "rgba(255,255,255,0.95)",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: 8,
          display: "flex",
          gap: 8,
        }}
      >
        <button
          className={`px-3 py-1 rounded ${mapStyle === MAP_STYLES.street ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMapStyle(MAP_STYLES.street)}
        >
          Street
        </button>
        <button
          className={`px-3 py-1 rounded ${mapStyle === MAP_STYLES.satellite ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMapStyle(MAP_STYLES.satellite)}
        >
          Satellite
        </button>
      </div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle={mapStyle}
        onViewportChange={setViewport}
        onClick={handleMapClick}
      >
        {properties.map((p) => (
          <Marker key={p.id} longitude={p.longitude} latitude={p.latitude}>
            <div onClick={() => setSelected(p)} style={{ cursor: "pointer", color: "red" }}>📍</div>
          </Marker>
        ))}
        {selected && (
          <Popup
            longitude={selected.longitude}
            latitude={selected.latitude}
            onClose={() => setSelected(null)}
          >
            <div>
              <strong>{selected.title}</strong>
              <div>{selected.price}</div>
            </div>
          </Popup>
        )}
        {userLocation && (
          <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}>
            <div style={{ color: "blue" }}>🧑</div>
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
}