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
import { useState } from "react";
import { useGetJobItems, useJobContent } from "../lib/hooks";

function App() {
  const [search, setSearch] = useState("");
  const [jobItems, isLoading] = useGetJobItems(search);
  const [jobContent, isLoaded] = useJobContent();

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
          <JobList isLoading={isLoading} jobItems={jobItems} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent jobContent={jobContent} isLoaded={isLoaded} />
      </Container>
      <Footer />
    </>
  );
}

export default App;
