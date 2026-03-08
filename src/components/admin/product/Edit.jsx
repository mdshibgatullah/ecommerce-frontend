import React, { useEffect, useState, useRef, useMemo } from 'react';
import Layouts from '../../common/Layouts';
import { Container } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { adminToken, apiUrl } from '../../common/http';
import JoditEditor from 'jodit-react';
import { FaTimes } from "react-icons/fa";



const Edit = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [checkSizes, setCheckSizes] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [existingImages, setExistingImages] = useState([]);


  const navigate = useNavigate();
  const { id } = useParams();

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || ''
  }), [placeholder]);

  const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm();

  // ================= FETCH PRODUCT DATA =================
  const fetchProduct = async () => {
    try {
      const res = await fetch(`${apiUrl}/products/${id}`, {
        headers: { Authorization: `Bearer ${adminToken()}` }
      });
      const result = await res.json();
      if(result.status === 200){
        setCheckSizes(result.productSizes)
        
        const product = result.data;
        setValue('title', product.title);
        setValue('price', product.price);
        setValue('compare_price', product.compare_price);
        setValue('category', product.category_id);
        setValue('brand', product.brand_id);
        setValue('sku', product.sku);
        setValue('barcode', product.barcode);
        setValue('qty', product.qty);
        setValue('status', product.status);
        setValue('is_featured', product.is_featured);
        setValue('short_description', product.short_description);
        setContent(product.description);
        setExistingImages(product.product_images || []);
      }
    } catch (error) {
      toast.error('Failed to fetch product');
    }
  };

  // ================= FETCH CATEGORIES & BRANDS Sizes =================
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiUrl}/categories`, { headers: { Authorization: `Bearer ${adminToken()}` } });
      const result = await res.json();
      setCategories(result.data || []);
    } catch {
      toast.error('Failed to load categories');
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${apiUrl}/brands`, { headers: { Authorization: `Bearer ${adminToken()}` } });
      const result = await res.json();
      setBrands(result.data || []);
    } catch {
      toast.error('Failed to load brands');
    }
  };


    const fetchSizes = async () => {
      const res = await fetch(`${apiUrl}/sizes`, { headers: { Authorization: `Bearer ${adminToken()}` } });
      const result = await res.json();
      setSizes(result.data);
    };


  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProduct();
    fetchSizes();
  }, []);

  // ================= HANDLE MULTIPLE FILE SELECT =================
  const handleSelectFiles = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Optional: validate files
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB`);
        return false;
      }
      return true;
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  // ================= DELETE SELECTED NEW FILE =================
  const deleteFile = (index) => {
    URL.revokeObjectURL(selectedFiles[index]);
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // ================= DELETE EXISTING IMAGE =================
  const removeExistingImage = (id) => {
    setExistingImages(prev => prev.filter(img => img.id !== id));
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      selectedFiles.forEach(file => URL.revokeObjectURL(file));
    };
  }, [selectedFiles]);

  // ================= UPLOAD SINGLE FILE =================
  const uploadSingleFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${apiUrl}/temp-image`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken()}` },
      body: formData
    });

    const result = await res.json();
    if (result.status === true || result.status === 200) {
      return result.data.id;
    }
    throw new Error('Image upload failed');
  };

  // ================= UPDATE PRODUCT =================
  const updateProduct = async (data) => {
    try {
      setDisable(true);

      // Upload new files in parallel
      const uploadedIds = await Promise.all(selectedFiles.map(file => uploadSingleFile(file)));

      const payload = {
        ...data,
        description: content,
        gallery: uploadedIds,
        old_images: existingImages.map(img => img.id),
      };

      const res = await fetch(`${apiUrl}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      setDisable(false);

      if (result.status === 200) {
        toast.success(result.message);
        navigate('/admin/products');
      } else {
        const formErrors = result.errors || {};
        Object.keys(formErrors).forEach(field => {
          setError(field, { type: 'manual', message: formErrors[field][0] });
        });
      }

    } catch (error) {
      setDisable(false);
      toast.error(error.message || 'Something went wrong');
    }
  };


  return (
    <Layouts>
      <Container>
        <div className="row mb-3">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4>Products / Edit</h4>
            <Link to="/admin/products" className="btn btn-primary">Back</Link>
          </div>

          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <form onSubmit={handleSubmit(updateProduct)}>
              <div className="card shadow">
                <div className="card-body p-4">

                  {/* Title */}
                  <div className="mb-3">
                    <label>Title</label>
                    <input
                      className={`form-control ${errors.title && 'is-invalid'}`}
                      {...register('title', { required: 'Title is required' })}
                    />
                  </div>

                  {/* Category & Brand */}
                  <div className="row">
                    <div className="col-md-6">
                      <label>Category</label>
                      <select className="form-control" {...register('category')} defaultValue="">
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>Brand</label>
                      <select className="form-control" {...register('brand')} defaultValue="">
                        <option value="">Select Brand</option>
                        {brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Short Description */}
                  <div className="mt-3">
                    <label>Short Description</label>
                    <textarea className="form-control" {...register('short_description')} />
                  </div>

                  {/* Description */}
                  <div className="mt-3">
                    <label>Description</label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      onBlur={newContent => setContent(newContent)}
                      onChange={newContent => setContent(newContent)}
                    />
                  </div>

                  {/* Price */}
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Price</label>
                      <input type="number" className="form-control" {...register('price')} />
                    </div>
                    <div className="col-md-6">
                      <label>Discount Price</label>
                      <input type="number" className="form-control" {...register('compare_price')} />
                    </div>
                  </div>

                  {/* SKU & Barcode */}
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>SKU</label>
                      <input className="form-control" {...register('sku')} />
                    </div>
                    <div className="col-md-6">
                      <label>Barcode</label>
                      <input className="form-control" {...register('barcode')} />
                    </div>
                  </div>

                  {/* Qty & Status */}
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Quantity</label>
                      <input type="number" className="form-control" {...register('qty')} />
                    </div>
                    <div className="col-md-6">
                      <label>Status</label>
                      <select className="form-control" {...register('status')} defaultValue="">
                        <option value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Block</option>
                      </select>
                    </div>
                  </div>



                  {/* check box */}

                  <div className="mb-3 mt-3">
                    <label htmlFor="">Size</label>
                    {
                      sizes && sizes.map(size => {
                        return (
                          <div className="form-check-inline ps-2">
                            <input
                              {
                                ...register('sizes')
                              }
                              checked={checkSizes.includes(size.id)}
                              onChange={(e)=>{
                                if(e.target.checked){
                                  setCheckSizes([...checkSizes, size.id])
                                }else{
                                  setCheckSizes(checkSizes.filter(s_id=>size.id != s_id))
                                }
                              }}
                              
                             className="form-check-input" type="checkbox" value={size.id} id={`size-${size.id}`} />
                            <label className="form-check-label ps-2" htmlFor="{`size-${size.id}`}">
                              {size.name}
                            </label>
                          </div>
                        )
                      })
                    }
                  </div>


                  {/* Featured */}
                  <div className="mt-3">
                    <label>Featured</label>
                    <select className="form-control" {...register('is_featured')} defaultValue="">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  {/* Image Input */}
                  <div className="mt-3">
                    <label>Images (Multiple)</label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      onChange={handleSelectFiles}
                    />
                  </div>

                  {/* Existing Images Preview */}
                  {existingImages.length > 0 && (
                    <div className="row mt-3">
                      {existingImages.map((img) => (
                        <div className="col-md-3 mb-3" key={img.id}>
                          <div className="card position-relative">
                            <img
                              src={img.image_url}
                              alt="preview"
                              className="w-100"
                              style={{ height: '150px', objectFit: 'cover' }}
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(img.id)}
                              className="btn bg-white btn-sm position-absolute"
                              style={{ top: '5px', right: '5px' }}
                            >
                              <FaTimes className='text-dark'/>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* New Selected Files Preview */}
                  {selectedFiles.length > 0 && (
                    <div className="row mt-3">
                      {selectedFiles.map((file, index) => (
                        <div className="col-md-3 mb-3" key={index}>
                          <div className="card position-relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt="preview"
                              className="w-100"
                              style={{ height: '150px', objectFit: 'cover' }}
                            />
                            <button
                              type="button"
                              onClick={() => deleteFile(index)}
                              className="btn bg-white btn-sm position-absolute"
                              style={{ top: '5px', right: '5px' }}
                            >
                              <FaTimes className='text-dark'/>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button disabled={disable} className="btn btn-primary mt-3">
                    {disable ? 'Updating...' : 'Update'}
                  </button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Layouts>
  );
};

export default Edit;
