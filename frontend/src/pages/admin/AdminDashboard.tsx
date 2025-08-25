import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: "124",
      icon: Package,
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Total Orders",
      value: "1,234",
      icon: ShoppingCart,
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Total Customers",
      value: "892",
      icon: Users,
      change: "+23%",
      changeType: "positive",
    },
    {
      title: "Total Revenue",
      value: "$45,231",
      icon: DollarSign,
      change: "+15%",
      changeType: "positive",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from
                  last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((order) => (
                <div
                  key={order}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      Order #{`ORD-${order.toString().padStart(3, "0")}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Customer Name
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(Math.random() * 200 + 50).toFixed(2)}
                    </p>
                    <p className="text-sm text-green-600">Completed</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Nike Air Max",
                "Adidas Ultraboost",
                "Converse Chuck Taylor",
                "Vans Old Skool",
              ].map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{product}</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 50 + 10)} sales
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(Math.random() * 100 + 50).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
