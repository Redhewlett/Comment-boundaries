import React, { useState } from 'react'
import dog from './asset/images/pexels-charles-1851164.jpg'
import { Avatar, ScrollArea, Divider } from '@mantine/core'
import { comments } from './asset/comments/comments'
//========intro=========
function App(): React.ReactElement {
  const [intro, setIntro] = useState<boolean>(true)

  function tryApp() {
    setIntro(false)
  }
  //========intro end=========

  //=========comment=========
  const [temporaryComment, setTemporaryComment] = useState<string>('')
  const [finalComment, setFinalComment] = useState<string>('')
  const [isMean, setIsMean] = useState<boolean>(false)
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    //trimming string starting with whitespace and unnecessary white spaces
    const comment = event.target.value.replace(/\s+/g, ' ').trim()
    setTemporaryComment(comment)
  }

  function postComment() {
    //verify the words in the comment
    //post the comment
    setFinalComment(temporaryComment)
  }
  //=========comment end=========

  return (
    <div className=' w-full h-screen flex flex-col justify-center items-center'>
      <h1 className='p-4 m-2 text-center w-1/2 text-gray-800 text-6xl'>✨Comment boundaries✨</h1>
      {intro ? (
        <div className=' w-1/2 flex flex-col p-2 gap-4 justify-center items-center'>
          <p className='p-2 text-center  w-full text-3xl'>
            A Script that notifies your users if their comment could be <strong>harmfull </strong>to others.🤩
          </p>
          <p className='p-2 text-center  w-full text-3xl'>For the sake of the example this is in english only.</p>
          <button onClick={tryApp} className=' w-1/2 m-10 bg-rose-400 hover:bg-rose-500 text-white font-bold text-2xl py-2 px-4 rounded'>
            Try a being a bully
          </button>
        </div>
      ) : (
        <section className='w-1/2 p-4 m-2 text-center flex flex-col justify-center align-center items-center '>
          <div className=' w-full flex flex-row justify-between shadow-xl'>
            <img className='w-2/4 rounded-l-md' src={dog} alt='dog' />
            <div className='w-3/5 p-4 bg-zinc-100 rounded-r-md '>
              <ScrollArea style={{ height: 450 }} type='never'>
                <span className='w-full flex flex-wrap justify-start items-start gap-2 p-2 mb-5'>
                  <Avatar radius='xl' color='pink' />
                  <p className='w-2/3 text-lg text-left'>
                    Our new friend: Georgie, isn't he cute? 🥰
                    <br />
                    <br />
                    We couldn't say no when we learned that he arrived at the shelter after being abandoned
                  </p>
                  <p className='w-full text-lg text-left pl-11 text-pink-400 cursor-pointer'>#dog #newfriend #cutedog #rescued</p>
                  <p className='w-full text-left pl-11 text-gray-500 text-xs'>20 min ago</p>
                </span>
                {finalComment.length === 0 ? (
                  ''
                ) : (
                  <span className='w-full flex flex-row justify-between items-center gap-2 p-2 mb-3 '>
                    <Avatar radius='xl' color='yellow' />
                    <p className='w-2/3  text-lg text-left'>{finalComment}</p>
                    <p className='w-1/5 text-gray-500 text-right text-xs '>a moment ago</p>
                  </span>
                )}
                {comments.map((comment, index) => (
                  <span key={index} className='w-full flex flex-row justify-between items-center gap-2 p-2 mb-3 '>
                    <Avatar radius='xl' color={comment.avatar} />
                    <p className='w-2/3  text-lg text-left'>{comment.comment}</p>
                    <p className='w-1/5 text-gray-500 text-right text-xs '>{comment.time} min ago</p>
                  </span>
                ))}
              </ScrollArea>
              <Divider my='sm' />
              <section className=' w-full flex flex-row justify-between items-end gap-2 p-2'>
                <input className='w-2/3 p-2 rounded' placeholder='your mean comment' name='comment' onChange={handleInput} />
                <button className='w-1/2 bg-rose-400 hover:bg-rose-500 text-white font-bold text-2xl py-1 px-4 rounded' onClick={postComment}>
                  Try to bully
                </button>
              </section>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default App
