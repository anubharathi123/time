import React, { useState } from "react";
import './header.css';

const App = () => {
    return (
        <div style={{ background: "rgb(248, 249, 250)", minHeight: "100vh" }}>
            <Header />
        </div>
    );
};

const Header = () => {
    const [query, setQuery] = useState(""); // State for search input
    const [suggestions, setSuggestions] = useState([]); // State for suggestions
    const [activeDropdown, setActiveDropdown] = useState(null); // Tracks which dropdown is open

    const notifications = [
        "New announcement created",
        "Company profile updated",
        "Admin added a new user",
        "System maintenance scheduled",
        "New document uploaded",
    ];

    const allSuggestions = [
        "Find Company",
        "Find Documents",
        "Find Admin",
        "Admin List",
        "Company List",
        "Announcement List",
        "Audit Log",
        "Settings",
    ];

    const handleSearchInput = (event) => {
        const value = event.target.value;
        setQuery(value);
        if (value) {
            const filteredSuggestions = allSuggestions.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div className="header-container" style={{ background: "#0b3041", marginLeft:"240px",padding: "10px", width:"1106px", height:"60px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            {/* Search Bar with Suggestions */}
            <div className="search-bar-container">
                <input
                    type="text"
                    value={query}
                    onChange={handleSearchInput}
                    className="search-input"
                />
                <img src={require ('./images/search_icon.png')} alt="search_icon" className="search_icon"></img>
                {suggestions.length > 0 && (
                    <ul className="search-suggestions">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="suggestion-item"
                                onClick={() => {
                                    setQuery(suggestion);
                                    setSuggestions([]);
                                }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}

                {query && suggestions.length === 0 && (
                    <p className="no-suggestions">No suggestions found</p>
                )}
            </div>

            {/* Notification Button */}
            <button
                type="button"
                className="notificationbtn"
                onClick={() => setActiveDropdown(activeDropdown === "notification" ? null : "notification")}
            >
                <img
                    src={require('./images/notification-icon.png')}
                    alt="Notifications"
                    className="notification-icon"
                />
            </button>

            {/* Notification Dropdown */}
            {activeDropdown === "notification" && (
                <div className="notification-dropdown">
                    <button
                        type="button"
                        className="close-button"
                        onClick={() => setActiveDropdown(null)}
                    >
                        &times;
                    </button>
                    <ul className="notification-list">
                        {notifications.map((notification, index) => (
                            <li key={index} className="notification-item">
                                {notification}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Profile Button */}
            <button
                type="button"
                className="profilebtn"
                onClick={() => alert("Profile clicked!")}
            >
                <img
                    src={require('./images/candidate-profile.png')}
                    alt="Candidate profile"
                    className="profile-image"
                />
            </button>
        </div>
    );
};

export default App;
