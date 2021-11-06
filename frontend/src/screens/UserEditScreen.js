import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {getUserDetails,updateUser} from '../actions/userActions.js'
import {USER_UPDATE_RESET} from '../constants/userConstants'
const UserEditScreen = ({history,match}) => {

    const userId= match.params.id
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [isAdmin,setAdmin]= useState(false)
  
    const dispatch= useDispatch()

    const userDetails= useSelector(state => state.userDetails)

    const { loading, error, user}=userDetails

    const userUpdate= useSelector(state => state.userUpdate)

    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate}=userUpdate

    useEffect(()=>{

        if(successUpdate){
            dispatch(
                {type:USER_UPDATE_RESET,
                }
            )
            history.push('/admin/userlist')
        }
        if(!user || user._id!==userId){
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setAdmin(user.isAdmin)
        }
        
    },[history,dispatch, user,userId,successUpdate])

    const submitHandler=(e)=>{
        e.preventDefault()

        dispatch(updateUser({_id:userId,email,name, isAdmin}))
        
    
    }
    return (
        <>
        <Link to='/admin/userlist' className="btn btn-light my-3">Go Back</Link>

        <FormContainer>
            <h1>Edit User </h1>
            {loadingUpdate &&  <Loader/>}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message> }
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> :(
                            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}>   
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}>   
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="admin">
                    <Form.Check type="checkbox" label="isAdmin" checked={isAdmin}  onChange={(e)=>setAdmin(e.target.checked)}>   
                    </Form.Check>
                </Form.Group>
              

                <br></br>
                <Button type="submit" variant="primary">
                    Update
                </Button>
                
            </Form>
            )}


    
        </FormContainer>
        </>
        
    )
}

export default UserEditScreen

