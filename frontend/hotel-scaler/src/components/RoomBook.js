import { useEffect, useState } from 'react';
import '../roombook.css'
export default function RoomBook() {

	// States for registration
	const [room_number, setroomNumber] = useState('');
	const [email, setEmail] = useState('');
	const [type_room, setTypeRoom] = useState('A');
	const [start_time, setcheckIn] = useState(new Date());
	const [end_time, setcheckOut] = useState(new Date());
	const [price, setPrice] = useState(0);
	const [currentRoom, setCurrentRoom] = useState(100);
	useEffect(() => {
		setcheckIn(new Date())
		setcheckOut(new Date())
	}, [])
	useEffect(() => {
			const checkIn = new Date(start_time)
			const checkOut = new Date(end_time)
			console.log(start_time, end_time);
			console.log(Math.floor(Math.abs(checkIn - checkOut) / 36e5));
			setPrice(currentRoom * Math.floor(Math.abs(checkIn - checkOut) / 36e5))
	}, [start_time, end_time, type_room])

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
	const room_type = [
		'A','B', 'C'
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
		console.log(e);
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
		if(start_time < e.target.value)
		{
			setcheckOut(e.target.value);
			changeTypeRoom(type_room)
		}
	};

	// Handling the form submission
	const handleSubmit = async (e) => {
	e.preventDefault();

	const res = await fetch('/data', {
		method : 'POST',
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify({
			room_number, email, type_room, start_time, end_time
		})
	});
	
	const details = await res.json();
	if(details.success) {
		alert('You have successfully BOOKED YOUR ROOM')
	}else{
		alert('Sorry, Your room is alredy booked')
	}
}

	



return (
	<div className="form">
		<h1>Book A New Room</h1>
		<form>
			{/* Labels and inputs for form data */}
			<span>
				<label className="label">Email ID</label>
				<input onChange={handleEmail} className="input"
				value={email} type="text" />
			</span>
			
			<div>
				<span>
					<label className="label">Type Of Room</label>
					<select onChange={handleTypeRoom}>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
					</select>
				</span>

				<span>
					<label className="label">Room Number</label>
					<select onChange={handleRoomNumber}>
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
		

			<h3>Total Price : {price}</h3>

			<input className="btn" type="submit" value='Book Room' onClick={handleSubmit}/>
		</form>


	</div>
);
}
