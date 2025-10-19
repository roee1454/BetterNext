// navigation-context.tsx

"use client";

import { usePathname } from "next/navigation";
import { createContext, ReactNode, useContext, useOptimistic } from "react";

type OptimisticNavigationContextType = {
  isNavigating: boolean;
  optimisticPathname: string;
  setOptimisticPathname: (id: string) => void;
};

type OptimisticNavigationContextProviderProps = {
  children: ReactNode;
};

const OptimisticNavigationContext = createContext<
  OptimisticNavigationContextType | undefined
>(undefined);

/**
 * This context provider will hold the state of the navigation and provide a way to update it.
 * Wrap this around your app to use.
 */
export const OptimisticNavigationContextProvider = ({
  children,
}: OptimisticNavigationContextProviderProps) => {
  const pathname = usePathname();
  const [optimisticPathname, setOptimisticPathname] = useOptimistic(
    pathname,
    (_, action: string) => action
  );

  return (
    <OptimisticNavigationContext.Provider
      value={{
        isNavigating: pathname !== optimisticPathname,
        optimisticPathname,
        setOptimisticPathname,
      }}
    >
      {children}
    </OptimisticNavigationContext.Provider>
  );
};

/**
 * Use this hook to get the state of the navigation and update it from client components.
 */
export const useOptimisticNavigation = () => {
  const context = useContext(OptimisticNavigationContext);
  if (!context) {
    throw new Error(
      "useOptimisticNavigation must be used within a OptimisticNavigationContextProvider"
    );
  }
  return context;
};
