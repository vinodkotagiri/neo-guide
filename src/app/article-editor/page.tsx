import React from 'react'

function ArticleEditorPage() {
  return (
    <div className='flex size-full bg-slate-900 p-2 gap-1'>
      <div className='w-[85%] h-full flex flex-col gap-1'>
        <div className='w-full h-[75%] border-[1px] rounded-md border-slate-700 bg-black'>
          
        </div>
        <div className='w-full h-[25%] bg-black rounded-md border-[1px] border-slate-700 text-slate-200'>
        </div>

      </div>
      <div className='w-[25%] h-full bg-black rounded-md border-[1px] border-slate-700 text-slate-200'>
      </div>
    </div>
  )
}

export default ArticleEditorPage