export interface ApplicationState {
  greeting: string;
  count: number;
  id: number;
  url: string;
  notes: Array<Note>;
  notesCount: number;
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
  notes: [],
  notesCount: 0,
  token: "",
  username: "",
  avatar: ""
};

interface Note {
  name: string;
  content: string;
}
