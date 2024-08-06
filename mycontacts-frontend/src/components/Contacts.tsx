// src/components/ContactsList.tsx
import React, { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../Api/ContactApi";

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);

  const fetchContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteContact(id);
    setContacts(contacts.filter((contact) => contact._id !== id)); // Remove deleted contact from state
  };

  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.phone}
            <button onClick={() => handleDelete(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
