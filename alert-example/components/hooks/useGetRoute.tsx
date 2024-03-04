import { useEffect, useState } from "react";
import useMounted from "./useMounted";
import { usePathname } from "next/navigation";
import { type ILink, type IMainLink, Links } from "@/helpers/links";

export default function useGetRoute(): ILink[] {
  const mounted = useMounted();
  const pathName = usePathname();
  const [route, setRoute] = useState<ILink[]>([]);

  useEffect(() => {
    if (mounted) {
      let found = false;
      // eslint-disable-next-line array-callback-return
      Object.keys(Links).map((item) => {
        const link = Links[item as keyof IMainLink];
        if (pathName.includes(link.to.replaceAll("/", ""))) {
          if (link.route) {
            found = true;
            setRoute([...link.route, link]);
          } else setRoute([link]);
        }
      });

      if (!found && pathName.replaceAll("/", "").length > 0) {
        setRoute([
          {
            content: "Inicio",
            icon: "home",
            to: "/",
          },
          {
            content: "Página no encontrada",
            icon: "triangle-exclamation",
            to: "/",
          },
        ]);
      }
    }

    return () => setRoute([]);
  }, [pathName, mounted]);

  return route;
}
