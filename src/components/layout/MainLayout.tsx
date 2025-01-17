import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hook";
import { logOut } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;



const MainLayout = () => {
  const dispatch = useAppDispatch() 

const handleLogout = ()=>{
  dispatch(logOut())
}
  return (
    <div>
       <Layout style={{height:"100vh"}}>
     <Sidebar/>
      <Layout>
        <Header>
          <button onClick={handleLogout}>Logout</button>
        </Header>
        <Content style={{ margin: '24px 16px 0'}}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
         <Outlet/>
          </div>
        </Content>
       
      </Layout>
    </Layout>
    </div>
  )
}

export default MainLayout
