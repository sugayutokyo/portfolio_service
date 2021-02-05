import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, login, logout } from '@/store/userSlice'
import { auth } from '@/firebase'
import Auth from '@/components/Auth'

const Home: React.FC = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          }),
        )
      } else {
        dispatch(logout())
      }
    })
    return () => {
      unSub()
    }
  }, [dispatch])

  return <>{user.uid ? <div>ログイン成功</div> : <Auth />}</>
}

export default Home
