import React, { useEffect, useState } from 'react';
import { rtdb } from '../firebase';
import {
  ref,
  onValue,
  push,
  set,
  remove,
  update
} from 'firebase/database';

function RealtimeProductCRUD() {
  const [products, setProducts] = useState({});
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingProduct, setEditingProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    const productsRef = ref(rtdb, 'products');
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setProducts(data);
    });
    return () => unsubscribe();
  }, []);

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price) {
      const productsRef = ref(rtdb, 'products');
      const newRef = push(productsRef);
      await set(newRef, {
        name: newProduct.name,
        price: parseFloat(newProduct.price)
      });
      setNewProduct({ name: '', price: '' });
    }
  };

  const handleEditProduct = (id, product) => {
    setEditingId(id);
    setEditingProduct({ name: product.name, price: product.price });
  };

  const handleUpdateProduct = async (id) => {
    const productRef = ref(rtdb, `products/${id}`);
    await update(productRef, {
      name: editingProduct.name,
      price: parseFloat(editingProduct.price)
    });
    setEditingId(null);
    setEditingProduct({ name: '', price: '' });
  };

  const handleDeleteProduct = async (id) => {
    const productRef = ref(rtdb, `products/${id}`);
    await remove(productRef);
  };

  return (
    <div>
      <h2>CRUD Products (Realtime Database)</h2>
      <ul>
        {Object.entries(products).map(([id, product]) => (
          <li key={id}>
            {editingId === id ? (
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
                <button onClick={() => handleUpdateProduct(id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {product.name} - ${product.price}
                <button onClick={() => handleEditProduct(id, product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(id)}>Delete</button>
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

export default RealtimeProductCRUD; 