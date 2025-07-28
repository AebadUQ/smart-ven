'use client';

import * as React from 'react';
import { getAllFormsCompleted, getForms } from '@/services/form.api';
import { Button, Checkbox, CircularProgress, FormControlLabel, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import useListApi from '@/hooks/useListApi';

import { SearchModalFilters } from './SearchModalFilter';

export function SearchModal({ onClose, open, selected, setSelected, editRoleData }: any): React.JSX.Element {
  const [value, setValue] = React.useState<string>('');
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [forms, setForms] = React.useState<any[]>([]);
  const [check, setCheck] = React.useState<boolean>(false);
  const [test, setTest] = React.useState<{ id: number; form_name: string }[]>([]);
  const url = getAllFormsCompleted();

  const { data, filter, setFilter, loading } = useListApi<any>(url, '');
  React.useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await getForms();
        if (editRoleData) {
          const dataIds = await editRoleData.formIds.map((item: any) => item);
          setSelected(response?.data?.filter((items: any) => dataIds?.includes(items?.id)));
        }

        setForms(response?.data || []);
      } catch (err) {
        console.error('Failed to fetch forms.');
      }
    };
    fetchForms();
  }, []);

  React.useEffect(() => {
    setCheck(selected.length === forms.length && forms.length > 0);
  }, [selected, forms]);

  const handleValues = (e: React.ChangeEvent<HTMLInputElement>, form: { id: number; form_name: string }) => {
    setSelected((prevSelected: any) =>
      prevSelected.some((item: any) => item.id === form.id)
        ? prevSelected.filter((item: any) => item.id !== form.id)
        : [...prevSelected, form]
    );
  };

  const handleSelectAll = () => {
    setSelected(forms.map((item) => ({ id: item.id, form_name: item.form_name })));
  };

  const handleUnSelectAll = () => {
    setSelected([]);
  };

  const clearSelections = (index: number) => {
    setSelected((prevSelected: any) => prevSelected.filter((_: any, i: any) => i !== index));
  };
  
  const adjustText = (text: string) => {
    if (text.length > 2) {
      const word = text.split(' ');
      const truncatedWord = word?.length > 2 ? `${word[0]} ${word[2]}...` : text;

      return truncatedWord;
    } else {
      return text;
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      onClose={onClose}
      open={open}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '731px', width: '450px' },
      }}
    >
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="h5">Select eForm</Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" sx={{ gap:'5px', alignItems:"center"}}>
              <Typography variant="h6">Search</Typography>
              <Tooltip title="Select forms this user role can view">
                <InfoIcon
                  onClick={() => onClose(true)}
                  color="var(--mui-palette-text-secondary)"
                  fontSize="var(--icon-fontSize-md)"
                  weight="fill"
                />
              </Tooltip>
            </Stack>

            <IconButton onClick={() => onClose()}>
              <XIcon />
            </IconButton>
          </Stack>
          <OutlinedInput
            fullWidth
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search here..."
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon />
              </InputAdornment>
            }
            value={value}
          />

          {/* <SearchModalFilters filters={filter} setFilters={setFilter} /> */}

          {selected.length > 0 && (
            <Stack direction="row" sx={{ gap: '5px' }}>
              {selected.slice(0, 2).map((item: any, index: any) => (
                <Stack
                  key={index}
                  sx={{ border: '1px solid black', borderRadius: '8px', paddingX: '3px' }}
                  direction="row"
                  alignItems="center"
                >
                  <Typography variant="body2" sx={{ fontSize: '12px' }}>
                    {' '}
                    {adjustText(item?.form_name)}
                  </Typography>
                  <IconButton onClick={() => clearSelections(index)} size="small">
                    <XIcon width="15px" height="15px" />
                  </IconButton>
                </Stack>
              ))}
              {selected.length > 2 && (
                <Box
                  sx={{
                    border: '1px solid black',
                    borderRadius: '8px',
                    paddingX: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: '12px', textAlign: 'center' }}>+{selected.length - 2}</Typography>
                </Box>
              )}
            </Stack>
          )}

          <Stack direction="row" justifyContent="flex-start">
            <FormControlLabel
              control={<Checkbox checked={check} onChange={check ? handleUnSelectAll : handleSelectAll} />}
              label={check ? 'Unselect All' : 'Select All'}
            />
          </Stack>
          {forms.map((item) => (
            <Box key={item.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected.some((sel: any) => sel.id === item.id)}
                    onChange={(e) => handleValues(e, { id: item.id, form_name: item.form_name })}
                  />
                }
                label={item.form_name}
              />
            </Box>
          ))}
          <Stack direction="row" justifyContent="flex-end"></Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
