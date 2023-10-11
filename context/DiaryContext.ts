import { createContext } from "react";

const DiaryContext = createContext({
  diaries: [] as IDiary[],
  mutate: () => {},
});

export default DiaryContext;
