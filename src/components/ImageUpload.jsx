import { useState } from "react";
import axios from "axios";

export default function App({ imageSetter }) {
  const [imgage, setImgage] = useState("");

  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgage(reader.result);
        imageSetter(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="h-8">
      <input
        type="file"
        name="file"
        onChange={handleImage}
        accept="image/*"
        className="text-[10px]"
      />
    </div>
  );
}
