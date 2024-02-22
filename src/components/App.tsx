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
  const [sortBy, setSortBy] = useState("relevant");

  const { jobItems, isLoading } = useGetJobItems(search);

  // Derived State
  const totalJobItems = jobItems.length;
  const totalPages = Math.ceil(totalJobItems / 7);

  // Render Dervived State
  const slicedJobItems = jobItems.slice(currentPage * 7 - 7, currentPage * 7);

  // Handlers / funcs
  const handleSortBy = (newSort: "relevant" | "recent") => setSortBy(newSort);

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
            <SortingControls onClick={handleSortBy} sortBy={sortBy} />
          </SidebarTop>
          <JobList isLoading={isLoading} jobItems={slicedJobItems} />
          <PaginationControls
            setPage={setCurrentPage}
            current={currentPage}
            totalPages={totalPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
