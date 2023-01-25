/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getContact, updateContact } from "../../services/contactService";
import Spiner from "./Spiner";
import { ContactContext } from "./../../context/contactContext";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { contactSchema } from "../../validator/contactvalidator";
const EditContact = () => {
  const negetive = useNavigate();
  const {
    loading,
    setLoading,
    groups,
    setFilteredContacts,
    setContacts,
    contacts,
  } = useContext(ContactContext);
  const { contactId } = useParams();
  const [contact, setContact] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setLoading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const submitInfo = async (values) => {
    try {
      setLoading(true);
      const { status } = await updateContact(values, contactId);
      if (status === 200) {
        setLoading(false);
        const Allcontacts = [...contacts];
        const contactIndex = Allcontacts.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        Allcontacts[contactIndex] = { ...values };
        setContacts(Allcontacts);
        setFilteredContacts(Allcontacts);
        negetive("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spiner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../..//assets/sign-up.webp")}
              height="500px"
              width={"45%"}
              style={{
                position: "absolute",
                top: "180px",
                left: "150px",
                opacity: "50%",
              }}
            />
          </section>
          <div className="container">
            <div className="row">
              <div className="col">
                <p
                  className="h5 text-center fw-bold"
                  style={{ color: "#EF8354" }}
                >
                  ویرایش {contact.fullname}
                </p>
              </div>
            </div>
            <hr style={{ color: "#151F33" }} />
          </div>

          <div className="container mt-5">
            <div className="row mx-4">
              <div className="col-md-4">
              <Formik initialValues={contact} validationSchema={contactSchema} onSubmit={(values)=>submitInfo(values)}>
                <Form>
                  <div className="mb-2">
                    <Field
                      name="fullname"
                      type="text"
                      className="form-control"
                      placeholder="نام نام خانوادگی"
                
                    />
                  </div>
                  <ErrorMessage name="fullname"/>
                  <div className="mb-2">
                    <Field
                      name="mobile"
                      type="number"
                      className="form-control"
                      placeholder="شماره همراه"
                     
                    />
                  </div>
                  <ErrorMessage name="mobile"/>
                  <div className="mb-2">
                    <Field
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="ایمیل"
                    
                    />
                  </div>
                  <ErrorMessage  name="email"/>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="job"
                      placeholder="شغل"
                      className="form-control"
                     
                    />
                  </div>
                  <ErrorMessage name="job"/>
                  <div className="mb-2">
                    <Field
                    as="select"
                      name="group"
                      className="form-control"
                    >
                      {groups.length > 0 &&
                        groups.map((group) => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                    </Field>
                  </div>
                  <ErrorMessage name="group"/>
                  <div className="mt-3">
                    <Field
                      type="submit"
                      value="ساخت مخاطب"
                      className="btn btn-success"
                    />{" "}
                    <Link className="btn btn-danger" to={"/contacts"}>
                      انصراف
                    </Link>
                  </div>
                </Form>
                </Formik>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditContact;
