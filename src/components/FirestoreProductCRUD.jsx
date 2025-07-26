import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

function FirestoreProductCRUD() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingProduct, setEditingProduct] = useState({ name: '', price: '' });

  const productsCol = collection(db, 'products');

  const fetchProducts = async () => {
    const productSnapshot = await getDocs(productsCol);
    setProducts(productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price) {
      await addDoc(productsCol, { name: newProduct.name, price: parseFloat(newProduct.price) });
      setNewProduct({ name: '', price: '' });
      fetchProducts();
    }
  };

  const handleEditProduct = (product) => {
    setEditingId(product.id);
    setEditingProduct({ name: product.name, price: product.price });
  };

  const handleUpdateProduct = async (id) => {
    const productDoc = doc(db, 'products', id);
    await updateDoc(productDoc, { name: editingProduct.name, price: parseFloat(editingProduct.price) });
    setEditingId(null);
    setEditingProduct({ name: '', price: '' });
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
    fetchProducts();
  };

  return (
    <div>
      <h2>CRUD Products (Firestore)</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {editingId === product.id ? (
              <>
                <input
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="Product name"
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  placeholder="Price"
                />
                <button onClick={() => handleUpdateProduct(product.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {product.name} - ${product.price}
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input
        value={newProduct.name}
        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
        placeholder="Product name"
      />
      <input
        type="number"
        value={newProduct.price}
        onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
        placeholder="Price"
      />
      <button onClick={handleAddProduct}>Add</button>
    </div>
  );
}

export default FirestoreProductCRUD; 