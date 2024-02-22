import { createContext, useContext } from "react";
import { useGetLocalStorage } from "../lib/hooks";

type BookmarksContextProps = {
  handleToggleBookmark: (id: number) => void;
  bookmarkedIds: number[];
};

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

const BookmarksContext = createContext<BookmarksContextProps | null>(null);

function BookmarksContextProvider({ children }: BookmarksContextProviderProps) {
  const { bookmarkedIds, setBookmarkedIds } = useGetLocalStorage();

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((b) => b.filter((bookmark) => bookmark !== id));
    } else {
      setBookmarkedIds((b) => [...b, id]);
    }
  };

  return (
    <BookmarksContext.Provider value={{ handleToggleBookmark, bookmarkedIds }}>
      {children}
    </BookmarksContext.Provider>
  );
}

const useBookmarksContext = () => {
  const value = useContext(BookmarksContext);
  if (!value)
    throw new Error(
      "BookmarksContext is not available outside of BookmarksContext.Provider"
    );
  return value;
};

export { BookmarksContextProvider, useBookmarksContext };
