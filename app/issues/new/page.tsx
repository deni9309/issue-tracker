"use client"
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import { ExclamationTriangleIcon, TextIcon } from '@radix-ui/react-icons';
import { useForm, Controller } from 'react-hook-form';
import { SimpleMdeReact } from 'react-simplemde-editor';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
//import dynamic from 'next/dynamic';

//const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });

type IssueForm = z.infer<typeof createIssueSchema>;  //infer this IssueForm type based on the createIssueSchema

export default function NewIssuePage() {
   const router = useRouter();
   const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<IssueForm>({
      resolver: zodResolver(createIssueSchema),
      reValidateMode: "onBlur"
   });

   const [ error, setError ] = useState('');
   const [ isSubmitting, setIsSubmitting ] = useState(false);

   return (
      <div className='max-w-xl mx-auto space-y-3'>
         {error &&
            <Callout.Root color="red">
               <Callout.Icon><ExclamationTriangleIcon /></Callout.Icon>
               <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}

         <form className='space-y-3'
            onSubmit={handleSubmit(async (data) => {
               try {
                  setIsSubmitting(true);

                  await axios.post('/api/issues', data);
                  router.push('/issues');
               } catch (error) {
                  setIsSubmitting(false);
                  setError('An unexpected error occurred!');
               }
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
            <ErrorMessage>{errors.title?.message}</ErrorMessage>

            <Controller
               name="description"
               control={control}
               render={({ field }) => (
                  <SimpleMdeReact className='border border-zinc-300 border-x-0 border-t-0'
                     placeholder="Describe your Issue..." {...field}
                  />
               )}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>

            <Button disabled={!isValid || isSubmitting} size="2">
               Create {isSubmitting && <Spinner />}
            </Button>
         </form>
      </div>
   );
}


// {...register('title')} here must use the spread operator because 'register()' function returns
// an object with 4 properties, so we can add theese properties as props to our component

// For the text editor must use 'Controller' component because <SimpleMDE /> does not support the 'register()' function spread operator