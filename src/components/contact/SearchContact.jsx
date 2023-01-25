import {ORANGE} from "../../helpers/color"
import { useContext } from "react";
import {ContactContext} from "../../context/contactContext"


const SearchContact=()=>
{

  const {contactSearch}=useContext(ContactContext)
    return(
        <div className="input-group mx-2  w-75" dir="ltr">
       <span className="input-group-text tt" id="basic-addon1"  style={{color:ORANGE,border:"1px solid #EF8354" }} >
        <i className="fas fa-search"/>
        </span> 
        <input
        dir="rtl"
        type="text"
        onChange={(e)=>contactSearch(e.target.value)}
        style={{  borderColor: ORANGE }}
        className="form-control"
        placeholder="جستجوی مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
        </div>
    )
}

export default SearchContact;