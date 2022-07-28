import React, { useState, useRef } from 'react'
import dog from './asset/images/pexels-charles-1851164.jpg'
import { Avatar, ScrollArea, Divider, Modal } from '@mantine/core'
import { comments } from './asset/comments/comments'
import { badWords } from './asset/flag list/BadWord'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function App(): React.ReactElement {
  //========miscellaneous=========
  const [intro, setIntro] = useState<boolean>(true)
  const commentInput = useRef<HTMLInputElement>(null)

  function tryApp() {
    setIntro(false)
  }

  const [opened, setOpened] = useState(false)

  const [strictMode, setStrictMode] = useState<boolean>(false)
  const [commentReviewMode, setCommentReviewMode] = useState<boolean>(false)

  function handleModes(e: React.ChangeEvent<HTMLInputElement>) {
    let checkBoxName: string = e.target.name
    //for each check box check if one is already checked
    if (checkBoxName === 'strictMode' && commentReviewMode === true) {
      setCommentReviewMode(false)
    }
    if (checkBoxName === 'commentReviewMode' && strictMode === true) {
      setStrictMode(false)
    }

    //then activate the right one
    if (checkBoxName === 'strictMode' && strictMode === false) {
      setStrictMode(true)
    } else if (checkBoxName === 'strictMode' && strictMode === true) {
      setStrictMode(false)
    }

    if (checkBoxName === 'commentReviewMode' && commentReviewMode === false) {
      setCommentReviewMode(true)
    } else if (checkBoxName === 'commentReviewMode' && commentReviewMode === true) {
      setCommentReviewMode(false)
    }
  }

  //=========comment=========
  //temporaryComment could be usefull if we want to hide the words and publish the comment anyways, while still keeping the original comment
  const [temporaryComment, setTemporaryComment] = useState<string>('')
  const [finalComment, setFinalComment] = useState<string>('')
  const [commentToReview, setCommentToReview] = useState<string>('')
  const [couldBeMean, setCouldBeMean] = useState<boolean>(false)

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    //trimming string starting with whitespace and unnecessary white spaces
    const comment = e.target.value.replace(/\s+/g, ' ').trim()
    setTemporaryComment(comment)
  }

  function verifyComment() {
    //verify the words in the comment
    //lower cased comment transformed into array
    const rawComment: string = temporaryComment.toLocaleLowerCase()
    // const commentArray: string[] = rawComment.split(' ')

    //loop and stops as soon as it finds on flagged word
    for (let i = 0; i < badWords.length; i++) {
      if (rawComment.includes(badWords[i])) {
        setOpened(true)
        if (strictMode) {
          clearInput()
        }
        return setCouldBeMean(true)
      } else {
        setCouldBeMean(false)
      }
    }

    //post the comment if it's not harmfull
    postComment()
  }

  function clearInput() {
    if (commentInput.current != null) {
      commentInput.current.value = ' '
    }
  }

  function postComment() {
    if (!couldBeMean) {
      setFinalComment(temporaryComment)
      clearInput()
    }

    if (couldBeMean && commentReviewMode) {
      setCommentToReview(temporaryComment)
      // refresh the state and empty the input
      setCouldBeMean(false)
      clearInput()
    }

    if (opened) {
      setOpened(false)
    }
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
                    Our new friend: Georgie.
                    <br />
                    isn't he cute? 🥰
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
                {commentToReview.length === 0 ? (
                  ''
                ) : (
                  <span className='w-full flex flex-row justify-between items-center gap-2 p-2 mb-3 bg-gray-200'>
                    <Avatar radius='xl' color='yellow' />
                    <p className='w-2/3  text-lg text-left'>{commentToReview}</p>
                    <p className='w-1/5 text-gray-500 text-right text-xs '>
                      <FontAwesomeIcon icon={faEyeSlash} />
                      Submited for review, only you can see it until then.
                    </p>
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
              <label className='w-full text-lg font-bold text-red-600 text-left mr-5 flex justify-start items-center gap-2 pl-2'>
                <input type='checkbox' checked={strictMode} onChange={handleModes} name='strictMode' />
                Strict Mode
              </label>
              <label className='w-full font-bold text-cyan-700 text-lg text-left flex justify-start items-center gap-2 pl-2'>
                <input type='checkbox' checked={commentReviewMode} onChange={handleModes} name='commentReviewMode' />
                Comment review
              </label>
              <section className=' w-full mt-2 flex flex-row justify-between items-end gap-2 p-2'>
                <input ref={commentInput} className='w-2/3 p-2 rounded' placeholder='your comment' name='comment' onChange={handleInput} />
                <button className='w-1/2 bg-rose-400 hover:bg-rose-500 text-white font-bold text-2xl py-1 px-4 rounded' onClick={verifyComment}>
                  Try to bully
                </button>
              </section>
              <Modal
                styles={{
                  body: {
                    fontSize: '1.5em',
                    textAlign: 'center'
                  }
                }}
                centered
                overlayBlur={3}
                overlayColor='grey'
                opened={opened}
                onClose={() => setOpened(false)}
                title='Take it easy'
              >
                <p>👋 Hey, your comment might be inappropriate...you should think carefully before commenting 🤔.</p>
                {commentReviewMode ? (
                  <button className='w-1/2 bg-rose-400 hover:bg-rose-500 text-white font-bold text-2xl py-1 px-4 rounded' onClick={postComment}>
                    Post anyway
                  </button>
                ) : (
                  ''
                )}
              </Modal>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default App
