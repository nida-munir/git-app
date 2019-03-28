export interface ApplicationState {
  greeting: string;
  count: number;
  id: number;
  url: string;
  notes: Array<Note>;
  notesCount: number;
  token: string;
}

export const defaultState: ApplicationState = {
  greeting: "React-TypeScript-Redux Example",
  count: 0,
  id: 0,
  url: "",
  notes: [],
  notesCount: 0,
  token: ""
};

interface Note {
  name: string;
  content: string;
}
