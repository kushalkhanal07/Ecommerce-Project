// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { X } from "lucide-react";
// import { useMutation } from "@tanstack/react-query";
// import { addProduct } from "@/service/products";
// import { toast } from "sonner";

// const ProductForm = ({
//   initialData = null,
//   onSubmit,
// }: {
//   initialData: any;
//   onSubmit: any;
// }) => {
//   const [formData, setFormData] = useState({
//     name: initialData?.name || "",
//     brand: initialData?.brand || "",
//     size: initialData?.size || "",
//     price: initialData?.price || "",
//     description: initialData?.description || "",
//     image: initialData?.image || "",
//     stock: initialData?.stock || "",
//   });

//   const [imagePreview, setImagePreview] = useState(initialData?.image || null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   console.log(selectedFile);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     console.log(formData);
//     // Create FormData object to handle file upload
//     const submitData = new FormData();
//     submitData.append("name", formData.name);
//     submitData.append("brand", formData.brand);
//     submitData.append("size[]", formData.size);
//     submitData.append("price", formData.price);
//     submitData.append("description", formData.description);
//     submitData.append("stock", formData.stock);

//     // Only append the file if a new one was selected
//     if (selectedFile) {
//       submitData.append("image", selectedFile);
//     } else if (initialData?.image) {
//       // If editing and no new file selected, keep the existing image URL
//       submitData.append("imageUrl", formData.image);
//     }

//     onSubmit(submitData);
//     mutation.mutate(submitData);
//   };

//   const mutation = useMutation({
//     mutationFn: addProduct,
//     onSuccess: (data) => {
//       console.log(data);
//       toast.success("Product add Successful", {
//         description: "successfull.",
//       });
//     },
//     onError: () => {
//       toast.error("Add product failed", {
//         description: "Failed adding product",
//       });
//     },
//   });

//   const handleChange = (field: any, value: any) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleImageChange = (e: any) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);

//       // Create a preview URL for the image
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);

//       // Also update the formData for potential fallback
//       handleChange("image", URL.createObjectURL(file));
//     }
//   };

//   const handleRemoveImage = () => {
//     setImagePreview(null);
//     setSelectedFile(null);
//     handleChange("image", "");

//     // Reset the file input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const brands = [
//     "Nike",
//     "Adidas",
//     "Converse",
//     "Vans",
//     "Puma",
//     "New Balance",
//     "Jordan",
//     "Reebok",
//   ];
//   const sizes = ["L", "XL", "XXL", "M"];

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="name">Product Name</Label>
//           <Input
//             id="name"
//             value={formData.name}
//             onChange={(e) => handleChange("name", e.target.value)}
//             placeholder="Enter product name"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="brand">Brand</Label>
//           <Select
//             value={formData.brand}
//             onValueChange={(value) => handleChange("brand", value)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select brand" />
//             </SelectTrigger>
//             <SelectContent>
//               {brands.map((brand) => (
//                 <SelectItem key={brand} value={brand}>
//                   {brand}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="size">Size</Label>
//           <Select
//             value={formData.size}
//             onValueChange={(value) => handleChange("size", value)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select size" />
//             </SelectTrigger>
//             <SelectContent>
//               {sizes.map((size) => (
//                 <SelectItem key={size} value={size}>
//                   {size}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="price">Price ($)</Label>
//           <Input
//             id="price"
//             type="number"
//             step="0.01"
//             value={formData.price}
//             onChange={(e) => handleChange("price", e.target.value)}
//             placeholder="Enter price"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="stock">Stock Quantity</Label>
//           <Input
//             id="stock"
//             type="number"
//             value={formData.stock}
//             onChange={(e) => handleChange("stock", e.target.value)}
//             placeholder="Enter stock quantity"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="image">Product Image</Label>
//           <Input
//             id="image"
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             ref={fileInputRef}
//           />
//         </div>
//       </div>

//       {/* Image Preview */}
//       {imagePreview && (
//         <div className="relative inline-block">
//           <div className="w-40 h-40 border rounded-md overflow-hidden">
//             <img
//               src={imagePreview}
//               alt="Product preview"
//               className="w-full h-full object-contain"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={handleRemoveImage}
//             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       )}

//       <div className="space-y-2">
//         <Label htmlFor="description">Description</Label>
//         <Textarea
//           id="description"
//           value={formData.description}
//           onChange={(e) => handleChange("description", e.target.value)}
//           placeholder="Enter product description"
//           rows={3}
//           required
//         />
//       </div>

//       <div className="flex justify-end space-x-2 pt-4">
//         <Button type="submit">
//           {initialData ? "Update Product" : "Add Product"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ProductForm;

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct, getProducts } from "@/service/products";
import { toast } from "sonner";

const ProductForm = ({
  initialData = null,
  onSubmit,
}: {
  initialData: any;
  onSubmit: any;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    size: "",
    price: "",
    description: "",
    image: "",
    stock: "",
  });

  const [imagePreview, setImagePreview] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize form with initialData when it changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        brand: initialData.brand || "",
        size: initialData.size || "",
        price: initialData.price || "",
        description: initialData.description || "",
        image: initialData.image || "",
        stock: initialData.stock || "",
      });

      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    }
  }, [initialData]);
  const queryClient = useQueryClient();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Create FormData object to handle file upload
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("brand", formData.brand);
    submitData.append("size[]", formData.size);
    submitData.append("price", formData.price);
    submitData.append("description", formData.description);
    submitData.append("stock", formData.stock);

    // Only append the file if a new one was selected
    if (selectedFile) {
      submitData.append("image", selectedFile);
    } else if (initialData?.image) {
      // If editing and no new file selected, keep the existing image URL
      submitData.append("imageUrl", formData.image);
    }

    // for (let [key, value] of submitData.entries()) {
    //   console.log(key, value);
    // }
    console.log("====", formData);

    onSubmit(submitData);

    // If adding a new product (not editing), call the mutation
    if (!initialData) {
      mutation.mutate(submitData);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
  });

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      console.log("Add success:", data);
      toast.success("Product added successfully");
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
    },
    onError: () => {
      toast.error("Add product failed");
    },
  });

  const handleChange = (field: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader?.result);
      };
      reader.readAsDataURL(file);

      // Also update the formData for potential fallback
      handleChange("image", URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    handleChange("image", "");

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const brands = [
    "Nike",
    "Adidas",
    "Converse",
    "Vans",
    "Puma",
    "New Balance",
    "Jordan",
    "Reebok",
  ];
  const sizes = ["L", "XL", "XXL", "M"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Select
            value={formData.brand}
            onValueChange={(value) => handleChange("brand", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="size">Size</Label>
          <Select
            value={formData.size}
            onValueChange={(value) => handleChange("size", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => handleChange("stock", e.target.value)}
            placeholder="Enter stock quantity"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Product Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </div>
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="relative inline-block">
          <div className="w-40 h-40 border rounded-md overflow-hidden">
            <img
              src={imagePreview}
              alt="Product preview"
              className="w-full h-full object-contain"
            />
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter product description"
          rows={3}
          required
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit">
          {initialData ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
