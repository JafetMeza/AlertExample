export interface ILink {
  content: string;
  icon: string;
  to: string;
  route?: ILink[];
}

export interface IMainLink {
  home: ILink;
  settings: ILink;
  login: ILink;
}

const _links: IMainLink = {
  home: {
    content: "Inicio",
    icon: "home",
    to: "/",
  },
  settings: {
    content: "Configuración",
    icon: "gear",
    to: "/settings",
  },
  login: {
    content: "Inicio de sesión",
    icon: "user",
    to: "/login",
  },
};

export const Links: IMainLink = {
  home: {
    ..._links.home,
  },
  settings: {
    ..._links.settings,
    route: [_links.home],
  },
  login: _links.login,
};
