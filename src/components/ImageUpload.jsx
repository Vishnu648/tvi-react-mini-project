import axios from "axios";

export default function App({ imageSetter }) {
  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgUrl = reader.result;
        // console.log(reader.result);
        imageSetter(file,reader.result);
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
