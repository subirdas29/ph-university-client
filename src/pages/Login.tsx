import { Button } from "antd"
import { useForm } from "react-hook-form"
import { useLoginMutation } from "../redux/features/auth/authApi"
import { useAppDispatch } from "../redux/hook"
import { setUser } from "../redux/features/auth/authSlice"
import { verifyToken } from "../utils/verifyToken"



const Login = () => {
 
  const dispatch = useAppDispatch()

  const {register,handleSubmit} = useForm({
    defaultValues: {
     userId: "A-0001",
    password:"123456admin"
    },
  })
  const [login,{error}] =useLoginMutation()
 

  const onSubmit = async(data) =>{
    const userInfo ={
      id: data.userId,
      password:data.password
    }
   const res =  await login(userInfo).unwrap()
   const user = verifyToken(res.data.accessToken)
  
   dispatch(setUser({user:user,token:res.data.accessToken}))
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