import { createContext, useContext, useEffect, useState } from "react";

type BookmarksContextProps = {
  handleToggleBookmark: (id: number) => void;
  bookmarkedIds: number[];
};

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

const BookmarksContext = createContext<BookmarksContextProps | null>(null);

function BookmarksContextProvider({ children }: BookmarksContextProviderProps) {
  const bookmarksInLocalStorage = (): number[] => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks === null) return [];

    const parsedBookmarks = JSON.parse(storedBookmarks);

    return parsedBookmarks;
  };

  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(
    bookmarksInLocalStorage() ? bookmarksInLocalStorage() : []
  );

  console.log(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((b) => b.filter((bookmark) => bookmark !== id));
    } else {
      setBookmarkedIds((b) => [...b, id]);
    }
  };

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);
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
