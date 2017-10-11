import React from 'react';

export function addOptions (categories) {
    if(categories) {
        return Object.entries(categories).map(([key, value], index) => {
            return (
                <option key={index} value={value}>{key}</option>
            )
        })
    }
}