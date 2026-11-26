import './Search.css';
import React from 'react';

class Search extends React.Component
{
    state =
    {
        search:"",
        type:"All",
        page:1
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

    prevPage = () => 
    {
        this.setState
        (
            () => ({        page: this.state.page > 1
                                ? this.state.page - 1
                                : 1
                    }),
            () => this.props.searchMovie(this.state.search, this.state.type, this.state.page)
        );
    }

    nextPage = () => 
    {
        this.setState(
            ({ page }) => ({ page: page + 1 }),
            () => this.props.searchMovie(
                this.state.search,
                this.state.type,
                this.state.page
            ));
    }

    setPage = (num) =>
    {
        this.setState
        (
            ()=> ({page:num}),
            ()=> this.props.searchMovie(this.state.search, this.state.type, this.state.page)
        );
    }
    render()
    {
        let itemsPerPage = 10;
        let visiblePagesCount = 5;

        let totalPages = Math.ceil(this.props.totalItems / itemsPerPage);
        let half = Math.floor(visiblePagesCount / 2);



        let firstPage = Math.max(1, this.state.page - half);
        let lastPage = firstPage + visiblePagesCount - 1;


        // Не позволяем последней странице выйти за totalPages
        if (lastPage > totalPages) 
            {
            lastPage = totalPages;
            firstPage = Math.max(1, lastPage - visiblePagesCount + 1);
            }



        const visiblePages = [];

        for (let page = firstPage; page <= lastPage; page++) {
            visiblePages.push(page);
        }

        // const lastIndex = totalPages <= 10 ? totalPages + 1 : this.state.page + itemsPerPage;
        // const firstIndex = totalPages <= 10 ? lastIndex - itemsPerPage + lastIndex + 1 : lastIndex - itemsPerPage;

        // let num =[];
        // for(let i = 0; i < totalPages; ++i)
        // {
        //     num.push(i);
        // }


        return(
            <div>
                <div className="search">
                    <input  type='search'
                            placeholder="Поиск"
                            value={this.state.search}
                            onChange={(e) => this.setState({search:e.target.value})}
                            onKeyUp={this.handlKey}
                    />
                    <button onClick={() => this.props.searchMovie(this.state.search, this.state.type)} className="btn">
                        Поиск
                    </button>
                </div>
                <div className='radio'>
                        <label><input  type='radio' name='category' data-type='all'    checked={this.state.type==='all'}      onChange={this.hendlerFilter}/>All</label>
                        <label><input  type='radio' name='category' data-type='movie'  checked={this.state.type==='movie'}    onChange={this.hendlerFilter}/>Movie</label>
                        <label><input  type='radio' name='category' data-type='series' checked={this.state.type==='series'}   onChange={this.hendlerFilter}/>Series</label>
                        <label><input  type='radio' name='category' data-type='game'   checked={this.state.type==='game'}     onChange={this.hendlerFilter}/>Game</label>
                </div>
                <div className="pagination">
                    <button className="btn" onClick={this.prevPage}>Prev</button>
                    {/* <div className="page-numbers">
                        {
                            num.slice(firstIndex, lastIndex).map
                            (
                                (pageNumber, index) =>
                                (
                                    <button className={`btn ${this.state.page === pageNumber ? 'active-page' : ''}`}
                                            key={index}
                                            onClick={()=> this.setPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                )
                            )
                        }
                    </div> */}
                    <div className="page-numbers">
                        {visiblePages.map(pageNumber => (
                            <button
                                className={`btn ${
                                    this.state.page === pageNumber ? 'active-page' : ''
                                }`}
                                key={pageNumber}
                                onClick={() => this.setPage(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                    <button className="btn" onClick={this.nextPage}>Next</button>
                </div>
                    
            </div>
        );
    };
};

export default Search;
 