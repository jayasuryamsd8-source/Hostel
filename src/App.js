import "./App.css";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FeePayment from "./pages/FeePayment";
import Profile from "./pages/UserProfile";
import Canteen from "./pages/Canteen";

// Hidden / Forms
import VacationLeave from "./hidden pages/VacationLeave";
import HostelRoomAllocation from "./hidden pages/HostelRoomAllocation";
import Complaint from "./hidden pages/complaint";
import PaymentConfirmation from "./hidden pages/payment2";



// Admin
import Ahome from "./admin/ahome";
import Anavbar from "./admin/anavbar";
import LeaveRequests from "./admin/dayl";
import VacationRequests from "./admin/vac";
import Alogin from "./admin/alogin";

// Common
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Public */}
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/menu" exact component={Menu} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/canteen" exact component={Canteen} />

          {/* User */}
          <Route path="/fee" exact component={FeePayment} />
          <Route path="/profile" exact component={Profile} />

          <Route path="/vacation-leave" exact component={VacationLeave} />
          <Route path="/hostel-room-allocation" exact component={HostelRoomAllocation} />
          <Route path="/complaint" exact component={Complaint} />
          <Route path="/payment" exact component={PaymentConfirmation} />

          {/* Admin */}
          <Route path="/alogin" exact component={Alogin} />
          <Route path="/ahome" exact component={Ahome} />
          <Route path="/anavbar" exact component={Anavbar} />
          <Route path="/dayl" exact component={LeaveRequests} />
          <Route path="/vacl" exact component={VacationRequests} />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
