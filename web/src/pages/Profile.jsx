import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useUpdateUserMutation } from '../redux/services/user';
import { useLazyFetchUniversitiesQuery } from '../redux/services/university';
import UniversityList from '../components/UniversityList';
import TabPanel from '../components/TabPanel';
import FormInput from '../components/FormInput';

const userSchema = object({
  firstName: string().min(1, 'First name is required').max(100),
  lastName: string().min(1, 'Last name is required').max(100),
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
});

const Profile = () => {
  const { user } = useSelector((state) => state.userState);
  const [universitiesList, setUniversitiesList] = useState([]);
  const [tab, setTab] = React.useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [updateUser, { isLoading, isSuccess, error, isError }] =
    useUpdateUserMutation();
  const [fetchUniversity] = useLazyFetchUniversitiesQuery();

  const methods = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
  const { handleSubmit } = methods;

  useEffect(async () => {
    const promises = user.universities
      .filter((name) => !['', null].includes(name))
      .map((name) => fetchUniversity({ params: { name } }));

    try {
      const results = await Promise.all(promises);
      setUniversitiesList(
        results.map(({ data }) => ({
          name: data[0].name,
          webPages: data[0].web_pages,
          countryCode: data[0].alpha_two_code,
          country: data[0].country,
          uuid: data[0].uuid,
          isFavorite: true,
        }))
      );
    } catch (error) {}
  }, [user.universities]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile updated successfully');
      setIsEdit(false);
    }

    if (isError) {
      console.error(error);
      toast.error(error.data, {
        position: 'top-right',
      });
    }
  }, [isLoading]);

  const handleChangeTab = (e, value) => {
    setTab(value);
  };

  const onSubmitHandler = (values) => {
    if (!isEdit) setIsEdit(true);
    else updateUser({ id: user.id, body: values });
  };

  return (
    <Stack sx={{ mx: 'auto', pt: 4 }} maxWidth="sm" alignItems="center">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="My Account" />
            <Tab label="My Favorites" />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <Avatar sx={{ width: 100, height: 100, fontSize: 40, mx: 'auto' }}>
            {user.firstName[0] + user.lastName[0]}
          </Avatar>
          <FormProvider {...methods}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmitHandler)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    disabled={!isEdit}
                    name="firstName"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    disabled={!isEdit}
                    name="lastName"
                    label="Last Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    disabled={!isEdit}
                    name="email"
                    label="Email Address"
                    type="email"
                  />
                </Grid>
              </Grid>
              <LoadingButton
                variant="contained"
                sx={{ mt: 1 }}
                fullWidth
                disableElevation
                type="submit"
                loading={isLoading}
              >
                {isEdit ? 'Update Profile' : 'Edit Profile'}
              </LoadingButton>
              {isEdit && (
                <LoadingButton
                  variant="contained"
                  sx={{ mt: 1 }}
                  fullWidth
                  disableElevation
                  type="button"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </LoadingButton>
              )}
            </Box>
          </FormProvider>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <UniversityList universities={universitiesList} />
        </TabPanel>
      </Box>
    </Stack>
  );
};

export default Profile;
