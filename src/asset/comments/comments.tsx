type commentObject = {
  avatar: string
  comment: string
  time: number
}
type commentArray = commentObject[]

export const comments: commentArray = [
  {
    avatar: 'red',
    comment: 'cool dog 😃',
    time: 1
  },
  {
    avatar: 'gray',
    comment: 'OMG what a cutie! you guyz are so lucky',
    time: 2
  },
  {
    avatar: 'orange',
    comment: 'yep, that is a keeper',
    time: 2
  },
  {
    avatar: 'blue',
    comment: 'what a funny name... 😂',
    time: 7
  },
  {
    avatar: 'green',
    comment: 'adorable 😚',
    time: 10
  }
]
