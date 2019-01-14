import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
class App extends Component {
    state = {
        songs: [],
        lastPage: false
    }


    constructor() {
        window.onscroll = () => {
            // Bails early if:
            // * there's an error
            // * it's already loading
            // * there's nothing left to load
            if (this.state.lastPage) return;
            // Checks that the page has scrolled to the bottom
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                // you're at the bottom of the page
                console.log("bottom page");
                this.loadSongs();
            }
        };
        super();
    }

    componentDidMount() {
        this.loadSongs()
    }

    loadSongs() {
        axios.get('https://localhost/googledriveapi/api/files').then((result) => {
            let songs = 0;
            if (result.data.length < 20) {
                this.setState({ lastPage: true });
            }
            if (this.state.songs.length > 0) {
                songs = this.state.songs.concat(result.data);
            } else {
                songs = result.data;
            }
            this.setState({ songs: songs });
        });
    }

    

    listItem = (props) => {
        const textCenter = {
            textAlign: 'center'
        };
        return (<div>
            <List component="nav" style={textCenter}>
                <audio controls>
                    <source src={`https://drive.google.com/uc?export=view&id=${props.song.id}`}></source>
                </audio>
                <ListItem button>
                    <ListItemText primary={props.song.name} style={textCenter} />
                </ListItem>
            </List></div>);
    }



    render() {
        return (
            <div className="App">
                <div className="demo-list-action mdl-list">
                    {
                        this.state.songs.map((song, index) => {
                            return <this.listItem key={index} song={song} />
                        })
                    }

                </div>

            </div>

        );
    }
}

export default App;
