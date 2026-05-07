import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { uploadContent } from "../../services/content.service";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z
  .object({
    title: z.string().min(1, "Title required"),
    subject: z.string().min(1, "Subject required"),
    description: z.string().optional(),
    startTime: z.string().min(1, "Start time required"),
    endTime: z.string().min(1, "End time required"),
    rotation: z.string().optional(),
    file: z.any().optional(),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  });

const UploadContent = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Handle Image Upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setPreview(reader.result);
      };

      reader.onerror = (err) => {
        console.error(err);

        toast.error("Failed to load image");
      };
    } catch (err) {
      console.error(err);

      toast.error("Image upload failed");
    }
  };

  // Submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const contentData = {
        id: Date.now(),

        title: data.title,
        subject: data.subject,
        description: data.description,

        startTime: data.startTime,
        endTime: data.endTime,

        rotation: data.rotation,

        preview: preview,

        teacherId: "teacher-1",

        status: "pending",

        rejectionReason: "",
      };

      await uploadContent(contentData);

      toast.success("Content Uploaded Successfully", {
        style: {
          background: "#16a34a",
          color: "#fff",
        },
      });

      reset();

      setPreview(null);
    } catch (err) {
      console.error(err);

      toast.error("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-sm border">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Upload Content</h2>

        <p className="text-gray-500 mt-2">
          Upload learning material for approval
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Title
          </label>

          <input
            placeholder="Enter content title"
            {...register("title")}
            className="w-full border border-gray-300 p-4 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Subject
          </label>

          <input
            placeholder="Enter subject"
            {...register("subject")}
            className="w-full border border-gray-300 p-4 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            placeholder="Enter content description"
            {...register("description")}
            rows={4}
            className="w-full border border-gray-300 p-4 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Preview Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-3 rounded-2xl"
          />

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="preview"
                className="h-56 w-full object-cover rounded-2xl border"
              />
            </div>
          )}
        </div>

        {/* Time Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Start */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Start Time
            </label>

            <input
              type="datetime-local"
              {...register("startTime")}
              className="w-full border border-gray-300 p-4 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.startTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startTime.message}
              </p>
            )}
          </div>

          {/* End */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              End Time
            </label>

            <input
              type="datetime-local"
              {...register("endTime")}
              className="w-full border border-gray-300 p-4 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.endTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Rotation */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Rotation Duration
          </label>

          <input
            placeholder="Optional rotation duration"
            {...register("rotation")}
            className="w-full border border-gray-300 p-4 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Content"}
        </button>
      </form>
    </div>
  );
};

export default UploadContent;
