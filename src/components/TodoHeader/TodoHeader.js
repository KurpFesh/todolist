import React, { Component } from 'react';

import { changeSortParameter } from '../../redux/events/categorySorter';
import { changeFilterParameter } from '../../redux/events/taskFilter';

import { createComponent } from 'effector-react';
import { selectedCategory, 
         searchTerm, 
         categorySortParameters,
         selectedCategorySorter, 
         taskFilterParameters,
         selectedTaskFilter,
         viewerCategories,
         selectedViewer } from '../../redux/store';

import DropdownFilter from '../DropdownFilter/DropdownFilter';

const TodoHeader = createComponent( 
    {selectedCategory, searchTerm, categorySortParameters, selectedCategorySorter, 
        taskFilterParameters, selectedTaskFilter, viewerCategories, selectedViewer},
    (props, {selectedCategory, searchTerm, categorySortParameters, selectedCategorySorter, 
        taskFilterParameters, selectedTaskFilter, viewerCategories, selectedViewer }) => {

        const renderTodoHeaderText = (searchTerm, selectedCategory) => {
            if(searchTerm !== null) {
                return 'Search results';
            }
    
            if(selectedCategory !== null) {
                return selectedCategory.title;
            }
    
            return 'All tasks';
        }
    
        return (
            <div className='todoHeader'>
                <h2>{ renderTodoHeaderText(searchTerm, selectedCategory) }</h2>
                {
                    selectedViewer === viewerCategories['Categories']
                    && <>
                        <h3>Sorted by {selectedCategorySorter}</h3>
                        <DropdownFilter 
                            parameters={categorySortParameters}
                            selectedParameter={selectedCategorySorter}
                            onParameterSelect={changeSortParameter}
                        />
                    </>
                }
                <DropdownFilter
                    parameters={taskFilterParameters}
                    selectedParameter={selectedTaskFilter}
                    onParameterSelect={changeFilterParameter}
                />
            </div>
        );
    }   
)

export default TodoHeader;

selectedCategorySorter.on( changeSortParameter, (state,payload) => {
    return payload;
});

selectedTaskFilter.on( changeFilterParameter, (state, payload) => {
    return payload;
});