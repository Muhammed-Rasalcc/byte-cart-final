import React, { useState } from 'react'

import productsData from '../../data/products.json'
import ProductCards from '../shop/ProductCards';

const Search = () => {
    const [searchQuery, SetSearchQuery] = useState('');
    const [filteredProducts, setfilteredProducts] = useState(productsData);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();

        const filtered = productsData.filter(product => product.name.toLowerCase().includes
            (query) || product.description.toLowerCase().includes(query));

        setfilteredProducts(filtered)
    }
    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Search Products</h2>
                <p className='section__subheader'>Discover the perfect finishing touches to your outfit with our stunning collection of ladies' accessories. From chic handbags and elegant jewelry to stylish scarves and trendy sunglasses, we have everything you need to elevate your style.
                </p>
            </section>

            <section className='section__container'>
                <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
                    <input type='text'
                    value={searchQuery}
                    onChange={(e) => SetSearchQuery(e.target.value)}
                    className='search-bar w-full max-w-4xl p-2 border rounded'
                    placeholder='search for products....'/>

                    <button 
                    onClick={handleSearch}
                    className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white 
                    rounded'>Search</button>
                </div>
                <ProductCards products={filteredProducts}/>
            </section>
        </>
    )
}

export default Search
