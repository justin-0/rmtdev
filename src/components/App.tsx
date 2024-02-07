import { useEffect, useState } from "react";
import { API_URL } from "../constants/constants";

import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  const [search, setSearch] = useState("");
  const [jobItems, setJobItems] = useState([]);

  useEffect(() => {
    if (!search) return;
    async function getJobData() {
      const response = await fetch(API_URL + `?search=${search}`);
      const data = await response.json();
      setJobItems(data.jobItems);
    }
    getJobData();
  }, [search]);
  return (
    <>
      <Background />
      <Header search={search} setSearch={setSearch} />
      <Container jobItems={jobItems} />
      <Footer />
    </>
  );
}

export default App;
