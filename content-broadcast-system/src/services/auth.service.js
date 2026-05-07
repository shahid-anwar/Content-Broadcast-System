// src/services/auth.service.js

export const loginUser = async (data) => {
  await new Promise((res) => setTimeout(res, 500));

  const users = [
    {
      email: "teacher@gmail.com",
      password: "123456",
      role: "teacher",
    },
    {
      email: "principal@gmail.com",
      password: "123456",
      role: "principal",
    },
    {
      email: "student@gmail.com",
      password: "123456",
      role: "student",
    },
  ];

  const user = users.find(
    (u) => u.email === data.email && u.password === data.password,
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  localStorage.setItem("user", JSON.stringify(user));

  return user;
};
