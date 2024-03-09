import { useState } from "react";
import axios from "axios";

export default function App({imageSetter}) {
  const [imgage, setImgage] = useState('')

  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgage(reader.result);
        imageSetter(reader.result)
      };
      reader.readAsDataURL(file);
    }
  }

  const handleApi=() => {
    console.log(imgage);
  }
  

  return (
    <div className="h-8 border border-red-800">
      <input type="file" name="file" onChange={handleImage} accept="image/*" />

      <button className="px-2 py-1 bg-slate-600" onClick={handleApi}>
        Submit
      </button>
    </div>
  );
}
