import { useEffect, useRef } from 'react';

const usePrevious: <T>(value: T) => T = value => {
	const prev = useRef(value);
	useEffect(() => {
		prev.current = value;
	});
	return prev.current;
};

export default usePrevious;
