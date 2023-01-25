import { Fragment } from "react";
import {SILVER,ORANGE,CORAL} from "../../helpers/color";
import { useContext } from "react";
import Contact from "./Contact";
import { Link } from "react-router-dom";
import Spiner from './Spiner';
import { ContactContext } from "../../context/contactContext";


const Contacts=()=>
{
    const {filteredContacts,loading,deleteContact}=useContext(ContactContext)
    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col mt-5">
                            <p className="h3">
                                <Link to={"/contacts/add"} className="btn mx-2 my-2 b" style={{backgroundColor:SILVER,border:"1px solid #EF8354"}}>
                                    ساخت مخاطب جدید 
                                    <i className="fa fa-plus-circle mx-2"/>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            { loading ? <Spiner/>:  (
<section className="container">
    <div className="row">
    {
        filteredContacts.length>0
         ? filteredContacts.map((c)=> <Contact key={c.id} contact={c} deleteContact={()=>
         {
            deleteContact(c.id,c.fullname)
         }}/>) 
         : 
         (
            <div className="text-center py-5" style={{backgroundColor:CORAL}}>
            <p className="h3" style={{color:ORANGE}}>
                مخاطب مورد نظر یافت نشد
            </p>
            <img src={require("../../assets/no-found.gif")} alt="پیدا نشد" className="w-25"/>
            </div>
        ) 
    }
    </div>
</section>
    )}
        </>
    )
}

export default Contacts;