import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import PropTypes from 'prop-types';
import store from './store';
import { fetchNextSong, fetchPreviousSong, loadTotalSongs } from './actions/songAction';


export class App extends Component {


    state = {
        songs: [],
        lastPage: false,
        playButton: true,
        currentSong: ""
    }


    constructor() {
        super();
    }

    componentDidMount() {
        this.loadSongs().then(() => {
            const audio = document.querySelector('audio');
            this.setState({ currentSong: this.generateGoogleDriveUrl(store.getState().playerReducer.songCounter) });
            audio.load();
        });
    }

    generateGoogleDriveUrl(id) {
        return `https://drive.google.com/uc?export=view&id=${this.state.songs[id].id}`;
    }

    loadSongs() {
        return axios.get('https://localhost/googledriveapi/api/files').then((result) => {
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
            store.dispatch(loadTotalSongs(songs.length));
        });
    }


    play = param => () => {
        const audio = document.querySelector('audio');

        audio.addEventListener('timeupdate', this.updateCurrTime);

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

    loadNewTrack() {
        const audio = document.querySelector('audio');
        audio.pause();
        this.setState({ currentSong: this.generateGoogleDriveUrl(store.getState().playerReducer.songCounter) });
        audio.load();
        audio.play().then(() => { }, (err) => { });
        this.setState({ playButton: false });
    }

    nextSong() {
        store.dispatch(fetchNextSong());
        this.loadNewTrack();
    }

    previousSong() {
        store.dispatch(fetchPreviousSong());
        this.loadNewTrack();
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
                <h1>{`${store.getState().playerReducer.songCounter + 1} / ${store.getState().playerReducer.totalSongs}`}</h1>
                <div id="background-cover"></div>
                <div id="player-container">
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
                </div>
                <audio>
                    <source src={`${this.state.currentSong}`}></source>
                </audio>
            </div>
        );
    }
}

App.propTypes = {
    songCounter: PropTypes.object
};