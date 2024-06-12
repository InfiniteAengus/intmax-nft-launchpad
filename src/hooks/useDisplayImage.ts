import { useState } from "react";

export const useDisplayImage = () => {
  const [result, setResult] = useState<string | ArrayBuffer>("");

  const uploader = (e: any) => {
    const imageFile = e;

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setResult(e.target?.result || "");
    });

    reader.readAsDataURL(imageFile);
  };

  return { result, uploader };
};
