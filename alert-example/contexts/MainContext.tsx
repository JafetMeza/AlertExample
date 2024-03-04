"use client";
import { ResponseStatus } from "@/Service/helpers/serviceConstants";
import Loader from "@/components/1-atoms/a_loader";
import { type AppDispatch } from "@/redux/createStore";
import { type IApiData } from "@/redux/ducks/apiData";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AlertContext } from "./AlertContext";
import { ToastIcon } from "@/components/1-atoms/a_toast";
import { useRouter } from "next/navigation";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IMainContext {
  dispatch: AppDispatch | null;
  apiData: IApiData | null;
  router: AppRouterInstance | null;
  tableCookie: string;
}

export const MainContext = createContext<IMainContext>({
  dispatch: null,
  apiData: null,
  router: null,
  tableCookie: "",
});

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const dispatch = useAppDispatch();
  const apiData = useAppSelector((state) => state.apiData);
  const tableCookie = useAppSelector((state) => state.tableCookie);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { CreateToast } = useContext(AlertContext);

  useEffect(() => {
    if (apiData.loading) {
      // Colocar un loader
      setLoading(true);
    } else {
      setLoading(false);
      if (!apiData.ok) {
        // manejar error
        if (apiData.status === ResponseStatus.NO_AUTH) {
          CreateToast("Error de autorización", ToastIcon.error);
          // error de autorización
        } else if (apiData.status === ResponseStatus.CONFLICT) {
          CreateToast("Error de conflicto", ToastIcon.error);
          // error de conflicto
        } else {
          CreateToast(apiData.errorMessage, ToastIcon.error);
          // manejar error generico
        }
      }
    }

    return () => {};
  }, [apiData.loading, apiData.errorMessage]);

  return (
    <MainContext.Provider
      value={{
        dispatch,
        apiData,
        router,
        tableCookie,
      }}
    >
      <Loader isActive={loading} />
      {children}
    </MainContext.Provider>
  );
}
