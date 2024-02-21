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
import { useGetJobItems } from "../lib/hooks";
import { useDebounceCallback } from "usehooks-ts";

function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceCallback(setSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const { jobItems, isLoading, totalJobItems } = useGetJobItems(search);

  const slicedJobItems = jobItems.slice(0, 7);
  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm search={search} setSearch={debouncedSearch} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalJobItems={totalJobItems} />
            <SortingControls />
          </SidebarTop>
          <JobList isLoading={isLoading} jobItems={slicedJobItems} />
          <PaginationControls setPage={setCurrentPage} current={currentPage} />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
