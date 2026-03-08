import React, { useEffect, useState } from 'react';
import Layouts from './common/Layouts';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiUrl } from './common/http';

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [catChecked, setCatChecked] = useState([]);
    const [brandChecked, setBrandChecked] = useState([]);


    const fetchCategories = async ()=> {
        await fetch(apiUrl+`/get_categories`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(result => {
            if(result.status == 200){
              setCategories(result.data);
            }else{
                $error = "Data not Found";
            }
        });
    }


    const fetchBrands = async ()=> {
        await fetch(apiUrl+`/get_brands`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(result => {
            if(result.status == 200){
              setBrands(result.data);
            }else{
                $error = "Data not Found";
            }
        });
    }


    const fetchProducts = async ()=> {
        let search = [];
        let params = '';

        if(catChecked.length > 0){
            search.push(['category', catChecked])
        }


        if(brandChecked.length > 0){
            search.push(['brand', brandChecked])
        }


        if(search.length > 0){
            params = new URLSearchParams(search)
        }

        await fetch(apiUrl+`/get_products?${params}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(result => {
            if(result.status == 200){
              setProducts(result.data);
            }else{
                error = "Data not Found";
            }
        });
    }


    const handleCategory = (e)=>{
        const {checked, value} = e.target;
        if(checked){
            setCatChecked(prev => [...prev, value])
        }else{
            setCatChecked(catChecked.filter(id => id != value))
        }
    }


    const handleBrand = (e)=>{
        const {checked, value} = e.target;
        if(checked){
            setBrandChecked(prev => [...prev, value])
        }else{
            setBrandChecked(brandChecked.filter(id => id != value))
        }
    }

    useEffect(()=>{
        fetchCategories();
        fetchBrands();
        fetchProducts();
    }, [catChecked, brandChecked]);


    return (
        <div>
            <Layouts>
                
                <Container>
                    <nav aria-label="breadcrumb" className='py-4'>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page"><Link to="/shop">Shop</Link></li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-md-3">
                            {/* Category  */}
                            <div className="card shadow border-0 mb-3">
                                <div className="card-body p-4">
                                    <h3 className='mb-3'>Category</h3>
                                    <ul>
                                        {
                                            categories && categories.map(category =>{
                                                return(
                                                    <li className='mb-2' key={`cat-${category.id}`}>
                                                        <input type="checkbox" value={category.id}
                                                        onClick={handleCategory}
                                                        />
                                                        <label htmlFor="" className='ps-2'>{category.name}</label>
                                                    </li>
                                                )
                                            })
                                        }
                                        
                                    </ul>
                                </div>
                            </div>


                            {/* Brands  */}
                            <div className="card shadow border-0 mb-3">
                                <div className="card-body p-4">
                                    <h3 className='mb-3'>Brands</h3>
                                    <ul>
                                        {
                                            brands && brands.map(brand =>{
                                                return(
                                                    <li className='mb-2' key={`brand-${brand.id}`}>
                                                        <input type="checkbox" value={brand.id}
                                                        onClick={handleBrand}
                                                        />
                                                        <label htmlFor="" className='ps-2'>{brand.name}</label>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-9">
                            <div className="row pb-5">

                                {
                                    products && products.map(product =>{
                                        return(
                                            <div className="col-md-4 col-6" key={`product-${product.id}`}>
                                                <div className="product card border-0">
                                                    <div className="card-img">
                                                        <Link to={`/product/${product.id}`}>
                                                            <img src={product.image_url} alt="" className='w-100'/>
                                                        </Link>
                                                    </div>
                    
                                                    <div className="card-body pt-3">
                                                        <Link to={`/product/${product.id}`}>{product.title}</Link>
                                                        <div className="price d-flex gap-2">
                                                            <h3 className='text-black fw-bold'>{product.price}</h3>

                                                            {
                                                                product.compare_price && <span className='text-decoration-line-through'>{product.compare_price}</span>
                                                            }          
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            

                          
                            </div>
                        </div>
                    </div>
                </Container>
            </Layouts>
            
        </div>
    );
};

export default Shop;