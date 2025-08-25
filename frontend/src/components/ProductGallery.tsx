import { useState } from "react";

interface ProductGalleryProps {
  images?: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const galleryImages = images || [];
  console.log(galleryImages);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square  rounded-lg  overflow-hidden">
        <img
          src={galleryImages[selectedImage]}
          alt="Product main view"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail images */}
      <div className="grid grid-cols-4 gap-2">
        {galleryImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square bg-card rounded border overflow-hidden transition-all ${
              selectedImage === index
                ? "ring-2 ring-primary"
                : "hover:ring-1 hover:ring-muted-foreground/50"
            }`}
          >
            <img
              src={image}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
