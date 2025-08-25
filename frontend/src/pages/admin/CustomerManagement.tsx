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
import { Search, Eye, Mail, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: any) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOrderStatusColor = (status: any) => {
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
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {customer.id}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.joinDate}</TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            Customer Details - {selectedCustomer?.name}
                          </DialogTitle>
                        </DialogHeader>
                        {selectedCustomer && (
                          <div className="space-y-6">
                            {/* Customer Information */}
                            <div>
                              <h3 className="font-semibold mb-3">
                                Customer Information
                              </h3>
                              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                                <p>
                                  <strong>Customer ID:</strong>{" "}
                                  {selectedCustomer.id}
                                </p>
                                <p>
                                  <strong>Name:</strong> {selectedCustomer.name}
                                </p>
                                <p>
                                  <strong>Email:</strong>{" "}
                                  {selectedCustomer.email}
                                </p>
                                <p>
                                  <strong>Phone:</strong>{" "}
                                  {selectedCustomer.phone}
                                </p>
                                <p>
                                  <strong>Address:</strong>{" "}
                                  {selectedCustomer.address}
                                </p>
                                <p>
                                  <strong>Join Date:</strong>{" "}
                                  {selectedCustomer.joinDate}
                                </p>
                                <p>
                                  <strong>Status:</strong>
                                  <Badge
                                    className={`ml-2 ${getStatusColor(
                                      selectedCustomer.status
                                    )}`}
                                  >
                                    {selectedCustomer.status}
                                  </Badge>
                                </p>
                              </div>
                            </div>

                            {/* Order Statistics */}
                            <div>
                              <h3 className="font-semibold mb-3">
                                Order Statistics
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-muted/50 p-4 rounded-lg text-center">
                                  <p className="text-2xl font-bold">
                                    {selectedCustomer.totalOrders}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Total Orders
                                  </p>
                                </div>
                                <div className="bg-muted/50 p-4 rounded-lg text-center">
                                  <p className="text-2xl font-bold">
                                    ${selectedCustomer.totalSpent.toFixed(2)}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Total Spent
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Recent Orders */}
                            <div>
                              <h3 className="font-semibold mb-3">
                                Recent Orders
                              </h3>
                              <div className="space-y-2">
                                {selectedCustomer.recentOrders.map(
                                  (order: any, index: any) => (
                                    <div
                                      key={index}
                                      className="flex justify-between items-center p-3 border rounded-lg"
                                    >
                                      <div>
                                        <p className="font-medium">
                                          {order.id}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {order.date}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-medium">
                                          ${order.total.toFixed(2)}
                                        </p>
                                        <Badge
                                          className={getOrderStatusColor(
                                            order.status
                                          )}
                                        >
                                          {order.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  )
                                )}
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

export default CustomerManagement;
