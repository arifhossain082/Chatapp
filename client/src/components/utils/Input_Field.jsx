const Input_Field = ({value, handleChange, type, name, placeholder}) => {
    return ( 
               <input type={type} name={name} placeholder={placeholder} id="text" value={value} onChange={handleChange}/>
     );
}
 
export default Input_Field;