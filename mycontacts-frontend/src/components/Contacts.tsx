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
    try {
      await deleteContact(id); // Call the delete function
      // Assuming deleteContact throws an error on failure
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
      // You may want to handle the error (e.g., show a notification) here
    }
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
