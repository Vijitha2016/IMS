// LocationList.jsx
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
import { Button } from "@/components/ui/button";
import { Plus, MapPin, MoreHorizontal, Edit, Trash, Eye, ArrowLeft } from "lucide-react";
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const LocationList = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  
  // Sample data that would come from your API
  const locations = [
    { 
      location_id: 1,
      location_number: "LOC-101",
      location_name: "Main Library", 
      college_name: "Engineering College",
      department_name: "Computer Science",
      description: "Central library with computer science resources",
      created_at: "2023-08-15 10:30:45",
      updated_at: "2024-01-20 14:25:12"
    },
    { 
      location_id: 2,
      location_number: "LOC-102",
      location_name: "Physics Lab", 
      college_name: "Science College",
      department_name: "Physics",
      description: "Advanced physics laboratory",
      created_at: "2023-09-10 11:45:30",
      updated_at: "2024-02-05 09:15:40"
    },
    { 
      location_id: 3,
      location_number: "LOC-103",
      location_name: "Lecture Hall A", 
      college_name: "Arts College",
      department_name: null,
      description: "Main lecture hall for arts students",
      created_at: "2023-10-20 13:25:10",
      updated_at: "2024-01-15 16:35:22"
    }
  ];
  
  // Sample colleges and departments for the form
  const colleges = [
    { college_id: 1, college_name: "Engineering College" },
    { college_id: 2, college_name: "Science College" },
    { college_id: 3, college_name: "Arts College" }
  ];
  
  const departments = [
    { department_id: 1, department_name: "Computer Science", college_name: "Engineering College" },
    { department_id: 2, department_name: "Electrical Engineering", college_name: "Engineering College" },
    { department_id: 3, department_name: "Physics", college_name: "Science College" },
    { department_id: 4, department_name: "Chemistry", college_name: "Science College" },
    { department_id: 5, department_name: "English Literature", college_name: "Arts College" }
  ];
  
  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  // New AddLocationForm component integrated directly within LocationList
  const AddLocationForm = () => {
    const [formData, setFormData] = useState({ 
      location_id: "",
      location_number: "",
      location_name: "",
      college_name: "",
      department_name: ""
    });
  
    // Generate a random location ID when component mounts
    React.useEffect(() => {
      const generateLocationId = () => {
        // Generate a random alphanumeric ID (e.g., "LOC-12345")
        const randomId = "LOC-" + Math.floor(10000 + Math.random() * 90000);
        setFormData(prev => ({ ...prev, location_id: randomId }));
      };
      
      generateLocationId();
    }, []);
  
    // Filter departments based on selected college
    const filteredDepartments = departments.filter(
      dept => dept.college_name === formData.college_name
    );
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSelectChange = (field, value) => {
      // Handle "none" value for department
      if (field === "department_name" && value === "none") {
        setFormData(prev => {
          return { ...prev, [field]: "" };
        });
      } else {
        setFormData(prev => {
          // Reset department_name when college changes
          if (field === "college_name") {
            return { ...prev, college_name: value, department_name: "" };
          }
          return { ...prev, [field]: value };
        });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Location added:", formData);
      // Add code here to actually save the location
      setShowAddForm(false); // Return to list view
    };
  
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => setShowAddForm(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Locations
          </Button>
          <h1 className="text-2xl font-bold ml-2">Add New Location</h1>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Location Information</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location ID (Auto-generated)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  value={formData.location_id}
                  readOnly
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location_number" className="text-sm font-medium">Location Number</label>
                <input
                  id="location_number"
                  name="location_number"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.location_number}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location_name" className="text-sm font-medium">Location Name</label>
                <input
                  id="location_name"
                  name="location_name"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.location_name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="college_name" className="text-sm font-medium">College Name</label>
                <Select 
                  onValueChange={(value) => handleSelectChange("college_name", value)}
                  value={formData.college_name}
                  required
                >
                  <SelectTrigger id="college_name">
                    <SelectValue placeholder="Select College" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map(college => (
                      <SelectItem key={college.college_id} value={college.college_name}>
                        {college.college_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="department_name" className="text-sm font-medium">Department Name (Optional)</label>
                <Select 
                  onValueChange={(value) => handleSelectChange("department_name", value)}
                  value={formData.department_name || "none"}
                  disabled={!formData.college_name}
                >
                  <SelectTrigger id="department_name">
                    <SelectValue placeholder={formData.college_name ? "Select Department" : "First select a college"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {filteredDepartments.map(department => (
                      <SelectItem key={department.department_id} value={department.department_name}>
                        {department.department_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Location</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  };
  
  return (
    <div>
      {!showAddForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Location List</h2>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location ID</TableHead>
                  <TableHead>Location Number</TableHead>
                  <TableHead>Location Name</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.map((location) => (
                  <TableRow key={location.location_id}>
                    <TableCell>{location.location_id}</TableCell>
                    <TableCell>{location.location_number}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-red-600" />
                        {location.location_name}
                      </div>
                    </TableCell>
                    <TableCell>{location.college_name}</TableCell>
                    <TableCell>{location.department_name || "-"}</TableCell>
                    <TableCell>{formatDateTime(location.created_at)}</TableCell>
                    <TableCell>{formatDateTime(location.updated_at)}</TableCell>
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
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Location</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete Location</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <AddLocationForm />
      )}
    </div>
  );
};

export default LocationList;