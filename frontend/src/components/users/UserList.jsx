import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Edit
} from "lucide-react";

const UserList = () => {
  // Sample data - in a real app, this would come from an API
  const users = [
    { 
      id: 1, 
      fin_no: "F12345", 
      full_name: "Dr. John Smith", 
      email: "john.smith@college.edu", 
      college_name: "Engineering College", 
      department_name: "",
      role: "principal", 
      stats: "Active",
      phone_no: "555-123-4567",
      created_at: "2023-05-10",
      updated_at: "2024-02-15"
    },
    { 
      id: 2, 
      fin_no: "F23456", 
      full_name: "Prof. Sarah Johnson", 
      email: "sarah.johnson@college.edu", 
      college_name: "Engineering College", 
      department_name: "Computer Science",
      role: "hod", 
      stats: "Active",
      phone_no: "555-234-5678",
      created_at: "2023-06-12",
      updated_at: "2024-01-10"
    },
    { 
      id: 3, 
      fin_no: "F34567", 
      full_name: "Mr. Michael Davis", 
      email: "michael.davis@college.edu", 
      college_name: "Science College", 
      department_name: "Physics",
      role: "department_admin", 
      stats: "Inactive",
      phone_no: "555-345-6789",
      created_at: "2023-07-22",
      updated_at: "2024-03-05"
    },
    { 
      id: 4, 
      fin_no: "F45678", 
      full_name: "Dr. Emily Wilson", 
      email: "emily.wilson@college.edu", 
      college_name: "Arts College", 
      department_name: "English",
      role: "hod", 
      stats: "Active",
      phone_no: "555-456-7890",
      created_at: "2023-08-15",
      updated_at: "2024-02-28"
    },
    { 
      id: 5, 
      fin_no: "F56789", 
      full_name: "Mr. David Brown", 
      email: "david.brown@college.edu", 
      college_name: "", 
      department_name: "",
      role: "management_admin", 
      stats: "Active",
      phone_no: "555-567-8901",
      created_at: "2023-09-18",
      updated_at: "2024-01-25"
    },
    { 
      id: 6, 
      fin_no: "F67890", 
      full_name: "Ms. Jennifer Lee", 
      email: "jennifer.lee@college.edu", 
      college_name: "", 
      department_name: "",
      role: "management_people", 
      stats: "Active",
      phone_no: "555-678-9012",
      created_at: "2023-10-05",
      updated_at: "2024-03-15"
    }
  ];
  
  const getRoleBadge = (role) => {
    const roleColors = {
      management_admin: "bg-purple-100 text-purple-800",
      management_people: "bg-indigo-100 text-indigo-800",
      principal: "bg-blue-100 text-blue-800",
      hod: "bg-green-100 text-green-800",
      department_admin: "bg-amber-100 text-amber-800"
    };
    
    const roleLabels = {
      management_admin: "Management Admin",
      management_people: "Management Staff",
      principal: "Principal",
      hod: "HOD",
      department_admin: "Department Admin"
    };
    
    return (
      <Badge variant="outline" className={`${roleColors[role]} border-none`}>
        {roleLabels[role]}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    const statusColor = status === "Active" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
    
    return (
      <Badge variant="outline" className={`${statusColor} border-none`}>
        {status}
      </Badge>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fin_No</TableHead>
            <TableHead>Full_name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>College_name</TableHead>
            <TableHead>Department_name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Stats</TableHead>
            <TableHead>Phone.No</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Updated at</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.fin_no}</TableCell>
              <TableCell className="font-medium">{user.full_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.college_name || "—"}</TableCell>
              <TableCell>{user.department_name || "—"}</TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{getStatusBadge(user.stats)}</TableCell>
              <TableCell>{user.phone_no}</TableCell>
              <TableCell>{user.created_at}</TableCell>
              <TableCell>{user.updated_at}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit User</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;