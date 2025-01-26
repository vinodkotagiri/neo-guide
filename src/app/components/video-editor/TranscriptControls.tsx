import React from 'react'

function TranscriptControls() {
  return (
    <div className='bg-slate-900 w-full p-2 flex flex-col gap-2 border-[1px] rounded-md border-slate-700 text-slate-300'>
      <label className='font-bold text-sm '>Transcript</label>
      <div className='flex gap-2'>
        <select className="select select-xs select-bordered select-ghost max-w-xs w-1/2" defaultValue={'null'}>
          <option value='null' disabled>Select language</option>
          <option value='en'>English</option>
          <option value='fr'>French</option>
          <option value='es'>Spanish</option>
        </select>
        <select className="select select-xs select-bordered select-ghost max-w-xs w-1/2" defaultValue={'null'}>
          <option value='null' disabled >Select Voice</option>
          <option value='a'>A</option>
          <option value='b'>B</option>
          <option value='c'>C</option>
        </select>
      </div>
      <div className='flex gap-2'>
        <select className="select select-xs select-bordered select-ghost max-w-xs w-1/2" defaultValue={'null'}>
          <option value='null' disabled >Select Gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
        <select className="select select-xs select-bordered select-ghost max-w-xs w-1/2" defaultValue={'null'}>
          <option value='null' disabled >Select BG Audio</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
      </div>
    </div>
  )
}

export default TranscriptControls