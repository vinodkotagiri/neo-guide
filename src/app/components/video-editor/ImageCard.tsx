import { truncateText } from '@/app/helpers/text'
import Image from 'next/image'
import React from 'react'

function ImageCard() {
  const link='https://images.freeimages.com/images/large-previews/ead/tunnel-1056859.jpg'
  const text='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum labore corporis eum delectus, nesciunt odit et officia illum quod quae consequuntur magnam vel vero voluptas doloribus harum tempora assumenda. Rem!'
  return (
    <div className='flex flex-col items-center justify-center gap-1 p-2 text-slate-200 bg-black rounded-md'>
      <Image src={link} alt='slide00' width={300} height={120} style={{objectFit:'cover',aspectRatio:'16/9'}} />
      <input className='text-xs text-left bg-transparent w-full px-2'  placeholder={truncateText(text)}/>
    </div>
  )
}

export default ImageCard