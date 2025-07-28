"use client";
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "@/types/apiConstants"

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  OutlinedInput,
  IconButton,
  Stack,
  Typography,
  Chip,
  CircularProgress,
  Autocomplete
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X as XIcon } from "@phosphor-icons/react/dist/ssr/X";
import axios from "axios";

const schema = z.object({
  merchantName: z.string().min(1, "Merchant Name is required"),
  merchantCategories: z.array(z.string()).min(1, "Category is required"),
  merchantLocation: z.array(z.string()).min(1, "Location is required"),
  merchantImage: z.any().optional(),
});

interface MerchantModalProps {
  open: boolean;
  close: (value: boolean) => void;
  merchantData?: any;
  onSuccess?: () => void;
  setFilter?: any;
  filters?: any;
  categories:any;
  setCategories:any;
  location: any;
  cardType: any;
}

export default function MerchantModal({ open, close, merchantData, onSuccess, setFilter, filters,categories, setCategories, location,cardType }: MerchantModalProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  // const [categories, setCategories] = useState([]);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      merchantName: "",
      merchantCategories: ["1"],
      merchantLocation: ["sd"],
      merchantImage: null,
    },
  });


  useEffect(() => {
    if (merchantData) {
      const categoryIds = merchantData.merchantcategories
        ? merchantData.merchantcategories.map((cat:any) => cat.id.toString())
        : [];

      const locations = typeof merchantData.merchantLocation === 'string'
        ? merchantData.merchantLocation.split(',')
        : merchantData.merchantLocation || [];

      reset({
        merchantName: merchantData.merchantName || "",
        merchantCategories: categoryIds,
        merchantLocation: locations,
        merchantImage: null,
      });

      if (merchantData.merchantImage) {
        setPreviewUrl(merchantData.merchantImage);
      }
    } else {
      reset({
        merchantName: "",
        merchantCategories: [],
        merchantLocation: [],
        merchantImage: null,
      });
      setPreviewUrl("");
      setFileName(null);
      setSelectedFile(null);
    }
  }, [merchantData, reset]);

  // useEffect(() => {
  //   fetchCategories();
  // }, [fetchCategories]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name);
      setSelectedFile(file);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl && !merchantData?.merchantImage) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, merchantData]);


  const onSubmit = async (data: any) => {
    try {
      setLoading(true);



    // Create a FormData object and append the selected file
    const formData = new FormData();

    formData.append("merchantName", data.merchantName);

    data.merchantLocation.map((location: string) => {
      formData.append("merchantLocation[]", location);
    });

    data.merchantCategories.map((category: string) => {
      formData.append('merchantCategories[]', +category);
    });

    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    // wherever you initialise your API calls
        const token = localStorage.getItem('custom-auth-token');  // or however you get your JWT

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        };

        if (merchantData) {
          // update existing merchant
          await axios.put(
            `${BASE_URL}api/merchant/${merchantData.id}/update-merchant`,
            formData,
            config
          );
        } else {
          // create new merchant
          await axios.post(
            `${BASE_URL}api/merchant/create-merchant`,
            formData,
            config
          );
        }

      onSuccess?.();
      setFilter({ ...filters, name: data.merchantName });
      close(false);
    } catch (error) {
      console.error('Error:', error);
      alert("Something went wrong while saving the merchant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={() => {
        if (!loading) {
          close(false);
          if (!merchantData) {
            reset();
          }
        }
      }}
      sx={{
        "& .MuiDialog-container": { justifyContent: "center" },
        "& .MuiDialog-paper": { width: 950, padding: 1, borderRadius: 1 },
      }}
    >
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {merchantData ? 'Edit Merchant' : 'Add Merchant'}
          </Typography>
          <IconButton onClick={() => !loading && close(false)}>
            <XIcon />
          </IconButton>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#E0E0E0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative"
            }}
          >
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </Box>

          <Stack spacing={0.5}>
            <Typography variant="subtitle2" fontWeight={600}>
              Upload Image
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Min 400x400px, PNG or JPEG
            </Typography>
            <Button
              component="label"
              variant="outlined"
              size="small"
              disabled={loading}
              sx={{ textTransform: "none", width: "fit-content" }}
            >
              Upload
              <input
                type="file"
                hidden
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
                disabled={loading}
              />
            </Button>
            {fileName && (
              <Typography variant="caption" color="primary">
                {fileName}
              </Typography>
            )}
          </Stack>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="merchantName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Merchant Name"
                  error={!!errors.merchantName}
                  helperText={errors.merchantName?.message}
                  disabled={loading}
                />
              )}
            />

            <FormControl fullWidth error={!!errors.merchantCategories}>
              <InputLabel>Select Category</InputLabel>
              <Controller
                name="merchantCategories"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    multiple
                    displayEmpty
                    input={<OutlinedInput label="Select Category" />}
                    sx={{ border: "1px solid #000", paddingInline: "10px" }}
                    disabled={loading}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 200,
                          maxWidth: 300,
                          overflowY: "auto",
                          overflowX: "auto",
                          whiteSpace: "nowrap",
                          py: 0,
                        },
                      },
                    }}
                    renderValue={(selected) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "nowrap",
                          overflowX: "auto",
                          maxWidth: "100%",
                        }}
                      >
                        {selected.map((value) => {
                          const category = categories.find(
                            (cat) => cat.id.toString() === value
                          );

                          return (

                            
                            <Chip
                              key={value}
                              label={category?.nameEN}
                              onMouseDown={(event) => event.stopPropagation()}
                              onDelete={() => {
                                const newValue = field.value.filter((id) => id !== value);
                                field.onChange(newValue);
                              }}
                              sx={{
              backgroundColor: "#f5f5f5",
              color: "#000000",
              borderRadius: "10px",
              "& .MuiChip-deleteIcon": {
                color: "#666",
              },
            }}
                            />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {categories.map((elem) => (
                      <MenuItem
                        key={elem.id}
                        value={elem.id.toString()}
                        sx={{
                          maxHeight: "30px",
                          py: "15px",
                          minWidth: "200px",
                        }}
                      >
                        {elem.nameEN}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.merchantCategories && (
                <FormHelperText>{errors.merchantCategories.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={!!errors.merchantLocation} >
              {/* <InputLabel>Select Location</InputLabel> */}
              {/* <Controller
                name="merchantLocation"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    multiple
                    displayEmpty
                    input={<OutlinedInput label="Select Location" />}
                    sx={{ border: "1px solid #000", padding: "10px" }}
                    disabled={loading}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 200,
                          maxWidth: 300,
                          overflowY: "auto",
                          overflowX: "auto",
                          whiteSpace: "nowrap",
                          py: 0,
                        },
                      },
                    }}
                    renderValue={(selected) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "nowrap",
                          overflowX: "auto",
                          maxWidth: "100%",
                        }}
                      >
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            onMouseDown={(event) => event.stopPropagation()}
                            onDelete={() => {
                              const newValue = field.value.filter((loc) => loc !== value);
                              field.onChange(newValue);
                            }}
                            sx={{
                              backgroundColor: "#f5f5f5",
                              color: "#000000",
                              borderRadius: "10px",
                              margin: "2px",
                              "& .MuiChip-deleteIcon": {
                                color: "#666",
                              },
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {location.map((elem) => (
                      <MenuItem
                        key={elem.id}
                        value={elem.value}
                        sx={{
                          maxHeight: "30px",
                          py: "15px",
                          minWidth: "200px",
                        }}
                      >
                        {elem.value}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                 
              /> */}
              <Controller
  name="merchantLocation"
  control={control}
  render={({ field }) => (
    <Autocomplete
      {...field}
      multiple
      freeSolo // 👈 This allows custom values
      options={location.map((loc) => loc.value)} // predefined options
      onChange={(_, newValue) => field.onChange(newValue)}
      value={field.value || []}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#000000",
              borderRadius: "10px",
              "& .MuiChip-deleteIcon": {
                color: "#666",
              },
            }}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Location"
          error={!!errors.merchantLocation}
          helperText={errors.merchantLocation?.message}
          sx={{ border: "0px solid #000", padding: "0px" }}
        />
      )}
    />
  )}
/>
              {errors.merchantLocation && (
                <FormHelperText>{errors.merchantLocation.message}</FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#6F2B8B",
                width: "170px",
                marginLeft: "auto",
                position: "relative"
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                merchantData ? 'Update Merchant' : '+ Add Merchant'
              )}
            </Button>
          </Stack>
        </form>

      </DialogContent>
    </Dialog>
  );
}
