import { useState } from "react";
import { Search, MoreVertical, Ban, Eye, UserX, UserCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "suspended" | "banned" | "Unsuspended";
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  lastActive: string;
}

const mockUsers: User[] = [
  {
    id: "U001",
    name: "Ahmed Khan",
    email: "ahmed@gmail.com",
    phone: "+92 300 1234567",
    status: "active",
    ordersCount: 45,
    totalSpent: 32500,
    joinedDate: "Jan 15, 2024",
    lastActive: "2 hours ago",
  },
  {
    id: "U002",
    name: "Sara Ali",
    email: "sara.ali@gmail.com",
    phone: "+92 321 9876543",
    status: "suspended",
    ordersCount: 28,
    totalSpent: 21000,
    joinedDate: "Feb 20, 2024",
    lastActive: "1 day ago",
  },
  {
    id: "U003",
    name: "Bilal Hassan",
    email: "bilal.h@gmail.com",
    phone: "+92 333 5555555",
    status: "suspended",
    ordersCount: 12,
    totalSpent: 8500,
    joinedDate: "Mar 10, 2024",
    lastActive: "1 week ago",
  },
  {
    id: "U004",
    name: "Fatima Zahra",
    email: "fatima.z@gmail.com",
    phone: "+92 345 7777777",
    status: "active",
    ordersCount: 67,
    totalSpent: 48000,
    joinedDate: "Dec 01, 2023",
    lastActive: "5 mins ago",
  },
  {
    id: "U005",
    name: "Hassan Raza",
    email: "hassan.r@gmail.com",
    phone: "+92 312 8888888",
    status: "banned",
    ordersCount: 3,
    totalSpent: 1500,
    joinedDate: "Apr 05, 2024",
    lastActive: "2 weeks ago",
  },
];

const statusColors = {
  active: "bg-green-100 text-green-700",
  suspended: "bg-yellow-100 text-yellow-700",
  banned: "bg-red-100 text-red-700",
  Unsuspended: "bg-blue-100 text-blue-700",
};

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSuspend = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, status: "suspended" as const } : u,
      ),
    );
    toast({
      title: "User Suspended",
      description: "The user account has been suspended.",
    });
  };

  const handleUnsuspend = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, status: "active" as const } : u,
      ),
    );
    toast({
      title: "User Unsuspended",
      description: "The user account has been reactivated.",
    });
  };

  const handleBan = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, status: "banned" as const } : u,
      ),
    );
    toast({
      title: "User Banned",
      description:
        "The user account has been banned and will remain visible for reference.",
    });
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <Badge variant="secondary">{users.length} total users</Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
                <SelectItem value="Unsuspended">Unsuspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className={user.status === "banned" ? "opacity-60" : ""}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[user.status]}>
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.ordersCount}</TableCell>
                  <TableCell>Rs. {user.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewUser(user)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>

                        {/* Suspend option - only for active users */}
                        {user.status === "active" && (
                          <DropdownMenuItem
                            onClick={() => handleSuspend(user.id)}
                            className="text-yellow-600"
                          >
                            <UserX className="h-4 w-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                        )}

                        {/* Unsuspend option - only for suspended users */}
                        {user.status === "suspended" && (
                          <DropdownMenuItem
                            onClick={() => handleUnsuspend(user.id)}
                            className="text-green-600"
                          >
                            <UserCheck className="h-4 w-4 mr-2" />
                            Unsuspend User
                          </DropdownMenuItem>
                        )}

                        {/* Ban option - for active and suspended users */}
                        {(user.status === "active" ||
                          user.status === "suspended") && (
                          <DropdownMenuItem
                            onClick={() => handleBan(user.id)}
                            className="text-destructive"
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            Ban User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View User Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={statusColors[selectedUser.status]}>
                    {selectedUser.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
