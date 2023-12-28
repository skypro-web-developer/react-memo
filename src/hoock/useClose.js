import { useEffect } from "react";

export const useClose = (ref, callback) => {
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target !== ref.current){
        console.log("eokfoekfoekfoekf");
        callback()
      }
    });
    return () => {
      document.removeEventListener("click", () => {
        if (e.target !== ref.current){
          console.log("eokfoekfoekfoekf");
          callback()
        }
      });
    };
  }, []);
};