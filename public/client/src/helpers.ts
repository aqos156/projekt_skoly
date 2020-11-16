import { store } from "react-notifications-component"

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://test.l/api"
    : "http://skoly.arbeiter.cloud/api"

export function getApiURI(path: string = "") {
  return API_URL + path
}

export const customError = (message: string) =>
  store.addNotification({
    title: "Chyba!",
    message: message,
    type: "danger",
    insert: "top",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  })

export const customSuccess = (message: string) =>
  store.addNotification({
    title: "Povedlo se!",
    message: message,
    type: "success",
    insert: "top",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  })
