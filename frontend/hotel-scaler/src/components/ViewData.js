import React, { useEffect, useState } from 'react'
import '../ViewData.css';

function ViewData() {
    const [room_number, setroomNumber] = useState('');
    const [email, setEmail] = useState('');
    const [type_room, setTypeRoom] = useState('A');
    const [start_time, setcheckIn] = useState(new Date());
    const [end_time, setcheckOut] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [currentRoom, setCurrentRoom] = useState(100);
    const [_id, setId] = useState();
    const [data, setData] = useState([])

    useEffect(() => {
            const checkIn = new Date(start_time)
            const checkOut = new Date(end_time)
            console.log(start_time, end_time);
            console.log(Math.floor(Math.abs(checkIn - checkOut) / 36e5));
            setPrice(currentRoom * Math.floor(Math.abs(checkIn - checkOut) / 36e5))
    }, [start_time, end_time, type_room])

    useEffect(() => {
        callData()
    }, [])

    //const roomNumbers = 
    const room_number_arrA = [
		101,
		102,
	]
	const room_number_arrB = [
		201,
		202,
		203,
	]
	const room_number_arrC = [
		301,
		302,
		303,
		304,
		305
	]

	let type;
	let options;

	if(type_room == 'A') {
		type = room_number_arrA
	}else if(type_room == 'B')
		type = room_number_arrB
	else
		type = room_number_arrC


	if(type) {
		options = type.map((el) => <option value={el}>{el}</option>)
	}

    
    const handleRoomNumber = (e) => {setroomNumber(e.target.value)}

	const handleEmail = (e) => {setEmail(e.target.value)}

	const changeTypeRoom = (e) => {
		if(e == 'A')
		setCurrentRoom(100)
		if(e == 'B')
		setCurrentRoom(80)
		if(e == 'C')
		setCurrentRoom(50)
		setTypeRoom(e);
	}

	const handleTypeRoom = (e) => {
		changeTypeRoom(e.target.value)
	};

	const handleCheckIn = (e) => {
		setcheckIn(e.target.value);
		changeTypeRoom(type_room)
	};

	const handleCheckOut = (e) => {
		setcheckOut(e.target.value);
		changeTypeRoom(type_room)
	};

    const room_number_arr = [
        101,
        102,
        201,
        202,
        203,
        301,
        302,
        303,
        304,
        305
    ]
    const room_type = [
        'A','B', 'C'
    ]

    const callData = async () => {
        document.querySelector('table').style.display = 'none'
        document.querySelector('.loading').style.display = 'block'
        const formData = new FormData(document.querySelector('form'));
        const asString = new URLSearchParams(formData).toString();
        const res = await fetch('/getData?'+asString, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const details = await res.json()
        setData(details)
        document.querySelector('.loading').style.display = 'none'
        document.querySelector('table').style.display = 'block'
    }

    

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

        callData()
    }
    
    const editItem = async (id) => {
        document.getElementById('editItem').style.top = '0'
        console.log(id);
        const res = await fetch('/editItem', {
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

        const details = await res.json()
        setEmail(details[0].email)
        setTypeRoom(details[0].type_room)
        setcheckIn(details[0].start_time)
        setcheckOut(details[0].end_time)
        setroomNumber(details[0].room_number)
        setId(details[0]._id)
    }

    const hideEdit = () => {
        document.querySelector('#editItem').style.top = '-100vh'
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
    
        const res = await fetch('/editItemChange', {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                _id, room_number, email, type_room, start_time, end_time
            })
        });

        const result = await res.json()
        if(result.success) {
            alert('You have successfully BOOKED YOUR ROOM')
            callData()
        }else{
            alert('Sorry, Your room is alredy booked')
        }
        
        
    }

    const exp = () => {
        document.querySelector('.type_room_exp_col').style.height = 'fit-content'

    }
  return (
    <div className='content'>
        <form>
            <h4><i class="fa-solid fa-filter"></i> Filter</h4>
            <h3 onClick={exp}><i class="fa-solid fa-sort-down"></i>Type Of Room</h3>
            <div className='type_room_exp_col'>
            {room_type.map((item) => 
                <span className='filter_item'>
                    <input type="checkbox" value={item} name='type_room' onChange={callData}/>
                    <label>{item}</label>
                </span>)}
            </div>
            


            <h3><i class="fa-solid fa-sort-down"></i>Room Number</h3>
            <div>
            {room_number_arr.map((item) => 
                <span className='filter_item'>
                    <input type="checkbox" value={item} name='room_number' onChange={callData}/>
                    <label>{item}</label>
                </span>)}
            </div>
   

                <h3><i class="fa-solid fa-sort-down"></i>Starting Time</h3>
                <span className='filter_item'>
                    <input type="datetime-local" name='start_time' onChange={callData}/>
                </span>
            <h3><i class="fa-solid fa-sort-down"></i>Ending Time</h3>
                <span className='filter_item'>
                    <input type="datetime-local" name='end_time' onChange={callData}/>
                </span>
        </form>
        
        <div id='editItem'>
            <i class="fa-solid fa-xmark" onClick={hideEdit}></i>
            <h5>Edit Item</h5>
            <form>
            <input type="hidden" name="_id" value={_id}/>
			<span>
				<label className="label">Email ID</label>
				<input onChange={handleEmail} className="input"
				value={email} type="text" />
			</span>
			
			<div>
				<span>
					<label className="label">Type Of Room</label>
					<select onChange={handleTypeRoom} value={type_room}>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
					</select>
				</span>

				<span>
					<label className="label">Room Number</label>
					<select onChange={handleRoomNumber} value={room_number}>
					{options}
					</select>
				</span>		
			</div>
			
			<div>
				<span>
					<label className="label">Check IN</label>
					<input onChange={handleCheckIn} className="input"
					value={start_time} type="datetime-local" id='dt'/>
				</span>
				<span>				
					<label className="label">Check OUT</label>
					<input onChange={handleCheckOut} className="input"
					value={end_time} type="datetime-local" />
				</span>
			</div>
		

			<h4>Total Price : {price}</h4>

			<input className="btn" type="submit" value='Update Room' onClick={handleEditSubmit}/>
		    </form>
        </div>
                
        
        <div id="table_container">
        <span className='loading'></span>
        <table>
            <tr>
                <th>Email ID</th>
                <th>Room Number</th>
                <th>Type Of Room</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Delete Booking</th>
                <th>Edit Booking</th>
            </tr>
        {data.map(elem => 
                <tr>
                    <td>{elem.email}</td>
                    <td>{elem.room_number}</td>
                    <td>{elem.type_room}</td>
                    <td>{elem.start_time}</td>
                    <td>{elem.end_time}</td>
                    <td className='buttons delete'><i onClickCapture={() => deleteItem(`${elem._id}`, `${elem.start_time}`)} class="fa-regular fa-trash-can"></i></td>
                    <td className='buttons edit'><i onClickCapture={() => editItem(`${elem._id}`)} class="fa-regular fa-pen-to-square"></i></td>
                </tr>
        )}

        </table>
        </div>
        
        
    </div>
  )
}

export default ViewData