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
import { SortedBy } from "../types/types";

function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceCallback(setSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortedBy>("relevant");

  const { jobItems, isLoading } = useGetJobItems(search);

  // Derived State
  const totalJobItems = jobItems.length;
  const totalPages = Math.ceil(totalJobItems / 7);
  const sortedJobItems = jobItems?.toSorted((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else sortBy === "recent";
    return a.daysAgo - b.daysAgo;
  });

  // Render Dervived State
  const slicedJobItems = sortedJobItems.slice(
    currentPage * 7 - 7,
    currentPage * 7
  );

  // Handlers / funcs
  const handleSortBy = (newSort: SortedBy) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

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
            <SortingControls
              onClick={handleSortBy}
              sortBy={sortBy}
              totalJobItems={totalJobItems}
            />
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
