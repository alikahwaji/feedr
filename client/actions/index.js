export const SHOW_ERROR = 'SHOW_ERROR'

export * from './listings'
export * from './organisations'
export * from './auth'
export function showError (errorMessage) {
  return {
    type: SHOW_ERROR,
    errorMessage: errorMessage
  }
}
