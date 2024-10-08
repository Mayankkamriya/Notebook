import React, { useEffect,useState } from 'react'

const Alert = (props) => {
    
    const [visible, setVisible] = useState(true); 
    useEffect(() => {

       const timer = setTimeout(() => {
         setVisible (false)
       }, 1200);
       
      return () => clearTimeout(timer);
    }, [props]);
    
  return (
visible &&(
<div className={`alert my-2 alert-${props.type}`} role="alert">
    {props.message}
</div>
  ))
}

export default Alert;