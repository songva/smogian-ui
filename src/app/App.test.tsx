import { render, screen } from '@testing-library/react';
import App from './App';
import { StyleSheetTestUtils } from 'aphrodite/no-important';

beforeEach(() => {
	StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
	StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

Object.defineProperty(window, 'screen', {
	value: {
		orientation: {
			type: 'landscape-primary',
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		},
	},
});

describe('render', () => {
	test.each(
		Array(24)
			.fill(0)
			.map((v, i) => i)
	)('bench and stage seat #%d should exist', seat => {
		render(<App />);
		const benchSeat = screen.getByTestId(`bench-seat-${seat}`);
		expect(benchSeat).toBeInTheDocument();

		const stageSeat = screen.getByTestId(`stage-seat-${seat}`);
		expect(stageSeat).toBeInTheDocument();
	});

	test('there should not be a 25th seat', () => {
		render(<App />);
		const benchSeat24 = screen.queryByTestId('bench-seat-24');
		expect(benchSeat24).not.toBeInTheDocument();

		const stageSeat24 = screen.queryByTestId('stage-seat-24');
		expect(stageSeat24).not.toBeInTheDocument();
	});
});
