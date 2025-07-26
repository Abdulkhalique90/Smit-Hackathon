// src/components/ExampleFirestore.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

function ExampleFirestore() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCol = collection(db, 'users');
      const userSnapshot = await getDocs(usersCol);
      setUsers(userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (newUser) {
      await addDoc(collection(db, 'users'), { name: newUser });
      setNewUser('');
      // Refresh users
      const usersCol = collection(db, 'users');
      const userSnapshot = await getDocs(usersCol);
      setUsers(userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  return (
    <div>
      <h2>Users from Firestore</h2>
      <ul>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
      <input
        value={newUser}
        onChange={e => setNewUser(e.target.value)}
        placeholder="Add user"
      />
      <button onClick={handleAddUser}>Add</button>
    </div>
  );
}

export default ExampleFirestore;