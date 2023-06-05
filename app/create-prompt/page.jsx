"use client";

import Form from '@components/Form'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreatePrompt = () => {
 const {data: sesstion} = useSession();  
 const router = useRouter();

 const [ submitting, setSubmitting ] = useState(false);
 const [ post, setPost ] = useState({
    prompt: '',
    tag: '',
 });

 const createPrompt = async (e) => {
   e.preventDefault();
   setSubmitting(true);

   try {
     const response = await fetch('/api/prompt/new', {
       method: 'POST',
       body: JSON.stringify({
         prompt: post.prompt,
         tag: post.tag,
         userId: sesstion?.user.id,
       })
     });  

     if (response.ok) {
       router.push("/");
     }
   } catch (error) {
      console.log(error);
   } finally {
      setSubmitting(false);
   }
 }

  return (
     <Form
        type="Create"
        submitting={submitting}
        post={post}
        setPost={setPost}
        handleSubmit={createPrompt}
     />
  )
}

export default CreatePrompt
