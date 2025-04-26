import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Building, Layers } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CollegeForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({ college_name: "" });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("College data submitted:", formData);
    // Here you would typically save the data to a database
    // Then call onSave or similar function to update the UI
    onCancel(); // Close the form after saving
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="college_name" className="text-sm font-medium">College Name</label>
        <input
          id="college_name"
          name="college_name"
          type="text"
          className="w-full px-3 py-2 border rounded-md"
          value={formData.college_name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save College</Button>
      </div>
    </form>
  );
};

const DepartmentForm = ({ onCancel, colleges }) => {
  const [formData, setFormData] = useState({ department_name: "", college_name: "" });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Department data submitted:", formData);
    // Here you would typically save the data to a database
    // Then call onSave or similar function to update the UI
    onCancel(); // Close the form after saving
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <select
          id="college_name"
          name="college_name"
          className="w-full px-3 py-2 border rounded-md"
          value={formData.college_name}
          onChange={handleChange}
          required
        >
          <option value="">Select College</option>
          {colleges.map(college => (
            <option key={college.college_id} value={college.college_name}>
              {college.college_name}
            </option>
          ))}
        </select>
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

const CollegeList = () => {
  const navigate = useNavigate();
  const [isCreatingCollege, setIsCreatingCollege] = useState(false);
  const [isCreatingDepartment, setIsCreatingDepartment] = useState(false);
  const [activeTab, setActiveTab] = useState("colleges");
  
  // Sample data that would normally come from your API/database
  const colleges = [
    { 
      college_id: 1, 
      college_name: "Engineering College", 
      created_at: "2023-08-15 10:30:45", 
      updated_at: "2024-01-20 14:25:12" 
    },
    { 
      college_id: 2, 
      college_name: "Arts College", 
      created_at: "2023-09-22 09:15:30", 
      updated_at: "2024-02-05 11:10:45" 
    },
    { 
      college_id: 3, 
      college_name: "Science College", 
      created_at: "2023-10-10 14:45:20", 
      updated_at: "2024-03-15 16:30:22" 
    }
  ];
  
  const departments = [
    { 
      department_id: 1, 
      department_name: "Computer Science", 
      college_name: "Engineering College",
      created_at: "2023-08-20 11:40:15", 
      updated_at: "2024-01-25 09:35:50" 
    },
    { 
      department_id: 2, 
      department_name: "Electrical Engineering", 
      college_name: "Engineering College",
      created_at: "2023-08-22 13:20:45", 
      updated_at: "2024-02-10 10:15:30" 
    },
    { 
      department_id: 3, 
      department_name: "Physics", 
      college_name: "Science College",
      created_at: "2023-10-15 09:50:25", 
      updated_at: "2024-03-20 14:40:10" 
    },
    { 
      department_id: 4, 
      department_name: "English", 
      college_name: "Arts College",
      created_at: "2023-09-25 15:30:20", 
      updated_at: "2024-02-12 11:25:40" 
    }
  ];

  // Format datetime for display
  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Tabs defaultValue="colleges" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="colleges">Colleges</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>
          
          {activeTab === "colleges" && !isCreatingCollege && (
            <Button onClick={() => setIsCreatingCollege(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add College
            </Button>
          )}
          
          {activeTab === "departments" && !isCreatingDepartment && (
            <Button onClick={() => setIsCreatingDepartment(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          )}
        </div>
        
        <TabsContent value="colleges">
          {!isCreatingCollege ? (
            <div className="bg-white rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>College ID</TableHead>
                    <TableHead>College Name</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Updated At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {colleges.map((college) => (
                    <TableRow key={college.college_id}>
                      <TableCell>{college.college_id}</TableCell>
                      <TableCell className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-blue-600" />
                        {college.college_name}
                      </TableCell>
                      <TableCell>{formatDateTime(college.created_at)}</TableCell>
                      <TableCell>{formatDateTime(college.updated_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div>
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-semibold">Add New College</h2>
              </div>
              <CollegeForm onCancel={() => setIsCreatingCollege(false)} />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="departments">
          {!isCreatingDepartment ? (
            <div className="bg-white rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department ID</TableHead>
                    <TableHead>Department Name</TableHead>
                    <TableHead>College Name</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Updated At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((department) => (
                    <TableRow key={department.department_id}>
                      <TableCell>{department.department_id}</TableCell>
                      <TableCell className="flex items-center">
                        <Layers className="h-4 w-4 mr-2 text-green-600" />
                        {department.department_name}
                      </TableCell>
                      <TableCell>{department.college_name}</TableCell>
                      <TableCell>{formatDateTime(department.created_at)}</TableCell>
                      <TableCell>{formatDateTime(department.updated_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div>
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-semibold">Add New Department</h2>
              </div>
              <DepartmentForm 
                onCancel={() => setIsCreatingDepartment(false)} 
                colleges={colleges}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollegeList;