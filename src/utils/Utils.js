import React from 'react';

/**
 * @description take a list of categories and create drop down options
 * @param { array } categories
 * @return drop down option list
 */
export function addOptions (categories) {
    if(categories) {
        return Object.entries(categories).map(([key, value], index) => {
            return (
                <option key={index} value={value}>{key}</option>
            )
        })
    }
}