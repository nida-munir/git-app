export interface ApplicationState {
  greeting: string;
  count: number;
}

export const defaultState: ApplicationState = {
  greeting: "React-TypeScript-Redux Example",
  count: 0
};
