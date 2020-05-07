import React, { Component } from 'react';
import { createComponent } from 'effector-react';
import { user, categories } from '../../redux/store';

import './AddCategoryInput.css';

import { addCategory } from '../../redux/events/categories';

class AddCategoryInput extends Component {
    state = { 
        inputValue: ''
    }    

    onChangeHandle = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    onSubmitHandle = (event) => {
        event.preventDefault();

        const newCategory = {
            title: this.state.inputValue,
            createdAt: new Date(),
            userId: this.props.user.id
        };

        addCategory(newCategory);

        this.setState({ inputValue: '' });
    }

    render() { 
        const { inputValue } = this.state;
        return ( 
            <div className='categoryAddInput'>
                <form onSubmit={this.onSubmitHandle}>
                    <input
                        value={inputValue} 
                        onChange={this.onChangeHandle}
                    />
                </form>
            </div>
         );
    }
}

export default createComponent(
    { user },
    (props, state) => <AddCategoryInput {...props} {...state} />
);

categories.on(
    addCategory.done,
    (state, payload) => {
        return {
            ...state,
            [payload.result.id]: payload.result
        }
    }
)