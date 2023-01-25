/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import Spiner from "./Spiner";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { Formik, Form, Field,ErrorMessage } from "formik";
import { contactSchema } from "../../validator/contactvalidator";
const AddContact = () => {
  const { loading, groups, createContact } = useContext(ContactContext);

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
                  ساخت مخاطب جدید
                </p>
              </div>
            </div>
            <hr style={{ color: "#151F33" }} />
          </div>

          <div className="container mt-5">
            <div className="row mx-4">
              <div className="col-md-4">
                <Formik
                  initialValues={{
                    fullname: "",
                    mobile: "",
                    email: "",
                    job: "",  
                    group: "",
                  }}
                  validationSchema={contactSchema}
                  onSubmit={(values) => {
                    createContact(values);
                  }}
                >
                  <Form>
                    <div className="mb-2">
                      <Field
                        name="fullname"
                        type="text"
                        className="form-control"
                        placeholder="نام نام خانوادگی"
                      />
                    </div>
                  <ErrorMessage  name="fullname"/>
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
                  <ErrorMessage name="email"/>
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="job"
                        placeholder="شغل"
                        className="form-control"
                      />
                    <ErrorMessage  name="job"/>
                    </div>
                    <div className="mb-2">
                      <Field
                        as="select"
                        name="group"
                        className="form-control"
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </Field>
                  <ErrorMessage  name="group"/>
                    </div>
                    <div className="mt-3">
                      <input
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

export default AddContact;
