import React from 'react';
import { useState,useEffect,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Backdrop, CircularProgress } from '@mui/material';
import { publicauthService } from '../services/publicauth.service';
import { authService } from '../services/auth.service';
import 'rsuite/dist/rsuite.min.css';
import { Panel } from 'rsuite';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LaunchIcon from '@mui/icons-material/Launch';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Lodingbc from './loadingbc';

const Search: React.FC = () => {
	const navigate = useNavigate();
	const [universities, setUniversities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	//const [autoUniversities, setAutoUniversities] = useState([]);

	const username = JSON.parse(sessionStorage.getItem("uid"));

	const getSearchdata = useCallback(async () => {
		let isMounted = true;
    const getUniversities = async () => {
			if (username && isMounted) {
				const data  = await authService.getUserApi(username?.id);
				const userUniversities = data?.userUniversities?.map((item) => {
					return item.universityName;
				});

				const countdata  = await publicauthService.universityApi(username?.country);
				if (userUniversities.length) {
					const newData =  countdata?.data?.filter((item) => !userUniversities.includes(item?.name));
					setUniversities(newData);
				} else {
					setUniversities(countdata?.data);
				}
				setLoading(false);
			} else {
				navigate('/');
			}
    };
    getUniversities().catch((err) => {
      if (!isMounted) return;
      console.error("failed to fetch data", err);
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
	}, [publicauthService]);

	const handleAddFav = async (itemObj) => {
			setLoading(true);
			const dataObj = {
				universityName: itemObj.name,
				country: itemObj.country,
				webpage: itemObj.web_pages[0],
				userId: username.id,
			}
			await authService.updateUserUnivApi(dataObj);
			if (search) {
				handleSearch(search);
			} else {
				getSearchdata();
			}
			setLoading(false);
	}

	const handleSearch = async (value) => {
		if (value.length >= 3) {
			setSearch(value);
			setLoading(true);
			
			const options = {
				name :value
			};
			const { data }  = await publicauthService.universitySearchApi(options);
			const userData  = await authService.getUserApi(username?.id);
			const userUniversities = userData?.userUniversities?.map((item) => {
				return item.universityName;
			});

			if (userUniversities.length) {
				const newData = data?.filter((item) => !userUniversities.includes(item?.name));
				//setAutoUniversities(newData);
				setUniversities(newData);
			} else {
				//setAutoUniversities(data);
				setUniversities(data);
			}
			setLoading(false);
		} else {
      if (!value) {
        getSearchdata();
      }
    }
	}

	useEffect(() => {
			getSearchdata();
  },[publicauthService]);

	return (
    <div>
      {loading ? (
        <Lodingbc open={loading}/>
      ) : (
        ''
      )}
      <div className='w-full justify-between grid grid-cols-12 gap-2 mb-6'>
        <Stack className="col-span-10">
          <Autocomplete 
            options={universities}
            getOptionLabel={(option) => option?.name}
            id="auto-complete"
            autoComplete
            includeInputInList
            onInputChange={(event,value) => handleSearch(value)}
            renderInput={(params) => (
              <TextField {...params} label="Search" variant="standard" />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </Stack>
      
        <Button className="col-span-2" 
        sx={{ textAlign: 'center' }}
        variant='contained'
        startIcon={<SearchIcon/>} 
        onClick={() => handleSearch(search)}/>
      </div>
      <div>
        {universities?.map((item, i) => (
        <Panel className="mb-4 rounded-none bg-white" header={<>
          <div className="flex justify-between items-center w-full pe-6">
            <span>
              {item?.name}
            </span>
            <div>
              <span>
                <Button className='text-gray-400'
                size="large" 
                startIcon={<StarBorderIcon className='text-gray-400'/>} 
                onClick={() => handleAddFav(item)}/>
              </span>
              <span>
              {
                item?.web_pages?.[0] &&
                <a className='text-gray-400' href={item?.web_pages?.[0]} target="_blank"><LaunchIcon/></a>
              }
              </span>
            </div>
          </div>
          </>} shaded>
          
          {item?.country}
        </Panel>
      ))}
      
      </div>
    </div>
	);
}

export default Search;