import data from "../data.json"

import axios from "axios"

import React from 'react'
import img from './images/p1.jpg'
function Home() {
  console.log(data)

      const handleClick = async (productData)=>{
        console.log("hoyyyyyy", productData)
       
       const order = await axios.post("http://localhost:4000/checkout",productData);
          // .then((res)=>{ console.log(res) })
          // .catch((err)=> console.log(err))
    //     const { data : {key}} =await axios.get("http://localhost:4000/getkey");
        // const orderId = res?.id;
        console.log(order.data.id, typeof(order.data.id));

        var options = {
            key:'rzp_test_PynI3KMWv9teZO',
            amount: productData.Price,
            currency: "INR",
            name: "Saiteja",
            description: "Test Transaction",
            image: 'https://assets.leetcode.com/users/avatars/avatar_1652201599.png',
            order_id: order.data.id, 
            // "handler": async function (response){
            //    const paymentverify = await axios.post("http://localhost:4000/paymentVerification",response);
            // },
            callback_url:"http://localhost:4000/paymentVerification",
            prefill: {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        }; 
        const razor = window.Razorpay(options);
        
        razor.open(); 
      }
  return (
    <div>
        <div className="row rows">
            {data.map(project =>
            
              <div className="col-sm-4"  key={project.id}>
                <div className="card">
                  <div className="card-body">
                    <img src={img} style={{height:'300px'}}></img>
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.Price}</p>
                    <button onClick={() => handleClick(project)}>Order Now</button>
                    {/* <a href={project.link} target='_blank' className="btn btn-primary">Github link</a> */}
                    {/* <a href={project.live} style={{margin:'5%'}} target='_blank' className="btn btn-primary">Live Project</a> */}
                  </div>
                </div>
              </div>
            )}
        </div>
    </div>
  )
}

export default Home