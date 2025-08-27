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
import { Search, Eye, Mail, Phone, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomer } from "@/service/customer";

// Mock data for customers
const mockCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2023-06-15",
    totalOrders: 8,
    totalSpent: 1247.92,
    status: "Active",
    recentOrders: [
      { id: "ORD-001", date: "2024-01-15", total: 259.98, status: "Delivered" },
      { id: "ORD-015", date: "2024-01-10", total: 189.99, status: "Delivered" },
      { id: "ORD-028", date: "2024-01-05", total: 99.99, status: "Delivered" },
    ],
    address: "123 Main St, City, State 12345",
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2023-08-22",
    totalOrders: 12,
    totalSpent: 2156.88,
    status: "Active",
    recentOrders: [
      { id: "ORD-002", date: "2024-01-14", total: 89.99, status: "Processing" },
      { id: "ORD-020", date: "2024-01-08", total: 299.98, status: "Delivered" },
      { id: "ORD-035", date: "2024-01-02", total: 149.99, status: "Delivered" },
    ],
    address: "456 Oak Ave, City, State 67890",
  },
  {
    id: "CUST-003",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2023-12-10",
    totalOrders: 3,
    totalSpent: 459.97,
    status: "Active",
    recentOrders: [
      { id: "ORD-003", date: "2024-01-13", total: 199.98, status: "Shipped" },
      { id: "ORD-042", date: "2024-01-06", total: 129.99, status: "Delivered" },
    ],
    address: "789 Pine St, City, State 13579",
  },
  {
    id: "CUST-004",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1 (555) 456-7890",
    joinDate: "2023-03-18",
    totalOrders: 1,
    totalSpent: 159.99,
    status: "Inactive",
    recentOrders: [
      { id: "ORD-004", date: "2024-01-12", total: 159.99, status: "Pending" },
    ],
    address: "321 Elm St, City, State 24680",
  },
];

const CustomerManagement = () => {
  // const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomer,
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

  const filteredCustomers = data?.filter(
    (customer: any) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toString().includes(searchTerm)
  );

  // const getStatusColor = (status: any) => {
  //   switch (status?.toLowerCase()) {
  //     case "active":
  //       return "bg-green-100 text-green-800";
  //     case "inactive":
  //       return "bg-red-100 text-red-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  // const getOrderStatusColor = (status: any) => {
  //   switch (status.toLowerCase()) {
  //     case "delivered":
  //       return "bg-green-100 text-green-800";
  //     case "shipped":
  //       return "bg-blue-100 text-blue-800";
  //     case "processing":
  //       return "bg-yellow-100 text-yellow-800";
  //     case "pending":
  //       return "bg-red-100 text-red-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
        <p className="text-muted-foreground">
          View and manage customer information and order history
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
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
                <TableHead>Id</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                {/* <TableHead>Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer: any) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        {customer.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Phone className="h-3 w-3 mr-1" />
                      {customer?.phoneNumber}
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerManagement;
