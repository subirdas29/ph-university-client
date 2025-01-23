import { DatePicker, Form } from "antd"
import { Controller } from "react-hook-form"

type TDatePickerProps = {
    
    name:string,
    label?:string
}

const PHDatePicker = ({name,label}:TDatePickerProps) => {
   
  return (
    <div style={{marginBottom:'20px'}}>
        
     <Controller //antdesign er 7e react hook form connect korte eta use kora holo
      name={name}
      render = {({field})=>(
       <Form.Item label={label}>
         <DatePicker {...field} size = 'large' style={{width:'100%'}}/>
       </Form.Item>
      )}
     />
    </div>
  )
}

export default PHDatePicker
