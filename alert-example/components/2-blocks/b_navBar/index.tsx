import ButtonIcon from "@/components/1-atoms/a_ButtonIcon";
import Icon from "@/components/1-atoms/a_icon";
import styles from "./navBar.module.scss";
import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useGetRoute from "@/components/hooks/useGetRoute";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line no-empty-pattern
const NavBar = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  const router = useRouter();
  const route = useGetRoute();

  const onBack = (): void => {
    const lastLink = route[route.length - 2];
    router.push(lastLink.to);
  };

  return (
    <nav
      className={`${styles.navBar} p-3 is-flex is-justify-content-space-between`}
      ref={ref}
    >
      <div className="is-flex is-align-items-center">
        <ButtonIcon
          icon="arrow-left"
          name="back_button"
          onClick={onBack}
          className={`${styles.back_button} ${
            route.length === 1 ? styles.disabled : ""
          }`}
          disabled={!(route.length > 1)}
        />
        {route.map((item, index) =>
          index < route.length - 1 ? (
            <div key={index} className="is-flex is-align-items-center">
              <label className="label m-0">
                <Link href={item.to}>{item.content}</Link>
              </label>
              <Icon icon="chevron-right" />
            </div>
          ) : (
            <label className="label m-0 has-text-grey" key={index}>
              {item.content}
            </label>
          )
        )}
      </div>
    </nav>
  );
});

export default NavBar;
