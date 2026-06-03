import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAll } from '../../store/allproducts';
import Search from '../Search/index';

import downArrow from "../../images/down-arrow.svg";
import './consumerpg.css';


const ConsumerPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const allgroup = useSelector(state => state.allproducts.all)
    const all = allgroup?.all
    const [term, setTerm] = useState('')


    useEffect(() => {
       dispatch(getAll(user.id))
    }, [dispatch])

    ////////////LOGIC FOR SEARCH
    const callback = (term ) => {
        setTerm(term)
    }

    const filterIt = (item, searchTerm) => {
        return item?.name.toLowerCase().includes(searchTerm.toLowerCase())
                || item?.company_name.toLowerCase().includes(searchTerm.toLowerCase())
                || item?.product_category.toLowerCase().includes(searchTerm.toLowerCase())
    }


    const searchResults = all?.filter((item) => filterIt(item, term))?.map((item, j) => {
        return (
            <div className='item-container'>
                <div className='single-company-products'>
                    <h3>{item.company_name}</h3>
                    <div className='product-photo_cp'>
                        <img src={item.photo_url} alt="product image"/>
                    </div>
                    <div className='p-name-contain'>
                        <h2 key={j} className='prod-name'>{item.name}</h2>
                    </div>
                </div>
                <div className='prod-info'>
                    <div className='footprint'>
                        Carbon Footprint:
                        <p>{item.carbon_footprint_kg} kg CO<span>&#8322;</span>e</p>
                    </div>
                    <div className='returnable'>
                        Returnable at the end of life?
                        {item.returnable === true ?
                        <p>Yes, this item can be returned <br></br>to {item.company_name}.</p> :
                        <p>No, please consider repairing or recycling.</p>}
                    </div>
                </div>
            </div>
        )
    })



    return (
        <div className='consumer-page-container'>
            <div className='consumer-page-content'>
                <div className='blurb-search'>
                    <div className='consumer-blurb'>
                        <p>Check out the Carbon Scores<br></br>of your favorite company's products.</p>
                        <div className='arrow-img bounce3'>
                            <img className='arrow' src={downArrow} alt='arrow'/>
                        </div>
                    </div>

                    <div className='search-container'>
                        <Search callback={callback}/>
                        {/* <form className='search-form' onSubmit={handleSearch}>
                            <input
                            type="text"
                            placeholder='Search for a Company or Product'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            >
                            </input>
                        </form> */}
                    </div>
                </div>

                <div className='all-prod-container'>
                {searchResults}
                </div>

            </div> {/* end consumer-page-content*/}
        </div>
    )
}

export default ConsumerPage;
