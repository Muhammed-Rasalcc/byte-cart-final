import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCards from '../shop/ProductCards'

import products from '../../data/products.json'

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter((product) => product.category === categoryName.toLowerCase()
    );

    setfilteredProducts(filtered);

  }, [categoryName])
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>{categoryName}</h2>
        <p className='section__subheader'>Discover the perfect finishing touches to your outfit with our stunning collection of ladies' accessories. From chic handbags and elegant jewelry to stylish scarves and trendy sunglasses, we have everything you need to elevate your style.
        </p>

      </section>

      {/* product card */}
      <div className='section__container'>
        <ProductCards products={filteredProducts} />
      </div>
    </>
  )
}

export default CategoryPage
