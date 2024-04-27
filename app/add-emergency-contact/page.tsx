'use client'
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function AddEmergencyContact() {
  const [name, setName] = useState('');
  const [categorytype, setcategorytype] = useState('Select Category Type'); // Set default category type
  const [contacttype, setcontacttype] = useState('');
  const [contactnumber, setcontactnumber] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'emergencycontacts'), { name, categorytype, contacttype, contactnumber: parseInt(contactnumber) || null, });
      console.log('Document written with ID: ', docRef.id);
      setName('');
      setcategorytype('Select Category Type');
      setcontacttype('');
      setcontactnumber('');
      router.push('/emergency-contacts');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleCancel = () => {
    router.push('/emergency-contacts');
  };

  return (
    <main className='p-6'>
      <h1>Add Emergency Contact</h1>
      <form onSubmit={handleSubmit} className='mt-6'>
        <label className='flex items-center justify-between w-1/2'>
          Name:
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='border p-2 mt-1 w-80 text-black' required />
        </label>

        <label className='flex items-center justify-between w-1/2 mt-4'>
          Category Type:
          <select value={categorytype} onChange={(e) => setcategorytype(e.target.value)} className='border p-2 mt-1 w-80 text-black'>
            <option value=''>Select Category Type</option>
            <option value='Admin'>Admin</option>
            <option value='Security'>Security</option>
            <option value='Driver'>Driver</option>
            <option value='Doctor'>Doctor</option>
            <option value='Plumber'>Plumber</option>
            <option value='Main Gate'>Main Gate</option>
            <option value='Society Maintainence'>Society Maintainence</option>
          </select>
        </label>


        <label className='flex items-center justify-between w-1/2 mt-4'>
          Contact Type:
          <input type='text' value={contacttype} onChange={(e) => setcontacttype(e.target.value)} className='border p-2 mt-1 w-80 text-black' required />
        </label>

        <label className='flex items-center justify-between w-1/2 mt-4'>
          Contact Number:
          <input type='number' value={contactnumber} onChange={(e) => setcontactnumber(e.target.value)} className='border p-2 mt-1 w-80 text-black' required />
        </label>

        <div className="flex items-center gap-5 mt-6">
          <button type='submit' className='border p-2'>SUBMIT</button>
          <button type='button' onClick={handleCancel} className='border p-2'>CANCEL</button>
        </div>
      </form>
    </main>
  );
}
