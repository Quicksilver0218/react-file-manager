import { createContext, PropsWithChildren, useCallback, useContext } from "react";

type Callback = (key: string, args?: { [key: string]: string }) => string;

const i18nContext = createContext<Callback>((key: string) => key);

function fillArgs(text: string, args: [string, string][]) {
  const [key, value] = args.shift()!;
  let arr = text.split(`{{${key}}}`);
  if (args.length)
    arr = arr.map(item => fillArgs(item, Array.from(args)));
  return arr.join(value);
}

export function TranslationProvider({ children, dict }: PropsWithChildren<{ dict: { [key: string]: string } }>) {
  const t = useCallback(((key, args) => {
    if (!args)
      return dict[key];
    return fillArgs(dict[key], Object.entries(args));
  }) as Callback, [dict]);
  const Provider = i18nContext.Provider;

  return <Provider value={t}>{children}</Provider>;
};

export function useTranslation() {
  return useContext(i18nContext);
}
