/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import Footer from "@/Components/Footer";
import Link from "next/link";
import axios from "axios";

const page = ({ params }) => {
  //This unwraps the params Promise and gives the actual object with the id value.
  const unwrappedParams = React.use(params); // ← unwrap params
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get(`/api/blog?id=${unwrappedParams.id}`);
    setData(response.data);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              alt="Logo"
              width={180}
              className="w-[130px] sm:w-auto"
            ></Image>
          </Link>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={data.authorImg}
            alt="Author"
            width={60}
            height={60}
          ></Image>
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white"
          src={data.image}
          alt="Blog Image"
          width={1280}
          height={720}
        ></Image>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} alt="fb" width={50}></Image>
            <Image src={assets.twitter_icon} alt="tw" width={50}></Image>
            <Image src={assets.googleplus_icon} alt="gp" width={50}></Image>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  ) : (
    <></>
  );
};

export default page;
