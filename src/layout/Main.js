import React from 'react';
import './Main.css';
import MovieList from '../components/MovieList.js';
import Preloader from '../components/Preloader.js';
import Search from '../components/Search.js';


class Main extends React.Component
{
    state =
    {
        movies:[],
        count:0
    }
    
    componentDidMount()
    {
        //эта функция неявно неявно вызываеться когда компонент смонтировался на страницу
        fetch('https://www.omdbapi.com/?s=The%20Transporter&apikey=fcdc0762')
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search, count:data.totalResults}))
    }

    searchMovie=(str, type='all', page) =>
    {
         fetch(`https://www.omdbapi.com/?s=${str}${type !== 'all' ? `&type=${type}` :''}${`&page=${page}`}&apikey=fcdc0762`)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search, count:data.totalResults}))
    }
    render()
    {
        return (
            <main >
                <Search searchMovie={this.searchMovie} totalItems={this.state.count}/>
                {   
                    this.state.movies == null ? <h1>Введите поисковый запрос</h1>:
                    this.state.movies.length==0 ?
                    <Preloader /> :
                    <MovieList movies={this.state.movies}/>
                }
            </main>
        );
    }
}

export default Main;