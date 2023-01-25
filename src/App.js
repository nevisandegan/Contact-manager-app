import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router";
import { ContactContext } from "./context/contactContext";
import { useImmer } from "use-immer";
import { toast,Toaster } from "react-hot-toast";
import _ from 'lodash'
import { confirmAlert } from "react-confirm-alert";
import {
  Navbar,
  Contacts,
  AddContact,
  EditContact,
  ViewContact,
} from "./components/Index";
import {
  getAllContact,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactService";
import { SILVER, ORANGE, CORAL } from "./helpers/color";



const App = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useImmer([]);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [contactQuery, setContactQuery] = useState({ text: "" });
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const { data: dataContact } = await getAllContact();
        const { data: datagroups } = await getAllGroups();
        setContacts(dataContact);
        setGroups(datagroups);
        setFilteredContacts(dataContact);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchdata();
  }, []);
  const createContactForm = async (values) => {
    try {
      setLoading(true);
      console.log(values)
      const { status, data } = await createContact(values);
      if (status === 201) {
        setContacts(draft=>{draft.push(data)});
        setFilteredContacts(draft=>{draft.push(data)});
        setLoading(false  );
        navigate("/contacts");
      }
    } catch (err) {
      setLoading((prev)=>!prev)
    }
  };
  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: SILVER,
              border: `1px solid ${ORANGE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <p style={{ color: CORAL }} className="text-fa-bold mb-3">
              ایا {contactFullname} میخوای پاک کنی ؟
            </p>
            <button
              className="btn mx-2"
              style={{ color: ORANGE }}
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
            >
              بله
            </button>
            <button className="btn mx-2" onClick={onClose}>
              خیر
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    const allContacts=[...contacts];
    try {
      const allContacts=[...contacts];

      const updateContact=contacts.filter(c=>c.id!==contactId)
      setContacts(updateContact)
      setFilteredContacts(updateContact)
      const {status} = await deleteContact(contactId)
      if(status!== 200)
      {
        setContacts(allContacts)
        setFilteredContacts(allContacts)
      }
      if(status===200)
      {
        toast.error("با موفقیت مخاطب حذف شد ")
      }
    }
     catch (err) {
      console.log(err.message);
      setContacts(allContacts)
        setFilteredContacts(allContacts)
    }
  };

  const contactSearch =_.debounce( (query) => {
    const allContacts = contacts.filter((contact) => {
      return contact.fullname
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    setFilteredContacts(allContacts);
  },1000)

  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        setContacts,
        contactQuery,
        contacts,
        filteredContacts,
        groups,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
        setFilteredContacts,
      }}
    >
      <div className="App">
      <Toaster/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={"/contacts"} />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};
export default App;
