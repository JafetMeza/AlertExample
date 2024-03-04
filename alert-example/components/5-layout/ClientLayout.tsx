"use client";
import { Provider } from "react-redux";
import AlertProvider from "@/contexts/AlertContext";
import MainProvider from "@/contexts/MainContext";
import store from "@/redux/createStore";
import { Suspense } from "react";
import Layout from "./layout";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <Provider store={store}>
      <AlertProvider>
        <MainProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Layout>{children}</Layout>
          </Suspense>
        </MainProvider>
      </AlertProvider>
    </Provider>
  );
}
