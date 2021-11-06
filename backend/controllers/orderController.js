import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
//@desc Create new Order
//@route POST /api/orders
//@access Public
const addOrderItems= asyncHandler(async(req,res)=>{
    const { orderItems, shippingAddress, paymentMethod, itemsPrice,TaxPrice,shippingPrice, totalPrice} = req.body

    if( orderItems && orderItems.length ===0){
        res.status(400)
        throw new Error('No order items')
        return
    }else{
        
        const order = new Order({ orderItems, user: req.user._id,shippingAddress, paymentMethod, itemsPrice,TaxPrice,shippingPrice, totalPrice})

        const createdOrder= await order.save()

        res.status(201).json(createdOrder)
    }

})

//@desc Get order by id
//@route GET /api/orders/:id
//@access Public
const getOrderById= asyncHandler(async(req,res)=>{
    
    const order = await Order.findById(req.params.id).populate( 'user',
    'name email')

    if (order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

//@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid= asyncHandler(async(req,res)=>{
    
    const order = await Order.findById(req.params.id)

    if (order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.paymentResult={

            id: req.body.id,
            status:req.body.status,
            update_time: req.body.update_time,
            email_address:req.body.payer.email_address

        }

        const updatedOrder=await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

//@desc Update order to be delivered
//@route PUT /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered= asyncHandler(async(req,res)=>{
    
    const order = await Order.findById(req.params.id)

    if (order){
        order.isDelivered=true
        order.deliveredAt=Date.now()
        const updatedOrder=await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

//@desc Get all the orders of logged in user
//@route GET /api/orders/myorders
//@access Public
const getUserOrders= asyncHandler(async(req,res)=>{
    
    const orders = await Order.find({ user: req.user._id})

    if(orders){

        res.json(orders)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})


//@desc Get all the orders of logged in user
//@route GET /api/orders/orders
//@access Private/Admin
const getOrders= asyncHandler(async(req,res)=>{
    
    const orders = await Order.find({ }).populate('user', 'id name')

    if(orders){

        res.json(orders)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})


export{
    addOrderItems,getOrderById,updateOrderToPaid,getUserOrders,getOrders,updateOrderToDelivered
}