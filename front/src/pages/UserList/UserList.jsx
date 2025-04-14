import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

function UserList(props) {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ findUser, setFindUser ] = useState({usercode: "", email: ""});
    const [ userList, setUserList ] = useState([
        {
            usercode: "1111",
            email: "aaa@gmail.com",
        },
        {
            usercode: "2222",
            email: "bbb@gmail.com",
        },
        {
            usercode: "3333",
            email: "ccc@gmail.com",
        },
        {
            usercode: "4444",
            email: "ddd@gmail.com",
        },
    ]);

    const handleModifyClick = (usercode) => {
        const findUser = userList.find(user => user.usercode === usercode);
        setFindUser(findUser);
        setModalOpen(true);
    }

    return (
        <div>
            <ul>
                {userList.map(user => 
                    <li key={user.usercode}>
                        usercode: {user.usercode}, email: {user.email}
                        <button onClick={() => handleModifyClick(user.usercode)}>수정</button>
                    </li>
                )}
            </ul>
            <UserModal isOpen={modalOpen} setOpen={setModalOpen} user={findUser} />
        </div>
    );
}

function UserModal({ isOpen, setOpen, user }) {
    const [ inputValue, setInputValue ] = useState({
        usercode: "",
        email: "",
    })

    useEffect(() => {
        setInputValue({
            usercode: user.usercode,
            email: user.email,
        });
    }, [user])

    const handleOnChange = (e) => {
        setInputValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }


    return <ReactModal 
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        children={<div>
            <ul>
                <li>usercode: {user.usercode}</li>
                <li><input type="text" name={"usercode"} value={inputValue.usercode} onChange={handleOnChange} /></li>
                <li>email: {user.email}</li>
                <li><input type="text" name={"email"} value={inputValue.email} onChange={handleOnChange} /></li>
                <li><button onClick={() => {console.log("요청데이터: ", inputValue)}}>수정하기</button></li>
            </ul>
        </div>}
    />
}

export default UserList;