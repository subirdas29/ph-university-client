/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd"
import { FieldValues, useForm } from "react-hook-form"
import { useLoginMutation } from "../redux/features/auth/authApi"
import { useAppDispatch } from "../redux/hook"
import { setUser, TUser } from "../redux/features/auth/authSlice"
import { verifyToken } from "../utils/verifyToken"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"



const Login = () => {
 
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  

  const {register,handleSubmit} = useForm({
    defaultValues: {
     userId: "A-0001",
    password:"123456admin"
    },
  })
  const [login] =useLoginMutation()
 

  const onSubmit = async(data:FieldValues) =>{
    const toastId = toast.loading('Logging in')
   try{
    const userInfo ={
      id: data.userId,
      password:data.password
    }
   const res =  await login(userInfo).unwrap()
   const user = verifyToken(res.data.accessToken) as TUser
  
   dispatch(setUser({user:user,token:res.data.accessToken}))

  toast.success("Logged in", {id:toastId,duration:2000})
   navigate(`/${user.role}/dashboard`)

  }
  catch(err){
    toast.error("Something went wrong",{id:toastId,duration:2000})
  }

   }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div>
      <label htmlFor="id">ID:</label>
      <input type="text" id="id" {...register('userId')} />
      </div>
      <div>
      <label htmlFor="password">Password:</label>
      <input type="text" id="password" {...register('password')} />
       {/* react hook form e ae name register kora holo */}
      </div>
      <Button htmlType="submit">submit</Button>
    </form>
  )
}

export default Login
