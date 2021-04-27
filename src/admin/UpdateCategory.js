import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { getCategory, updateCategory } from './helper/adminapicall';
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../user/helper/FormContainer';

const UpdateCategory = ({match}) => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const {user,token} = isAutheticated();

    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
      
            if (data.error) {
              setError(data.error)
            } else {
             preloadCategories()
              setName(data.name)
               
            }
          }).catch(err=>{})
    }
    const preloadCategories = ()=>{
        getCategory().then(data=>{
            if(data.error){
                setError(data.error)
            }
        }).catch(err=>{})
    }

    useEffect(() => {
        preload(match.params.categoryId);
      }, []);

    const goBack= () => (
        <div >
            <Link className='btn btn-outline-dark my-3' to="/admin/categories">
            go back
            </Link>

        </div>
    )
    
    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)

        //backend request
        updateCategory(match.params.categoryId,user._id,token,{name})
        .then(data => {
            if(data.error)
            {
                    setError(error);
            }
            else{
                setError("");
                setSuccess(true);
                setName("");
            }
        }).catch(err=>{})
    }

    const successMessage = () => {
        if(success){
            return <h5 className="alert alert-success mt-3">Category updated successfully</h5>
        }
    };
    

    const myCatogoryForm = () => (
        <FormContainer>
            <h1>Update Category</h1>
            <Form>
            {successMessage()}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Name'
                value={name}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' onClick={onSubmit} variant='primary'>
              Update Category
            </Button> 
            </Form>
        </FormContainer>
    )

    return (
        <>
            {goBack()} 
            {myCatogoryForm()}                   
        </>
    )
}


export default UpdateCategory;