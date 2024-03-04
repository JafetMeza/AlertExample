import { type ILink, Links } from "@/helpers/links";
import { type IMenu } from "../2-blocks/b_sideMenu/helpers";

export const menuMobile: ILink[] = [Links.home, Links.login];

export const initMenu: IMenu[] = [
  {
    section: null,
    links: [
      {
        ...Links.home,
        index: 0,
      },
    ],
  },
  {
    section: null,
    links: [
      {
        ...Links.login,
        index: 1,
      },
    ],
  },
];

export const initMenuMobile: ILink[] = [Links.home, Links.login];
