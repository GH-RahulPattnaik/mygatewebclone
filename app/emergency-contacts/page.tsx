'use client';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface UserDetails {
  id: string;
  name: string;
  categorytype: number;
  contacttype: string;
  contactnumber: number | null;
}

interface EditUserForm {
  name: string;
  categorytype: number;
  contacttype: string;
  contactnumber: number | null;
}

export default function EmergencyContact() {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'emergencycontacts'));
    const userList: UserDetails[] = [];

    querySnapshot.forEach((doc) => {
      userList.push({ id: doc.id, ...doc.data() } as UserDetails);
    });

    setUsers(userList);
  };

  const handleEditClick = (user: UserDetails) => {
    setSelectedUser(user);
    setIsEditPopupOpen(true);
  };

  const handleDeleteClick = async (userId: string) => {
    const userDoc = doc(db, 'emergencycontacts', userId);
    await deleteDoc(userDoc);
    fetchUsers(); // Update UI after deletion
  };

  const handleEditSubmit = async (formData: EditUserForm) => {
    if (!selectedUser) return; // Handle potential errors

    const userDoc = doc(db, 'emergencycontacts', selectedUser.id);
    await updateDoc(userDoc, {
      name: formData.name,
      categorytype: formData.categorytype,
      contacttype: formData.contacttype,
      contactnumber: formData.contactnumber,
    });
    setIsEditPopupOpen(false);
    fetchUsers(); // Update UI after edit
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className='p-6'>
      <div className='w-full my-5 flex items-center justify-between'>
        <h1 className='text-3xl'>Emergency Contact</h1>
        <Link href={"/add-emergency-contact"} className='border p-2'>
          +add
        </Link>
      </div>
      <table className='border w-full mt-14'>
        <thead className='border'>
          <tr>
            <th className='border p-2'>Name</th>
            <th className='border p-2'>Category Type</th>
            <th className='border p-2'>Contact Type</th>
            <th className='border p-2'>Contact Number</th>
            <th className='border p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='border p-2'>{user.name}</td>
              <td className='border p-2'>{user.categorytype}</td>
              <td className='border p-2'>{user.contacttype}</td>
              <td className='border p-2'>{user.contactnumber}</td>
              <td className='border p-2 flex justify-center items-center gap-3'>
                <button className='text-blue-500 underline underline-offset-4' onClick={() => handleEditClick(user)}>Edit</button>
                <button className='text-red-500 underline underline-offset-4' onClick={() => handleDeleteClick(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditPopupOpen && selectedUser && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black opacity-90 z-50 flex justify-center items-center'>
          <div className='bg-white text-black p-4 rounded shadow-md'>
            <h2>Edit User</h2>
            <form onSubmit={(e) => e.preventDefault()} className='text-black flex flex-col gap-3'>

              <label htmlFor='name'>Name</label>
              <input type='text' id='name' name='name' defaultValue={selectedUser.name} required className='border-2 border-black' />
              
              <label htmlFor='categorytype'>Category Type</label>
              <input type='number' id='categorytype' name='categorytype' defaultValue={selectedUser.categorytype} required className='border-2 border-black' />

              <label htmlFor='contacttype'>Contact Type</label>
              <input type='text' id='contacttype' name='contacttype' defaultValue={selectedUser.contacttype} required className='border-2 border-black' />

              <label htmlFor='contactnumber'>Contact Number</label>
              <input type='number' id='contactnumber' name='contactnumber' defaultValue={selectedUser.contactnumber ?? ''} className='border-2 border-black' />

              <button type='submit' onClick={() => handleEditSubmit({
                name: (document.getElementById('name') as HTMLInputElement).value,
                categorytype: parseInt((document.getElementById('categorytype') as HTMLInputElement).value),
                contacttype: (document.getElementById('contacttype') as HTMLInputElement).value,
                contactnumber: parseInt((document.getElementById('contactnumber') as HTMLInputElement).value),
              })}>Submit</button>

              <button onClick={() => setIsEditPopupOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
