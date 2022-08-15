import React, { useState, useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        // prevent.default;
        const data = {
            title,
            description,
            category,
        };
        Inertia.post("/news", data);
        setIsNotif(true);
        setTitle("");
        setDescription("");
        setCategory("");
        // console.log(props);
    };
    useEffect(() => {
        if (!props.myNews) {
            Inertia.get("/news");
        }
        // console.log(props);
        return;
    }, []);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="  font-semibold text-xl text-gray-800 leading-tight">
                    Berita Saya
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-slate-700 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-slate-700  border-b border-gray-200">
                        <h3 className="font-bold">Create News</h3>
                        {isNotif && (
                            <div className="alert alert-info shadow-lg text-white font-bold">
                                {props.flash.message}
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Judul"
                            className="m-2 input input-bordered w-full "
                            onChange={(title) => setTitle(title.target.value)}
                            value={title}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="m-2 input input-bordered w-full "
                            onChange={(description) =>
                                setDescription(description.target.value)
                            }
                            value={description}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="m-2 input input-bordered w-full "
                            onChange={(category) =>
                                setCategory(category.target.value)
                            }
                            value={category}
                        />
                        <button
                            className="btn btn-secondary m-2"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                        <h2 className="text-2xl text-center font-bold text-white">
                            My News
                        </h2>
                    </div>
                </div>
                <div className="px-14 py-9">
                    {props.myNews && props.myNews.length > 0 ? (
                        props.myNews.map((news, i) => {
                            return (
                                <div
                                    key={i}
                                    className="card w-full lg:w-full bg-base-100 shadow-xl mb-6     "
                                >
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {news.title}
                                            <div className="badge badge-secondary">
                                                NEW
                                            </div>
                                        </h2>
                                        <p>{news.description}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-outline">
                                                <Link
                                                    href={route("edit.news")}
                                                    as="button"
                                                    method="get"
                                                    data={{ id: news.id }}
                                                >
                                                    edit
                                                </Link>
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link
                                                    href={route("delete.news")}
                                                    as="button"
                                                    method="post"
                                                    data={{ id: news.id }}
                                                >
                                                    delete
                                                </Link>
                                            </div>
                                            <div className="badge badge-inline">
                                                {news.category}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Tidak Ada Berita</p>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}
