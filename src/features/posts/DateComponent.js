import React from 'react';

import {timeAgo} from './helpers/TimeAgo'

export const DateComponent = ({timeStamp}) => {
	const date = timeAgo(timeStamp);

	return (
		<span title={timeStamp} className='post-author up'>
			<i>{date}</i>
		</span>
	)
}