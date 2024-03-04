export const loadState = (): any => {
  try {
    const serializedState = localStorage.getItem("sciodesk-methode-state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: object): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("sciodesk-methode-state", serializedState);
  } catch (error) {}
};
