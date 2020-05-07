import React, { Component } from 'react';
import { createComponent } from 'effector-react';
import { user, categories, selectedCategory } from '../../redux/store';
import { getCategories, selectCategory, showAllCategories } from '../../redux/events/categories';
import { clearSearchResult } from '../../redux/events/search';
import CategoryItem from '../CategoryItem/CategoryItem';

import './CategoryList.css';

class CategoryList extends Component {

    componentDidMount() {
        getCategories(this.props.user);
    }

    onCategorySelect = (selectedCategory) => {
        clearSearchResult();
        selectCategory(selectedCategory);
    }

    onAllCategoriesSelect = () => {
        clearSearchResult();
        showAllCategories();
    }

    renderCategories = (categories, selectedCategory) => {
        return categories && Object.keys(categories).length > 0
        ? Object.keys(categories).map( categoryId => {
            const category = categories[categoryId];
            return( 
                <CategoryItem
                    key={`${categoryId}.${category.title}`}
                    onClick={() => this.onCategorySelect(category)}
                    title={category.title}
                    selectable
                    selected={selectedCategory && selectedCategory.id === categoryId}
                />
            );
        })
        : <div>Loading categories...</div>
    }

    render () {
        const { categories, selectedCategory } = this.props;
        return (
            <div className='categoryList'>
                <CategoryItem 
                    onClick={this.onAllCategoriesSelect}
                    title='Show all'
                    selectable
                    selected={!selectedCategory}
                />
                { 
                    this.renderCategories(categories, selectedCategory) 
                }
            </div>
        );
    } 
}


export default createComponent(
    {user, categories, selectedCategory },
    (props, state) => <CategoryList {...props} {...state} />
);

categories.on(
    getCategories.done,
    (state, payload) => {
        return payload.result
    }
);

selectedCategory.on(
    selectCategory,
    (state, payload) => {
        return payload;
    }
)

selectedCategory.on(
    showAllCategories,
    (state, payload) => {
        return null;
    }
)