"use client"
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import { ExclamationTriangleIcon, TextIcon } from '@radix-ui/react-icons';
import SimpleMdeReact from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
   const router = useRouter();
   const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<IssueForm>({
      resolver: zodResolver(createIssueSchema),
   });

   const [ error, setError ] = useState('');

   return (
      <div className='max-w-xl mx-auto space-y-3'>
         {error && <Callout.Root color="red">
            <Callout.Icon><ExclamationTriangleIcon /></Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
         </Callout.Root>}

         <form onSubmit={handleSubmit(async (data) => {
            try {
               await axios.post('/api/issues', data);
               router.push('/issues');
            } catch (error) { setError('An unexpected error occurred!') }
         })}
         >
            <h1 className='text-3xl mb-11'>Create New Issue</h1>
            <TextField.Root className='p-2'>
               <TextField.Slot>
                  <TextIcon width={20} height={20}></TextIcon>
               </TextField.Slot>
               <TextField.Input placeholder="Issue Title" variant="soft" size="3"
                  {...register('title')}
               />
            </TextField.Root>
            {errors.title && <Text color="red">{errors.title.message}</Text>}

            <Controller
               name='description'
               control={control}
               render={({ field }) => (
                  <SimpleMdeReact placeholder="Describe your Issue..." {...field} />
               )}
            />
            {errors.description && <Text color="red">{errors.description.message}</Text>}

            <Button size="2">Create</Button>
         </form>
      </div>
   );
}

// {...register('title')} here must use the spread operator because 'register()' function returns
// an object with 4 properties, so we can add theese properties as props to our component

// For the text editor must use 'Controller' component because <SimpleMdeReact /> does not support the 'register()' function spread operator