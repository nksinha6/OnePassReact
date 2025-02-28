import { Route, Routes } from "react-router-dom";
import "../src/asset/css/custom.scss";
import "./App.css";
import RequireAuth from "./component/Auth/RequireAuth";
import Home from "./route/Home/Home";
import Login from "./route/Login/Login";
import Signup from "./route/Signup/Signup";
import UserList from "./route/UserList/UserList";
import EnterOtp from "./route/EnterOtp/EnterOtp";
import InviteGuests from "./route/InviteGuests/InviteGuests";
import ChangeDateTime from "./route/ChangeDateTime/ChangeDateTime";
import AddInvite from "./route/AddInvite/AddInvite";
import Invite from "./route/Invite/Invite";
import Invitation from "./route/Invitation/Invitation";
import InviteDetails from "./route/InviteDetails/InviteDetails";
import Example from "./route/Example/Example";
import CheckIn from "./route/CheckIn/CheckIn";
import CheckInSucess from "./route/CheckIInSucess/CheckInSucess";
import SecurityVideo from "./route/SecurityVideo/SecurityVideo";
import VisitDetails from "./route/VisitDetails/VisitDetails";
import ToastProvider from "./component/ToastProvider/ToastProvider";

function App() {
  return (
    <div className="App">
      <ToastProvider/>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/check-in" element={<CheckIn />} /> */}
        <Route path="/enter-otp" element={<EnterOtp />} />
        <Route path="/check-in-sueccess" element={<CheckInSucess />} />
        <Route
          path="/user-list"
          element={
            <RequireAuth>
              <UserList />
            </RequireAuth>
          }
        />
          <Route path="/home" element={<Home role={"visitor"}  />} />

        <Route>
          <Route path="/host" element={<Home role={"host"} />} />
          <Route path="/host/home" element={<Home role={"host"} />} />
          <Route path="/host/invite-guests" element={<InviteGuests />} />
          <Route path="/host/change-date-time" element={<ChangeDateTime />} />
          <Route path="/host/add-invite" element={<AddInvite />} />
          <Route path="/host/invitation" element={<Invitation role={"host"}/>} /> 
          <Route path="/host/invite" element={<Invite role={"host"} />} />
        </Route>

        <Route>
          <Route path="/visitor" element={<Home role={"visitor"} />} />
          <Route path="/visitor/home" element={<Home role={"visitor"} />} />
          <Route path="/visitor/invitation" element={<Invitation role={"visitor"}/>} />
          <Route path="/visitor/invite-details" element={<InviteDetails  role={"visitor"} isVerified={false}/>} />
          <Route path="/visitor/example" element={<Example role={"visitor"} />} />
          <Route path="/visitor/security-video" element={<SecurityVideo role={"visitor"} />} />
        </Route>

        <Route>
          <Route path="/check-in" element={<CheckIn role={"desk-admin"} page={"check-in"} />} />
          <Route path="/check-in/enter-otp" element={<EnterOtp role={"desk-admin"} page={"check-in"} />} />
            <Route path="/check-in/success" element={<CheckInSucess  role={"desk-admin"} page={"check-in"} />} />
            <Route path="/check-in/invite-details" element={<InviteDetails  role={"visitor"} isVerified={true}/>} />
            <Route path="/check-in/visit-details" element={<VisitDetails  role={"visitor"} page={"check-in"} />} />
        </Route>
        <Route>
          <Route path="/check-out" element={<CheckIn role={"desk-admin"}  page={"check-out"} />} />
          <Route path="/check-out/enter-otp" element={<EnterOtp role={"desk-admin"} page={"check-out"} />} />
            <Route path="/check-out/success" element={<CheckInSucess  role={"desk-admin"} page={"check-out"} />} />
            <Route path="/check-out/visit-details" element={<VisitDetails  role={"visitor"} page={"check-out"} />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
