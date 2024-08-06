import React, { useEffect, useState } from 'react';
import { Contact, getContacts, createContact, updateContact, deleteContact } from '../Api';

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<Omit<Contact, 'id' | 'user_id'>>({ name: '', email: '', phone: '' });

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getContacts();
      setContacts(data);
    };

    fetchContacts();
  }, []);

  const handleCreateContact = async () => {
    const createdContact = await createContact(newContact);
    setContacts([...contacts, createdContact]);
  };

  const handleUpdateContact = async (id: string, updatedContact: Partial<Omit<Contact, 'id' | 'user_id'>>) => {
    const contact = await updateContact(id, updatedContact);
    setContacts(contacts.map((c) => (c.id === id ? contact : c)));
  };

  const handleDeleteContact = async (id: string) => {
    await deleteContact(id);
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.email} - {contact.phone}
            <button onClick={() => handleUpdateContact(contact.id, { name: 'Updated Name', email: contact.email, phone: contact.phone })}>
              Update
            </button>
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Create New Contact</h2>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <button onClick={handleCreateContact}>Create Contact</button>
      </div>
    </div>
  );
};

export default Contacts;
