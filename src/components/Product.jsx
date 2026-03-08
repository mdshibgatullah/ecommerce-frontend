import React, { useContext, useEffect, useState } from 'react';
import Layouts from './common/Layouts';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import { Rating } from 'react-simple-star-rating';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { apiUrl } from './common/http';
import { CartContext } from './context/Cart';
import { toast } from 'react-toastify';

const Product = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating] = useState(4);

    const [product, setProduct] = useState(null);
    const [productImage, setProductImages] = useState([]);   
    const [productSizes, setProductSizes] = useState([]);    
    const [sizeSelected, setSizeSelected] = useState(null);    
    const [error, setError] = useState('');

    const {addToCart} = useContext(CartContext)

    const { id } = useParams();

    const fetchProduct = async () => {
        try {
            const res = await fetch(`${apiUrl}/get_product/${id}`);
            const result = await res.json();

            if (result.status === 200) {
                            
            console.log(result.data.product_sizes);
                setProduct(result.data);
                setProductImages(result.data.product_images);
                setProductSizes(result.data.product_sizes);
            } else {
                setError("Data not found");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };



    
    const handleAddToCart = ()=>{
        if(productSizes.length > 0){
            if(sizeSelected == null){
                toast.error("Please select a size")
            }else{
                addToCart(product, sizeSelected);
                toast.success("Product added successfully")
            }
        }else{
            addToCart(product, null)
            toast.success("Product added successfully")
        }

    }

    

    useEffect(() => {
        fetchProduct();
    }, [id]);
    

    return (
        <Layouts>
            <Container className="product-detail">

                {/* Breadcrumb */}
                <div className="row">
                    <div className="col-md-12">
                        <nav className="py-4">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
                                <li className="breadcrumb-item active">
                                    {product?.title || "Product"}
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                {error && <p className="text-danger">{error}</p>}

                {product && (
                    <div className="row mb-5">

                        {/* LEFT IMAGE */}
                        <div className="col-md-5">
                            <div className="row">

                                {/* Thumbnail */}
                                <div className="col-12 col-md-2 order-2 order-md-1 mt-3 mt-md-0">
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        freeMode
                                        watchSlidesProgress
                                        style={{ height: "500px" }}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        breakpoints={{
                                                0: {
                                                    direction: "horizontal",
                                                },
                                                768: {
                                                    direction: "vertical",
                                                },
                                            }}
                                    >
                                        {productImage.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={image.image_url}
                                                    alt=""
                                                    className="img-fluid"
                                                    style={{
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        borderRadius: "6px",
                                                        cursor: "pointer"
                                                    }}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                {/* Main Image */}
                                <div className="col-12 col-md-10 order-1 order-md-2">
                                    <Swiper
                                        navigation
                                        thumbs={{
                                            swiper:
                                                thumbsSwiper &&
                                                !thumbsSwiper.destroyed
                                                    ? thumbsSwiper
                                                    : null
                                        }}
                                        style={{ height: "500px" }}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                    >
                                        {productImage.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={image.image_url}
                                                    alt=""
                                                    className="w-100"
                                                    style={{
                                                        height: "500px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px"
                                                    }}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="col-md-7">
                            <h2>{product.title}</h2>

                            {product.short_description && (
                                <p className="text-muted">
                                    {product.short_description}
                                </p>
                            )}

                            <div className="d-flex gap-2 align-items-center">
                                <Rating initialValue={rating} readonly size={20} />
                                <span>10 Reviews</span>
                            </div>

                            <div className="price d-flex gap-2 mt-2">
                                <h3 className="fw-bold">{product.price}</h3>
                                {product.compare_price && (
                                    <span className="text-decoration-line-through text-muted">
                                        {product.compare_price}
                                    </span>
                                )}
                            </div>

                            {/* SIZE */}
                            <div className="sizes pt-3">
                                <strong>Select Size</strong><br />
                                {productSizes.length > 0 ? (
                                    productSizes.map((proSize, index) => (
                                        <button
                                            onClick={()=> setSizeSelected(proSize?.size.name)}
                                            className={`btn btn-size ms-1 mt-2 ${sizeSelected == proSize?.size.name ? 'active' : ''}`}
                                            key={index}
                                        >
                                            {proSize.size?.name}
                                        </button>
                                    ))
                                ) : (
                                    <span className="text-muted">No size available</span>
                                )}
                            </div>

                            <div className="my-3">
                                <button
                                onClick={()=> handleAddToCart()}
                                 className="btn btn-primary">
                                    Add To Cart
                                </button>
                            </div>

                            <hr />

                            <div>
                                <strong>SKU:</strong> {product.sku}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="row pb-5">
                    <div className="col-md-12">
                        <Tabs defaultActiveKey="description">
                            <Tab eventKey="description" title="Description">
                                <div dangerouslySetInnerHTML={{__html:product?.description}}></div>
                                
                            </Tab>
                            <Tab eventKey="reviews" title="Reviews (10)">
                                Review content
                            </Tab>
                        </Tabs>
                    </div>
                </div>

            </Container>
        </Layouts>
    );
};

export default Product;
