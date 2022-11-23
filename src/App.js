import React from "react";

import { Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { Registration,  Login, Table } from "./pages";
import { fetchAuthMe } from "./redux/slices/auth";

import Container from "@mui/material/Container";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  return (
    <>
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Table />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Registration />}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
