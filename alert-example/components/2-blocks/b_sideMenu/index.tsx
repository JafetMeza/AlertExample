import styles from "./sideMenu.module.scss";
import Image from "next/image";
import Link from "next/link";
import { type RefObject, createRef, useEffect, useRef, useState } from "react";
import useMounted from "@/components/hooks/useMounted";
import useGetRoute from "@/components/hooks/useGetRoute";
import { type IMenu, getLinks } from "./helpers";
import logo from "../../../public/images/methode.png";

interface SideMenuProps {
  content: IMenu[];
}

export default function SideMenu({
  content,
}: SideMenuProps): React.JSX.Element | null {
  const mounted = useMounted();

  const createRefs = (): Array<RefObject<HTMLAnchorElement>> =>
    getLinks(content).map(() => createRef<HTMLAnchorElement>());
  const refs = useRef<Array<RefObject<HTMLAnchorElement>>>(createRefs());
  const [activeMenu, setActiveMenu] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const route = useGetRoute();

  useEffect(() => {
    if (route.length > 0 && refs.current) {
      const menuLinks = getLinks(content);
      const index = menuLinks.find(
        (m) => m.content === route[route.length - 1].content
      )?.index;
      if (index !== undefined) setActiveClass(index);
    }
  }, [route]);

  const removeActiveClass = (): void => {
    // eslint-disable-next-line array-callback-return
    refs.current?.map((item) => {
      item.current?.classList.remove(styles.link_active);
    });
  };

  const setActiveClass = (index: number): void => {
    removeActiveClass();
    if (refs.current?.[index])
      refs.current[index].current?.classList.add(styles.link_active);
  };

  const onMenuBarClick = (): void => {
    if (activeMenu) {
      setDeactivating(true);
      setTimeout(() => {
        setDeactivating(false);
      }, 380);
    }
    setActiveMenu(!activeMenu);
  };

  if (mounted)
    return (
      <aside
        className={`menu is-hidden-mobile ${styles.sideMenu} ${
          activeMenu ? styles.active_menu : styles.inactive_menu
        } ${deactivating && styles.deactivating_menu}`}
      >
        <div className="is-flex is-justify-content-center is-align-items-center py-5">
          {mounted && (
            <Image
              src={logo}
              alt="sciodesk_logo"
              className={styles.image}
              width={0}
              height={0}
              priority
              placeholder="blur"
              blurDataURL={"../../../public/images/methode.png"}
            />
          )}
        </div>
        <div className={`${styles.icon_bars}`} onClick={() => onMenuBarClick()}>
          <span className={`icon`}>
            <i className={`fas fa-${activeMenu ? "chevron-left" : "bars"}`} />
          </span>
        </div>
        <ul className="menu-list">
          {content.map((section, index) => (
            <li key={index} className="px-4">
              {section.section && (
                <div className={styles.separator}>
                  <div />
                  <span>{section.section}</span>
                </div>
              )}
              {section.links.map((item, index2) => (
                <div
                  className="py-1 has-tooltip-right has-tooltip-info"
                  key={index2}
                  data-tooltip={item.content}
                  style={{ position: "relative" }}
                >
                  <Link
                    ref={refs.current[item.index]}
                    className={`${styles.link_button} py-5 `}
                    href={item.to}
                  >
                    <span className={`icon ${styles.icon}`}>
                      <i className={`fas fa-${item.icon}`}></i>
                    </span>
                    <span className={`${styles.text} ml-5`}>
                      {item.content}
                    </span>
                  </Link>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </aside>
    );
  else return null;
}
