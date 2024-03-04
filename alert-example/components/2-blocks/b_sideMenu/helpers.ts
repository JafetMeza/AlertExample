import { type ILink } from "@/helpers/links";

export interface ILinkMenu extends ILink {
  index: number;
}

export interface IMenu {
  section: string | null | undefined;
  links: ILinkMenu[];
}

export const getLinks = (content: IMenu[]): ILinkMenu[] => {
  const links: ILinkMenu[] = [];
  // eslint-disable-next-line array-callback-return
  content.map((menu) => {
    links.push(...menu.links);
  });
  return links;
};
