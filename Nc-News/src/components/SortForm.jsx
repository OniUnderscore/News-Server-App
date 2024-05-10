export function SortForm({ handleSort, handleDir }) {
  return (
    <form className="articleFilters">
      <select
        name="SortBy"
        id="SortBy"
        defaultValue={"Select Category"}
        onChange={(e) => {
          handleSort(e);
        }}
      >
        <option value="Select Category" disabled hidden>
          Sort By...
        </option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="created_at">Age</option>
        <option value="votes"> Votes</option>
        <option value="comment_count">Comments</option>
      </select>
      <select
        name="SortDir"
        id="SortDir"
        onChange={(e) => {
          handleDir(e);
        }}
      >
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
    </form>
  );
}
