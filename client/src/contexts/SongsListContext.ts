import { createContext } from "react";
import { ItemType } from "../../types";

// Type of context value defined in generic <...>
const SongsListContext = createContext<
  [ItemType[], (items: ItemType[]) => void]
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>([[], () => {}]);

export default SongsListContext;
