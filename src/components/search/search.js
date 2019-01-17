
import React from 'react';
import './search.css';

export class Search extends React.Component {
    render() {
        return (
            <div class="wrap">
                <div className="search">
                    <input type="text" class="searchTerm" placeholder="What are you looking for?" />
                    <button type="submit" class="searchButton">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        )
    }
}