type ErrorObject = {
  [key: string]: string[]
}

type FormattedError = {
  key: string
  error: string
}

export const formatErrors = (errorObject: ErrorObject): FormattedError[] => {
  const formattedErrors = []

  for (const key in errorObject) {
    if (errorObject.hasOwnProperty(key)) {
      formattedErrors.push({
        key: key,
        error: errorObject[key][0]
      })
    }
  }

  return formattedErrors
}
