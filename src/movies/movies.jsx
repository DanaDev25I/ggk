import { useState } from 'react';

function ImageUploader() {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300 mb-4">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            No Image
          </div>
        )}
      </div>

      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleButtonClick}
      >
        Upload Image
      </button>
    </div>
  );
}

export default ImageUploader;
