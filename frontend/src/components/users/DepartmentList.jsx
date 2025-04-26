import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Plus,
  MoreHorizontal, 
  Edit, 
  Trash,
  Eye,
  BookOpen
} from "lucide-react";

const DepartmentForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    department_name: "",
    college_name: ""
  });
  
  // Sample colleges data that would come from your API
  const colleges = [
    { college_name: "Engineering College" },
    { college_name: "Science College" },
    { college_name: "Arts College" },
    { college_name: "Commerce College" }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Department data submitted:", formData);
    // Here you would typically save the data to a database
    onCancel(); // Close the form after saving
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="department_name" className="text-sm font-medium">Department Name</label>
          <input
            id="department_name"
            name="department_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.department_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="college_name" className="text-sm font-medium">College Name</label>
          <Select 
            onValueChange={(value) => handleSelectChange("college_name", value)}
            value={formData.college_name}
          >
            <SelectTrigger id="college_name">
              <SelectValue placeholder="Select College" />
            </SelectTrigger>
            <SelectContent>
              {colleges.map(college => (
                <SelectItem key={college.college_name} value={college.college_name}>
                  {college.college_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Department</Button>
      </div>
    </form>
  );
};

const DepartmentList = () => {
  const navigate = useNavigate();
  const [isCreatingDepartment, setIsCreatingDepartment] = useState(false);
  
  // Sample data aligned with your database schema
  const departments = [
    { 
      department_id: 1, 
      department_name: "Computer Science", 
      college_name: "Engineering College",
      created_at: "2023-08-15 10:30:45",
      updated_at: "2024-01-20 14:25:12"
    },
    { 
      department_id: 2, 
      department_name: "Electrical Engineering", 
      college_name: "Engineering College",
      created_at: "2023-09-10 11:45:30",
      updated_at: "2024-02-05 09:15:40"
    },
    { 
      department_id: 3, 
      department_name: "Mechanical Engineering", 
      college_name: "Engineering College",
      created_at: "2023-10-20 13:25:10",
      updated_at: "2024-01-15 16:35:22"
    },
    { 
      department_id: 4, 
      department_name: "Physics", 
      college_name: "Science College",
      created_at: "2023-08-25 09:20:35",
      updated_at: "2023-12-12 11:40:15"
    },
    { 
      department_id: 5, 
      department_name: "Chemistry", 
      college_name: "Science College",
      created_at: "2023-09-05 14:50:20",
      updated_at: "2024-02-10 10:30:45"
    },
    { 
      department_id: 6, 
      department_name: "English Literature", 
      college_name: "Arts College",
      created_at: "2023-10-15 11:15:30",
      updated_at: "2024-03-01 13:25:05"
    }
  ];
  
  // Format datetime for display
  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };
  
  return (
    <div className="space-y-4">
      {!isCreatingDepartment ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Department List</h2>
            <Button onClick={() => setIsCreatingDepartment(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department ID</TableHead>
                  <TableHead>Department Name</TableHead>
                  <TableHead>College Name</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((department) => (
                  <TableRow key={department.department_id}>
                    <TableCell>{department.department_id}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                        {department.department_name}
                      </div>
                    </TableCell>
                    <TableCell>{department.college_name}</TableCell>
                    <TableCell>{formatDateTime(department.created_at)}</TableCell>
                    <TableCell>{formatDateTime(department.updated_at)}</TableCell>
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
                            <span>Edit Department</span>
                          </DropdownMenuItem>
                          
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-semibold">Add New Department</h2>
          </div>
          <DepartmentForm onCancel={() => setIsCreatingDepartment(false)} />
        </div>
      )}
    </div>
  );
};

export default DepartmentList;