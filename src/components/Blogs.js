import React from 'react';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Badge from "../components/Badge"

const Blogs = ({ title, category, description, id, imageUrl, excerpt, handleDelete }) => {
    return (
        <MDBCol size="4">
            <MDBCard className='h-100 mt-2 ' style={{ maxWidth: "22rem" }}>
                <MDBCardImage
                    src={imageUrl}
                    alt={title}
                    position='top'
                    style={{ maxWidth: "100%", height: "180px" }}
                />
                <MDBCardBody>
                    <MDBCardTitle  style={{textAlign: 'center'}}>{title}</MDBCardTitle>
                    <MDBCardText>
                        {excerpt(description)}
                        <Link to={`/blog/${id}`}>Read More</Link>
                    </MDBCardText>
                    <Badge style={{textAlign: 'center'}}>{category}</Badge>
                    <span >
                        <MDBBtn className="mt-1" tag="a" color="none" onClick={() => handleDelete(id)} style={{marginLeft:"120px"}} >
                            <MDBIcon fas icon="trash" style={{ color: "#dd4b39" }} size="lg" />
                        </MDBBtn>
                        <Link to={`/editBlog/${id}`}>
                            <MDBIcon fas icon="edit" style={{ color: "#55acee", marginLeft: "10px"}} size="lg" />
                        </Link>
                    </span>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>



    );
}





export default Blogs;
