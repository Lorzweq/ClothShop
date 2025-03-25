import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUserData, setNewUserData] = useState({ email: "", name: "", role: "", password: "" });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  async function fetchUsers() {
    const { data: users, error: usersError } = await supabase.from("users").select("*");

    if (usersError) {
      console.error("Error fetching users:", usersError);
      return;
    }

    const usersWithRoles = await Promise.all(
      users.map(async (user) => {
        const { data: userRoles, error: userRolesError } = await supabase
          .from("user_roles")
          .select("role_id")
          .eq("user_id", user.id);

        if (userRolesError) {
          console.error("Error fetching user roles:", userRolesError);
          return user;
        }

        const roleIds = userRoles.map((userRole) => userRole.role_id);

        const { data: roles, error: rolesError } = await supabase
          .from("roles")
          .select("id, name")
          .in("id", roleIds);

        if (rolesError) {
          console.error("Error fetching roles:", rolesError);
          return user;
        }

        return {
          ...user,
          role: roles.length > 0 ? roles[0].name : "Unknown",
        };
      })
    );

    setUsers(usersWithRoles);
  }

  async function fetchRoles() {
    const { data: roleData, error } = await supabase.from("roles").select("id, name");
    if (error) {
      console.error("Error fetching roles:", error);
    } else {
      setRoles(roleData);
    }
  }

  async function updateRole(userId, roleId) {
    try {
      const { data: existingRole, error: fetchError } = await supabase
        .from("user_roles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching existing role:", fetchError.message);
        return;
      }

      if (existingRole) {
        const { error: updateError } = await supabase
          .from("user_roles")
          .update({ role_id: roleId })
          .eq("user_id", userId);

        if (updateError) {
          console.error("Error updating role:", updateError.message);
          return;
        }
      } else {
        const { error: insertError } = await supabase.from("user_roles").insert([
          {
            user_id: userId,
            role_id: roleId,
          },
        ]);

        if (insertError) {
          console.error("Error inserting new role:", insertError.message);
          return;
        }
      }

      console.log(`Role updated successfully for user ID ${userId}`);
      fetchUsers();
    } catch (err) {
      console.error("Unexpected error updating role:", err);
    }
  }

  async function deleteUser(userId) {
    const { error } = await supabase.from("users").delete().eq("id", userId);
    if (error) console.error("Error deleting user:", error.message);
    else fetchUsers();
  }

  async function addUser() {
    const { email, name, password, role } = newUserData;
    if (!email || !name || !password || !role) {
      console.error("Email, Name, Password, and Role are required.");
      return;
    }

    const roleData = roles.find((r) => r.name === role);
    if (!roleData) {
      console.error("Invalid role selection.");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, name, password }])
      .select();

    if (error) {
      console.error("Error adding user:", error.message);
      return;
    }

    if (!data || data.length === 0) {
      console.error("User creation failed: No data returned.");
      return;
    }

    const userId = data[0]?.id;
    if (!userId) {
      console.error("User ID not found after insertion.");
      return;
    }

    const { error: roleError } = await supabase
      .from("user_roles")
      .insert([{ user_id: userId, role_id: roleData.id }]);

    if (roleError) {
      console.error("Error assigning role:", roleError.message);
      return;
    }

    setNewUserData({ email: "", name: "", role: "", password: "" });
    fetchUsers();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="mt-4 p-2">
        <h2 className="text-xl">Add New User</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mx-2"
          value={newUserData.email}
          onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          className="border p-2 mx-2"
          value={newUserData.name}
          onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mx-2"
          value={newUserData.password}
          onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
        />

        <div className="flex space-x-2 mt-2">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setNewUserData({ ...newUserData, role: role.name })}
              className={`px-4 py-2 rounded ${
                newUserData.role === role.name ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>

        {!newUserData.role && (
          <p className="text-red-500 mt-2">Please select a role</p>
        )}

        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          onClick={addUser}
        >
          Add User
        </button>
      </div>

      <table className="w-full mt-6 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <div className="flex space-x-2">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => updateRole(user.id, role.id)}
                      className={`px-4 py-2 rounded ${
                        user.role === role.name ? "bg-blue-500 text-white" : "bg-gray-300"
                      }`}
                    >
                      {role.name}
                    </button>
                  ))}
                </div>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 rounded text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
