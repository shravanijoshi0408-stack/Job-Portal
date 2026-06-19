import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { JOB_API_END_POINT } from "@/utils/constant";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    salary: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const job = res.data.job;
          setInput({
            title: job.title,
            description: job.description,
            salary: job.salary,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
  }, [id]);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${id}`,
        input,
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto my-10">
        <h1 className="font-bold text-2xl mb-5">Edit Job</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={changeHandler}
            placeholder="Job Title"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            value={input.description}
            onChange={changeHandler}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="salary"
            value={input.salary}
            onChange={changeHandler}
            placeholder="Salary"
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Update Job
          </button>
        </form>
      </div>
    </>
  );
};

export default EditJob;