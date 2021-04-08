import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { getCategory, updateCategory } from './helper/adminapicall';


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
          });
    }
    const preloadCategories = ()=>{
        getCategory().then(data=>{
            if(data.error){
                setError(data.error)
            }
        })
    }

    useEffect(() => {
        preload(match.params.categoryId);
      }, []);

    const goBack= () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
                Admin Home
            </Link>

        </div>
    )
    
    const handleChage = (event) => {
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
        })
    }

    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Category updated successfuly</h4>
        }
    };
    
    const warningMessage = () => {
        if(error){
            return <h4 className="text-success">Failed to update category</h4>
        }
    };

    const myCatogoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead"> Enter the category</p>
                <input 
                type="text"
                className="form-control my-3"
                onChange={handleChage}
                value={name}
                autoFocus
                required
                placeholder="For example summer"/>

                <button onClick={onSubmit} className="btn btn-outline-info">
                    Update Category
                </button>

            </div>
        </form>
    )

    return (
        <Base title="Create Category here" 
        description="Add new Category" 
        className="container bg-info p-4">

            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {myCatogoryForm()}
                    {goBack()}
                    {successMessage()}
                    {warningMessage()}
                </div>
            </div>

        </Base>
    )
}


export default UpdateCategory;