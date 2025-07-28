'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextEditor } from '@/components/core/text-editor/text-editor';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';
import { dayjs } from '@/lib/dayjs';
import { postJob, updateJobById } from '@/services/jobs.api';
import { el } from '@fullcalendar/core/internal-common';
import { ListItemText, MenuItem } from '@mui/material';

// Current Date validation helper function (YYYY-MM-DD format)
const currentDate = new Date().toISOString().split('T')[0];

// Define a schema for a single question
const questionSchema = zod.object({
  question: zod.string().min(1, 'Question is required'),
  required: zod.boolean(),
});

// Update the main schema to include a questions array and the new requiredExperience field.
// We use zod.preprocess to convert the incoming value (string from the input) to a number.
// right above your schema definition
const today = new Date();
today.setHours(0, 0, 0, 0);  // normalize to midnight

const createSchema = (isEdit: boolean) => zod
  .object({
    jobType: zod.number().min(1, 'Job Type is required'),
    jobCategoryId: zod.number().min(1, 'Job Category is required'),
    positionName: zod.string().min(1, 'Job Title is required'),
    dateOfPosting: zod.string().min(1, 'Start Date is required'),
    location: zod.array(zod.number()).min(1, 'At least one location must be selected'),
    expirationDate: zod.string().min(1, 'End Date is required'),
    statusId: zod
      .preprocess((val) => Number(val), zod.number().min(0, 'Status is required')),
    noOfVacancies: zod
      .preprocess((val) => {
        const num = Number(val);
        return isNaN(num) || num <= 0 ? undefined : num;
      }, zod.number().optional()),
    maxSalary: zod
      .preprocess((val) => {
        const num = Number(val);
        return isNaN(num) || num <= 0 ? undefined : num;
      }, zod.number().optional()),
    jobDescription: zod.string().min(1, 'Description is required'),
    requiredExperience: zod.preprocess(
      (val) => Number(val),
      zod.number().min(0, 'Experience is required')
    ),
    image: zod.string().optional(),
    questions: zod.array(questionSchema).optional(),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.dateOfPosting);
    const end = new Date(data.expirationDate);

    // ✅ use isEdit from closure
    if (!isEdit && start <= today) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: 'Start Date must be after today',
        path: ['dateOfPosting'],
      });
    }

    if (end <= start) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: 'End Date must be after Start Date',
        path: ['expirationDate'],
      });
    }
  });



type Values = zod.infer<ReturnType<typeof createSchema>>;

// Update default values so that numeric fields have a number


export function JobPostCreateForm({ categories, jobType, locations, jobdata, isEdit }: any): React.JSX.Element {
  const router = useRouter();

  



  const defaultValues: Values = {
    jobType: jobdata?.jobType || 0,
    jobCategoryId: jobdata?.jobCategory?.id || 0,
    positionName: jobdata?.positionName || '',
    dateOfPosting: jobdata?.dateOfPosting
    ? dayjs(jobdata.dateOfPosting).format('YYYY-MM-DD')
    : '',
    location: jobdata?.location || [], // 🛑 Add this line
    expirationDate: jobdata?.expirationDate
    ? dayjs(jobdata.expirationDate).format('YYYY-MM-DD')
    : '',
    noOfVacancies: jobdata?.noOfVacancies || 0,
    statusId: jobdata?.statusId || 7,
    maxSalary: jobdata?.maxSalary || 0,
    jobDescription: jobdata?.jobDescription || '',
    requiredExperience: jobdata?.requiredExperience || 0,
    image: '',
    // Start with one empty question field
    questions: jobdata?.questions || [{ question: '', required: false }],
  };

  const {
  control,
  handleSubmit,
  formState: { errors },
  watch,
} = useForm<Values>({
  defaultValues,
  resolver: zodResolver(createSchema(isEdit)),   // 👈 no TypeScript error anymore
});

  // Setup dynamic field array for questions
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = React.useCallback(
    async (data: Values): Promise<void> => {
      try {
        // Log data for debugging
     
        if(isEdit){
          // Post job data (including questions) to your API
        await updateJobById(jobdata?.id, data);

        toast.success('Job post updated');
        // Uncomment and adjust this if you want to navigate after submission
        }else{
          // Post job data (including questions) to your API
        await postJob(data);

        toast.success('Job post created');
        
        }

        
         router.push(paths.dashboard.jobs.browse);
      } catch (err) {
        logger.error(err);
        toast.error(err?.response?.data?.message || "some thing went wrong");
      }
    },
    [router]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack divider={<Divider />} spacing={4}>
            {/* Primary Job Post fields */}
            <Stack spacing={3}>
              <Typography variant="h6">Create Job Post</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name="jobType"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.jobType)} fullWidth>
                        <InputLabel required>Job Type</InputLabel>
                        <Select {...field}>
                          <Option value="">Select Job Type</Option>
                          {jobType?.map((jobType: { id: number; name: string }) => (
                            <Option key={jobType.id} value={jobType.id}>
                              {jobType.name}
                            </Option>
                          ))}
                        </Select>
                        {errors.jobType && (
                          <FormHelperText>{errors.jobType.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name="jobCategoryId"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.jobCategoryId)} fullWidth>
                        <InputLabel required>Job Category</InputLabel>
                        <Select {...field}>
                          <Option value={0}>Select Job Category</Option>
                          {categories?.map((category: { id: number; name: string }) => (
                            <Option key={category.id} value={category.id}>
                              {category.name}
                            </Option>
                          ))}
                        </Select>
                        {errors.jobCategoryId && (
                          <FormHelperText>{errors.jobCategoryId.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name="statusId"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.statusId)} fullWidth>
                        <InputLabel required>Status</InputLabel>
                        <Select {...field} label="Status">
                          <MenuItem value={7}>Active</MenuItem>
                          <MenuItem value={8}>Inactive</MenuItem>
                        </Select>
                        {errors.statusId && (
                          <FormHelperText>{errors.statusId.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name="positionName"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.positionName)} fullWidth>
                        <InputLabel required>Job Title</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.positionName && (
                          <FormHelperText>{errors.positionName.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name="dateOfPosting"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.dateOfPosting)} fullWidth>
                        <InputLabel required>Validity Start Date</InputLabel>
                        <OutlinedInput {...field} type="date" min={currentDate} />
                        {errors.dateOfPosting && (
                          <FormHelperText>{errors.dateOfPosting.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name="expirationDate"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.expirationDate)} fullWidth>
                        <InputLabel required>Validity End Date</InputLabel>
                        <OutlinedInput {...field} type="date" min={watch('dateOfPosting')} />
                        {errors.expirationDate && (
                          <FormHelperText>{errors.expirationDate.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
              <Controller
                name="noOfVacancies"
                control={control}
                rules={{
                  min: { value: 0, message: 'Must be 0 or greater' }
                }}
                render={({ field, fieldState }) => (
                  <FormControl error={!!fieldState.error} fullWidth>
                    <InputLabel required>No of Vacancies</InputLabel>
                    <OutlinedInput
                      {...field}
                      type="number"
                      // 1. Prevent negatives at the HTML level
                      inputProps={{
                        min: 0,
                        // 2. Disallow "e", "+", "-" keystrokes
                        onKeyDown: (e: React.KeyboardEvent) => {
                          if (['e','E','-','+','.'].includes(e.key)) {
                            e.preventDefault();
                          }
                        }
                      }}
                      // 3. CSS to hide the spinner
                      sx={{
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                          WebkitAppearance: 'none',
                          margin: 0
                        },
                        '& input[type=number]': {
                          MozAppearance: 'textfield'
                        }
                      }}
                      label="Required Experience (Years)"
                    />
                    {errors.noOfVacancies && (
                          <FormHelperText>{errors.noOfVacancies.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
  <Controller
  name="location"
  control={control}
  rules={{ required: 'At least one branch must be selected' }}
  render={({ field, fieldState }) => (
    <FormControl error={!!fieldState.error} fullWidth>
      <InputLabel required>Location</InputLabel>
      <Select
        {...field}
        multiple
        label="Location"
        renderValue={(selected) =>
          (selected as number[])
            .map((code) => locations?.find((b: any) => b.id === code)?.name)
            .filter(Boolean)
            .join(', ')
        }
      >
        {locations?.map((b) => (
          <MenuItem key={b.id} value={b.id}>
            <Checkbox checked={field.value.includes(b.id)} />
            <ListItemText primary={b.name} />
          </MenuItem>
        ))}
      </Select>
      {fieldState.error && (
        <FormHelperText>{fieldState.error.message}</FormHelperText>
      )}
    </FormControl>
  )}
/>
</Grid>


                {/* New field for Required Experience */}
                <Grid item xs={12} sm={6}>
              <Controller
                name="requiredExperience"
                control={control}
                rules={{
                  min: { value: 0, message: 'Must be 0 or greater' }
                }}
                render={({ field, fieldState }) => (
                  <FormControl error={!!fieldState.error} fullWidth>
                    <InputLabel required>Required Experience (Years)</InputLabel>
                    <OutlinedInput
                      {...field}
                      type="number"
                      // 1. Prevent negatives at the HTML level
                      inputProps={{
                        min: 0,
                        // 2. Disallow "e", "+", "-" keystrokes
                        onKeyDown: (e: React.KeyboardEvent) => {
                          if (['e','E','-','+','.'].includes(e.key)) {
                            e.preventDefault();
                          }
                        }
                      }}
                      // 3. CSS to hide the spinner
                      sx={{
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                          WebkitAppearance: 'none',
                          margin: 0
                        },
                        '& input[type=number]': {
                          MozAppearance: 'textfield'
                        }
                      }}
                      label="Required Experience (Years)"
                    />
                    
                    {errors.requiredExperience && (
                          <FormHelperText>{errors.requiredExperience.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
                </Grid>


                {/* Updated Job Description Field with TextEditor */}
                <Grid item xs={12}>
                <Controller
                    control={control}
                    name="jobDescription"
                    render={({ field, fieldState }) => (
                      <FormControl error={Boolean(fieldState.error)} fullWidth>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                          Description
                        </Typography>
                        <Box sx={{ '& .tiptap-container': { height: '320px' } }}>
                          <TextEditor
                            content={field.value}
                            placeholder="Write something"
                            onUpdate={({ editor }) => {
                              // Get the updated HTML from the editor and update the form state.
                              const updatedContent = editor.getHTML();
                              field.onChange(updatedContent);
                            }}
                          />
                        </Box>
                        {fieldState.error && (
                          <FormHelperText>{fieldState.error.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>

            {/* Additional Questions Section */}
            <Stack spacing={2}>
              <Typography variant="h6">Additional Questions</Typography>
              {fields.map((item, index) => (
                <Grid container spacing={2} key={item.id} alignItems="center">
                  <Grid item xs={8}>
                    <Controller
                      control={control}
                      name={`questions.${index}.question`}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="Question"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      control={control}
                      name={`questions.${index}.required`}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                            />
                          }
                          label="Required"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => append({ question: '', required: false })}
              >
                Add Question
              </Button>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button color="secondary">Cancel</Button>
          <Button type="submit" variant="contained">
            {isEdit ? "Update Post" : "Create Post" } 
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
