import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import BlogModel from "@/lib/models/BlogModel";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

// GET all blogs or single blog
export async function GET(request) {
  await LoadDB();
  const blogId = request.nextUrl.searchParams.get("id");

  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

// POST - Upload blog with Cloudinary image
export async function POST(request) {
  await LoadDB();
  const formData = await request.formData();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);

  // Upload to Cloudinary
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  const imgUrl = uploadResult.secure_url; // Cloudinary URL

  const blogData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    author: formData.get("author"),
    image: imgUrl,
    authorImg: formData.get("authorImg"),
  };

  await BlogModel.create(blogData);
  console.log("Blog saved:", blogData);

  return NextResponse.json({ success: true, msg: "Blog Added" });
}

// DELETE blog
export async function DELETE(request) {
  await LoadDB();
  const id = request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);

  // Delete image from Cloudinary
  if (blog.image) {
    const publicId = blog.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  }

  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Deleted" });
}