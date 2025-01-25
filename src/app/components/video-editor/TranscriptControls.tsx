import React from 'react'

function TranscriptControls() {
  return (
    <div className='bg-slate-900 w-full p-2 flex flex-col gap-2 border-[1px] rounded-md border-slate-700 text-slate-300'>
      <label className='font-bold text-sm '>Transcript</label>
      <div className='flex gap-2'>
        <select className="select select-xs select-bordered select-ghost max-w-xs">
          <option disabled>Select language</option>
          <option>English</option>
          <option>Japanese</option>
          <option>Italian</option>
        </select>
        <select className="select select-xs select-bordered select-ghost max-w-xs">
          <option disabled >Select language</option>
          <option>English</option>
          <option>Japanese</option>
          <option>Italian</option>
        </select>
      </div>
      <div className='flex gap-2'>
        <select className="select select-xs select-bordered select-ghost max-w-xs">
          <option disabled >Select language</option>
          <option>English</option>
          <option>Japanese</option>
          <option>Italian</option>
        </select>
        <select className="select select-xs select-bordered select-ghost max-w-xs">
          <option disabled >Select language</option>
          <option>English</option>
          <option>Japanese</option>
          <option>Italian</option>
        </select>
      </div>
    </div>
  )
}

export default TranscriptControls