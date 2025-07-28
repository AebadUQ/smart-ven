'use client';

import React, { useState, useEffect } from 'react';
import { toast } from '@/components/core/toaster';
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Chip,
  Avatar,
  Button,
  Stack,
  Box,
  Typography
} from '@mui/material';
import {
  addCareerConfiguration,
  editCareerConfiguration,
  deleteCareerConfiguration
} from '@/services/jobs.api';

export type LocationItem = { id: number; name: string };

export function AddLocationCard({
  data,
  type,
  selectedTabType,
}: {
  data: LocationItem[];
  type: string;
  selectedTabType: string;
}): React.JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<LocationItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // initialize from incoming data
  useEffect(() => {
    if (Array.isArray(data)) {
      setItems(data);
      setEditingIndex(null);
      setInputValue('');
    }
  }, [data]);

  // handle Save (add) or Update (edit)
  const handleSave = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (editingIndex === null) {
      // —— ADD NEW —— //
      try {
        const created = await addCareerConfiguration({ type, name: trimmed });
        setItems((prev) => [...prev, created]);
        toast.success(`Sucessfully Add ${selectedTabType}`);
      } catch (err) {
        console.error('Add failed', err);
        toast.error(err?.response?.data?.message || "some thing went wrong");
      }
    } else {
      // —— UPDATE EXISTING —— //
      const { id } = items[editingIndex];
      try {
        await editCareerConfiguration({ type, id, name: trimmed });
        setItems((prev) =>
          prev.map((it, i) => (i === editingIndex ? { ...it, name: trimmed } : it))
        );
        toast.success(`Sucessfully Edit ${selectedTabType}`);
      } catch (err) {
        console.error('Update failed', err);
        toast.error(err?.response?.data?.message || "some thing went wrong");
      }
    }

    // reset form
    setInputValue('');
    setEditingIndex(null);
  };

  // cancel add or edit
  const handleCancel = () => {
    setInputValue('');
    setEditingIndex(null);
  };

  // start editing a chip
  const startEdit = (idx: number) => {
    setEditingIndex(idx);
    setInputValue(items[idx].name);
  };

  // delete a chip
  const handleDelete = (id: number) => async () => {
    try {
      await deleteCareerConfiguration({ type, id });
      setItems((prev) => prev.filter((it) => it.id !== id));
      // if we were editing it, cancel edit
      if (editingIndex !== null && items[editingIndex].id === id) {
        handleCancel();
      }
      toast.success(`Sucessfully Remove ${selectedTabType}`);
    } catch (err) {
      console.error('Delete failed', err);
      toast.error(err?.response?.data?.message || "some thing went wrong");

    }
  };

  return (
    <Card>
      <CardContent sx={{ px: "30px", py: "40px" }}>


        <Stack>

          <Box sx={{ mb: "30px" }}>
            <Typography variant="h5" sx={{ mb: "10px" }}>{editingIndex === null ? `Add ${selectedTabType}` : `Edit ${selectedTabType}`}</Typography>
          </Box>


          <TextField
            label={selectedTabType}
            placeholder={`Enter ${selectedTabType}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            size="medium"
            fullWidth
          />

          <Box sx={{ mt: "20px" }}>
            <Stack direction="row" spacing={1.5} flexWrap="wrap">
              {items.map((it, i) => (
                <Chip
                  key={it.id}
                  label={it.name}
                  avatar={<Avatar sx={{ backgroundColor: "#dcdfe4 !important", color: "#5b5e6b !important"}}>{it.name.charAt(0).toUpperCase()}</Avatar>}
                  onDelete={handleDelete(it.id)}
                  onClick={() => startEdit(i)}
                  variant="outlined" 
                  sx={{
                    marginBottom: '5px',
                    color: "#202636 !important",
                    borderRadius: '10px',
                    gap: "5px"
                  }}
                />
              ))}
            </Stack>
          </Box>

        </Stack>


      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          onClick={handleCancel}
          disabled={editingIndex === null && inputValue.trim() === ''}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={inputValue.trim() === ''}
        >
          {editingIndex === null ? 'Save' : 'Update'}
        </Button>
      </CardActions>
    </Card>
  );
}

