import { useEffect, useState } from "react";
import { API_URL } from "../constants/constants";

import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";

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
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm search={search} setSearch={setSearch} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItems} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
