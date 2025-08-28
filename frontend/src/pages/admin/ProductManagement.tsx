// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Plus, Edit, Trash2, Search, Loader } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import ProductForm from "@/components/admin/ProductForm";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { addProduct, deleteProducts, getProducts } from "@/service/products";
// import { toast } from "sonner";

// // Mock data for products
// const mockProducts = [
//   {
//     id: "1",
//     name: "Nike Air Max 90",
//     brand: "Nike",
//     size: "US 9",
//     price: 129.99,
//     description: "Classic Nike Air Max with visible air cushioning",
//     image: "/placeholder.svg",
//     stock: 25,
//     status: "In Stock",
//   },
//   {
//     id: "2",
//     name: "Adidas Ultraboost 22",
//     brand: "Adidas",
//     size: "US 10",
//     price: 159.99,
//     description: "Premium running shoe with Boost technology",
//     image: "/placeholder.svg",
//     stock: 12,
//     status: "Low Stock",
//   },
//   {
//     id: "3",
//     name: "Converse Chuck Taylor",
//     brand: "Converse",
//     size: "US 8.5",
//     price: 69.99,
//     description: "Classic canvas sneaker, timeless design",
//     image: "/placeholder.svg",
//     stock: 0,
//     status: "Out of Stock",
//   },
//   {
//     id: "4",
//     name: "Vans Old Skool",
//     brand: "Vans",
//     size: "US 11",
//     price: 89.99,
//     description: "Iconic skate shoe with waffle outsole",
//     image: "/placeholder.svg",
//     stock: 18,
//     status: "In Stock",
//   },
// ];

// const ProductManagement = () => {
//   const [products, setProducts] = useState(mockProducts);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<any>(null);
//   const queryClient = useQueryClient();
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["getProduts"],
//     queryFn: getProducts,
//   });

//   const mutation = useMutation({
//     mutationFn: deleteProducts,
//     onSuccess: (data) => {
//       console.log(data);
//       toast.success("Product deleted Successful", {
//         description: "successfull.",
//       });
//       queryClient.invalidateQueries({ queryKey: ["getProduts"] });
//     },
//     onError: () => {
//       toast.error("product delete failed", {
//         description: "Failed deleting product",
//       });
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-[600px]">
//         <Loader size={25} className="animate-spin" />
//       </div>
//     );
//   }

//   if (isError) {
//     return <div>{error?.message}</div>;
//   }

//   console.log("product==", data);

//   const filteredProducts = data.filter(
//     (product: any) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.brand.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddProduct = (formData: FormData) => {
//     // Extract values from FormData
//     const name = formData.get("name") as string;
//     const brand = formData.get("brand") as string;
//     const size = formData.get("size") as string;
//     const price = parseFloat(formData.get("price") as string);
//     const description = formData.get("description") as string;
//     const stock = parseInt(formData.get("stock") as string);

//     // For image, we need to handle both file upload and URL
//     let imageUrl = "/placeholder.svg"; // Default placeholder

//     // If a new image file was uploaded, create a temporary URL for preview
//     const imageFile = formData.get("image") as File;
//     if (imageFile && imageFile.size > 0) {
//       imageUrl = URL.createObjectURL(imageFile);
//     } else if (formData.get("imageUrl")) {
//       // If editing and keeping the existing image
//       imageUrl = formData.get("imageUrl") as string;
//     }

//     const newProduct = {
//       id: (products.length + 1).toString(),
//       name,
//       brand,
//       size,
//       price,
//       description,
//       image: imageUrl,
//       stock,
//       status:
//         stock > 10 ? "In Stock" : stock > 0 ? "Low Stock" : "Out of Stock",
//     };

//     setProducts([...products, newProduct]);
//     setIsAddDialogOpen(false);
//   };

//   const handleEditProduct = (formData: FormData) => {
//     // Extract values from FormData
//     const name = formData.get("name") as string;
//     const brand = formData.get("brand") as string;
//     const size = formData.get("size") as string;
//     const price = parseFloat(formData.get("price") as string);
//     const description = formData.get("description") as string;
//     const stock = parseInt(formData.get("stock") as string);

//     // For image, we need to handle both file upload and URL
//     let imageUrl = editingProduct.image; // Keep existing image by default

//     // If a new image file was uploaded, create a temporary URL for preview
//     const imageFile = formData.get("image") as File;
//     if (imageFile && imageFile.size > 0) {
//       imageUrl = URL.createObjectURL(imageFile);
//     } else if (formData.get("imageUrl")) {
//       // If keeping the existing image
//       imageUrl = formData.get("imageUrl") as string;
//     }

//     const updatedProducts = products.map((product) =>
//       product.id === editingProduct?.id
//         ? {
//             id: editingProduct.id,
//             name,
//             brand,
//             size,
//             price,
//             description,
//             image: imageUrl,
//             stock,
//             status:
//               stock > 10
//                 ? "In Stock"
//                 : stock > 0
//                 ? "Low Stock"
//                 : "Out of Stock",
//           }
//         : product
//     );

//     setProducts(updatedProducts);
//     setEditingProduct(null);
//   };

//   const handleDeleteProduct = (productId: any) => {
//     setProducts(products.filter((product) => product.id !== productId));
//   };

//   const getStatusColor = (status: any) => {
//     switch (status) {
//       case "In Stock":
//         return "bg-green-100 text-green-800";
//       case "Low Stock":
//         return "bg-yellow-100 text-yellow-800";
//       case "Out of Stock":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">Product Management</h1>
//           <p className="text-muted-foreground">Manage your shoe inventory</p>
//         </div>
//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="h-4 w-4 mr-2" />
//               Add Product
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-w-2xl">
//             <DialogHeader>
//               <DialogTitle>Add New Product</DialogTitle>
//             </DialogHeader>
//             <ProductForm onSubmit={handleAddProduct} initialData={undefined} />
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Card>
//         <CardHeader>
//           <div className="flex justify-between items-center">
//             <CardTitle>Products ({filteredProducts.length})</CardTitle>
//             <div className="flex items-center space-x-2">
//               <Search className="h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-64"
//               />
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product</TableHead>
//                 <TableHead>Brand</TableHead>
//                 <TableHead>Size</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Stock</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredProducts.map((product: any) => (
//                 <TableRow key={product.id}>
//                   <TableCell>
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={product.images[0]}
//                         alt={product.name}
//                         className="h-12 w-12 rounded-lg object-cover"
//                       />
//                       <div>
//                         <p className="font-medium">{product.name}</p>
//                         <p className="text-sm text-muted-foreground line-clamp-1">
//                           {product.description}
//                         </p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>{product.brand}</TableCell>
//                   <TableCell>{product.size}</TableCell>
//                   <TableCell>${product.price}</TableCell>
//                   <TableCell>{product.stock}</TableCell>
//                   {/* <TableCell>
//                     <Badge className={getStatusColor(product.status)}>
//                       {product.status}
//                     </Badge>
//                   </TableCell> */}
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       <Dialog
//                         open={editingProduct?.id === product.id}
//                         onOpenChange={(open) =>
//                           !open && setEditingProduct(null)
//                         }
//                       >
//                         <DialogTrigger asChild>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => setEditingProduct(product)}
//                           >
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                         </DialogTrigger>
//                         <DialogContent className="max-w-2xl">
//                           <DialogHeader>
//                             <DialogTitle>Edit Product</DialogTitle>
//                           </DialogHeader>
//                           <ProductForm
//                             initialData={editingProduct}
//                             onSubmit={handleEditProduct}
//                           />
//                         </DialogContent>
//                       </Dialog>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => mutation.mutate(product.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ProductManagement;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "@/components/admin/ProductForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProduct,
  deleteProducts,
  getProducts,
  updateProducts,
} from "@/service/products";
import { toast } from "sonner";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProducts,
    onSuccess: (data) => {
      console.log("Delete success:", data);
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
    },
    onError: () => {
      toast.error("Product delete failed");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProducts,
    onSuccess: (data) => {
      console.log("Update success:", data);
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
      setEditingProduct(null);
    },
    onError: () => {
      toast.error("Product update failed");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <Loader size={25} className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  const filteredProducts = data.filter(
    (product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProduct = (formData: FormData) => {
    console.log(formData);
    // Extract values from FormData
    const name = formData.get("name") as string;
    const brand = formData.get("brand") as string;
    const size = formData.get("size[]") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const stock = parseInt(formData.get("stock") as string);

    // For image, we need to handle both file upload and URL
    let imageUrl = editingProduct.image; // Keep existing image by default

    // If a new image file was uploaded, create a temporary URL for preview
    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile.size > 0) {
      imageUrl = URL.createObjectURL(imageFile);
    } else if (formData.get("imageUrl")) {
      // If keeping the existing image
      imageUrl = formData.get("imageUrl") as string;
    }

    const updatedProduct = {
      id: editingProduct.id,
      name,
      brand,
      size,
      price,
      description,
      image: imageUrl,
      stock,
      status:
        stock > 10 ? "In Stock" : stock > 0 ? "Low Stock" : "Out of Stock",
    };

    console.log("Updated product data:", updatedProduct);

    // Call the API mutation to update the product
    updateMutation.mutate(updatedProduct);
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product Management</h1>
          <p className="text-muted-foreground">Manage your shoe inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={() => {}} initialData={undefined} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product: any) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog
                        open={editingProduct?.id === product.id}
                        onOpenChange={(open) =>
                          !open && setEditingProduct(null)
                        }
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                          </DialogHeader>
                          <ProductForm
                            initialData={editingProduct}
                            onSubmit={handleEditProduct}
                          />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMutation.mutate(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
