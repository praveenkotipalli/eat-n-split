import { useState } from "react";

const initialFriends = [
  {
    id: 499476,
    name: "Likhit",
    image: "https://media.licdn.com/dms/image/v2/D4D35AQFxNZNyP8T4gg/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1715835432690?e=1726246800&v=beta&t=ossZxKCc3zxyrnvxo8QaWOc7UqnpYrB44Tq0wkMY2ik",
    balance: 200,
  },
  {
    id: 118836,
    name: "Hafeez",
    image: "hafeez.jpg",
    balance: -4700,
  },
  {
    id: 933372,
    name: "Charan",
    image: "https://media.licdn.com/dms/image/v2/D5603AQHfuNZlypo0mg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706882562560?e=1730937600&v=beta&t=QfRJ-gHqa572jrqgRqdpaqgvlmtsRFwSs1UA-n13MRQ",
    balance: 0,
  },
  
];

function Button ({children, onClick}){
  return <button className="button" onClick={onClick}>{children}</button>
}

export default function App(){
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectFriend, setSelectFriend] = useState(null);

  function handleFunction(){
    setShowAddFriend(!showAddFriend);
    
  }

  function handleSelection(friend){
    // setSelectFriend(friend);
    setSelectFriend((cur)=>cur?.id === friend?.id ? null : friend);
    setShowAddFriend(false);
  }
  return <div className="app">
    <div className="sidebar">
    
      <FriendLists friends={friends} handleSelection={handleSelection} selectFriend={selectFriend}/>
      {showAddFriend && <AddFriendForm setFriends={setFriends} setShowAddFriend={setShowAddFriend} />}
      <Button onClick={handleFunction} >{showAddFriend? 'Close': 'Add friend'}</Button>
      
    </div>

      {selectFriend && <FormSplitBill selectFriend={selectFriend}/>}

  </div>
}

function FriendLists({friends, handleSelection, selectFriend}){
  // const friends = initialFriends;
  return <ul>
    {friends.map(friend => <Friend friend={friend} handleSelection={handleSelection}selectFriend={selectFriend} key={friend.id}/> )}
  </ul>
}

function Friend({friend, handleSelection, selectFriend}){

  const isSelected = selectFriend?.id === friend?.id;

  return <li className={isSelected? "selected" : ""}>
    <img src={friend.image} alt={friend.name}/>
    <h3>{friend.name}</h3>

    {friend.balance <0 && (
      <p className="red">You owe {friend.name} ₹{Math.abs(friend.balance)}</p>
    )}

{friend.balance >0 && (
      <p className="green">{friend.name} owes you ₹{Math.abs(friend.balance)}</p>
    )}

{friend.balance === 0 && (
      <p>You and {friend.name} even</p>
    )}

    <Button onClick={()=>handleSelection(friend)}>{isSelected? "Close":"Select" }</Button>
    
  </li>
}




function AddFriendForm({setFriends, setShowAddFriend}){

  const [name, setName] = useState("");
  let [image, setImage] = useState("zoro1.jpg");

  function handleSubmit(e){
    e.preventDefault();

    if(!name) return;

    let newFriend = {
      name,
      image,
      balance: 0,
      id: crypto.randomUUID()
  }

  
  setFriends(friends => [...friends, newFriend]);
  console.log(newFriend);

  setImage('zoro1.jpg');
  setName('');
  setShowAddFriend(false);
  }

  return(

  <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>🧑‍🤝‍🧑 Friend</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)}/>

            <label>🖼️ Image url</label>
            <input type="text" value={image} onChange={e=>setImage(e.target.value)}/>

            <Button>Add</Button>
    </form>
  )
}

function FormSplitBill ({selectFriend}){

  const [bill, setBill] = useState("");
  const [payedByUser, setPayedByUser] = useState("");
  const payedByFriend = bill? bill-payedByUser : "";

  const [whoIsPaying, setWhoIsPaying] = useState("user");
  return (
    <form className="form-split-bill">
      <h2>Split bill with {selectFriend.name}</h2>

      <label>💰 Bill value</label>
      <input type="text" value={bill} onChange={(e)=>setBill(Number(e.target.value))}/>

      <label>🧑‍🦰 Your expenses</label>
      <input type="text"  value={payedByUser} onChange={(e)=>setPayedByUser(Number(e.target.value) > bill ? payedByUser : Number(e.target.value))}/>

      <label>🧑🏻‍🤝‍🧑🏼 {selectFriend.name}'s expenses</label>
      <input type="text" disabled  value={payedByFriend}/>

      <label>🤑 Who is paying the bill</label>
      <select  value={whoIsPaying} onChange={(e)=>setWhoIsPaying((e.target.value))}>
        <option value='user' >You</option>
        <option value='friend'>{selectFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  )
}