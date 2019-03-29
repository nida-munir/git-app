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
  selectedGist: GistWithFiles;
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
  avatar: "",
  selectedGist: { id: "", description: "", files: [{ name: "", content: "" }] }
};
export interface GistWithFiles {
  id: string;
  description: string;
  files: Array<File>;
}
export interface File {
  name: string;
  content: string;
}
export interface Gist {
  id: string;
  filesCount: number;
  public: boolean;
  createdAt: string;
  description: string;
  html_url: string;
}
