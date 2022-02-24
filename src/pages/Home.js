import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import Search from "../components/Search";
import Blogs from "../components/Blogs";
import Category from "../components/Category";
import LatestBlog from "../components/LatestBlog";
import Pagination from "../components/Pagination";

const Home = () => {

    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [latestBlog, setLatestBlog] = useState([]);
    //pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [totalBlog, setTotalBlog] = useState(null);
    const [pageLimit] = useState(5);

    const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];


    //handleCategory

    const handleCategory = async (category) => {
        const response = await axios.get(`http://localhost:5000/blogs?category=${category}`);
        if (response.status === 200) {
            setData(response.data);
        } else {
            toast.error("Somthing went wrong");
        }
    };

    //onInputChange
    const onInputChange = (e) => {
        if (!e.target.value) {
            loadBlogsData();
        }
        setSearchValue(e.target.value);
    }
    //handleSearch
    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`);
        if (response.status === 200) {
            setData(response.data);
        } else {
            toast.error("Somthing went wrong");
        }
    };

    useEffect(() => {
        // loadBlogsData();
        loadBlogsData(0, 5, 0); // (0,5,0)par default  fetch the five blog par page (start,end,increase or decrease value)
        fetchLatestBlog();
    }, [])


    const loadBlogsData = async (start, end, increase, operation) => {
        const totalBlog = await axios.get("http://localhost:5000/blogs");
        setTotalBlog(totalBlog.data.length);
        // const response = await axios.get("http://localhost:5000/blogs");
        // see only five blog (start 0 end 5) per page
        const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
        if (response.status === 200) {
            setData(response.data);
            if (operation) {
                setCurrentPage(0);
            } else {
                setCurrentPage(currentPage + increase);
            }
        }
        else {
            toast.error("Somthing went wrong");
        }
    };
    // console.log("data", data);
    //Delete  Blog
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog ?")) {
            const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
            if (response.status === 200) {
                toast.success("Blog deleted successfully");
                loadBlogsData(0, 5, 0, "delete");
            }
            else {
                toast.error("Somthing went wrong");
            }
        }

    };
    //Control text excerpt length
    const excerpt = (str) => {
        if (str.length > 50) {
            str = str.substring(0, 50) + "...";
        }
        return str;
    };

    //fetchLatestBlog
    const fetchLatestBlog = async () => {
        const totalBlog = await axios.get("http://localhost:5000/blogs");
        const start = totalBlog.data.length - 4;
        const end = totalBlog.data.length;
        //fetch 4  Latest Blog
        const response = await axios.get(
            `http://localhost:5000/blogs?_start=${start}&_end=${end}`
        );
        if (response.status === 200) {
            setLatestBlog(response.data);
        }
        else {
            toast.error("Somthing went wrong");
        }
    };

    return (
        <>
            <Search handleSearch={handleSearch} searchValue={searchValue} onInputChange={onInputChange} />
            <MDBRow>
                {data.length === 0 && (
                    <MDBTypography className="text-center mb-0" tg="h2">No Blog Found</MDBTypography>
                )}

                <MDBCol>
                    <MDBContainer>
                        <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                            {data && data.map((item, index) =>
                                <Blogs
                                    key={index}
                                    {...item}
                                    excerpt={excerpt}
                                    handleDelete={handleDelete}
                                />
                            )}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>

                <MDBCol size="3">
                    <h4 className="text-start">Latest Post</h4>
                    {latestBlog && latestBlog.map((item, index) => (
                        <LatestBlog key={index} {...item} />
                    ))}

                    <Category options={options} handleCategory={handleCategory} />
                </MDBCol>
            </MDBRow>

            <div className="mt-3">
                <Pagination
                    currentPage={currentPage}
                    loadBlogsData={loadBlogsData}
                    pageLimit={pageLimit}
                    data={data}
                    totalBlog={totalBlog}
                />
            </div>
        </>
    );
};


export default Home;
