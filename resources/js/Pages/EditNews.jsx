import React, { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import { Navbar } from "@/Components/Navbar";
import { Inertia } from "@inertiajs/inertia";

export default function EditNews(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const handleSubmit = () => {
        // prevent.default;
        const data = {
            id: props.myNews.id,
            title,
            description,
            category,
        };
        Inertia.post("/news/update", data);
        setTitle("");
        setDescription("");
        setCategory("");
        // console.log(props);
    };

    return (
        <div className="min-h-screen bg-slate-700  ">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />

            <div className="px-14 py-9">
                <div className="card w-full  bg-base-100 shadow-xl m-2">
                    <div className="card-body">
                        <h3 className="font-bold mt-5 text-center">
                            Edit News
                        </h3>
                        <input
                            type="text"
                            placeholder="Judul"
                            className="m-2 input input-bordered w-full "
                            onChange={(title) => setTitle(title.target.value)}
                            defaultValue={props.myNews.title}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="m-2 input input-bordered w-full "
                            onChange={(description) =>
                                setDescription(description.target.value)
                            }
                            defaultValue={props.myNews.description}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="m-2 input input-bordered w-full "
                            onChange={(category) =>
                                setCategory(category.target.value)
                            }
                            defaultValue={props.myNews.category}
                        />
                        <button
                            className="btn btn-secondary m-2"
                            onClick={() => handleSubmit()}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
