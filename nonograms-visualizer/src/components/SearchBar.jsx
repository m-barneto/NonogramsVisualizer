import { React, useState } from "react";

export default function SearchBar(props) {
  const { search } = props;
  const [query, setQuery] = useState("");

  return (
    <form
      className="d-flex"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        search(query);
      }}
    >
      <input
        id="search"
        className="form-control me-2 form-control-lg"
        type="search"
        placeholder="Search"
        onChange={(x) => setQuery(x.target.value)}
        aria-label="Search"
      />
      <button className="btn btn-outline-success btn-lg" type="submit">
        Submit
      </button>
    </form>
  );
}
