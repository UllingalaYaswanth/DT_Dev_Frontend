import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import tower_img from '../../img/icons8-radio-tower-48.png';
import downArrow from '../../../assets/images/down_arrow.png';

const towersData = [
    { id: 1, position: [17.6868, 83.2185], city: 'Visakhapatnam' },
    { id: 2, position: [17.6889, 83.2182], city: 'Visakhapatnam' },
    { id: 3, position: [28.7041, 77.1025], city: 'Delhi' },
    { id: 4, position: [28.5355, 77.3910], city: 'Noida' },
    { id: 5, position: [9.702241, 76.65465], state: "Mutholi", city: 'Kerala', towerid: 'IN-1049705' },
    { id: 6, position: [9.645845, 76.5483], state: "Thellakom", city: 'Kerala', towerid: 'IN-1135215' },
    // More towers...
];

const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [map, center, zoom]);

    return null;
};

const createDefaultIcon = () => {
    return L.icon({
        iconUrl: tower_img,
        iconSize: [30, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
        shadowSize: [41, 41],
    });
};

const Locations = () => {
    const [position, setPosition] = useState([20.5937, 78.9629]); // Default map position
    const [zoomLevel, setZoomLevel] = useState(5); // Default zoom level
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedTowerId, setSelectedTowerId] = useState(null);
    const [cityTowerList, setCityTowerList] = useState({});
    const [openCity, setOpenCity] = useState(null); // Keeps track of the currently open city dropdown
    const [activeCity, setActiveCity] = useState(null); // Active city state
    const [activeTower, setActiveTower] = useState(null); // Active tower state
    const markerRefs = useRef({});

    const cities = [...new Set(towersData.map((tower) => tower.city))]; // Extract unique cities

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    
        if (query === '') {
            // Clear suggestions and grouped city list when the search bar is empty
            setFilteredSuggestions([]);
            setCityTowerList({});
            return;
        }
    
        // Filter only based on towerid
        const suggestions = towersData.filter(
            (tower) => tower.towerid && tower.towerid.toString().toLowerCase().includes(query)
        );
    
        setFilteredSuggestions(suggestions);
    
        // Group towers by city
        const groupedByCity = suggestions.reduce((acc, tower) => {
            acc[tower.city] = acc[tower.city] || [];
            acc[tower.city].push(tower);
            return acc;
        }, {});
    
        setCityTowerList(groupedByCity);
    };
    

    const handleCityClick = (city) => {
        if (openCity === city) {
            // Do nothing if the same city is clicked again (keep dropdown open)
            setOpenCity(null);
            return
        }
        setOpenCity(city); // Open the clicked city's dropdown
        setActiveCity(city); // Set the clicked city as active
    };

    const handleTowerClick = (tower) => {
        setPosition(tower.position);
        setZoomLevel(15);
        setSelectedTowerId(tower.id);
        setActiveTower(tower.id); // Set the active tower
    };

    useEffect(() => {
        if (selectedTowerId && markerRefs.current[selectedTowerId]) {
            markerRefs.current[selectedTowerId].openPopup();
        }
    }, [selectedTowerId]);

    return (
        <div className="flex">
            {/* Sidebar for Search */}
            <div className="w-96 h-[90vh] bg-gray-100 p-5 shadow-md overflow-y-auto">
                <label
                    htmlFor="search-tower"
                    className="block mb-2 text-md font-medium text-gray-900 text-center"
                >
                    Search Tower
                </label>
                <input
                    type="text"
                    id="search-tower"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full mt-3 p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search by SiteID ..."
                />
                {Object.keys(cityTowerList).length > 0 && (
                    <div className="mt-4">
                        {Object.entries(cityTowerList).map(([city, towers]) => (
                            <div key={city} className="mb-6">
                                <h3 className="font-bold mb-2">{city}</h3>
                                <ul className="pl-5">
                                    {towers.map((tower) => (
                                        <li
                                            key={tower.id}
                                            onClick={() => handleTowerClick(tower)}
                                            className="cursor-pointer text-blue-500 underline hover:bg-gray-100 p-2"
                                        >
                                            {`Tower ${tower.towerid}`}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
                <h2 className="font-bold mt-4">Select a City</h2>
                {cities.map((city) => (
                    <div key={city}>
                        <button
                            className="w-full hover:bg-gray-300 flex justify-between items-center p-2 rounded-md mb-2"
                            onClick={() => handleCityClick(city)}
                        >
                            <span>{city}</span>
                            <img
                                src={downArrow}
                                alt="Down Arrow"
                                className={`w-4 h-4 transition-transform duration-200 ${
                                    openCity === city ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {openCity === city && (
                            <div className="pl-5">
                                {towersData
                                    .filter((tower) => tower.city === city)
                                    .map((tower) => (
                                        <button
                                            key={tower.id}
                                            onClick={() => handleTowerClick(tower)}
                                            className={`${
                                                activeTower === tower.id
                                                    ? 'bg-gray-300'
                                                    : 'hover:bg-gray-200'
                                            } w-full text-left p-2 rounded-md mb-2`}
                                        >
                                            {tower.towerid} in {tower.state}
                                        </button>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Map Section */}
            <MapContainer
                center={position}
                zoom={zoomLevel}
                style={{ height: '90vh', width: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ChangeView center={position} zoom={zoomLevel} />
                {towersData.map((tower) => (
                    <Marker
                        key={tower.id}
                        position={tower.position}
                        icon={createDefaultIcon()}
                        ref={(ref) => {
                            markerRefs.current[tower.id] = ref;
                        }}
                    >
                        <Popup>{`Tower ${tower.towerid} in ${tower.state}`}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Locations;
