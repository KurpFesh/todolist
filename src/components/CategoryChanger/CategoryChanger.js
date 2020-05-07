import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCategories } from '../../redux/actions/categories';
import { changeCategory } from '../../redux/actions/tasks';

import CategoryItem from '../CategoryItem/CategoryItem';

import './CategoryChanger.css';

class CategoryChanger extends Component {
    state = {  }

    componentDidMount() {
        this.props.getCategories();
    }

    onCategoryChange = (task, category) => {
        if(task.categoryId === category.id){
            return;
        }
        this.props.changeCategory(task, category);
    }

    renderCategories = (categories) => {
        const { selectedTask } = this.props;
         return categories.map( category => {
            return (
                <CategoryItem
                    key={category.id}
                    onClick={() => this.onCategoryChange(selectedTask, category)}
                    selected={category.id === selectedTask.categoryId}
                    title={category.title}
                    changable
                />
            );
        });
    }

    render() {
        const { categories, selectedTask } = this.props;
        return ( 
            selectedTask &&
            <>
                <h3>
                    Change category to
                </h3>
                <div className='categoryChanger'>
                    {this.renderCategories(categories) }
                </div>
            </>
            
         );
    }
}

const mapStateToProps = ({ user, categories, selectedCategory, selectedTask }) => {
    return {
        user,
        categories,
        selectedCategory,
        selectedTask
    }
}
 
export default connect(mapStateToProps, { getCategories, changeCategory })(CategoryChanger);