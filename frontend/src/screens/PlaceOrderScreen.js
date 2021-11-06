import React,{useEffect} from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Checkout from '../components/Checkout'
import { Link } from "react-router-dom";
import {createOrder} from '../actions/orderActions'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch()

    const cart = useSelector((state)=> state.cart)

    if (!cart.shippingAddress.address) {
        history.push('/shipping')
      } else if (!cart.paymentMethod) {
        history.push('/payment')
      }
  
    const addDecimals=(num)=>{
        return (Math.round(num*100)/100).toFixed(2)
    }

    cart.itemsPrice= addDecimals(cart.cartItems.reduce( (acc,item) => acc+ (item.price * item.qty),0 ))

    cart.shippingPrice = addDecimals( cart.itemsPrice > 100 ? 0: 100)

    cart.TaxPrice= addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice = addDecimals(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.TaxPrice))

    const {order,success, error}= useSelector((state)=> state.orderCreate)

    useEffect(()=>{
        if(success){
           
            history.push(`/order/${order._id}`)
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
        }
        
    },[order,history,success,dispatch])

    const placeOrderHandler=()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice : cart.itemsPrice,
            shippingPrice : cart.shippingPrice,
            TaxPrice: cart.TaxPrice,
            totalPrice:cart.totalPrice,



        }))
    }
    return (
        <>
            <Checkout step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city},
                                {cart.shippingAddress.postalCode},
                                {cart.shippingAddress.country}
                                
                                <strong></strong>
                                <strong></strong>
                                <strong></strong>
                            </p>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length===0 ? <Message>Your Cart is Empty</Message> :(
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item,index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${addDecimals(item.qty*item.price)}
                                                </Col>

                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary: </h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.TaxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                            <div className="d-grid gap-2">
                            <Button variant="success" size="lg" disabled={cart.cartitems===0} onClick={placeOrderHandler} >
                                Place Order
                            </Button>
                            </div>
            
                            </ListGroup.Item>



                        </ListGroup>
                    </Card>
                </Col>

            </Row>
        </>
    )
}

export default PlaceOrderScreen

