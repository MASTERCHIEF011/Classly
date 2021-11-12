import { useFormik, Form, FormikProvider } from 'formik';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { InputLabel, Select, MenuItem, Container, Stack, Typography, Button, Modal, Box, TextField, IconButton, InputAdornment, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Page from '../components/Page';
import { Icon } from '@iconify/react';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
import { createClass } from '../actions/class'

// ----------------------------------------------------------------------
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '25px',
    p: 4,
  };
export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formikFilter = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });
  const formikModal = useFormik({
    initialValues: {
      className: '',
      slotName: '',
      subject: ''
    },
    onSubmit: () => {
      console.log(formikModal.values);
      dispatch(createClass(formikModal.values, navigate))
    }
  });

  const { resetForm } = formikFilter;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };
  const handleClassClick = () => {

  }
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formikModal;



  return (
    <Page title="Classly | Classes">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Classes
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={handleOpen}
            startIcon={<Icon icon={plusFill} />}
          >
            Add New Class
          </Button>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormikProvider value={formikModal}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              
              <Stack spacing={3}>
              <Typography variant="h4" gutterBottom>Add New Class</Typography>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  type="text"
                  label="Subject"
                  {...getFieldProps('subject')}
                  error={Boolean(touched.subject && errors.subject)}
                  helperText={touched.subject && errors.subject}
                />
              </FormControl>
                    <TextField
                      fullWidth
                      label="Class Name"
                      {...getFieldProps('className')}
                      error={Boolean(touched.className && errors.className)}
                      helperText={touched.className && errors.className}
                    />

                  <FormControl fullWidth>
                    <InputLabel id="slotSelectLabel">Slot Name</InputLabel>
                    <Select
                      labelId="slotSelectLabel"
                      id="slotSelect"
                      {...getFieldProps('slotName')}
                      label="Slot Name"
                    >
                      <MenuItem value="morning">Morning</MenuItem>
                      <MenuItem value="afternoon">Afternoon</MenuItem>
                      <MenuItem value="evening">Evening</MenuItem>
                    </Select>
                  </FormControl>

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Create New Class
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Box>
        </Modal>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formikFilter}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
