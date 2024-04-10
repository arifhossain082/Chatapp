const Input_Field = ({handleChange, type, name, value, placeholder}) => {
    return ( 
               <input className="text" type={type} name={name} value={value} placeholder={placeholder} onChange={handleChange}/>
     );
}
 
export default Input_Field;