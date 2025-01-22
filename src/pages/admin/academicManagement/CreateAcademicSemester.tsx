/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form"
import PHForm from "../../../components/form/PHForm"

import { Button, Col, Flex } from "antd"
import PHSelect from "../../../components/form/PHSelect"
import { monthOptions } from "../../../components/constants/global"
import { zodResolver } from "@hookform/resolvers/zod"

import { academicSemesterSchema } from "../../../schemas/academicManagement.schema"
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api"
import { toast } from "sonner"
import { TResponse } from "../../../types/global"

const nameOptions = [
    {
        value:'01',
        label:'Autumn'
    },
    {
        value:'02',
        label:'Summer'
    },
    {
        value:'03',
        label:'Fall'
    }
]

const currentYear = new Date().getFullYear()

const yearOptions = [0,1,2,3,4].map((number)=>
   (
    {
        value: String(currentYear + number),
        label: String(currentYear + number), 
        }
   )
)

const CreateAcademicSemester = () => {
    const [addAcademicSemester] = useAddAcademicSemesterMutation()

    const onSubmit:SubmitHandler<FieldValues> = async(data)=>{
       const toastId = toast.loading('Creating...')
        const name = nameOptions[Number(data.name)-1].label
        
        const semesterData = {
            name,
            code:data.name,
            year:data.year,
            startMonth:data.startMonth,
            endMonth:data.endMonth
        }
        try{
            console.log(semesterData)
            const res = await addAcademicSemester(semesterData) as TResponse
            if(res.error){
                toast.error(res.error.data.message,{id:toastId})
            } else{
                toast.success('Semester created',{id:toastId}) 
            }
            console.log(res)
        }
        catch(err:any){
            toast.error('Something went wrong',{id:toastId})
        }
        
       
    }

    
  return (
  <Flex justify="center" align="center">
    <Col span={6}>
    <PHForm onSubmit={onSubmit} resolver = {zodResolver(academicSemesterSchema)}>
    <PHSelect label="Name" name="name" options={nameOptions} />
    <PHSelect label="Year" name="year" options={yearOptions} />
    <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
    <Button htmlType="submit">Submit</Button>
   </PHForm>
    </Col>
  </Flex>
  )
}

export default CreateAcademicSemester
