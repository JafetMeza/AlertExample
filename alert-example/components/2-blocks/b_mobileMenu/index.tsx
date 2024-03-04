import { forwardRef, useState } from "react";
import logo from "../../../public/images/methode.png";
import Image from "next/image";
import styles from "./mobileMenu.module.scss";
import { type ILink } from "@/helpers/links";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MobileMenuProps {
  content: ILink[];
}

const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  (props, ref): React.JSX.Element => {
    const [isActive, setIsActive] = useState(false);

    const onClick = (): void => setIsActive(!isActive);

    const onLinkClick = (): void => setIsActive(false);

    return (
      <>
        <div
          ref={ref}
          className={`is-hidden-tablet is-flex is-justify-content-space-between is-align-items-center ${styles.container} `}
        >
          <a
            role="button"
            className={`navbar-burger ml-1 ${styles.burger} ${
              isActive ? "is-active" : ""
            }`}
            aria-label="menu"
            onClick={onClick}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
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
        </div>
        <div className={`${styles.menu} ${isActive ? styles.active : ""}`}>
          <ul>
            {props.content.map((item, index) => (
              <li key={index}>
                <Link href={item.to} onClick={onLinkClick}>
                  {item.content}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
);

export default MobileMenu;
