import React from 'react';
import { MDBCard, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

const Category = ({ options , handleCategory}) => {
    return (
        <MDBCard style={{ width: "18rem", marginTop: "20px" }}>

            <h4 style={{textAlign: "center"}}>Categories</h4>
            <MDBListGroup flush>

                {options.map((item, index) => (
                    <MDBListGroupItem
                        key={index}
                        style={{ cursor: "pointer" ,textAlign: "center"}}
                        onClick={() => handleCategory(item)}
                    >{item}
                    </MDBListGroupItem>
                ))}

            </MDBListGroup>
        </MDBCard>

    );
};

export default Category;
