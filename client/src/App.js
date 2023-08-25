import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Competitions from "./Components/Competitions";
import Edit from "./Components/Edit";
import PrivateRoute from "./Components/PrivateRoute";
import TeamData from "./Components/TeamData";
import Check from "./Components/Check";
import AddCompetitions from "./Components/AddCompetitions";
import Layout from "./Components/Layout/Layout";
import AllUsers from "./Components/AllUsers";
import AllPayments from "./Components/AllPayments";
import NotFound from "./Components/Error";
import AllTeams from "./Components/AllTeams";
import AddWorkshop from "./Components/AddWorkshop";
import AllWorkshop from "./Components/AllWorkshop";

function App() {
  return (
    <>
      <div className="w-100" style={{ maxWidth: "100%" }}></div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Layout />}>
              {/* <Route path='/*' element={<Login />} /> */}
              <Route
                exact
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/competitions"
                element={
                  <PrivateRoute>
                    <Competitions />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/edit/:id"
                element={
                  <PrivateRoute>
                    <Edit />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/add-competition"
                element={
                  <PrivateRoute>
                    <AddCompetitions />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/add-workshop"
                element={
                  <PrivateRoute>
                    <AddWorkshop />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/detail/:comp"
                element={
                  <PrivateRoute>
                    <TeamData />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/workshop"
                element={
                  <PrivateRoute>
                    <AllWorkshop />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/user-details"
                element={
                  <PrivateRoute>
                    <AllUsers />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/all-payment"
                element={
                  <PrivateRoute>
                    <AllPayments />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/all-teams"
                element={
                  <PrivateRoute>
                    <AllTeams />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/all-workshops"
                element={
                  <PrivateRoute>
                    <AllWorkshop />
                  </PrivateRoute>
                }
              />
              <Route exact path="/check" element={<Check />} />
              <Route exact index element={<Login />} />
              <Route exact path="*" element={<NotFound />} />
            </Route>
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
