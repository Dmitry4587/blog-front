import Container from "@mui/material/Container";
import React from "react";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Routes, Route } from "react-router-dom";
import { fetchUser } from "./redux/thunks/authThunks";
import PostsByTag from "./components/PostsByTag";
import Page404 from "./pages/Page404";
import { useAppDispatch } from "./redux/hooks";

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/tags/:tag" element={<PostsByTag />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/posts/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<Registration />} />
          <Route path="/registr" element={<Registration />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
