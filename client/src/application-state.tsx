export interface ApplicationState {
  greeting: string;
  count: number;
  id: number;
  url: string;
  gists: Array<Gist>;
  token: string;
  username: string;
  avatar: string;
  isAuthenticated: boolean;
}

export const defaultState: ApplicationState = {
  greeting: "React-TypeScript-Redux Example",
  isAuthenticated: false,
  count: 0,
  id: 0,
  url: "",
  gists: [],
  token: "",
  username: "",
  avatar: ""
};

export interface Gist {
  id: string;
  filesCount: number;
  public: boolean;
  createdAt: string;
  html_url: string;
}

// interface Note {
//   name: string;
//   content: string;
// }
