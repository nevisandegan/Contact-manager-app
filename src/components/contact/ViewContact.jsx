/* eslint-disable react-hooks/exhaustive-deps */
import { SILVER, ORANGE, CORAL } from "../../helpers/color";
import Spiner from "./Spiner";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect ,useContext} from "react";
import { getContact, getGropus } from "../../services/contactService";
import { ContactContext } from './../../context/contactContext';
const ViewContact = () => {
  const {loading,setLoading}=useContext(ContactContext)
  const { contactId } = useParams();
  const [state, setState] = useState({
    contact: {},
    group: {},
  });
  const {  contact, group } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGropus(contactData.group);
        setLoading(false)
        setState({
          ...state,
          contact: contactData,
          group: groupData,
        });
      } catch (err) {
        console.log(err.message);
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: ORANGE }}>
              اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>

      <hr style={{ backgroundColor: CORAL }} />

      {loading ? (
        <Spiner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact mt-e">
              <div
                className="container p-2"
                style={{ borderRadius: "1em", backgroundColor: SILVER }}
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={contact.photo}
                      alt=""
                      className="img-fluid rounded"
                      style={{ border: `1px solid ${CORAL}` }}
                    />
                  </div>
                  <div className="col-md-9">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-dark">
                        نام و نام خانوادگی :{" "}
                        <span className="fw-bold">{contact.fullname}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شماره موبایل :{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        ایمیل : <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شغل : <span className="fw-bold">{contact.job}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        گروه : <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Link
                      to={"/contacts"}
                      className="btn"
                      style={{ backgroundColor: SILVER }}
                    >
                      برگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;
