import React from 'react';
import { useState,useEffect,useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Backdrop, CircularProgress } from '@mui/material';
import { authService } from '../services/auth.service';
import 'rsuite/dist/rsuite.min.css';
import { Panel,PanelGroup } from 'rsuite';
import StarIcon from '@mui/icons-material/Star';
import LaunchIcon from '@mui/icons-material/Launch';
import { publicauthService } from '../services/publicauth.service';
import Lodingbc from './loadingbc';

const Profile: React.FC = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedUniversity, setSelectedUniversity] = useState();
	const [otherData, setOtherData] = useState();
	const [languages, setLanguages] = useState();
	const [currency, setCurrency] = useState();
	const username = JSON.parse(sessionStorage.getItem("uid"));

	const getUserdata = useCallback(async () => {
		let isMounted = true;
    const getUsers = async () => {
			if (username) {
				const data  = await authService.getUserApi(username?.id);
				setUsers(data.userUniversities);
				setLoading(false);
			} else {
				navigate('/');
			}
    };
    getUsers().catch((err) => {
      if (!isMounted) return;
      console.error("failed to fetch data", err);
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
	}, [publicauthService]);

	const handleRemoveFav = async (userUnivid) => {
		setLoading(true);
		await authService.deleteUserUnivApi(userUnivid);
		getUserdata();
		setLoading(false);
	}

	const handleClick = async (university) => {
		//setLoading(true);
		setSelectedUniversity(university);
		const { data } = await publicauthService.countryDetailApi(university?.country);
		if (data?.[0]) {
			setOtherData(data?.[0]);
			setLanguages(Object.values(data?.[0].languages)?.join(", "));
			setCurrency(Object.values(data?.[0].currencies));
		}
		//setLoading(false);
	}

	useEffect(() => {
		getUserdata();
  },[publicauthService]);

	return (
    <div className='auto_container'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
      {loading ? (
        <Lodingbc open={loading}/>
      ) : (
        ''
      )}
      {!users.length &&
      <>
        <Panel header="No data found" shaded className='col-span-12'>
        </Panel>
      </>
      }
      {(users.length > 0) && 
      <>
      <div className='col-span-12 md:col-span-6 flex flex-col gap-4'>
        <h1 className="text-3xl font-bold text-[#1675e0]">
            My Favorites
        </h1>
        <PanelGroup className="!rounded-none !overflow-visible" accordion shaded>
          {users?.map((item, i) => (
              <Panel className="mb-4 !rounded-none bg-white drop-shadow-lg" eventKey={i+1} header={<>
                <div className="flex justify-between items-center w-full">
                  <span>
                    {item?.universityName}
                  </span>
                  <div>
                    <span>
                      <Button className='text-gray-400'
                      size="large" 
                      startIcon={<StarIcon className='text-yellow-500'/>} 
                      onClick={() => handleRemoveFav(item.id)}/>
                    </span>
                    <span>
                    {
                      item?.webpage &&
                      <a className='text-gray-400' href={item?.webpage} target="_blank"><LaunchIcon/></a>
                    }
                    </span>
                  </div>
                </div>
                </>} 
                onSelect={() => handleClick(item)}>
                
                {item?.country}
              </Panel>
          ))}
          
        </PanelGroup>
      </div>
      {
        selectedUniversity &&
        <div className='col-span-12 md:col-span-6 flex flex-col gap-4'>
          <h1 className="text-3xl font-bold text-[#1675e0]">
          Selected university
          </h1>
          <Panel className="mb-4 !rounded-none bg-white" header={selectedUniversity.universityName} shaded>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur et velit in dignissim. 
            Nullam a ante in lacus elementum lobortis. Aliquam non porta ante. Curabitur ipsum mauris, 
            volutpat eu enim vitae, sagittis laoreet libero. Morbi vel metus venenatis, viverra nibh in, 
            iaculis lorem. Donec sit amet suscipit tellus. Donec a lectus diam. Aliquam malesuada magna quis 
            nunc vulputate, vel placerat massa rhoncus. Vestibulum vestibulum, dui in molestie facilisis, 
            ex nisi faucibus sapien, id sagittis ex turpis et orci. Nulla facilisi. Ut et nisi lobortis, 
            volutpat massa at, ultrices elit.
            </p>
            <div>
              <span>
                Website:&nbsp;
              </span>
              <span >
                <Link to={selectedUniversity?.webpage} target="_blank">
                  {selectedUniversity?.webpage}
                </Link>
              </span>
            </div>
            <div>
              <span>
                Location:&nbsp;
              </span>
              <span >
                {selectedUniversity?.country}
              </span>
            </div>
            <div>
              <span>
                Country's capital:&nbsp;
              </span>
              <span >
                {otherData?.capital?.[0]}
              </span>
            </div>
            <div>
              <span>
                Currency:&nbsp;
              </span>
              <span >
                {currency?.[0]?.name}
              </span>&nbsp;
              <span >
                {currency?.[0]?.symbol}
              </span>
            </div>
            <div>
              <span>
                Language:&nbsp;
              </span>
              <span >
                {languages}
              </span>
            </div>
            <div>
              <span>
                Population:&nbsp;
              </span>
              <span >
                {otherData?.population}
              </span>
            </div>
          </Panel>
        </div>
      }
      </>
      }
      </div>
    </div>
	);
}

export default Profile;