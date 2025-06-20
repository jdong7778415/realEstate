import { useState, useMemo } from "react";
import { properties } from "../data/properties";
import PropertyMap from "../components/PropertyMap";
import PropertyCard from "../components/PropertyCard";

const PAGE_SIZE = 6;

// Helper to get nearby properties within 5km
function getNearbyProperties(properties, userLocation, maxDistanceKm = 5) {
  if (!userLocation) return properties;
  return properties.filter((p) => {
    const dx = (p.latitude - userLocation.latitude) * 111;
    const dy = (p.longitude - userLocation.longitude) * 85;
    return Math.sqrt(dx * dx + dy * dy) < maxDistanceKm;
  });
}

export default function PropertyMapPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [askLocation, setAskLocation] = useState(true);
  const [page, setPage] = useState(1);

  // Memoize filtered properties for performance
  const nearby = useMemo(
    () => getNearbyProperties(properties, userLocation),
    [userLocation]
  );

  const totalPages = Math.ceil(nearby.length / PAGE_SIZE);
  const pagedProperties = nearby.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setAskLocation(false);
          setPage(1); // Reset to first page after locating
        },
        (err) => {
          alert("Location failed: " + err.message);
          setAskLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setAskLocation(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      {/* Main content: map and property cards */}
      <div className="flex flex-row flex-1 w-full">
        {/* Left: Map */}
        <div className="w-2/3 p-4" style={{ height: "calc(100vh - 80px)" }}>
          <PropertyMap
            properties={properties}
            userLocation={userLocation}
            setUserLocation={askLocation ? undefined : setUserLocation}
            allowMapClick={!askLocation}
          />
        </div>
        {/* Right: 2x3 property cards */}
        <div className="w-1/3 p-4 flex flex-col">
          <div className="grid grid-cols-2 gap-4 content-start flex-1">
            {pagedProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          {/* Pagination controls */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Location consent button below the map */}
      {askLocation && (
        <div className="w-full flex justify-center my-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
            onClick={handleLocate}
          >
            Allow location and recommend nearby properties
          </button>
        </div>
      )}
    </div>
  );
}