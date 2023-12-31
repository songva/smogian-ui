import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

console.log(
	`%c######################################################\r\n` +
		`#                                                    #\r\n` +
		`#    The author of this site is looking for a job    #\r\n` +
		`#      %csoong.gau@gmail.com%c  Thank you very much      #\r\n` +
		`#                                                    #\r\n` +
		`######################################################`,
	'color: #00aaf4; font-family: monospace',
	'color: #ffb403; font-family: monospace',
	'color: #00aaf4; font-family: monospace'
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
