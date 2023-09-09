import React from 'react'

import { isNotEmptyArray } from '../../utils/utils'

import "./DisplayTags.css"

function DisplayTags({tags}) {
  return (
    <div id='display_tags_cont'>
        <p>Tags:</p>
        { isNotEmptyArray(tags) ? (
        <ul>
            {tags.map((tag) => {
                return <li className='displayed_tags'>{tag}</li>
            })}
        </ul>
        ): <p>No tags added</p>}
    </div>
  )
}

export default DisplayTags