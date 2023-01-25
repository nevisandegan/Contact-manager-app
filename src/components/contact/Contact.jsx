import { CORAL,ORANGE } from "../../helpers/color";
import { Link } from 'react-router-dom';

const Contact=({contact,deleteContact})=>
{
    return(
        <div className="col-md-6 other">
            <div className="card my-2 hov " style={{backgroundColor:CORAL,border:"1px solid #EF8354"}}>
                <div className="card-body">
                    <div className="row align-items-center d-flex justify-content-around">
                       <div className="col-md-3 col-sm-3 ">
                        <img 
                        alt=""
                        className="img-fluid rounded"
                          src="https://via.placeholder.com/200"  style={{border: `1px solid ${CORAL}`}}/>
                       </div> 
                       <div className="col-md-7 col-sm-7 ">
                       <ul className="list-group " >
                <li className="list-group-item list-group-item-dark ">
                  نام و نام خانوداگی :{"  "}
                  <span className="fw-bold">
                    {contact.fullname}
                  </span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  شماره موبایل :{"  "}
                  <span className="fw-bold">
                    {contact.mobile}
                  </span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  آدرس ایمیل :{"  "}
                  <span className="fw-bold">
                    {contact.email}
                  </span>
                </li>
              </ul>
                       </div>
                       <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center mx-1">
              <Link
              to={`/contacts/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: ORANGE }}
              >
                <i className="fa fa-eye" />
              </Link>

              <Link to={`/contacts/edit/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: ORANGE }}
              >
                <i className="fa fa-pen" />
              </Link>
              <button
                className="btn my-1"
                onClick={deleteContact}
                style={{ backgroundColor: ORANGE }}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}
export default Contact;