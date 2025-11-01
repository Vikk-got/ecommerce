import { useState, useEffect } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrderStatus,
  getUsers,
  deleteUser,
  toggleUserBlock,
} from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Laptops',
    stock: '',
    image: null,
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const data = await getProducts();
        setProducts(data);
      } else if (activeTab === 'orders') {
        const data = await getOrders();
        setOrders(data);
      } else if (activeTab === 'users') {
        const data = await getUsers();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, data);
      } else {
        await createProduct(data);
      }
      setShowForm(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', category: 'Laptops', stock: '', image: null });
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: null,
    });
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      fetchData();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        fetchData();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">ADMIN DASHBOARD</h1>

      <div className="dashboard-tabs">
        <button
          className={`dashboard-tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          PRODUCTS
        </button>
        <button
          className={`dashboard-tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          ORDERS
        </button>
        <button
          className={`dashboard-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          USERS
        </button>
      </div>

      {loading ? (
        <div className="dashboard-loading">LOADING...</div>
      ) : (
        <>
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="dashboard-content">
              <button onClick={() => { setShowForm(!showForm); setEditingProduct(null); setFormData({ name: '', description: '', price: '', category: 'Laptops', stock: '', image: null }); }} className="dashboard-add-button">
                {showForm ? 'CANCEL' : 'ADD PRODUCT'}
              </button>

              {showForm && (
                <form onSubmit={handleProductSubmit} className="dashboard-form">
                  <div className="dashboard-form-field">
                    <label>Product Name:</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="dashboard-form-field">
                    <label>Description:</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows="3" />
                  </div>
                  <div className="dashboard-form-row">
                    <div className="dashboard-form-field">
                      <label>Price:</label>
                      <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                    </div>
                    <div className="dashboard-form-field">
                      <label>Stock:</label>
                      <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required />
                    </div>
                  </div>
                  <div className="dashboard-form-field">
                    <label>Category:</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
                      <option value="Laptops">Laptops</option>
                      <option value="Phones">Phones</option>
                      <option value="Headphones">Headphones</option>
                      <option value="Watches">Watches</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                  <div className="dashboard-form-field">
                    <label>Product Image:</label>
                    <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} required={!editingProduct} />
                  </div>
                  <button type="submit" className="dashboard-form-submit">
                    {editingProduct ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}
                  </button>
                </form>
              )}

              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td><img src={`${API_URL}/uploads/${product.imageUrl}`} alt={product.name} className="dashboard-product-image" /></td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.stock}</td>
                      <td className="dashboard-actions">
                        <button onClick={() => handleEditProduct(product)} className="dashboard-action-button edit">EDIT</button>
                        <button onClick={() => handleDeleteProduct(product._id)} className="dashboard-action-button delete">DELETE</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="dashboard-content">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.substring(0, 8)}...</td>
                      <td>{order.userId?.name || 'N/A'}</td>
                      <td>${order.totalAmount}</td>
                      <td>
                        <select value={order.status} onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)} className="dashboard-status-select">
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => alert(`Order Items:\n${order.items.map(item => `${item.name} x${item.quantity}`).join('\n')}\n\nShipping:\n${order.shippingAddress.fullName}\n${order.shippingAddress.address}\n${order.shippingAddress.city}, ${order.shippingAddress.postalCode}\n${order.shippingAddress.country}`)} className="dashboard-action-button view">VIEW</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="dashboard-content">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td><span className={`dashboard-role-badge ${user.role}`}>{user.role.toUpperCase()}</span></td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => handleDeleteUser(user._id)} className="dashboard-action-button delete">DELETE</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
