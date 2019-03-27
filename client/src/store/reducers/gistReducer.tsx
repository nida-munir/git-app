const initState = {};

interface Action {
  type: string;
  data: any;
}
interface State {
  type: string;
  data: any;
}
const gists = (state = [], action: Action) => {};

export default gists;
