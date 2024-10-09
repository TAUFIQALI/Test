import React, { useEffect } from "react";
import { InputAdornment, InputBase, withStyles } from "@material-ui/core";

const BasicInput = withStyles((theme) => ({
	root: {
		"label + &": {
			marginTop: theme.spacing(3),
		},
		"&.MuiInputBase-multiline": {
			padding: "0 !important",
		},
		"& .MuiInputAdornment-positionEnd": {
			position: "absolute",
			right: "12px",
		},
	},
	input: {
		position: "relative",
		backgroundColor: "white !important",
		fontSize: "15px !important",
		fontWeight: "400",
		margin: "0 !important",
		height: "3rem !important",
		padding: "10px 12px 10px 36px !important",
		borderRadius: "8px !important",
		border: "1px solid #ced4da !important",
		fontFamily: "'Inter', sans-serif",

		transition: theme.transitions.create(["border-color", "box-shadow"]),
		"&:focus": {
			borderRadius: 4,
			boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3) !important",
		},

		"&.MuiSelect-select": {
			height: "1rem !important",
		},
		"&::placeholder": {
			color: "#082852 !important",
		},
	},
}))(InputBase);

function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = React.useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

function DashBoardSearchBar({
	value,
	setValue,
	onSearch,
	defaultText = "Search Text...",
}) {
	const debouncedValue = useDebounce(value, 500);
	const searchIcon = (
		<svg
			width={20}
			height={21}
			viewBox="0 0 20 21"
			fill="#9ea0a8"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.0252 14.3469L18.5943 17.9152L17.4152 19.0943L13.8469 15.5252C12.5191 16.5895 10.8677 17.1684 9.16602 17.166C5.02602 17.166 1.66602 13.806 1.66602 9.66602C1.66602 5.52602 5.02602 2.16602 9.16602 2.16602C13.306 2.16602 16.666 5.52602 16.666 9.66602C16.6684 11.3677 16.0895 13.0191 15.0252 14.3469ZM13.3535 13.7285C14.4111 12.6409 15.0017 11.183 14.9993 9.66602C14.9993 6.44268 12.3885 3.83268 9.16602 3.83268C5.94268 3.83268 3.33268 6.44268 3.33268 9.66602C3.33268 12.8885 5.94268 15.4993 9.16602 15.4993C10.683 15.5017 12.1409 14.9111 13.2285 13.8535L13.3535 13.7285Z"
				fill={0.4}
				fill-opacity="#0D1126"
			/>
		</svg>
	);
	const slashIcon = (
		<svg
			width="18"
			height="21"
			viewBox="0 0 18 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0 6.5C0 3.18629 2.68629 0.5 6 0.5H12C15.3137 0.5 18 3.18629 18 6.5V14.5C18 17.8137 15.3137 20.5 12 20.5H6C2.68629 20.5 0 17.8137 0 14.5V6.5Z"
				fill="#E9EAEC"
			/>
			<path
				d="M11.3068 4.84091L8.02557 17.0312H6.69815L9.9794 4.84091H11.3068Z"
				fill="#BABDC5"
			/>
		</svg>
	);

	useEffect(() => {
		if (debouncedValue) {
			onSearch(debouncedValue);
		}
	}, [debouncedValue, onSearch]);

	const handleInputChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div style={{ position: "relative" }}>
			<BasicInput
				style={{ position: "relative" }}
				type="text"
				placeholder={defaultText}
				value={value}
				onChange={handleInputChange}
				endAdornment={
					<InputAdornment
						position="end"
						style={{
							position: "absolute",
							right: "12px",
							top: "50%",
							transform: "translateY(-50%)",
						}}
					>
						{slashIcon}
					</InputAdornment>
				}
			/>
			<span
				style={{
					position: "absolute",
					left: "12px",
					top: "56%",
					transform: "translateY(-50%)",
				}}
			>
				{searchIcon}
			</span>
		</div>
	);
}

export default DashBoardSearchBar;
