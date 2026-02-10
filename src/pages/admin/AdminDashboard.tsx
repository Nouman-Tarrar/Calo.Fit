import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, ClipboardList, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Users", value: "12,458", icon: Users },
  { label: "Active Restaurants", value: "342", icon: Store },
  { label: "Today's Orders", value: "1,247", icon: ClipboardList },
  { label: "GMV (Today)", value: "Rs. 2.4M", icon: TrendingUp },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
