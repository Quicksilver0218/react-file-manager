import { createContext, PropsWithChildren, RefObject, useContext, useRef } from "react";

const context = createContext<RefObject<HTMLInputElement | undefined> | undefined>(undefined);

export function SearchProvider({ children }: PropsWithChildren) {
  const ref = useRef(undefined);
  return <context.Provider value={ref}>{children}</context.Provider>
}

export function useSearch() {
  return useContext(context);
}