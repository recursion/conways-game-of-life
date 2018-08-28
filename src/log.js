/***************************************** */
// log - turn logging on/off from one place
// allows for future refinement if desired

const LOGGING = true;

const log = (msg, ...rest) => {
  if (LOGGING) {
    let message = '-->';
    if (!rest) {
      message += `${msg}`;
    } else {
      message += `${msg}: ${rest.length ? JSON.stringify(rest, null, 2) : ''}`;
    }
    console.log(message);
  }
}

export default log;