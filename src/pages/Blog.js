import React, { useState, useEffect } from 'react';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBContainer,
    MDBTypography
} from 'mdb-react-ui-kit';
import { Link, useParams } from 'react-router-dom';
import Badge from "../components/Badge";
import axios from "axios";
import { toast } from "react-toastify";
const Blog = () => {

    const [blog, setBlog] = useState();
    const [relatedPost, setRelatedPost] = useState([]);
    const { id } = useParams();
    
    //useeffect only run once we have id in the url
    useEffect(() => {
        if (id) {
            getSingleBlog();
        }
    }, [id]);


    //getSingleBlog: get blog by id
    const getSingleBlog = async () => {
        const response = await axios.get(`http://localhost:5000/blogs/${id}`);
        // console.log(response);
        //for exemple api fetch all the post related to the food category 
        //show only the three post related to that particular category (exp with category food) in the relatedPost
        const relatedPostData = await axios.get(`http://localhost:5000/blogs?category=${response.data.category}&_start=0&_end=3`);
        if (response.status === 200 || relatedPostData.status === 200) {
            setBlog(response.data);
            // console.log(response.data);
            setRelatedPost(relatedPostData.data);
        } else {
            toast.error("Somthing went wrong");
        }
    };
    //style for Badge component
    const style = {
        display: "inline",
        marginLeft: "5px",
        float: "right",
        marginTop: "7px",
    }


    //Control text excerpt length
    const excerpt = (str) => {
        if (str.length > 60) {
            str = str.substring(0, 60) + "...";
        }
        return str;
    };
    return (
        <MDBContainer style={{ border: "1px solid #d1ebe8" }}>
            <Link to="/">
                <strong style={{ float: "left", color: "black" }} className="mt-3">Go Back</strong>
            </Link>
            <MDBTypography
                tag="h3"
                className="text-muted mt-2"
                style={{ display: "inline-block", marginLeft: "450px" }}>
                {blog && blog.title}
            </MDBTypography>
            <img
                src={blog && blog.imageUrl}
                className="img-fluid rounded"
                alt={blog && blog.title}
                style={{ width: "100%", maxHeight: "600px" }}
            />
            <div style={{ marginTop: "20px" }}>
                <div style={{ height: "43px", background: "#f6f6f6" }}>
                    <MDBIcon
                        far
                        icon="calendar-alt"
                        style={{ float: "left" }}
                        size="lg"
                        className="mt-3"
                    />
                    <strong style={{ float: "left", marginTop: "12px", marginLeft: "5px" }}>
                        {blog && blog.date}
                    </strong>
                    <Badge style={style}>{blog && blog.category}</Badge>
                </div>
                <MDBTypography className="lead md-0">{blog && blog.description}</MDBTypography>
            </div>

            {relatedPost && relatedPost.length > 0 && (
                <>
                    {relatedPost.length > 1 && <h1>Related Post </h1>}

                    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>

                        {relatedPost
                            .filter((item) => item.id != id)
                            .map((item, index) => (

                                <MDBCol size="4">
                                    <MDBCard className='h-50 mt-2' style={{ maxWidth: "22rem" }} >
                                        <Link to={`/blog/${item.id}`}>
                                            <MDBCardImage
                                                className="rounded"
                                                src={item.imageUrl}
                                                alt={item.title}
                                                postion="top"
                                                style={{ width: "100%", height: "180px" }}
                                            />
                                        </Link>
                                        <MDBCardBody>
                                            <MDBCardTitle>{item.title}</MDBCardTitle>
                                            <MDBCardText>{excerpt(item.description)}</MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>

                                </MDBCol>

                            ))}
                    </MDBRow>
                </>
            )}
        </MDBContainer>
    );
};

export default Blog;
