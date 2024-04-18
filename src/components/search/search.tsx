import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useMemo, useState } from "react";
import { useAppDispatch } from "@/store/global-store";
import { setSearchActive } from "@/store/filter-slice";
import { setPage, setQuery } from "@/store/movie-slice";
import debounce from "lodash.debounce";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();

  const setState = useCallback(
    (value: string) => {
      dispatch(setQuery(value));
      dispatch(setPage(1));
      dispatch(setSearchActive(true));
    },
    [dispatch]
  );

  const debouncedSendRequest = useMemo(() => {
    return debounce(setState, 1000);
  }, [setState]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.length) {
      console.log("It is NOT working");
      setInputValue("");
      dispatch(setQuery(""));
      dispatch(setSearchActive(false));
    } else if (event.target.value.length) {
      setInputValue(event.target.value);
      debouncedSendRequest(event.target.value);
    }
  };

  return (
    <Paper component="div" sx={{ flex: 1, padding: "4px", display: "flex", alignItems: "center" }}>
      <SearchIcon />
      <InputBase
        required
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск по названию"
        onChange={onInputChange}
        value={inputValue}
      />
    </Paper>
  );
};

export default Search;
