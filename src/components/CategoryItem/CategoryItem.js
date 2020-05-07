import React, { Component } from 'react';

import './CategoryItem.css';

class CategoryItem extends Component {
    state = { }
    render() { 
        const { changable, selectable, selected } = this.props;
        const className = `categoryItem${changable ? ' changable' : ''}${selectable ? ' selectable' : ''}${selected ? ' selected' : ''}`;
        return ( 
            <div 
                className={className}
                onClick={this.props.onClick}
            >
                <h3>
                    {this.props.title}
                </h3>
            </div>
        );
    }
}
 
export default CategoryItem;