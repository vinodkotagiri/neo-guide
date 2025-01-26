'use client'
import React from 'react'
import { uploadFile } from './services/axios';
import { UploadVideoResponse } from './services/responses/responses';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch } from '@/redux/hooks';
import { setLoading } from '@/redux/features/LoadingSlice';
import { useRouter } from 'next/navigation';

function App() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  async function handleUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    dispatch(setLoading(true));
    if (file) {
      const response: UploadVideoResponse | null = await uploadFile({ user_id: '1', file });
      if (response &&response.upload_id) {
        router.push(`/video-editor`);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        return toast.error('Error uploading video');
      }

    }
  }

  async function handleInitiateRecording() {
    dispatch(setLoading(true));
    setTimeout(() => {
      router.push(`/recorder`);
      dispatch(setLoading(false))
    }, 1000);
  }
  return (
    <div className='min-w-screen min-h-screen bg-slate-900 text-slate-200 h-screen w-screen'>
      <div className='flex items-center justify-center h-full gap-3'>
        <button className='btn btn-lg' onClick={handleInitiateRecording}>Record Screen</button>
        <div className="divider divider-horizontal">OR</div>
        <label htmlFor="videoUpload" className="btn btn-lg bg-green-500">
          Upload Video
        </label>
        <input
          type="file"
          id='videoUpload'
          className="file-input file-input-bordered file-input-success w-full max-w-xs cursor-pointer hidden"
          accept='video/*'
          onChange={handleUploadFile}
        />
      </div>
      <Toaster />
    </div>
  )
}

export default App