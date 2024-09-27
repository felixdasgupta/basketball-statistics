import { IconButton, InputAdornment, Paper, styled, TextField, TextFieldProps } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ChangeEvent, useState } from "react";
import { ClearOutlined } from "@mui/icons-material";

interface SearchInputProps {
	onSearch: (query: string) => void;
	inputProps?: TextFieldProps;
}

export const SearchInput = ({ onSearch, inputProps }: SearchInputProps) => {
	const [value, setValue] = useState("");

	const handleChange = (val: string) => {
		setValue(val);
		onSearch(val);
	};

	const clearSearch = () => {
		setValue("");
		onSearch("");
	};

	return (
		<SearchInputBox>
			<TextField
				id='input-with-icon-textfield'
				label='Search Players'
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position='start'>
								<SearchRoundedIcon />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position='end'>
								{value && (
									<IconButton size='small' onClick={() => clearSearch()} aria-label='clear search'>
										<ClearOutlined />
									</IconButton>
								)}
							</InputAdornment>
						),
					},
				}}
				variant='standard'
				value={value}
				onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
				fullWidth
				{...inputProps}
			/>
		</SearchInputBox>
	);
};

const SearchInputBox = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	backgroundColor: theme.palette.common.white,
}));
