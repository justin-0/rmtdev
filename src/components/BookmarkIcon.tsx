import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../contexts/BookmarksContextProvider";

export default function BookmarkIcon({ id }: { id: number }) {
  const { handleToggleBookmark, bookmarkedIds } = useBookmarksContext();

  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggleBookmark(id);
      }}
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
