const errorMessages = {
  user: {
    404: 'No user was found with given credentials',
    422: 'Could not parse the request'
  }
};

export default function generateError(source, status) {
  return errorMessages[source][status];
}