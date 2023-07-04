import React, { useEffect, useState } from 'react'

function AdminDelete() {
    const deleteItem = async (id, start) => {
        const res = await fetch('/deleteItem', {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                Accept : "application/json",
                "Access-Control-Allow-Origin" : "*",
              },
            body: JSON.stringify({
                _id : id
            })
        })

        const time = new Date(start)
        const curr = new Date()
        console.log(time,  curr);

        if(Math.floor(Math.abs(time - curr) / 36e5) >= 48) {
            alert('You will get your full REFUND')
        }else if(Math.floor(Math.abs(time - curr) / 36e5) >= 24){
            alert('You will get your half REFUND')
        }else{
            alert('You will get your no REFUND')
        }

    }

    
  return (
    
    <div>
        {/* {data.map(elem => 
            <span>
                
            </span>
        )} */}
    </div>
  )
}

export default AdminDelete