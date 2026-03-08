import React, { useEffect, useState, useRef, useMemo } from 'react';
import Layouts from '../../common/Layouts';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { adminToken, apiUrl } from '../../common/http';
import JoditEditor from 'jodit-react';
import { FaTimes } from "react-icons/fa";



const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); 


  const navigate = useNavigate();
  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || 'Start typing...'
  }), [placeholder]);

  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  // ================= HANDLE MULTIPLE FILE SELECT =================
  const handleSelectFiles = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setSelectedFiles(prev => [...prev, ...files]);
  };

  // ================= DELETE FILE FROM PREVIEW =================
  const deleteFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

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

  // ================= SAVE PRODUCT =================
  const saveProduct = async (data) => {
    try {
      setDisable(true);

      // Upload all selected files sequentially
      const uploadedIds = [];
      for (let file of selectedFiles) {
        const id = await uploadSingleFile(file);
        uploadedIds.push(id);
      }

      // Prepare payload
      const payload = {
        ...data,
        description: content,
        gallery: uploadedIds,
      };

      const res = await fetch(`${apiUrl}/products`, {
        method: 'POST',
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

  

  // ================= FETCH CATEGORIES, BRANDS  & Sizes =================
  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`, { headers: { Authorization: `Bearer ${adminToken()}` } });
    const result = await res.json();
    setCategories(result.data);
  };

  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brands`, { headers: { Authorization: `Bearer ${adminToken()}` } });
    const result = await res.json();
    setBrands(result.data);
  };


  const fetchSizes = async () => {
    const res = await fetch(`${apiUrl}/sizes`, { headers: { Authorization: `Bearer ${adminToken()}` } });
    const result = await res.json();
    setSizes(result.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchSizes();
  }, []);

  return (
    <Layouts>
      <Container>
        <div className="row mb-3">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4>Products / Create</h4>
            <Link to="/admin/products" className="btn btn-primary">Back</Link>
          </div>

          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
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
                      <select className="form-control" {...register('category')}>
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>Brand</label>
                      <select className="form-control" {...register('brand')}>
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
                      onChange={() => {}}
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
                      <select className="form-control" {...register('status')}>
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
                    <select className="form-control" {...register('is_featured')}>
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

                  {/* Gallery Preview */}
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

                  <button disabled={disable} className="btn btn-primary mt-3">Create</button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Layouts>
  );
};

export default Create;
