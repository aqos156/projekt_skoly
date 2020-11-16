import { useSelector } from "react-redux"

export function useUser(): any {
  return useSelector<any>((state) => state?.common?.user)
}
