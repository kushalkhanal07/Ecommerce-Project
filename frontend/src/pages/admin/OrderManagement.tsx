import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, Filter, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getOrders } from "@/service/order";
import { useQuery } from "@tanstack/react-query";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    date: "2024-01-15",
    total: 259.98,
    status: "Delivered",
    items: [
      { name: "Nike Air Max 90", size: "US 9", quantity: 1, price: 129.99 },
      {
        name: "Adidas Ultraboost 22",
        size: "US 10",
        quantity: 1,
        price: 129.99,
      },
    ],
    shippingAddress: "123 Main St, City, State 12345",
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@email.com",
    date: "2024-01-14",
    total: 89.99,
    status: "Processing",
    items: [
      { name: "Vans Old Skool", size: "US 8", quantity: 1, price: 89.99 },
    ],
    shippingAddress: "456 Oak Ave, City, State 67890",
  },
  {
    id: "ORD-003",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@email.com",
    date: "2024-01-13",
    total: 199.98,
    status: "Shipped",
    items: [
      {
        name: "Converse Chuck Taylor",
        size: "US 11",
        quantity: 2,
        price: 99.99,
      },
    ],
    shippingAddress: "789 Pine St, City, State 13579",
  },
  {
    id: "ORD-004",
    customerName: "Sarah Wilson",
    customerEmail: "sarah.wilson@email.com",
    date: "2024-01-12",
    total: 159.99,
    status: "Pending",
    items: [
      { name: "Nike Air Force 1", size: "US 7.5", quantity: 1, price: 159.99 },
    ],
    shippingAddress: "321 Elm St, City, State 24680",
  },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getOrders"],
    queryFn: getOrders,
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
  console.log(data);

  const filteredOrders = data.filter((order: any) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: any, newStatus: any) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status: any) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Order Management</h1>
        <p className="text-muted-foreground">
          Manage customer orders and track deliveries
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.user.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>
                    <span className="inline-block border-red-600 border px-3 py-1 rounded-2xl text-red-500">
                      {order.status}
                    </span>
                    {/* <Select
                      value={order.status.toLowerCase()}
                      onValueChange={(value) =>
                        updateOrderStatus(
                          order.id,
                          value.charAt(0).toUpperCase() + value.slice(1)
                        )
                      }
                    >
                      <SelectTrigger className="w-32">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select> */}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            Order Details - {selectedOrder?.id}
                          </DialogTitle>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-6">
                            {/* Customer Information */}
                            <div>
                              <h3 className="font-semibold mb-2">
                                Customer Information
                              </h3>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <p>
                                  <strong>Name:</strong>{" "}
                                  <span className="capitalize">
                                    {selectedOrder.user.name}
                                  </span>
                                </p>
                                <p>
                                  <strong>Email:</strong>{" "}
                                  {selectedOrder.user.email}
                                </p>
                                <p>
                                  <strong>Shipping Address:</strong>{" "}
                                  {selectedOrder.shippingAddress}
                                </p>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div>
                              <h3 className="font-semibold mb-2">
                                Order Items
                              </h3>
                              <div className="space-y-2">
                                {selectedOrder.items.map(
                                  (item: any, index: number) => (
                                    <div
                                      key={index}
                                      className="flex justify-between items-center p-3 border rounded-lg"
                                    >
                                      <div>
                                        <p className="font-medium">
                                          {item.productName}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          Price: ${item.price} | Qty:{" "}
                                          {item.quantity}
                                        </p>
                                      </div>
                                      <p className="font-medium">
                                        ${item.price * item.quantity}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Order Summary */}
                            <div className="border-t pt-4">
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">
                                  Total:
                                </span>
                                <span className="text-lg font-semibold">
                                  ${order.totalAmount}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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

export default OrderManagement;
