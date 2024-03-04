"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import SideMenu from "../2-blocks/b_sideMenu";
import styles from "./layout.module.scss";
import MobileMenu from "../2-blocks/b_mobileMenu";
import NavBar from "../2-blocks/b_navBar";
import useMounted from "../hooks/useMounted";
import { initMenu, initMenuMobile } from "./menu";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const mounted = useMounted();
  const navBar = useRef<HTMLDivElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("100%");

  useEffect(() => {
    if (mounted && navBar.current) {
      setTimeout(() => {
        if (navBar.current) {
          let height = navBar.current.clientHeight;

          if (mobileMenu.current) {
            height += mobileMenu.current.clientHeight;
          }
          setHeight(`calc(100% - ${height}px)`);
        }
      }, 100);
    }
  }, [mounted]);

  return (
    <div className={`${styles.layout_content}`}>
      <MobileMenu ref={mobileMenu} content={initMenuMobile} />
      <section className={`is-flex p-0`}>
        <SideMenu content={initMenu} />
        <div className={`p-0 is-fullwidth`}>
          <NavBar ref={navBar} />
          <main className={`${styles.main} p-5`} style={{ height }}>
            <Suspense fallback={<div>Loading...</div>}></Suspense>
            {children}
          </main>
        </div>
      </section>
    </div>
  );
}
