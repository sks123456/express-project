import React, { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../Api/ContactApi";
import CreateContact from "./CreateContactModal";
import Modal from "./Modal";

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchContacts = async () => {
    try {
      const data: [] = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure on deleting the contact for ${name}`
    );
    if (confirmed) {
      try {
        await deleteContact(id);
        fetchContacts();
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  return (
    <div className="w-auto">
      <button
        className="mt-4 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
        onClick={openModal}
      >
        Create Contact
      </button>

      {isModalOpen && (
        <Modal message="" onClose={closeModal}>
          <CreateContact />
        </Modal>
      )}

      <table className="min-w-full bg-white border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 && (
            <tr>
              <td colSpan={4} className="py-2 px-4 border-b text-center">
                No contacts found.
              </td>
            </tr>
          )}
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="py-2 px-4 border-b">{contact.name}</td>
              <td className="py-2 px-4 border-b">{contact.email}</td>
              <td className="py-2 px-4 border-b">{contact.phone}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(contact.id, contact.name)}
                  className="py-1 px-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsList;
