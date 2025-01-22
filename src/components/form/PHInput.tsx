import { Form, Input } from "antd"
import { Controller } from "react-hook-form"

type TInputProps = {
    type:string,
    name:string,
    label?:string
}

const PHInput = ({type,name,label}:TInputProps) => {
   
  return (
    <div style={{marginBottom:'20px'}}>
        
     <Controller //antdesign er 7e react hook form connect korte eta use kora holo
      name={name}
      render = {({field})=>(
       <Form.Item label={label}>
         <Input {...field} size="large" type={type} id={name} />
       </Form.Item>
      )}
     />
    </div>
  )
}

export default PHInput
