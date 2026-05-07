import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { USERS } from "../../constants/users";
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // 🔐 Hardcoded auth check
      const user = USERS.find(
        (u) => u.email === data.email && u.password === data.password,
      );

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const res = {
        token: "mock-token-123",
        role: user.role,
      };

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      toast.success("Login successful");

      // 🎯 Role-based redirect
      if (res.role === "principal") {
        navigate("/principal/dashboard");
      } else if (res.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate(`/live/demo-teacher`); // student goes to public page
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">CMS Login</h1>

          <p className="text-gray-500 mt-2">Content Broadcasting System</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-medium shadow-md"
          >
            Login
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 bg-gray-50 border rounded-2xl p-4">
          <p className="font-semibold text-gray-700 mb-2">Demo Credentials</p>

          <div className="text-sm text-gray-600 space-y-1">
            <p>Teacher: teacher@gmail.com</p>
            <p>Principal: principal@gmail.com</p>
            <p>Password: 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
