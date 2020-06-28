/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            allList: [],
            filteredList: [],
            input: '',
        };

        fetch('http://localhost:3035/', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            //.then(response => {this.state.name = response;})
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                console.log(responseData);
                return responseData;
            })
            .then(data => {
                this.setState({ "allList": data });
            })
            .catch(err => {
                console.log("fetch error" + err);
            });

        this.allProduct = this.allProduct.bind(this);
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {

        // Start Here
        // ...
        let filteredResult = [];
        if (e) {
            filteredResult = this.state.allList.filter((singleElement) => {
                return singleElement.name.toLowerCase().includes(e.target.value.toLowerCase())
            });
        }
        if (filteredResult.length == 0) {

        }
        this.setState({ "filteredList": filteredResult });

    }

    filteredProduct() {
        return this.state.filteredList.map(data => {
            return (
                <div class="col-sm-4 py-2">
                    <div class="card h-100 border-primary">
                        <img class="card-img-top" src={data.picture} style={{ maxHeight: '25px', maxWidth: '18px' }} />

                        <div class="card-body">
                            <h3 class="card-title">{data.name}</h3>
                            <p class="card-text">{data._id}</p>
                            <a href="#" class="btn btn-outline-secondary">Buy</a>
                        </div>
                    </div>
                </div>
            )
        });
    }

    allProduct() {
        return this.state.allList.map(data => {
            return (
                <div class="col-sm-4 py-2">
                    <div class="card h-100 border-primary">
                        <img class="card-img-top" src={data.picture} style={{ maxHeight: '25px', maxWidth: '18px' }} />

                        <div class="card-body">
                            <h3 class="card-title">{data.name}</h3>
                            <p class="card-text">{data._id}</p>
                            <a href="#" class="btn btn-outline-secondary">Buy</a>
                        </div>
                    </div>
                </div>
            )
        });
    }


    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} />

                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>


                    <div class="container">
                        <h5>---Filtered Product-------</h5>
                        <div class="row">
                            {this.filteredProduct()}
                        </div>
                        {this.state.filteredList && this.state.filteredList.length == 0 && (
                            <h5>---Not Searched any Product----</h5>
                        )}
                    </div>

                    <div class="container">
                        <h5>--All Product---</h5>
                        <div class="row">
                            {this.allProduct()}
                        </div>
                    </div>

                </div>
            </header >
        );
    }


}

// Export out the React Component
module.exports = Menu;