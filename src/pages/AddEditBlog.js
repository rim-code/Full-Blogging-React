import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn, } from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom";
//wgtxuxny  //
const initialState = {
    title: "",
    description: "",
    category: "",
    imageUrl: ""
}
const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

const AddEditBlog = () => {

    const [formValue, setFormValue] = useState(initialState);
    const [categoryErrMsg, setCategoryErrMsg] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const { title, description, category, imageUrl } = formValue;

    const navigate = useNavigate(); //useNavigation is a hook which gives access to navigation object
    const { id } = useParams();


    //useeffect only run once we have the id
    useEffect(() => {
        if (id) {
            setEditMode(true);
            getSingleBlog(id);
        }
        else {
            setEditMode(false);
            setFormValue({ ...initialState })
        }
    }, [id]);

    //getSingleBlog
    const getSingleBlog = async (id) => {
        const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
        // console.log(singleBlog);//return object
        if (singleBlog.status === 200) {
            setFormValue({ ...singleBlog.data });
        }
        else {
            toast.error("Somthing went wrong");
        }
    };



    //get the current date
    const getDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today
    }

    //add blog
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category) {
            setCategoryErrMsg("Please select a category");
        }
        // const imageValidation = !editMode ? imageUrl : true ;
        //add blog in json server
        if (title && description && category && imageUrl) {
            const currentDate = getDate();
            if (!editMode) {
                const updatedBlogData = { ...formValue, date: currentDate };
                const response = await axios.post("http://localhost:5000/blogs", updatedBlogData);
                // console.log(response)
                if (response.status === 201) {
                    toast.success("Blog Created successfully")
                }
                else {
                    toast.error("Somthing went wrong");
                }
            }

            //update blog 
            else {
                const response = await axios.put(`http://localhost:5000/blogs/${id}`, formValue);
                if (response.status === 200) {
                    toast.success("Blog Updated successfully");
                }
                else {
                    toast.error("Somthing went wrong");
                }
            }
            setFormValue({ title: "", description: "", category: "", imageUrl: "" })
            navigate("/");
        }
    };

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const onCategoryChange = (e) => {
        setCategoryErrMsg(null);
        setFormValue({ ...formValue, category: e.target.value });
    };


    //upload Image
    const onUploadImage = (file) => {
        console.log("file", file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "wgtxuxny");
        axios.post("http://api.cloudinary.com/v1_1/dhptwrc0n/image/upload", formData)
            .then((resp) => {
                //   console.log("Response",resp);
                toast.info("Image Uploaded Successfully")
                setFormValue({ ...formValue, imageUrl: resp.data.url })
            }).catch((err) => {
                toast.error("Somthing went wrong");
            });
    };

    return (
        <MDBValidation
            style={{ marginTop: "100px" }}
            noValidate
            onSubmit={handleSubmit}>
            <p className="fs-2 fw-bolder" style={{ textAlign: "center" }}>{editMode ? "Update Blog" : "Add Blog"}</p>

            <div
                style={{

                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center",
                }}
            >
                <MDBInput
                    value={title || ""}
                    name="title"
                    type="text"
                    onChange={onInputChange}
                    required
                    label="Title"
                    validation="please provide a title"
                    invalid
                />
                <br />

                <MDBInput
                    value={description || ""}
                    name="description"
                    type="text"
                    onChange={onInputChange}
                    required
                    label="Description"
                    validation="please provide a description"
                    textarea
                    rows={4}
                    invalid
                />
                <br />

                {!editMode && (<>
                    <MDBInput
                        type="file"
                        onChange={(e) => onUploadImage(e.target.files[0])}
                        required
                        validation="please provide a file"
                        invalid
                    />
                    <br />
                </>)}



                <select className="categoryDropdown" value={category} onChange={onCategoryChange}>
                    <option >Please select category</option>
                    {options.map((option, index) => (
                        <option value={option || ""} key={index}>{option}</option>)
                    )};
                </select>
                {categoryErrMsg && (<div className="categoryErrMsg">{categoryErrMsg}</div>)}


            </div>
            <br />
            <br />
            <div class="text-center">
                <MDBBtn type="submit" >{editMode ? "Update" : "Add"}</MDBBtn>

                <MDBBtn color='danger' style={{ marginLeft: "5px" }}
                    onClick={() => navigate("/")}
                >
                    Go Back</MDBBtn>
            </div>
        </MDBValidation>
    );
}

export default AddEditBlog;
