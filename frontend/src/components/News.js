import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'

const News = (props) => {
    const [articles, setarticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const updateNews = async () => {
        setLoading(true)
        let dataFetcherFromBackend = async () => {
            let dataOfBackend = await axios.post('/postreq', {
                country: props.country,
                category: props.category,
                page: page,
                pageSize: props.pageSize
            })
            return dataOfBackend
        }
        let backendData = await dataFetcherFromBackend()
        let parsedData = backendData.data
        setarticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }


    useEffect(() => {
        document.title = `${capitalFirstLetter(props.category)} - NewsGorilla`
        updateNews()
    }, [])

    // const handlePrevClick = async () => {
    //     setPage(page-1)
    //     updateNews()
    // }

    // const handleNextClick = async () => {
    //     setPage(page+1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {
        let dataFetcherFromBackend = async () => {
            let dataOfBackend = await axios.post('/postreq', {
                country: props.country,
                category: props.category,
                page: page + 1,
                pageSize: props.pageSize
            })
            return dataOfBackend
        }
        let backendData = await dataFetcherFromBackend()
        let parsedData = backendData.data
        setPage(page + 1)
        setarticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    return (
        <div className='container my-3'>
            <h1 className='text-center' style={{ marginTop: '80px' }}>NewsGorilla - Top {capitalFirstLetter(props.category)} headlines</h1>
            {/* {loading && <Spinner />} */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>

                <div className="container">
                    <div className="row">
                        {/* {!loading && articles.map((element) => { */}
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container-2 d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>

                </div> */}
        </div>
    )
}
News.defaultProps = {
    pageSize: 6,
    country: 'in',
    category: 'general'
}
News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
}
export default News