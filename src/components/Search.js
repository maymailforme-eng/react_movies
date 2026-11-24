import './Search.css';
import React from 'react';

class Search extends React.Component
{
    state =
    {
        search:"",
        type:"All"
    };
    handlKey = (event) =>
    {
        if(event.key==='Enter')
        {
            this.props.searchMovie(this.state.search, this.state.type);
        }
    }

    hendlerFilter = (event) =>
    {
        this.setState
        (
               ()=>({type:event.target.dataset.type}),
               ()=>({search:this.props.searchMovie(this.state.search, this.state.type)})
        )
    }

    render()
    {
        return(
            <div>
                <div className="search">
                    <input  type='search'
                            placeholder="Поиск"
                            value={this.state.search}
                            onChange={(e) => this.setState({search:e.target.value})}
                            onKeyUp={this.handlKey}
                    />
                    <button onClick={() => this.props.searchMovie(this.state.search, this.state.type)}>
                        Поиск
                    </button>
                </div>
                <div className='radio'>
                        <label><input  type='radio' name='category' data-type='all'    checked={this.state.type==='all'}      onChange={this.hendlerFilter}/>All</label>
                        <label><input  type='radio' name='category' data-type='movie'  checked={this.state.type==='movie'}    onChange={this.hendlerFilter}/>Movie</label>
                        <label><input  type='radio' name='category' data-type='series' checked={this.state.type==='series'}   onChange={this.hendlerFilter}/>Series</label>
                        <label><input  type='radio' name='category' data-type='game'   checked={this.state.type==='game'}     onChange={this.hendlerFilter}/>Game</label>
                    </div>
            </div>
        );
    };
};

export default Search;
 