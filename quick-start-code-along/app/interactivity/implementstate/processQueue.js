export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (const item of queue) {
    if (typeof item === 'function') {
      finalState = item(finalState);
    } else {
      finalState = item;
    }
  }

  return finalState;
}