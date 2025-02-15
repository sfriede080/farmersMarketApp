import React from "react";
import '../styles.css';

export default function Header() {
    return (
        <div className='header'>
            <img className='logo' src = '../logo1(smaller).png' alt='Lily & Loaves'/>
            <h2 className = 'app-subtitle'> Homemade baked goods and pastries. </h2>
        </div>
    )
}