import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import PropTypes from 'prop-types';
import store from './store';
import { fetchNextSong, fetchPreviousSong } from './actions/songAction';


export class App extends Component {


    state = {
        songs: [],
        lastPage: false,
        playButton: true,
        currentTrack: 0
    }

    updateCurrentTrack() {
        this.setState({ currentTrack: store.getState().playerReducer.songCounter} );
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
        this.updateCurrentTrack();
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
        return (
            <li className="song" >
                <audio controls>
                    <source src={`https://drive.google.com/uc?export=view&id=${props.song.id}`}></source>
                </audio>
                <span style={textCenter}>{props.song.name}</span>
            </li>);
    }


    play = param => () => {
        const audio = document.querySelector('audio');
        audio.addEventListener('timeupdate', this.updateCurrTime);
        //const source = document.querySelector('source');
        if (audio) {
            if (!audio.paused) {
                audio.pause();
                this.setState({ playButton: true });
            } else {
                audio.play();
                this.setState({ playButton: false });
            }
        }
    }

    nextSong() {
        store.dispatch(fetchNextSong());
        this.updateCurrentTrack();
    }

    previousSong() {
        store.dispatch(fetchPreviousSong());
        this.updateCurrentTrack();
    }


    updateCurrTime() {
        const audio = document.querySelector('audio');

        let curMinutes = Math.floor(audio.currentTime / 60);
        let curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        let durMinutes = Math.floor(audio.duration / 60);
        let durSeconds = Math.floor(audio.duration - durMinutes * 60);

        let playProgress = (audio.currentTime / audio.duration) * 100;

        if (curMinutes < 10)
            curMinutes = '0' + curMinutes;
        if (curSeconds < 10)
            curSeconds = '0' + curSeconds;

        if (durMinutes < 10)
            durMinutes = '0' + durMinutes;
        if (durSeconds < 10)
            durSeconds = '0' + durSeconds;
        const progressBar = document.querySelector('#progress-bar');
        progressBar.style.width = playProgress + '%';
    }



    render() {
        return (
            <div className="App">
            <h1>{this.state.currentTrack}</h1>
                <div id="background-cover"></div>
                <div id="cover"></div>
                <div id="player">
                    <div id="progress-bar"></div>
                    <div id="player-controls">
                        <div className="control" onClick={() => this.previousSong()}>
                            <div id="previous-button">
                                <i className="fas fa-backward"></i>
                            </div>
                        </div>
                        <div className="control">
                            <div id="play-button" onClick={this.play()}>
                                {<i className={this.state.playButton ? 'fas fa-play' : 'fas fa-pause'}></i>}
                            </div>
                        </div>
                        <div className="control" onClick={() => this.nextSong()}>
                            <div id="next-button">
                                <i className="fas fa-forward"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <audio>
                    <source src={`https://drive.google.com/uc?export=view&id=1a-zUC5uhiNH3BRTBUcWL-eJ7hO6xpx50`}></source>
                </audio>
                {/* <Search /> */}
                {/* <div className="demo-list-action mdl-list">
                    {
                        this.state.songs.map((song, index) => {
                            return <ul id="songs"><this.listItem key={index} song={song} /></ul>
                        })
                    }
                </div> */}
            </div>
        );
    }
}

App.propTypes = {
    songCounter: PropTypes.object
};