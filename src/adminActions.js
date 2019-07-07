const makeDeck = (year, stage) => async (dispatch) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ year, stage })
  };

  const response = await fetch(`${process.env.REACT_APP_API_PREFIX}/makedeck`, requestOptions);
  return response;
}

export { makeDeck };