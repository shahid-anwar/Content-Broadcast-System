// src/services/content.service.js

// GET ALL CONTENT
export const getAllContent = async () => {
  await new Promise((res) => setTimeout(res, 500));

  return JSON.parse(localStorage.getItem("teacherContent")) || [];
};

// UPLOAD CONTENT
export const uploadContent = async (contentData) => {
  await new Promise((res) => setTimeout(res, 500));

  const existing = JSON.parse(localStorage.getItem("teacherContent")) || [];

  const updated = [contentData, ...existing];

  localStorage.setItem("teacherContent", JSON.stringify(updated));

  return contentData;
};

// UPDATE STATUS
export const updateContentStatus = async (id, status, rejectionReason = "") => {
  await new Promise((res) => setTimeout(res, 500));

  const existing = JSON.parse(localStorage.getItem("teacherContent")) || [];

  const updated = existing.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        rejectionReason,
      };
    }

    return item;
  });

  localStorage.setItem("teacherContent", JSON.stringify(updated));

  return true;
};

// LIVE CONTENT
export const getLiveContent = async () => {
  await new Promise((res) => setTimeout(res, 500));

  const existing = JSON.parse(localStorage.getItem("teacherContent")) || [];

  // ONLY approved content
  return existing.filter((item) => item.status === "approved");
};
