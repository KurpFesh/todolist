import React, { useState } from 'react';

import { deleteUser } from '../../../redux/events/user';

const DeleteAccount = (props) => {
    const [inputValue, onChangeHandle] = useState('');
    const onSubmitHandle = (event) => {
        event.preventDefault();

        deleteUser();
    }

    return ( 
        <div>
            <p className='warningMessage'>
                {`This will permanently delete all of your tasks & history. You can’t Undo this`}
            </p>
            <form onSubmit={onSubmitHandle}>
                <input
                    onChange={event => { 
                        onChangeHandle(event.target.value)
                    }}
                    value={inputValue}
                />
            </form>
        </div>
    );
}
 
export default DeleteAccount;